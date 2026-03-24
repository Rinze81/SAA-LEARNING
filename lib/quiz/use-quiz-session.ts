"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { readReviewRecords, removeReviewRecord, upsertReviewRecord } from "@/lib/review/storage";
import { buildPrioritizedQuestionOrder } from "@/lib/study/analytics";
import { appendQuizAttempt } from "@/lib/study/storage";

type UseQuizSessionOptions = {
  initialQuestionId?: string;
  categoryFilter?: string;
};

export function useQuizSession(options: UseQuizSessionOptions = {}) {
  const orderedQuestions = useMemo(() => {
    const all = buildPrioritizedQuestionOrder(options.initialQuestionId);
    if (!options.categoryFilter || options.categoryFilter === "all") return all;
    return all.filter((q) => q.category === options.categoryFilter);
  }, [options.initialQuestionId, options.categoryFilter]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const prevFilterRef = useRef(options.categoryFilter);
  useEffect(() => {
    if (prevFilterRef.current === options.categoryFilter) return;
    prevFilterRef.current = options.categoryFilter;
    setCurrentIndex(0);
    setSelectedChoiceId(null);
    setIsSubmitted(false);
    setCorrectCount(0);
  }, [options.categoryFilter]);
  const [reviewIds, setReviewIds] = useState<string[]>(() =>
    readReviewRecords().map((record) => record.questionId),
  );

  const question = orderedQuestions[currentIndex];
  const totalQuestions = orderedQuestions.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const isCorrect = isSubmitted
    ? selectedChoiceId === question.correctChoiceId
    : null;

  const answeredCount = currentIndex + (isSubmitted ? 1 : 0);
  const selectedChoice =
    question.choices.find((choice) => choice.id === selectedChoiceId) ?? null;
  const correctChoice =
    question.choices.find((choice) => choice.id === question.correctChoiceId) ?? null;
  const accuracyPercent =
    answeredCount === 0 ? 0 : Math.round((correctCount / answeredCount) * 100);

  const statusLabel = useMemo(() => {
    if (!isSubmitted) {
      return "未回答";
    }

    return isCorrect ? "正解" : "不正解";
  }, [isCorrect, isSubmitted]);

  function selectChoice(choiceId: string) {
    if (isSubmitted) {
      return;
    }

    setSelectedChoiceId(choiceId);
  }

  function submitAnswer() {
    if (!selectedChoiceId || isSubmitted) {
      return;
    }

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
    question,
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
    isMarkedForReview: reviewIds.includes(question.id),
    orderedQuestions,
    statusLabel,
    selectChoice,
    submitAnswer,
    toggleReview,
    goToNextQuestion,
  };
}
