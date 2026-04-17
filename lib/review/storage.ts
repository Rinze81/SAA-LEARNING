"use client";

import type { ReviewRecord } from "@/lib/review/types";

const REVIEW_STORAGE_KEY = "saa-review-records";
export const STUDY_SYNC_EVENT = "saa-study-sync";

function isBrowser() {
  return typeof window !== "undefined";
}

function emitStudySync() {
  if (!isBrowser()) {
    return;
  }

  window.dispatchEvent(new CustomEvent(STUDY_SYNC_EVENT));
}

function isValidRecord(value: unknown): value is ReviewRecord {
  if (!value || typeof value !== "object") return false;
  const r = value as Record<string, unknown>;
  return (
    typeof r.questionId === "string" &&
    typeof r.selectedAnswer === "string" &&
    typeof r.correctAnswer === "string" &&
    typeof r.isCorrect === "boolean" &&
    typeof r.category === "string" &&
    typeof r.timestamp === "number" &&
    Number.isFinite(r.timestamp)
  );
}

function readRawRecords(): ReviewRecord[] {
  if (!isBrowser()) {
    return [];
  }

  const raw = window.localStorage.getItem(REVIEW_STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidRecord);
  } catch {
    return [];
  }
}

function writeRecords(records: ReviewRecord[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(records));
  emitStudySync();
}

export function readReviewRecords(): ReviewRecord[] {
  return readRawRecords().sort((a, b) => b.timestamp - a.timestamp);
}

export function upsertReviewRecord(record: ReviewRecord) {
  const records = readRawRecords();
  const nextRecords = records.filter(
    (existing) => existing.questionId !== record.questionId,
  );

  nextRecords.push(record);
  writeRecords(nextRecords);
}

export function removeReviewRecord(questionId: string) {
  const records = readRawRecords();
  const nextRecords = records.filter((record) => record.questionId !== questionId);

  writeRecords(nextRecords);
}

export function clearReviewRecords() {
  writeRecords([]);
}
