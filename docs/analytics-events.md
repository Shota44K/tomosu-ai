# Analytics Event Catalog (GA4 / Google Ads)

このドキュメントは、本サイトに実装したカスタムイベントの一覧と、計測の意図・Google 広告での活用方針をまとめたものです。イベントは GA4 と GTM(dataLayer) に送信され、Google 広告では Primary/Secondary のレイヤーで活用します。

## 実装の概要
- 共通ユーティリティ: `src/lib/analytics.ts:1`
  - `track(event, params)`: GA4 送信 + `dataLayer.push({ event, ...params })`
  - `sendAdsConversion(label, params)`: Google 広告のコンバージョン送信（Primary）
  - `observeSectionOnce(selector, ...)`: セクション初回 in-view 計測
  - `trackOnce(key, ...)`: 1回だけ送信したいイベント用
- スクロール深度: `src/lib/useScrollDepth.ts:1`（トップページで1度だけ有効化）
- セクション到達は `app/page.tsx:1` で `observeSectionOnce('#hero' など)` を一括設定

## 運用ポリシー
- Primary（最重要・入札指標）
  - Google 広告コンバージョン「送信完了（Lead）」のみ維持
  - 実装: `sendAdsConversion('2eKMCJO02q8bEPnk5-ZB', { value, currency })` を送信成功時に実行（`components/home/ContactForm.tsx:1`）
- Secondary（学習補助・分析）
  - 本ドキュメント記載の Micro イベントを GA4 へ送信 → Google 広告へ二次コンバージョンとしてインポート
  - まずは可視化用として利用し、十分な実績が貯まってから入札に組み込み

## 命名とパラメータの原則
- 命名: snake_case。クリックは `cta_click` / ナビは `nav_click` / 到達は `section_view`
- 共通パラメータ例
  - `location`: クリック位置（'header' | 'hero' | 'usecases' | 'pricing' | 'faq' | 'cta' | 'process' など）
  - `id`: セクションID（'hero' 'usecases' 'solutions' 'process' 'pricing' 'faq' 'contact'）
  - `to`/`href`: 遷移先フラグメントやURL
  - `variant`: セグメントやABバリアント（例: 'core' | 'usecase' | 'default'）

---

## セクション別イベント一覧

### Header（ヘッダー） — `components/layout/Header.tsx:1`
- `nav_click` { location:'header', to }
  - 目的: ナビゲーションの利用状況と導線貢献を把握
  - Ads意義: 上部ナビの関与度（補助）
- `cta_click` { location:'header', to:'#contact' }
  - 目的: ヘッダーCTAのクリック意欲を計測（Micro）
  - Ads意義: ヘッダーCTAの貢献度比較

### Hero（ヒーロー） — `components/home/Hero.tsx:1`
- `section_view` { id:'hero' }（in-view）
  - 目的: ファーストビューの到達（実表示）
  - Ads意義: トップ到達は母数確認（比較用）
- `cta_click` { location:'hero', variant, href }
  - 目的: ヒーローCTAの意欲計測。セグメント別の効き比較
  - Ads意義: 入口での関与度の強さを把握
- `seg_impression` { variant:'core'|'usecase'|'default' }
  - 目的: 出し分け（セグメント）の露出ログ
  - Ads意義: セグメント×CTAの相性比較

### UseCases（事例） — `components/home/UseCases.tsx:1`
- `section_view` { id:'usecases' }
  - 目的: 事例セクション到達
  - Ads意義: 中部スクロール帯の関与度
- `usecase_card_click` { title, industry }
  - 目的: 事例カードへの興味（どの業界/タイトルが効くか）
  - Ads意義: 訴求素材最適化の根拠
- `cta_click` { location:'usecases', to:'#contact' }
  - 目的: 事例からフォームCTAへ遷移意欲
  - Ads意義: 事例 → CV 行動の接続力

### Solutions（頻出課題と強み） — `components/home/ProblemsAndSolutions.tsx:1`
- `section_view` { id:'solutions' }
  - 目的: ソリューション情報への到達
  - Ads意義: 価値訴求の到達率
- `accordion_open` { section:'solutions', id:'p1|p2|p3' }
  - 目的: 詳細展開の関心度計測
  - Ads意義: どの課題/強みに関心が高いか

### Process（導入プロセス） — `components/home/Process.tsx:1`
- `section_view` { id:'process' }
  - 目的: プロセス到達
- `process_step_open` { step:'STEP 1|2|3' }
  - 目的: モバイルのステップ詳細展開
  - Ads意義: 検討深度を示すシグナル
- `cta_click` { location:'process', to:'#contact' }
  - 目的: プロセス理解後のCTA意欲

