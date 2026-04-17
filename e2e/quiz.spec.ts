import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });
});

test('クイズの基本フロー', async ({ page }) => {
  await page.goto('/quiz');

  // SectionFrame eyebrow="選択肢" の p が完全一致する section 内の選択肢ボタンが4つあること
  const optionsSection = page.locator('section').filter({
    has: page.locator('p').filter({ hasText: /^選択肢$/ }),
  });
  const options = optionsSection.locator('button');
  await expect(options).toHaveCount(4);

  // 選択肢が描画されるのを待ってからクリック
  await expect(options.first()).toBeVisible();
  await options.first().click();

  // 「この回答で提出する」ボタンが有効になるまで待つ
  const submitBtn = page.getByRole('button', { name: 'この回答で提出する' });
  await expect(submitBtn).toBeEnabled({ timeout: 5000 });

  // 提出する
  await submitBtn.click();

  // 正解・不正解のフィードバックが表示されること
  const feedback = page.locator('text=/正解|不正解/');
  await expect(feedback.first()).toBeVisible();

  // 「次の問題へ」ボタンが表示されること
  const nextBtn = page.getByRole('button', { name: /次の問題へ|もう一周する/ });
  await expect(nextBtn).toBeVisible();

  // 「次の問題へ」をクリックすると次の問題に進めること（選択肢が再び4つ）
  await nextBtn.click();
  await expect(options).toHaveCount(4);
});
