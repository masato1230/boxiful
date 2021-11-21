import React from 'react';

export interface PrivacySet {
  title: string;
  content: JSX.Element;
}

const personalInformation: PrivacySet = {
  title: '個人情報',
  content: (
    <p>
      「個人情報」とは，個人情報保護法にいう「個人情報」を指すものとし，生存する個人に関する情報であって，当該情報に含まれる氏名，生年月日，住所，電話番号，連絡先その他の記述等により特定の個人を識別できる情報及び容貌，指紋，声紋にかかるデータ，及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。
    </p>
  ),
};

const meansOfCollectPersonalInformation: PrivacySet = {
  title: '個人情報の収集方法',
  content: (
    <p>
      当サイトは、ユーザーが利用登録をする際に、メールアドレスをお尋ねします。
    </p>
  ),
};

const purposeOfCollectingPersonalInformation: PrivacySet = {
  title: '個人情報を収集・利用する目的',
  content: (
    <React.Fragment>
      <p>当サイトが個人情報を収集・利用する目的は、以下の通りです。</p>
      <ol className="list-decimal list-outside ml-8">
        <li className="my-2" >当サイトサービスの提供・運営のため</li>
        <li className="my-2" >メンテナンス、重要なお知らせなど必要に応じた連絡のため</li>
        <li className="my-2" >
          利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をしご利用をお断りするため
        </li>
        <li className="my-2" >
          ユーザーにご自身の登録情報の閲覧や変更、削除、ご利用状況の閲覧を行なっていただくため
        </li>
        <li className="my-2" >上記の利用目的に付随する目的</li>
      </ol>
    </React.Fragment>
  ),
};

const changeOfPurposeOfUse: PrivacySet = {
  title: '利用目的の変更',
  content: (
    <p>
      利用目的の変更を行なった場合には、変更後の目的について、当サイト上に公表するものとします。
    </p>
  ),
};

const ProvisionOfPersonalInformationToAThirdParth: PrivacySet = {
  title: '個人情報の第三者提供',
  content: (
    <ol className="list-decimal list-outside ml-8">
      <li className="my-2" >
        <p>
          開発元は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法律で認められる場合を除きます。
        </p>
        <ol className="list-decimal list-outside ml-8">
          <li className="my-2" >
            人の生命、身体または財産のために必要がある場合であって、本人の本人の同意を得ることが困難である時
          </li>
          <li className="my-2" >
            公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であっって、本人の同意を得ることが困難である時
          </li>
          <li className="my-2" >
            国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって，本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
          </li>
          <li className="my-2" >
            予め次の事項を告知あるいは公表し，かつ開発元が個人情報保護委員会に届出をしたとき
          </li>
          <ol className="list-decimal list-outside ml-8">
            <li className="my-2" >利用目的に第三者への提供を含むこと</li>
            <li className="my-2" >第三者に提供されるデータの項目</li>
            <li className="my-2" >第三者への提供の手段または方法</li>
            <li className="my-2" >本人の求めに応じて個人情報の第三者への提供を停止すること</li>
            <li className="my-2" >本人の求めを受け付ける方法</li>
          </ol>
        </ol>
      </li>
      <li className="my-2" >
        <p>
          前項の定めにかかわらず，次に掲げる場合には，当該情報の提供先は第三者に該当しないものとします。
        </p>
        <ol className="list-decimal list-outside ml-8">
          <li className="my-2" >
            当社が利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合
          </li>
          <li className="my-2" >
            合併その他の事由による事業の承継に伴って個人情報が提供される場合
          </li>
          <li className="my-2" >
            個人情報を特定の者との間で共同して利用する場合であって，その旨並びに共同して利用される個人情報の項目，共同して利用する者の範囲，利用する者の利用目的および当該個人情報の管理について責任を有する者の氏名または名称について，あらかじめ本人に通知し，または本人が容易に知り得る状態に置いた場合
          </li>
        </ol>
      </li>
    </ol>
  ),
};

const aboutQuoteAndReprint: PrivacySet = {
  title: '引用・転載について',
  content: (
    <p>
      当サイトはリンクフリーですが、コンテンツ内の画像、文書の無断転載は固くお断りしています。
    </p>
  ),
};

const aboutImageAnalytics: PrivacySet = {
  title: '画像解析で取得する画像について',
  content: (
    <p>
      当サイトでは、利用者の動きを分析するため利用者のデバイスより画像を取得していますが、画像は利用者のブラウザで処理され、個人が特定できないデータに変換してから開発元が管理するサーバーに送られています。
    </p>
  ),
};

const aboutAccessAnalyticsTool: PrivacySet = {
  title: '当サイトが使用しているアクセス解析ツールについて(Google Analytics)',
  content: (
    <React.Fragment>
      <p>
        当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
      </p>
      <p>
        このGoogleアナリティクスはトラフィックデータ収集のためにCookieを使用しています。
      </p>
      <p>
        このトラフィックデータは匿名で収集されており、個人を特定するモノではありません。
      </p>
      <p>
        この機能はCookieを無効にすることで収集を拒否することができますので、お使いのブラウザの設定をご確認ください。
      </p>
      <p>
        この規約に関して、詳しくは
        <a href="https://marketingplatform.google.com/about/analytics/terms/jp/">
          こちらをご覧ください。
        </a>
      </p>
    </React.Fragment>
  ),
};

const disclaimer: PrivacySet = {
  title: '免責事項',
  content: (
    <p>
      利用上の不具合・不都合に対して可能な限りサポートを行なっておりますが、利用者が本アプリの利用によって生じた損害に対して、開発元は一切責任を負わないものとします。
    </p>
  ),
};

const changeOfPrivacyPolicy: PrivacySet = {
  title: 'プライバシーポリシーの変更',
  content: (
    <ol className="list-decimal list-outside ml-8">
      <li className="my-2" >
        本ポリシーの内容は，法令その他本ポリシーに別段の定めのある事項を除いて，ユーザーに通知することなく，変更することができるものとします。
      </li>
      <li className="my-2" >
        当社が別途定める場合を除いて，変更後のプライバシーポリシーは，本ウェブサイトに掲載したときから効力を生じるものとします。
      </li>
    </ol>
  ),
};

export const privaciesData: PrivacySet[] = [
  personalInformation,
  meansOfCollectPersonalInformation,
  purposeOfCollectingPersonalInformation,
  changeOfPurposeOfUse,
  ProvisionOfPersonalInformationToAThirdParth,
  aboutQuoteAndReprint,
  aboutImageAnalytics,
  aboutAccessAnalyticsTool,
  disclaimer,
  changeOfPrivacyPolicy,
];
