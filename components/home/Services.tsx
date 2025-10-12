export default function Services() {
  return (
    <section id="services" className="bg-base">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="text-2xl font-bold text-primary md:text-3xl">
          「効果を確認してから、投資を決める AIシステム開発」
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <article className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-primary">
              試作品AIシステム開発（無償）について
            </h3>
            <dl className="mt-4 space-y-3 text-sm text-text/80">
              <div>
                <dt className="font-semibold text-text">目的</dt>
                <dd>
                  投資ご判断の前に、AIが本当に自社の課題解決に役立つのかを、実際に動く「試作品AIシステム」にてご判断いただけます。
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-text">期間</dt>
                <dd>約1か月（最短4週間）</dd>
              </div>
              <div>
                <dt className="font-semibold text-text">ご提供内容</dt>
                <dd className="space-y-1">
                  <p>課題ヒアリングと、最も効果的なユースケース1件の選定</p>
                  <p>貴社の実データ（一部）を活用したAI試作品の開発</p>
                  <p>効果測定（KPI）のための評価設計</p>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-text">本プランに含まれないもの</dt>
                <dd className="space-y-1">
                  <p>独自のデザインを施した大規模なUI開発</p>
                  <p>基幹システムとの大規模なデータ連携</p>
                  <p>AIの学習に必要な大規模なデータ整備・クレンジング作業</p>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-text">お客様にご協力いただくこと</dt>
                <dd className="space-y-1">
                  <p>週1回程度（1時間）のオンラインでのお打ち合わせ</p>
                  <p>
                    AIが学習・参考にするためのデータと評価用データのご準備とご提供（範囲は事前協議）
                  </p>
                </dd>
              </div>
            </dl>
          </article>
          <article className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-primary">本開発・運用について</h3>
            <div className="mt-4 space-y-4 text-sm text-text/80">
              <div>
                <h4 className="font-semibold text-text">ご契約後の流れ</h4>
                <p>
                  試作品AIシステムで効果を実感いただけた後、ご契約となります。要件定義から設計、開発、テスト、そして運用開始まで、一貫してサポートします。
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-text">本開発に含まれる主な成果物</h4>
                <ul className="mt-2 space-y-1">
                  <li>要件定義書、評価設計書</li>
                  <li>結合テスト、受入テスト計画・報告書</li>
                  <li>運用状況を可視化するダッシュボード（初期版）</li>
                  <li>運用ルールを定めた規程類</li>
                  <li>従業員向け研修（2回）</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-text">保守・運用サポート</h4>
                <p>
                  システム公開後も、安定稼働のための保守や、ビジネス環境の変化に応じた機能改善などを、月額制のサポート（別途お見積り）にてご支援します。
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
