"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { readReviewRecords, removeReviewRecord, upsertReviewRecord } from "@/lib/review/storage";
import { buildPrioritizedQuestionOrder } from "@/lib/study/analytics";
import { appendQuizAttempt, readQuizAttempts } from "@/lib/study/storage";
import { quizQuestions } from "@/lib/quiz/data";
import { DEFAULT_QUIZ_FILTER } from "@/lib/quiz/types";
import type { QuizFilter, QuizQuestion } from "@/lib/quiz/types";

type UseQuizSessionOptions = {
  initialQuestionId?: string;
  filter?: QuizFilter;
};

export function useQuizSession(options: UseQuizSessionOptions = {}) {
  const filter = options.filter ?? DEFAULT_QUIZ_FILTER;

  // SSR-safe initial state: apply only category filter (untried/review need localStorage)
  const [orderedQuestions, setOrderedQuestions] = useState<QuizQuestion[]>(() => {
    const all = quizQuestions;
    if (filter.category === "all") return all;
    return all.filter((q) => q.category === filter.category);
  });

  // Stringify filter for stable dependency comparison
  const filterKey = useMemo(
    () => JSON.stringify(filter),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filter.category, filter.untriedOnly, filter.reviewOnly],
  );

  const prevFilterKeyRef = useRef<string>("");

  useEffect(() => {
    const all = buildPrioritizedQuestionOrder(options.initialQuestionId);
    let filtered = all;

    // 1. Category
    if (filter.category !== "all") {
      filtered = filtered.filter((q) => q.category === filter.category);
    }

    // 2. Untried only
    if (filter.untriedOnly) {
      const triedIds = new Set(readQuizAttempts().map((a) => a.questionId));
      filtered = filtered.filter((q) => !triedIds.has(q.id));
    }

    // 3. Review only
    if (filter.reviewOnly) {
      const reviewQIds = new Set(readReviewRecords().map((r) => r.questionId));
      filtered = filtered.filter((q) => reviewQIds.has(q.id));
    }

    setOrderedQuestions(filtered);

    // Reset quiz state when filter changes
    if (prevFilterKeyRef.current !== filterKey) {
      prevFilterKeyRef.current = filterKey;
      setCurrentIndex(0);
      setSelectedChoiceId(null);
      setIsSubmitted(false);
      setCorrectCount(0);
    }
  }, [options.initialQuestionId, filterKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const [reviewIds, setReviewIds] = useState<string[]>(() =>
    readReviewRecords().map((record) => record.questionId),
  );

  const isEmpty = orderedQuestions.length === 0;
  const question = orderedQuestions[currentIndex] as QuizQuestion | undefined;
  const totalQuestions = orderedQuestions.length;
  const progressPercent =
    totalQuestions === 0 ? 0 : Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const isCorrect =
    isSubmitted && question ? selectedChoiceId === question.correctChoiceId : null;

  const answeredCount = currentIndex + (isSubmitted ? 1 : 0);
  const selectedChoice = question
    ? (question.choices.find((choice) => choice.id === selectedChoiceId) ?? null)
    : null;
  const correctChoice = question
    ? (question.choices.find((choice) => choice.id === question.correctChoiceId) ?? null)
    : null;
  const accuracyPercent =
    answeredCount === 0 ? 0 : Math.round((correctCount / answeredCount) * 100);

  const statusLabel = useMemo(() => {
    if (!isSubmitted) return "未回答";
    return isCorrect ? "正解" : "不正解";
  }, [isCorrect, isSubmitted]);

  function selectChoice(choiceId: string) {
    if (isSubmitted) return;
    setSelectedChoiceId(choiceId);
  }

  function submitAnswer() {
    if (!selectedChoiceId || isSubmitted || !question) return;

    const answeredCorrectly = selectedChoiceId === question.correctChoiceId;
    const timestamp = Date.now();

    setIsSubmitted(true);
    appendQuizAttempt({
      questionId: question.id,
      category: question.category,
      isCorrect: answeredCorrectly,
      timestamp,
    });

    if (answeredCorrectly) {
      setCorrectCount((count) => count + 1);
      removeReviewRecord(question.id);
      setReviewIds((current) => current.filter((id) => id !== question.id));
      return;
    }

    upsertReviewRecord({
      questionId: question.id,
      selectedAnswer: selectedChoiceId,
      correctAnswer: question.correctChoiceId,
      isCorrect: false,
      category: question.category,
      timestamp,
    });

    setReviewIds((current) =>
      current.includes(question.id) ? current : [...current, question.id],
    );
  }

  function toggleReview() {
    if (!question) return;
    if (reviewIds.includes(question.id)) {
      removeReviewRecord(question.id);
      setReviewIds((current) => current.filter((id) => id !== question.id));
      return;
    }

    upsertReviewRecord({
      questionId: question.id,
      selectedAnswer: selectedChoiceId ?? "",
      correctAnswer: question.correctChoiceId,
      isCorrect: isSubmitted ? selectedChoiceId === question.correctChoiceId : false,
      category: question.category,
      timestamp: Date.now(),
    });

    setReviewIds((current) => [...current, question.id]);
  }

  function goToNextQuestion() {
    if (currentIndex === totalQuestions - 1) {
      setCurrentIndex(0);
      setCorrectCount(0);
    } else {
      setCurrentIndex((index) => index + 1);
    }
    setSelectedChoiceId(null);
    setIsSubmitted(false);
  }

  return {
    isEmpty,
    question: question as QuizQuestion, // defined when isEmpty === false
    currentIndex,
    totalQuestions,
    progressPercent,
    answeredCount,
    accuracyPercent,
    selectedChoiceId,
    selectedChoice,
    correctChoice,
    isSubmitted,
    isCorrect,
    correctCount,
    reviewIds,
    isMarkedForReview: question ? reviewIds.includes(question.id) : false,
    orderedQuestions,
    statusLabel,
    selectChoice,
    submitAnswer,
    toggleReview,
    goToNextQuestion,
  };
}
