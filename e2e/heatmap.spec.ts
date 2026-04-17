import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });
});

test('ホーム画面にヒートマップが表示されること', async ({ page }) => {
  await page.goto('/');

  // ヒートマップコンテナが表示されること
  await expect(page.getByText('学習アクティビティ')).toBeVisible();
  await expect(page.getByText('過去90日の回答記録')).toBeVisible();
});

test('ヒートマップのセルが90個以上表示されること', async ({ page }) => {
  await page.goto('/');

  // セルは h-[14px] w-[14px] の div として描画される
  // 各週カラムの中の空でないセル（bg-slate-800 または bg-emerald-* クラス持つもの）
  await expect(page.getByText('学習アクティビティ')).toBeVisible();

  const cells = page.locator('.heatmap-scroll [class*="rounded-\\[3px\\]"]');
  const count = await cells.count();
  expect(count).toBeGreaterThanOrEqual(90);
});
