# SAA Learning App — Claude Code 引き継ぎドキュメント

## このアプリの目的

AWS SAA（Solutions Architect Associate）試験の学習を支援するWebアプリ。
問題演習・用語確認・サービス比較・弱点復習を1つのアプリで完結できる。

---

## 技術スタック

| 項目 | 内容 |
|------|------|
| フレームワーク | Next.js 13 (App Router) |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS |
| データ永続化 | localStorage のみ（外部API・DBなし） |
| フォント | Space Grotesk（見出し）+ Noto Sans JP（本文） |
| テーマ | ダークモード固定（`dark` クラス、bg-slate-950 ベース） |

---

## 画面構成（ルーティング）

```
/               → ホームダッシュボード（弱点カテゴリ・進捗・今日の推奨）
/quiz           → 問題演習（?questionId=xxx で特定問題から開始可）
/review         → 復習ボード（誤答リスト・解き直し）
/terms          → 用語集（AWS用語カード一覧）
/comparisons    → サービス比較表（EC2 vs Lambda など）
```

---

## ディレクトリ構成

```
app/
  layout.tsx          # ルートレイアウト（AppShell・フォント設定）
  globals.css         # グローバルスタイル
  page.tsx            # / → HomeDashboard
  quiz/page.tsx       # /quiz → QuizExperience
  review/page.tsx     # /review → ReviewBoard
  terms/page.tsx      # /terms → TermCard一覧
  comparisons/page.tsx# /comparisons → ComparisonCard一覧

components/
  layout/
    app-shell.tsx           # 全画面共通ラッパー
    top-context-bar.tsx     # 上部ナビ（デスクトップ）
    mobile-bottom-nav.tsx   # 下部ナビ（モバイル）
  home/
    home-dashboard.tsx      # ホーム全体コンポーネント
    home-hero.tsx           # ヒーローセクション（ストリーク・正解率）
    learning-paths.tsx      # 学習パス一覧
    progress-overview.tsx   # カテゴリ別進捗
    today-focus.tsx         # 今日の推奨アクション
  quiz/
    quiz-experience.tsx     # クイズ全体コンポーネント
    quiz-header.tsx         # 進捗バー・正解率表示
    quiz-question-card.tsx  # 問題文カード
    quiz-options.tsx        # 選択肢一覧
    quiz-option-card.tsx    # 各選択肢カード
    quiz-feedback-panel.tsx # 回答後の解説パネル
    quiz-footer-actions.tsx # 次へ・復習マークボタン
  review/
    review-board.tsx        # 復習ボード全体
  study/
    term-card.tsx           # 用語カード
    comparison-card.tsx     # 比較カード
  ui/                       # 汎用UIコンポーネント
    action-link.tsx
    feature-hub.tsx
    placeholder-screen.tsx
    progress-bar.tsx
    section-frame.tsx
    status-chip.tsx

lib/
  navigation.ts             # ナビゲーション定義（AppNavItem[]）
  quiz/
    data.ts                 # 問題データ（QuizQuestion[]）
    types.ts                # 型定義
    use-quiz-session.ts     # クイズセッションhook
  review/
    storage.ts              # 復習データのlocalStorage CRUD
    types.ts                # ReviewRecord型
  study/
    analytics.ts            # 弱点分析・問題優先順位計算
    comparisons.ts          # 比較データ（ComparisonItem[]）
    config.ts               # 分析パラメータ設定
    storage.ts              # 回答履歴のlocalStorage CRUD
    terms.ts                # 用語データ（StudyTerm[]）
    types.ts                # 型定義
  home/
    home-data.ts            # ホームスナップショット生成
    types.ts                # HomeSnapshot型
    use-home-dashboard.ts   # ホームデータhook
```

---

## データフロー

```
問題回答
  → appendQuizAttempt() → localStorage["saa-quiz-attempts"]
  → （不正解なら）upsertReviewRecord() → localStorage["saa-review-records"]
  → CustomEvent("saa-study-sync") 発火
  → 各hookがリスナーで受けてstateを更新
```

---

## localStorageキー一覧

| キー | 内容 |
|------|------|
| `saa-quiz-attempts` | 回答履歴（最大120件）QuizAttemptRecord[] |
| `saa-review-records` | 復習キューの誤答リスト ReviewRecord[] |

---

## 問題優先順位アルゴリズム（analytics.ts）

弱点カテゴリを以下のスコアで優先順位付けし、問題の出題順を決定する：

- 復習キューにある問題数 × weight
- 直近の誤答数 × weight
- 未挑戦問題数 × weight
- 精度ペナルティ（低正解率カテゴリを優先）
- 経過日数ボーナス（久しぶりのカテゴリを優先）

---

## 現在の問題数・データ量

| データ | 件数 | ファイル |
|--------|------|----------|
| クイズ問題 | 200問 | `lib/quiz/data.ts` |
| 用語 | 150件 | `lib/study/terms.ts` |
| 比較表 | 30件 | `lib/study/comparisons.ts` |
| SVG 構成図 | 5個 | `lib/study/term-diagrams.ts` |

---

## 作り直しの方針（優先度順）

### 1. 機能追加・拡張
- [x] クイズ問題を大幅に増やす（200問達成）
- [x] 用語・比較データの追加（用語150件・比較表30件達成）
- [ ] 学習進捗の可視化強化（グラフ・カレンダーヒートマップなど）
- [ ] 問題フィルター機能（カテゴリ絞り込み・未挑戦のみなど）

### 2. コードリファクタリング
- [ ] コンポーネントの責務分割を整理
- [ ] 型定義の統一・整理
- [ ] localStorageアクセスの抽象化層を強化

### 3. デザイン改善
- [ ] モバイル表示の最適化
- [ ] アニメーション・トランジションの追加
- [ ] 正解・不正解時のフィードバック強化

---

## 開発サーバー起動

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## 注意事項

- `"use client"` が必要なコンポーネントが多い（localStorage・useState使用）
- SSR時はlocalStorageにアクセスできないため、`isBrowser()` チェックが必要
- `STUDY_SYNC_EVENT` カスタムイベントでタブ間・コンポーネント間のデータ同期を実現している
- Tailwindクラスは `dark:` prefix不使用（全画面ダークモード固定）

---

## 注意事項（過去のトラブルから）

- `next.config.js` の CSP 設定を変更するときは開発モードで動作確認してからコミットすること
  （`unsafe-eval` がないと開発モードで webpack の eval() がブロックされ、クリックが一切効かなくなる）
- UI の大きな変更はコミットしてからマージすること
  （未コミットのまま `git restore` や `git reset --hard` すると変更がすべて消える）
- 機能変更後は必ず `/roadmap`・`/quiz`・`/terms` の 3 画面で動作確認してからマージすること
