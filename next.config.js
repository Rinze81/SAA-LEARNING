/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === "development";

const securityHeaders = [
  // クリックジャッキング対策: iframe での埋め込みを全面禁止
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // MIME スニッフィング対策
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // リファラー情報の送信を同一オリジンのフルURLのみに制限
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // 不要なブラウザ機能へのアクセスを無効化
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // Content Security Policy
  // - このアプリは外部通信なし・localStorage のみ
  // - Next.js App Router はハイドレーション用インラインスクリプトを必要とする
  // - Tailwind CSS はインラインスタイルを使用する
  // - dangerouslySetInnerHTML で自作 SVG をレンダリングしている
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // 開発モード: webpack が eval() ベースのソースマップを使用するため unsafe-eval が必要
      // 本番モード: eval() 不要なので unsafe-eval は外す
      isDev
        ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
        : "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      // data: は SVG の img src 等に対応
      "img-src 'self' data:",
      // システムフォントのみ（Google Fonts は使用していない）
      "font-src 'self'",
      // 開発モード: HMR の WebSocket 接続を許可
      isDev ? "connect-src 'self' ws:" : "connect-src 'self'",
      // Flash 等のプラグインを全面禁止
      "object-src 'none'",
      // base タグインジェクション対策
      "base-uri 'self'",
      // frame-ancestors は X-Frame-Options の CSP 版（CSP Level 2 以上対応ブラウザ向け）
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
