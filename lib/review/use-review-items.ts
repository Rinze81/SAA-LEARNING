"use client";

import { useEffect, useMemo, useState } from "react";
import { quizQuestions } from "@/lib/quiz/data";
import {
  clearReviewRecords,
  markReviewRetried,
  readReviewRecords,
  removeReviewRecord,
} from "@/lib/review/storage";
import type { ReviewRecord } from "@/lib/review/types";

export type ReviewSort = "newest" | "oldest";
export type ReviewStatusFilter = "all" | "pending";

export type ReviewItem = {
  record: ReviewRecord;
  question: (typeof quizQuestions)[number];
  selectedChoice?: (typeof quizQuestions)[number]["choices"][number];
  correctChoice?: (typeof quizQuestions)[number]["choices"][number];
};

function readItems(records: ReviewRecord[]) {
  return records.reduce<ReviewItem[]>((acc, record) => {
    const question = quizQuestions.find((item) => item.id === record.questionId);

    if (!question) {
      return acc;
    }

    const selectedChoice = question.choices.find(
      (choice) => choice.id === record.selectedAnswer,
    );
    const correctChoice = question.choices.find(
      (choice) => choice.id === record.correctAnswer,
    );

    acc.push({
      record,
      question,
      selectedChoice,
      correctChoice,
    });

    return acc;
  }, []);
}

export function useReviewItems() {
  const [records, setRecords] = useState<ReviewRecord[]>([]);
  const [sort, setSort] = useState<ReviewSort>("newest");
  const [statusFilter, setStatusFilter] = useState<ReviewStatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  useEffect(() => {
    setRecords(readReviewRecords());
  }, []);

  const items = useMemo(() => readItems(records), [records]);

  const categories = useMemo(() => {
    const counts = items.reduce<Record<string, number>>((acc, item) => {
      acc[item.record.category] = (acc[item.record.category] ?? 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count);
  }, [items]);

  const filteredItems = useMemo(() => {
    const next = items.filter((item) => {
      if (statusFilter === "pending" && item.record.status !== "pending") {
        return false;
      }

      if (categoryFilter !== "all" && item.record.category !== categoryFilter) {
        return false;
      }

      return true;
    });

    next.sort((a, b) =>
      sort === "newest"
        ? b.record.timestamp - a.record.timestamp
        : a.record.timestamp - b.record.timestamp,
    );

    return next;
  }, [categoryFilter, items, sort, statusFilter]);

  function refresh() {
    setRecords(readReviewRecords());
  }

  function dismiss(questionId: string) {
    removeReviewRecord(questionId);
    refresh();
  }

  function clearAll() {
    clearReviewRecords();
    setRecords([]);
  }

  function markRetried(questionId: string) {
    markReviewRetried(questionId);
    refresh();
  }

  return {
    items: filteredItems,
    totalCount: items.length,
    pendingCount: items.filter((item) => item.record.status === "pending").length,
    categories,
    sort,
    statusFilter,
    categoryFilter,
    hasItems: items.length > 0,
    setSort,
    setStatusFilter,
    setCategoryFilter,
    dismiss,
    clearAll,
    markRetried,
  };
}
