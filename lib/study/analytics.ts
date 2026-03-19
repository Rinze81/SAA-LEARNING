import { quizQuestions } from "@/lib/quiz/data";
import type { QuizQuestion } from "@/lib/quiz/types";
import { readReviewRecords } from "@/lib/review/storage";
import type { ReviewRecord } from "@/lib/review/types";
import { readQuizAttempts } from "@/lib/study/storage";
import type {
  CategoryPriority,
  QuizAttemptRecord,
  StudyAnalytics,
  StudyRecommendation,
} from "@/lib/study/types";

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const RECENT_WINDOW_IN_MS = 5 * DAY_IN_MS;

function buildQuizHref(questionId: string) {
  return `/quiz?questionId=${questionId}`;
}

function roundPercent(value: number) {
  return Math.round(value * 100);
}

function formatReason(category: string, reviewCount: number, recentMistakes: number) {
  if (reviewCount > 0 && recentMistakes > 0) {
    return `${category} は review の誤答が ${reviewCount} 件あり、直近でも ${recentMistakes} 回つまずいています。`;
  }

  if (reviewCount > 0) {
    return `${category} は review に残っている誤答が多いので、次の確認対象として優先します。`;
  }

  if (recentMistakes > 0) {
    return `${category} は直近の学習で誤答が続いているため、今のうちに判断軸を固めるのが効果的です。`;
  }

  return `${category} は最近触れていないので、忘却が進む前に短く確認しておくのが良さそうです。`;
}

function buildQuestionSequence(
  questions: QuizQuestion[],
  priorities: CategoryPriority[],
  attempts: QuizAttemptRecord[],
  reviews: ReviewRecord[],
  forcedQuestionId?: string,
) {
  const priorityMap = new Map(
    priorities.map((priority, index) => [
      priority.category,
      { ...priority, rank: priorities.length - index },
    ]),
  );
  const questionOrder = new Map(
    questions.map((question, index) => [question.id, index]),
  );
  const attemptMap = new Map(
    attempts.map((attempt) => [attempt.questionId, attempt.timestamp]),
  );
  const reviewMap = new Map(reviews.map((review) => [review.questionId, review]));

  return [...questions].sort((left, right) => {
    if (forcedQuestionId) {
      if (left.id === forcedQuestionId) {
        return -1;
      }

      if (right.id === forcedQuestionId) {
        return 1;
      }
    }

    const leftPriority = priorityMap.get(left.category);
    const rightPriority = priorityMap.get(right.category);
    const leftScore =
      (leftPriority?.score ?? 0) * 100 +
      (leftPriority?.rank ?? 0) * 10 +
      (reviewMap.has(left.id) ? 6 : 0) +
      (attemptMap.has(left.id) ? 0 : 4);
    const rightScore =
      (rightPriority?.score ?? 0) * 100 +
      (rightPriority?.rank ?? 0) * 10 +
      (reviewMap.has(right.id) ? 6 : 0) +
      (attemptMap.has(right.id) ? 0 : 4);

    if (rightScore !== leftScore) {
      return rightScore - leftScore;
    }

    const leftAttemptAt = attemptMap.get(left.id) ?? 0;
    const rightAttemptAt = attemptMap.get(right.id) ?? 0;

    if (leftAttemptAt !== rightAttemptAt) {
      return leftAttemptAt - rightAttemptAt;
    }

    return (questionOrder.get(left.id) ?? 0) - (questionOrder.get(right.id) ?? 0);
  });
}

