# BookReading-06 2023-04-29
## 読んだところ
- ４．Webアプリケーションの機能別に見るセキュリティバグ
  - 4-5. 「重要な処理」の際に混入する脆弱性（P194）
    - 4.5.2 クリックジャッキング
      - 概要
      - 攻撃手法と影響
      - まとめ
  - 4-6. セッション管理の不備
    - 4.6.1 セッションハイジャックの原因と影響
    - 4.6.2 推測可能なセッションID
      - 概要
      - 攻撃手法と影響
      - 脆弱性が生まれる原因
      - 対策
      - 参考：自作セッション管理機構にまつわるその他の脆弱性
    - 4.6.3 URL埋め込みのセッションID
      - 概要
      - 攻撃手法と影響
      - 脆弱性が生まれる原因
      - 対策
    - 4.6.4 セッションIDの固定化
      - 概要
      - 攻撃手法と影響
      - 脆弱性が生まれる原因

## Note
読書会で出た疑問についてのメモ。

### 利用者が意図的にRefererをオフにする理由は何でしょうか？

**回答：** 
- プライバシーですね。どこから来たかを知られたくない。
- 別のサイトを見てて、ブックマークをクリックしたときに、ブックマークのサイトの人に、別のサイトを見ていたURLを知られたくないから。。。とかですかね。

#### OWASP ZAP を起動していると、すべての通信は OWASP ZAP を経由する？

**回答：** 読書会で設定いただいている環境では、すべての通信は、OWASP ZAP を経由していません。

当読書会の事前準備で用意しているPACファイルを適用している前提で説明します。

OWASP ZAP では 127.0.0.1(localhost)とポート58888 の通信を監視するように設定しています（OWASP ZAPの設定 > Network > Local Servers/Proxies > Main Proxy で確認できます）

事前準備では、Chromeのプロキシ設定で、PACファイルを見に行くように設定しています。これを設定しているとChromeは、通信のはじめにPACファイルを見に行きます。

PACファイルの中身

```
function FindProxyForURL(url, host)
{
  if (shExpMatch(url, "*example.com*") ||
      shExpMatch(url, "*example.jp*") ||
      shExpMatch(url, "*example.net*")) return "PROXY 127.0.0.1:58888";
  return "DIRECT";
}
```

上記は、example.com、example.jp、example.net を含んだURLにアクセスがあった場合、IPアドレス127.0.0.1とポート58888を返します。

よって、OWASP ZAP で監視している通信は、example.com、example.jp、example.net のみとなります。

#### ① OWASP ZAP を使う理由は？ Chromeの開発ツールじゃだめなの？

**回答：** Chromeはクライアントとして動作しますが、OWASP ZAPはプロキシーとして動作します。クライアントとサーバーの間にたって、双方向の通信を監視することができます。OWASP ZAPでは、サーバーからクライアントへ送られる通信の改ざんなどができますが、Chromeではできません。

👇 ChatGTP-4に聞いてみました

Chromeやその他のウェブブラウザには、開発者ツールが含まれており、これを使ってウェブページや通信内容を解析することができます。しかし、OWASP ZAP（Zed Attack Proxy）のような専門的なセキュリティツールは、機能面でいくつかの大きな違いがあり、セキュリティテストや脆弱性の検出に特化しています。

以下は、Chromeの開発者ツールとOWASP ZAPの主な違いです。

1. 機能の範囲: Chromeの開発者ツールは主にウェブページのデバッグや最適化に焦点を当てています。一方、OWASP ZAPはWebアプリケーションのセキュリティテストに特化しており、アクティブスキャンやパッシブスキャン、ファジング、ブルートフォース攻撃などの脆弱性探索機能が含まれています。
2. プロキシ機能: OWASP ZAPは、プロキシサーバーとして機能するため、通信の中継地点に立ってリクエストとレスポンスを監視・操作することができます。これにより、リアルタイムで通信を解析し、攻撃シミュレーションを実施することが可能です。一方、Chromeの開発者ツールは、このようなプロキシ機能は提供していません。
3. 自動化と拡張性: OWASP ZAPは、APIを通じて自動化が可能であり、CI/CDパイプラインに組み込んで定期的にセキュリティテストを実行することができます。また、プラグインやスクリプトを使って機能を追加・カスタマイズすることができます。これに対して、Chromeの開発者ツールは主に手動での操作が前提で、自動化や拡張性は限定的です。
4. これらの違いから、ウェブアプリケーションのセキュリティテストや脆弱性の検出を目的とする場合は、OWASP ZAPのような専門的なセキュリティツールを利用することが推奨されます。一方、ウェブページのデバッグや最適化を行いたい場合は、Chromeの開発者ツールが適切です

