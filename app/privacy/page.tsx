import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | tomosu-AI",
  description:
    "tomosu-AIのプライバシーポリシーページです。個人情報の定義や利用目的、安全管理措置などの取扱い方針を定めています。",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-full bg-white text-text">
      <main>
        <section className="bg-primary text-white">
          <div className="mx-auto max-w-6xl px-4 pt-20 pb-10 sm:px-6 md:px-8 lg:px-12">
            <h1 className="mt-4 text-3xl font-bold md:text-4xl">プライバシーポリシー</h1>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:px-8 lg:px-12">
            <p className="text-sm leading-relaxed text-text/80">
              tomosu-AI（以下、「当事業」といいます。）は、当事業が運営するウェブサイト（以下、「本サイト」といいます。）で提供するサービスにおける、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
            </p>

            <div className="mt-10 space-y-10 text-sm leading-relaxed text-text">
              <section>
                <h2 className="text-lg font-semibold text-primary">第1条（個人情報）</h2>
                <p className="mt-4">
                  「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報及び容貌、指紋、声紋にかかるデータ、及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-primary">第2条（個人情報の収集方法）</h2>
                <p className="mt-4">
                  当事業は、ユーザーが本サイトのお問い合わせフォームまたは無料相談のお申し込みフォームを利用する際に、会社名、氏名、電話番号、メールアドレスといった個人情報をお尋ねします。
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-primary">第3条（個人情報を収集・利用する目的）</h2>
                <p className="mt-4">当事業が個人情報を収集・利用する目的は、以下のとおりです。</p>
                <ol className="mt-4 space-y-2 pl-5 marker:text-primary list-decimal">
                  <li>当事業が提供するカスタムAI開発サービスに関するご提案、お見積もりのため</li>
                  <li>ユーザーからのお問い合わせや無料相談に対応するため（本人確認を行うことを含む）</li>
                  <li>当事業のサービスに関する新機能、更新情報、キャンペーン等のご案内のため</li>
                  <li>メンテナンス、重要なお知らせなど必要に応じたご連絡のため</li>
                  <li>上記の利用目的に付随する目的</li>
                </ol>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-primary">第4条（利用目的の変更）</h2>
                <ol className="mt-4 space-y-2 pl-5 marker:text-primary list-decimal">
                  <li>当事業は、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。</li>
                  <li>利用目的の変更を行った場合には、変更後の目的について、当事業所定の方法により、ユーザーに通知し、または本サイト上に公表するものとします。</li>
                </ol>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-primary">第5条（個人情報の第三者提供）</h2>
                <ol className="mt-4 space-y-2 pl-5 marker:text-primary list-decimal">
                  <li>
                    当事業は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。
                    <ol className="mt-3 space-y-2 pl-5 marker:text-primary list-decimal">
                      <li>人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき</li>
                      <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき</li>
                      <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき</li>
                    </ol>
                  </li>
                  <li>
                    前項の定めにかかわらず、次に掲げる場合には、当該情報の提供先は第三者に該当しないものとします。
                    <ol className="mt-3 space-y-2 pl-5 marker:text-primary list-decimal">
                      <li>当事業が利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合（※注：Netlify FormsなどのBaaS利用やクラウドサービスの利用がこれに該当します）</li>
                      <li>合併その他の事由による事業の承継に伴って個人情報が提供される場合</li>
                    </ol>
                  </li>
                </ol>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-primary">第6条（個人情報の開示、訂正、利用停止等）</h2>
                <ol className="mt-4 space-y-2 pl-5 marker:text-primary list-decimal">
                  <li>当事業は、本人から個人情報の開示を求められたときは、本人に対し、遅滞なくこれを開示します。</li>
                  <li>ユーザーは、当事業の保有する自己の個人情報が誤った情報である場合には、当事業が定める手続きにより、当事業に対して個人情報の訂正、追加または削除（以下、「訂正等」といいます。）を請求することができます。</li>
                  <li>当事業は、本人から、個人情報が利用目的の範囲を超えて取り扱われているという理由、または不正の手段により取得されたものであるという理由により、その利用の停止または消去（以下、「利用停止等」といいます。）を求められた場合には、遅滞なく必要な調査を行い、その結果に基づき、個人情報の利用停止等を行い、その旨を本人に通知します。</li>
                </ol>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-primary">第7条（安全管理措置）</h2>
                <p className="mt-4">
                  当事業は、取り扱う個人情報の漏えい、滅失または毀損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます。講じる措置の主な内容は以下の通りです。
                </p>
                <ol className="mt-4 space-y-2 pl-5 marker:text-primary list-decimal">
                  <li>
                    <span className="font-semibold">組織的安全管理措置：</span>
                    個人情報の取扱いに関する責任者を設置し、個人情報を取り扱う従業者及び当該従業者が取り扱う個人情報の範囲を明確化します。
                  </li>
                  <li>
                    <span className="font-semibold">技術的安全管理措置：</span>
                    個人情報へのアクセス管理を実施し、担当者及び取り扱う個人情報データベース等の範囲を限定します。また、個人情報を取り扱う情報システムを外部からの不正アクセス又は不正ソフトウェアから保護する仕組みを導入します。
                  </li>
                </ol>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-primary">第8条（Cookie（クッキー）の使用について）</h2>
                <p className="mt-4">
                  本サイトでは、アクセス解析や広告配信の目的でCookieを使用することがあります。Cookieとは、サイトにアクセスした際にブラウザに保存される情報ですが、氏名やメールアドレス等の個人情報は含まれません。
                  ユーザーは、ブラウザの設定によりCookieを無効にすることが可能です。
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-primary">第9条（プライバシーポリシーの変更）</h2>
                <p className="mt-4">
                  本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく、変更することができるものとします。当事業が別途定める場合を除いて、変更後のプライバシーポリシーは、本サイトに掲載したときから効力を生じるものとします。
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-primary">第10条（お問い合わせ窓口）</h2>
                <div className="mt-4 space-y-1">
                  <p>本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。</p>
                  <p>事業者名： tomosu-AI</p>
                  <p>代表者： 甲浦 翔太</p>
                  <p>連絡先： shota.koura@tomosu-ai.com</p>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