### Pricing（価格） — `components/home/Pricing.tsx:1`
- `section_view` { id:'pricing' }
  - 目的: 価格エリア到達（強い意欲の前兆）
- `cta_click` { location:'pricing', to:'#contact' }
  - 目的: 価格確認後のCTA意欲
  - Ads意義: 見積もり志向の強さ

### FAQ — `components/home/FAQ.tsx:1`
- `section_view` { id:'faq' }
  - 目的: FAQ到達
- `accordion_open` { section:'faq', index }
  - 目的: 具体的な疑問点（閲覧）を把握
  - Ads意義: 不安/疑問の傾向。改善候補抽出
- `cta_click` { location:'faq', to:'#contact' }
  - 目的: FAQ確認後のCTA意欲

### Contact（お問い合わせフォーム） — `components/home/ContactForm.tsx:1`
- `section_view` { id:'contact' }（in-view）
  - 目的: フォーム到達
- `form_visible` { id:'contact' }（1回のみ）
  - 目的: UI露出のログ（描画完了ベース）
- `form_start` { section:'contact' }（初回フォーカス時）
  - 目的: 入力開始の意欲指標
- `consultation_type_select` { value:'proposal'|'trial'|'other' }
  - 目的: 相談種別の選好
- `form_submit_start` { section:'contact' }
  - 目的: 送信試行の計測
- `form_validation_error` { fields:[...names] }
  - 目的: バリデーションNG箇所の特定（摩擦点の発見）
- `recaptcha_error` { message, action }
  - 目的: reCAPTCHA 由来の失敗要因を切り分け
- `form_submit_fail` { section:'contact' }
  - 目的: 送信失敗（ネットワーク/サーバ等）
- `form_submit_success` { section:'contact' }
  - 目的: 送信成功（Micro）。直後に Primary コンバージョンを送信
- Primary Conversion（Google 広告）
  - `sendAdsConversion('2eKMCJO02q8bEPnk5-ZB', { value:1.0, currency:'JPY' })`
  - dataLayer にも診断用として `ads_conversion` を push（GTMで拾う用）

### Mobile Sticky CTA — `components/common/MobileStickyCta.tsx:1`
- `sticky_cta_show` { seg, path }
  - 目的: スティッキーの露出
- `sticky_cta_hide` { reason, seg, path }
  - 目的: 非表示理由（'hero_in_view'|'contact_in_view'|'footer_in_view'|'form_focus'|'keyboard'）
  - Ads意義: 表示ロジックの妥当性検証・改善
- `sticky_cta_click` { seg, href }
  - 目的: モバイル固定CTAのクリック意欲

### Footer（フッター） — `components/layout/Footer.tsx:1`
- `nav_click` { location:'footer', to }
  - 目的: フッター経由の導線貢献

### Global（全ページ共通）
- `scroll_depth` { percent:25|50|75|100 } — `src/lib/useScrollDepth.ts:1`
  - 目的: 行動深度（スクロールのしきい値到達）
  - Ads意義: 読了度とセクション到達の関係を把握

---

## Google 広告での使い方（推奨）
- Primary: 既存の「送信完了（Lead）」のみ（入札対象）
- Secondary: 本ドキュメントの Micro イベントを GA4 → Google 広告へインポート（まずはレポート用途）

## 改善に使える読み方（例）
- CTA効率: `cta_click` を location 別に比較（hero/pricing/usecases/faq/process）
- セグメント効き: `seg_impression` × `cta_click` / `form_start` 比率
- フォーム摩擦: `form_start → form_submit_start → form_submit_success` で離脱箇所特定。`form_validation_error.fields` の頻出を改善
- 深度と質: `section_view(pricing/contact)` 到達者 × `scroll_depth` の関係で配置最適化
- 事例寄与: `usecase_card_click` → `form_start` の遷移率

## 実装ファイル（参照）
- 共通: `src/lib/analytics.ts:1`, `src/lib/useScrollDepth.ts:1`
- ルート: `app/page.tsx:1`
- Header: `components/layout/Header.tsx:1`
- Hero: `components/home/Hero.tsx:1`
- UseCases: `components/home/UseCases.tsx:1`
- Solutions: `components/home/ProblemsAndSolutions.tsx:1`
- Process: `components/home/Process.tsx:1`
- Pricing: `components/home/Pricing.tsx:1`
- FAQ: `components/home/FAQ.tsx:1`
- ContactForm: `components/home/ContactForm.tsx:1`
- MobileStickyCta: `components/common/MobileStickyCta.tsx:1`
- Footer: `components/layout/Footer.tsx:1`

以上。イベント追加時は命名規約（snake_case）・最低限の共通パラメータ（location / id / value 等）を踏襲してください。