### ② OWASP ZAP を使う理由は？ Wiresharkやスニファーとどう違うの？

👇 ChatGTP-4に聞いてみました

WiresharkやスニファーとOWASP ZAPは、いずれもネットワーク通信を解析するためのツールですが、使用目的と機能面で異なります。

Wiresharkやスニファーは、一般的なネットワークパケット解析ツールです。ネットワーク上のデータパケットをキャプチャし、その内容を詳細に分析することができます。これらのツールは、ネットワークの問題を診断したり、不正な通信を検出したりする際に役立ちますが、特にウェブアプリケーションのセキュリティに焦点を当てていません。

一方、OWASP ZAP（Zed Attack Proxy）は、ウェブアプリケーションのセキュリティを評価・テストするために特化したツールです。ZAPは、プロキシとして機能し、ウェブアプリケーションとクライアント間の通信を監視・操作できます。また、アクティブスキャンやパッシブスキャン機能を使って、脆弱性を自動的に検出することができます。さらに、OWASP ZAPは、OWASP Top 10などの一般的なウェブアプリケーションのセキュリティリスクをチェックするための機能を提供します。

簡単にまとめると、以下のような違いがあります。

1. 使用目的: Wiresharkやスニファーは一般的なネットワーク通信の解析に使用されるのに対して、OWASP ZAPはウェブアプリケーションのセキュリティ評価・テストに特化しています。
2. 機能: Wiresharkやスニファーはネットワークパケットの詳細分析に重点を置いているのに対して、OWASP ZAPは脆弱性の検出やセキュリティリスクのチェックを行う機能が充実しています。

これらの違いから、ウェブアプリケーションのセキュリティテストにはOWASP ZAPが適しており、その特化した機能を利用するために使われます。

### 攻撃者は OWASP ZAP をどう使っているの？ 攻撃の際に使っているの？

**回答：** OWASP ZAPは脆弱性を探すツールなので、攻撃の際に実際に使用することは難しいと思います。実際の攻撃に使用するとしたら中継サーバーにOWASP ZAPをインストールし、閲覧者を中継サーバーに誘導する等の方法が考えられますが、現実的ではありません。

👇 ChatGTP-4に聞いてみました

OWASP ZAPを使用して、Webアプリケーションのセキュリティをテストすることができます。OWASP ZAP（Zed Attack Proxy）は、オープンソースのWebアプリケーションセキュリティスキャナで、開発者やセキュリティ専門家がWebアプリケーションの脆弱性を検出するために使用されます。

攻撃者は、OWASP ZAPを使用して以下のようなことができます。

1. アクティブおよびパッシブスキャン：アプリケーションをクロールし、アクティブおよびパッシブスキャンを実行して脆弱性を検出します。
2. ファジング：入力データを操作してアプリケーションの不正な挙動を特定します。
3. セッションハンドリング：アプリケーションのセッション管理をテストし、セッション固定、セッションハイジャックなどの脆弱性を見つけます。
4. CSRF（クロスサイトリクエストフォージェリ）攻撃の検出：CSRFトークンの欠如や弱いトークン生成アルゴリズムを特定します。

攻撃者がOWASP ZAPを使用することで、アプリケーションのセキュリティ上の問題を特定し、悪意ある活動を実行できる可能性があります。ただし、OWASP ZAPは通常、開発者やセキュリティ専門家がアプリケーションのセキュリティを向上させる目的で使用されます。

悪意のあるユーザーは、OWASP ZAPを使って以下のような攻撃を試みることができます。

1. SQLインジェクション
2. クロスサイトスクリプティング (XSS)
3. クロスサイトリクエストフォージェリ (CSRF)
4. ディレクトリトラバーサル
5. セッションハイジャック
6. ブルートフォース攻撃

OWASP ZAPは、これらの攻撃手法を特定し、開発者が脆弱性を修正できるようにするためのツールですが、攻撃者は同じツールを使って悪意ある行動に利用することができます。このため、Webアプリケーション開発者は、定期的にセキュリティテストを実施し、脆弱性を修正することが重要です。

### 感想

質問をお寄せ頂いた方も、ご回答いただいた方も、ありがとうございました🙇‍　勉強になりました。

今回質問で出たワードは、なんとなく理解していたつもりですが、実際に質問されると、はっきりと答えられなかったので、実は理解していないんだなということが良く分かりました😅

## 次回
- 5/13（土）10:00 - 12:00
- P227 対策　から読みます
