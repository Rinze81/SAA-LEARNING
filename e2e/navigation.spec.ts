import { test, expect } from '@playwright/test';

const pages = [
  { path: '/', name: 'ホーム' },
  { path: '/quiz', name: 'クイズ' },
  { path: '/review', name: '復習' },
  { path: '/terms', name: '用語集' },
  { path: '/comparisons', name: 'サービス比較' },
  { path: '/roadmap', name: 'ロードマップ' },
  { path: '/mock-exam', name: '模擬試験' },
];

for (const { path, name } of pages) {
  test(`${name} ページが正常に開ける (${path})`, async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.clear();
    });

    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    const response = await page.goto(path);

    expect(response?.status()).toBe(200);

    // エラー画面が出ていないことを確認（Next.js のエラーオーバーレイ不在）
    await expect(page.locator('body')).not.toContainText('Application error');
    await expect(page.locator('body')).not.toContainText('Internal Server Error');

    expect(errors).toHaveLength(0);
  });
}
