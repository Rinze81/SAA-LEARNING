import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });
});

test('「この説明を検証する」ボタンが存在すること', async ({ page }) => {
  await page.goto('/terms');

  // 最初の用語カードを開く（ヘッダーボタンをクリック）
  const firstCard = page.locator('article').first();
  await firstCard.locator('button[aria-expanded]').click();

  // 検証ボタンが表示されること
  const verifyBtn = firstCard.getByRole('button', { name: 'この説明を検証する' });
  await expect(verifyBtn).toBeVisible();
});

test('検証ボタンをクリックすると「検証中...」が表示されること', async ({ page }) => {
  // APIレスポンスを遅延させて「検証中...」状態を確認できるようにする
  await page.route('/api/verify-term', async (route) => {
    // 500ms 遅延後に応答（テスト中に「検証中...」を確認するため）
    await new Promise((resolve) => setTimeout(resolve, 500));
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'correct',
        summary: 'テスト用の正確な説明',
        details: 'テスト用の詳細説明です。',
        officialNote: 'テスト用の確認ポイントです。',
      }),
    });
  });

  await page.goto('/terms');

  // 最初の用語カードを開く
  const firstCard = page.locator('article').first();
  await firstCard.locator('button[aria-expanded]').click();

  // 検証ボタンをクリック
  const verifyBtn = firstCard.getByRole('button', { name: 'この説明を検証する' });
  await expect(verifyBtn).toBeVisible();
  await verifyBtn.click();

  // 「検証中...」が表示されること
  await expect(firstCard.getByText('検証中...')).toBeVisible();
});
