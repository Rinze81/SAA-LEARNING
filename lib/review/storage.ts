import type { ReviewRecord, ReviewStatus } from "@/lib/review/types";

export const REVIEW_STORAGE_KEY = "saa-review-items";

function isBrowser() {
  return typeof window !== "undefined";
}

function normalizeRecord(record: Partial<ReviewRecord> & { questionId: string }) {
  return {
    questionId: record.questionId,
    selectedAnswer: record.selectedAnswer ?? "",
    correctAnswer: record.correctAnswer ?? "",
    isCorrect: record.isCorrect ?? false,
    category: record.category ?? "Other",
    timestamp: typeof record.timestamp === "number" ? record.timestamp : Date.now(),
    status: (record.status ?? "pending") as ReviewStatus,
  } satisfies ReviewRecord;
}

export function readReviewRecords(): ReviewRecord[] {
  if (!isBrowser()) {
    return [];
  }

  const raw = window.localStorage.getItem(REVIEW_STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as Array<Partial<ReviewRecord> & { questionId: string }>;

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((item) => item && typeof item.questionId === "string")
      .map(normalizeRecord)
      .sort((a, b) => b.timestamp - a.timestamp);
  } catch {
    return [];
  }
}

function writeReviewRecords(records: ReviewRecord[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(records));
}

export function upsertReviewRecord(record: Omit<ReviewRecord, "status"> & { status?: ReviewStatus }) {
  const current = readReviewRecords();
  const next = [
    normalizeRecord(record),
    ...current.filter((item) => item.questionId !== record.questionId),
  ];

  writeReviewRecords(next);
}

export function markReviewRetried(questionId: string) {
  const current = readReviewRecords();
  const next = current.map((item) =>
    item.questionId === questionId
      ? {
          ...item,
          status: "retried" as const,
        }
      : item,
  );

  writeReviewRecords(next);
}

export function removeReviewRecord(questionId: string) {
  const current = readReviewRecords();
  writeReviewRecords(current.filter((item) => item.questionId !== questionId));
}

export function clearReviewRecords() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(REVIEW_STORAGE_KEY);
}
