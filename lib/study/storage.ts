"use client";

import type { QuizAttemptRecord } from "@/lib/study/types";
import { STUDY_SYNC_EVENT } from "@/lib/review/storage";

const ATTEMPT_STORAGE_KEY = "saa-quiz-attempts";
const MAX_ATTEMPTS = 120;

function isBrowser() {
  return typeof window !== "undefined";
}

function emitStudySync() {
  if (!isBrowser()) {
    return;
  }

  window.dispatchEvent(new CustomEvent(STUDY_SYNC_EVENT));
}

function isValidAttempt(value: unknown): value is QuizAttemptRecord {
  if (!value || typeof value !== "object") return false;
  const r = value as Record<string, unknown>;
  return (
    typeof r.questionId === "string" &&
    typeof r.category === "string" &&
    typeof r.isCorrect === "boolean" &&
    typeof r.timestamp === "number" &&
    Number.isFinite(r.timestamp)
  );
}

function readRawAttempts(): QuizAttemptRecord[] {
  if (!isBrowser()) {
    return [];
  }

  const raw = window.localStorage.getItem(ATTEMPT_STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidAttempt);
  } catch {
    return [];
  }
}

function writeAttempts(attempts: QuizAttemptRecord[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(ATTEMPT_STORAGE_KEY, JSON.stringify(attempts));
  emitStudySync();
}

export function readQuizAttempts(): QuizAttemptRecord[] {
  return readRawAttempts().sort((a, b) => b.timestamp - a.timestamp);
}

export function appendQuizAttempt(attempt: QuizAttemptRecord) {
  const attempts = readRawAttempts();
  const nextAttempts = [attempt, ...attempts].slice(0, MAX_ATTEMPTS);

  writeAttempts(nextAttempts);
}
