"use client";

import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // ChunkLoadError はブラウザキャッシュの古いチャンクが原因。
    // 自動リロードで最新チャンクを取得して解決する。
    if (error.name === "ChunkLoadError") {
      window.location.reload();
    }
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-[1.75rem] border border-slate-800 bg-slate-950/70 p-8 text-center">
        <p className="text-sm font-medium text-slate-100">
          ページの読み込みに失敗しました
        </p>
        <p className="mt-2 text-xs leading-6 text-slate-500">
          {error.name === "ChunkLoadError"
            ? "最新バージョンに更新しています..."
            : "予期しないエラーが発生しました。"}
        </p>
        {error.name !== "ChunkLoadError" && (
          <button
            type="button"
            onClick={reset}
            className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-700 px-6 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:text-slate-100"
          >
            再試行する
          </button>
        )}
      </div>
    </main>
  );
}
