"use client";

import { useEffect, useState } from "react";
import { DEFAULT_QUIZ_FILTER } from "@/lib/quiz/types";
import type { QuizFilter } from "@/lib/quiz/types";

const FILTER_SESSION_KEY = "quiz-filter-state";

function readFromSession(): QuizFilter | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(FILTER_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as QuizFilter;
  } catch {
    return null;
  }
}

function writeToSession(filter: QuizFilter) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(FILTER_SESSION_KEY, JSON.stringify(filter));
}

export function useQuizFilter(initialCategory?: string) {
  const [filter, setFilter] = useState<QuizFilter>(DEFAULT_QUIZ_FILTER);

  useEffect(() => {
    const saved = readFromSession();
    const base = saved ?? DEFAULT_QUIZ_FILTER;
    // URL param (?category=xxx) takes precedence over saved category
    const category =
      initialCategory && initialCategory !== "all"
        ? initialCategory
        : base.category;
    setFilter({ ...base, category });
  }, [initialCategory]);

  function updateFilter(updates: Partial<QuizFilter>) {
    setFilter((prev) => {
      const next = { ...prev, ...updates };
      writeToSession(next);
      return next;
    });
  }

  return { filter, updateFilter };
}
