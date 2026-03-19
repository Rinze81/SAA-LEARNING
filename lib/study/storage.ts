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

function readRawAttempts(): QuizAttemptRecord[] {
  if (!isBrowser()) {
    return [];
  }

  const raw = window.localStorage.getItem(ATTEMPT_STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as QuizAttemptRecord[];
    return Array.isArray(parsed) ? parsed : [];
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
