import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
});

test('模擬試験の開始フロー', async ({ page }) => {
  await page.goto('/mock-exam');

  // スタート画面が表示されていること
  await expect(page.getByText('本番形式で腕試し')).toBeVisible();

  // 「試験開始」ボタンをクリックすると試験画面に遷移すること
  await page.getByRole('button', { name: '試験開始' }).click();

  // タイマーが表示されていること（m:ss 形式）
  const timer = page.locator('span').filter({ hasText: /^\d+:\d{2}$/ });
  await expect(timer).toBeVisible();

  // 問題番号「問題 1 / 65」が表示されていること
  await expect(page.getByText(/問題\s+1\s*\/\s*65/)).toBeVisible();

  // 選択肢が4つ表示されていること（各選択肢は A/B/C/D ラベルのspanを持つbutton）
  const choices = page.locator('button').filter({
    has: page.locator('span', { hasText: /^[A-D]$/ }),
  });
  await expect(choices).toHaveCount(4);
});
