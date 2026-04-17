import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
});

test('フィルターバーが表示されていること', async ({ page }) => {
  await page.goto('/quiz');

  // 「絞り込み」ラベルが見えること
  await expect(page.getByText('絞り込み')).toBeVisible();

  // 「すべて」カテゴリボタンが存在すること
  await expect(page.getByRole('button', { name: /すべて/ })).toBeVisible();

  // 「未挑戦のみ」トグルが存在すること
  await expect(page.getByRole('button', { name: '未挑戦のみ' })).toBeVisible();

  // 「復習リストのみ」トグルが存在すること
  await expect(page.getByRole('button', { name: '復習リストのみ' })).toBeVisible();

  // 「対象：XX問」バッジが表示されること
  await expect(page.getByTestId('filtered-count')).toBeVisible();
  await expect(page.getByTestId('filtered-count')).toContainText('対象：');
});

test('カテゴリボタンをクリックすると選択状態になること', async ({ page }) => {
  await page.goto('/quiz');

  // フィルターバーが表示されるまで待つ
  await expect(page.getByText('絞り込み')).toBeVisible();

  // 「すべて」以外の最初のカテゴリボタンを取得（2番目のボタン）
  const categoryButtons = page.locator('button').filter({ hasText: /^(?!すべて|未挑戦のみ|復習リストのみ).+\d+$/ });
  const firstCategoryBtn = categoryButtons.first();
  const categoryName = await firstCategoryBtn.textContent();

  // クリック
  await firstCategoryBtn.click();

  // ボタンが選択状態になること（背景が変わる: bg-slate-700 クラスを持つ）
  await expect(firstCategoryBtn).toHaveClass(/bg-slate-700/);

  // 「すべて」ボタンが選択状態でなくなること
  const allBtn = page.getByRole('button', { name: /すべて/ });
  await expect(allBtn).not.toHaveClass(/bg-slate-700/);

  console.log(`Selected category: ${categoryName}`);
});

test('「対象：XX問」の表示がカテゴリ選択で変わること', async ({ page }) => {
  await page.goto('/quiz');

  await expect(page.getByText('絞り込み')).toBeVisible();

  // 全カテゴリ時の件数を取得
  const countBadge = page.getByTestId('filtered-count');
  const allCountText = await countBadge.textContent();
  const allCount = parseInt(allCountText?.match(/\d+/)?.[0] ?? '0', 10);

  // 全カテゴリ時は1問以上あること
  expect(allCount).toBeGreaterThan(0);

  // カテゴリボタンをクリック（すべて以外の最初のカテゴリ）
  const categoryButtons = page.locator('button').filter({ hasText: /^(?!すべて|未挑戦のみ|復習リストのみ).+\d+$/ });
  await categoryButtons.first().click();

  // 件数が全件より少なくなること
  await expect(countBadge).not.toContainText(`対象：${allCount}問`);
  const newCountText = await countBadge.textContent();
  const newCount = parseInt(newCountText?.match(/\d+/)?.[0] ?? '0', 10);
  expect(newCount).toBeGreaterThan(0);
  expect(newCount).toBeLessThan(allCount);
});

test('「すべて」に戻すと全問題が対象になること', async ({ page }) => {
  await page.goto('/quiz');

  await expect(page.getByText('絞り込み')).toBeVisible();

  // 全カテゴリ時の件数を先に記録
  const countBadge = page.getByTestId('filtered-count');
  const allCountText = await countBadge.textContent();
  const allCount = parseInt(allCountText?.match(/\d+/)?.[0] ?? '0', 10);
  expect(allCount).toBeGreaterThan(0);

  // カテゴリを選択（件数が減る）
  const categoryButtons = page.locator('button').filter({ hasText: /^(?!すべて|未挑戦のみ|復習リストのみ).+\d+$/ });
  await categoryButtons.first().click();
  await expect(countBadge).not.toContainText(`対象：${allCount}問`);

  // 「すべて」に戻す
  await page.getByRole('button', { name: /すべて/ }).click();

  // 元の全件数に戻ること
  await expect(countBadge).toContainText(`対象：${allCount}問`);

  // 「すべて」ボタンが選択状態になること
  await expect(page.getByRole('button', { name: /すべて/ })).toHaveClass(/bg-slate-700/);
});

test('?category=xxx URLパラメータでカテゴリが初期選択されること', async ({ page }) => {
  // まず存在するカテゴリ名を確認するため /quiz を開く
  await page.goto('/quiz');
  await expect(page.getByText('絞り込み')).toBeVisible();

  const categoryButtons = page.locator('button').filter({ hasText: /^(?!すべて|未挑戦のみ|復習リストのみ).+\d+$/ });
  const firstBtn = categoryButtons.first();
  const rawText = await firstBtn.textContent() ?? '';
  // ボタンテキストは "カテゴリ名XX" 形式。末尾の数字を除去してカテゴリ名を取得
  const categoryName = rawText.replace(/\s*\d+$/, '').trim();

  // ?category=xxx でアクセス
  await page.goto(`/quiz?category=${encodeURIComponent(categoryName)}`);
  await expect(page.getByText('絞り込み')).toBeVisible();

  // 対応カテゴリボタンが選択状態になっていること
  const targetBtn = page.getByRole('button', { name: new RegExp(categoryName) }).first();
  await expect(targetBtn).toHaveClass(/bg-slate-700/);

  // 件数が全件より少ないこと
  const countBadge = page.getByTestId('filtered-count');
  const countText = await countBadge.textContent();
  const count = parseInt(countText?.match(/\d+/)?.[0] ?? '0', 10);
  expect(count).toBeGreaterThan(0);
  expect(count).toBeLessThan(200);
});
