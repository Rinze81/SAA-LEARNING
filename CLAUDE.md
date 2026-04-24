# SAA Learning App — Claude Code 引き継ぎドキュメント

## 技術スタック

| 項目           | 内容                                                   |
| -------------- | ------------------------------------------------------ |
| フレームワーク | Next.js 13 (App Router)                                |
| 言語           | TypeScript                                             |
| スタイリング   | Tailwind CSS                                           |
| データ永続化   | localStorage のみ（外部API・DBなし）                   |
| テーマ         | ダークモード固定（`dark` クラス、bg-slate-950 ベース） |

---

## 画面構成

| パス           | 内容                    |
| -------------- | ----------------------- |
| `/`            | ホームダッシュボード    |
| `/quiz`        | 問題演習                |
| `/review`      | 復習ボード              |
| `/terms`       | 用語集                  |
| `/comparisons` | サービス比較表          |
| `/roadmap`     | 学習ロードマップ        |
| `/mock-exam`   | 模擬試験（65問・130分） |

---

## データ件数

| データ         | 件数  |
| -------------- | ----- |
| クイズ問題     | 250問 |
| 用語           | 150件 |
| 比較表         | 30件  |

---

## localStorageキー一覧

| キー                 | 内容                           |
| -------------------- | ------------------------------ |
| `saa-quiz-attempts`  | 回答履歴（最大120件）          |
| `saa-review-records` | 復習キューの誤答リスト         |
| `saa-roadmap-read`   | ロードマップ既読トピックID     |
| `mockExamResults`    | 模擬試験の結果履歴（最大10件） |

sessionStorage:
| キー | 内容 |
|------|------|
| `mockExamSession` | 模擬試験の進行中セッション |

---

## 注意事項

- `"use client"` が必要なコンポーネントが多い（localStorage・useState使用）
- SSR時はlocalStorageにアクセス不可。`isBrowser()` チェックを忘れずに
- `next.config.js` のCSP設定変更時は開発モードで動作確認してからコミット
  （`unsafe-eval` がないと開発モードでwebpackのeval()がブロックされクリックが効かなくなる）
- 機能変更後は必ず `/quiz`・`/terms`・`/roadmap` の3画面で動作確認してからマージ
- UI の大きな変更はコミットしてからマージすること
  （未コミットのまま `git restore` や `git reset --hard` すると変更がすべて消える）

---

## ブランチ・マージワークフロー

- 作業は必ず `feature/xxx` ブランチで行う
- `main` への直接コミットは禁止

### 「マージして」と指示された場合、以下を自動実行する

```bash
npm run build          # エラーがないことを確認
git checkout main
git merge feature/xxx
git push origin main
```

完了後、マージ完了とVercelデプロイURL（https://saa-learning.vercel.app）を報告する。

### 次のブランチを作成する場合

```bash
git checkout main
git checkout -b feature/新しいブランチ名
```