export function buildStudyAnalytics(now = Date.now()): StudyAnalytics {
  const attempts = readQuizAttempts();
  const reviews = readReviewRecords();
  const recentThreshold = now - RECENT_WINDOW_IN_MS;
  const categorySet = Array.from(new Set(quizQuestions.map((question) => question.category)));

  const priorities = categorySet
    .map((category) => {
      const categoryQuestions = quizQuestions.filter(
        (question) => question.category === category,
      );
      const categoryAttempts = attempts.filter((attempt) => attempt.category === category);
      const recentAttempts = categoryAttempts.filter(
        (attempt) => attempt.timestamp >= recentThreshold,
      );
      const recentMistakes = recentAttempts.filter((attempt) => !attempt.isCorrect).length;
      const reviewCount = reviews.filter((review) => review.category === category).length;
      const correctCount = categoryAttempts.filter((attempt) => attempt.isCorrect).length;
      const accuracy =
        categoryAttempts.length === 0 ? null : correctCount / categoryAttempts.length;
      const attemptedQuestionIds = new Set(
        categoryAttempts.map((attempt) => attempt.questionId),
      );
      const unattemptedCount = categoryQuestions.filter(
        (question) => !attemptedQuestionIds.has(question.id),
      ).length;
      const lastAttemptAt =
        categoryAttempts.length > 0 ? categoryAttempts[0]?.timestamp ?? null : null;
      const staleBoost = lastAttemptAt
        ? Math.min(3, Math.floor((now - lastAttemptAt) / DAY_IN_MS))
        : 3;
      const accuracyPenalty =
        accuracy === null ? 2 : Math.max(0, Math.round((0.75 - accuracy) * 10));
      const score =
        reviewCount * 5 +
        recentMistakes * 4 +
        unattemptedCount * 2 +
        accuracyPenalty +
        staleBoost;

      return {
        category,
        score,
        reviewCount,
        recentMistakes,
        recentAttempts: recentAttempts.length,
        accuracy: accuracy === null ? null : roundPercent(accuracy),
        unattemptedCount,
        lastAttemptAt,
      };
    })
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      if (right.reviewCount !== left.reviewCount) {
        return right.reviewCount - left.reviewCount;
      }

      return left.category.localeCompare(right.category);
    });

  const focusCategory = priorities[0]?.category ?? quizQuestions[0]?.category ?? "Storage";
  const rankedQuestions = buildQuestionSequence(
    quizQuestions,
    priorities,
    attempts,
    reviews,
  );
  const nextQuestionId = rankedQuestions[0]?.id ?? quizQuestions[0]?.id ?? "";
  const focusPriority = priorities[0];
  const recommendation: StudyRecommendation = {
    focusCategory,
    nextQuestionId,
    quizHref: buildQuizHref(nextQuestionId),
    reviewHref: "/review",
    comparisonsHref: "/comparisons",
    reason: formatReason(
      focusCategory,
      focusPriority?.reviewCount ?? 0,
      focusPriority?.recentMistakes ?? 0,
    ),
  };

  const totalAttempts = attempts.length;
  const overallCorrect = attempts.filter((attempt) => attempt.isCorrect).length;
  const reviewedToday = reviews.filter(
    (review) => now - review.timestamp < DAY_IN_MS,
  ).length;
  const recentMistakes = attempts.filter(
    (attempt) => !attempt.isCorrect && attempt.timestamp >= recentThreshold,
  ).length;
  const activeDays = Array.from(
    new Set(
      attempts.map((attempt) =>
        new Date(attempt.timestamp).toISOString().slice(0, 10),
      ),
    ),
  ).sort((left, right) => right.localeCompare(left));

  let streakDays = 0;
  let cursor = new Date(now);

  while (true) {
    const key = cursor.toISOString().slice(0, 10);

    if (!activeDays.includes(key)) {
      break;
    }

    streakDays += 1;
    cursor = new Date(cursor.getTime() - DAY_IN_MS);
  }

  return {
    priorities,
    recommendation,
    totalAttempts,
    overallAccuracy:
      totalAttempts === 0 ? 0 : Math.round((overallCorrect / totalAttempts) * 100),
    reviewedToday,
    recentMistakes,
    streakDays,
  };
}

export function buildPrioritizedQuestionOrder(forcedQuestionId?: string) {
  const attempts = readQuizAttempts();
  const reviews = readReviewRecords();
  const analytics = buildStudyAnalytics();

  return buildQuestionSequence(
    quizQuestions,
    analytics.priorities,
    attempts,
    reviews,
    forcedQuestionId,
  );
}
