import type { MockExamResult, MockExamSession } from "@/lib/mock-exam/types";

const RESULTS_KEY = "mockExamResults";
const SESSION_KEY = "mockExamSession";
const MAX_RESULTS = 10;

export function readMockExamResults(): MockExamResult[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(RESULTS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveMockExamResult(result: MockExamResult): void {
  const results = readMockExamResults();
  results.unshift(result);
  if (results.length > MAX_RESULTS) results.splice(MAX_RESULTS);
  localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
}

export function readMockExamSession(): MockExamSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as MockExamSession) : null;
  } catch {
    return null;
  }
}

export function saveMockExamSession(session: MockExamSession): void {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearMockExamSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}
