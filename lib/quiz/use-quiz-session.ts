"use client";

import { useMemo, useState } from "react";
import { quizQuestions } from "@/lib/quiz/data";
import { upsertReviewRecord } from "@/lib/review/storage";

type UseQuizSessionOptions = {
  initialQuestionId?: string;
};

function resolveInitialIndex(questionId?: string) {
  if (!questionId) {
    return 0;
  }

  const index = quizQuestions.findIndex((question) => question.id === questionId);
  return index >= 0 ? index : 0;
}

export function useQuizSession(options: UseQuizSessionOptions = {}) {
  const [currentIndex, setCurrentIndex] = useState(() =>
    resolveInitialIndex(options.initialQuestionId),
  );
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [reviewIds, setReviewIds] = useState<string[]>([]);

  const question = quizQuestions[currentIndex];
  const totalQuestions = quizQuestions.length;
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
      return "回答前";
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

    setIsSubmitted(true);
    if (answeredCorrectly) {
      setCorrectCount((count) => count + 1);
    } else {
      upsertReviewRecord({
        questionId: question.id,
        selectedAnswer: selectedChoiceId,
        correctAnswer: question.correctChoiceId,
        isCorrect: false,
        category: question.category,
        timestamp: Date.now(),
      });
    }
  }

  function toggleReview() {
    const answerToStore = selectedChoiceId ?? "";

    upsertReviewRecord({
      questionId: question.id,
      selectedAnswer: answerToStore,
      correctAnswer: question.correctChoiceId,
      isCorrect: isSubmitted ? selectedChoiceId === question.correctChoiceId : false,
      category: question.category,
      timestamp: Date.now(),
    });

    setReviewIds((current) =>
      current.includes(question.id)
        ? current.filter((id) => id !== question.id)
        : [...current, question.id],
    );
  }

  function goToNextQuestion() {
    if (currentIndex === totalQuestions - 1) {
      setCurrentIndex(0);
      setCorrectCount(0);
      setReviewIds([]);
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
    statusLabel,
    selectChoice,
    submitAnswer,
    toggleReview,
    goToNextQuestion,
  };
}
