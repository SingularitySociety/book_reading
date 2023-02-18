# 事前準備

読書会当日までに以下をお願いします。前日にやるとやりきれない可能性があるので、はやめにご準備ください。

- Dockerのインストール
- 実習用仮想マシンのダウンロード
- コンテナ起動
- OWASP ZAP（脆弱性診断ツール）のインストールと設定
  - BurpSuiteに慣れているかたはそちらでも構いません
- Proxyの設定
- 動作確認
- トラブルシューティング

環境構築に躓いたら、お気軽に Slackまでご質問ください。答えられる範囲でお答えします。

当日の環境構築についての質問は、進行の妨げになるためお答えできません。ご承知おきください。

## Dockerのインストール

今回、本書に記載があるVirtualBoxは使用しません。
[安全なWebアプリケーションの作り方 第2版 サポートサイト](https://wasbook.org)で配布されているDockerを使用します。WindowsでもMacでも同じ環境で進められるので、こちらで環境構築をお願いいたします。

- [Docker](https://www.docker.com) からインストーラーをダウンロードし、インストールしてください。

Macでの最新バージョンは「4.16.2 (95914)」です。

## 実習用仮想マシンのダウンロード

- [実習用仮想マシン（Docker版 Ver 1.1.0 以上）](https://wasbook.org/download/wasbook-docker.zip) をダンロードしてください。

上記サイトには、ベーシック認証がついてます。IDとパスワードは、「[体系的に学ぶ 安全なWebアプリケーションの作り方 第2版 脆弱性が生まれる原理と対策の実践](https://amazon.co.jp/dp/4797393165/ref=nosim?tag=singularityso-22)」の 667ページに記載があります。

## コンテナの起動

- こちらの「[コンテナ起動方法](https://wasbook.org/wasbook-docker.html) 」をご確認いただき、コンテナが起動するかご確認ください。

`docker compose up -d` で起動したコンテナは、`docker compose down` で停止できます。

## OWASP ZAP（脆弱性診断ツール）のインストールと設定

### OWASP ZAPのインストール

- [OWASP ZAPダウンロード](https://www.zaproxy.org/download/)からダウンロードし、インストールしてください。

Macでの最新バージョンは、2.12.0 です。

### Macの人🍎

Mac の場合、セキュリティの警告が出ることがあるので、System Settings > Privacy & Security から、OWASP ZAP の実行を許可してください。

![SystemSettings](./img/preparation_owaspzap.png)

### Windowsの人🤚

Windows は、JRE（Javaの実行環境）64bit版 が必要です。必要に応じてインストールしてください。

OWAS ZAPのインストーラーがエラーで起動しない場合は「[Windowsで OWAS ZAP のセットアップ](https://zenn.dev/singularity/articles/d9a555238061e9)」こちらの記事の内容を試してみてください。

### OWASP ZAPの設定

確認・設定箇所は２箇所です。
- HTTP Proxy
- Main Proxy

#### 設定方法

歯車アイコン（オプション）をクリックします。

![](./img/preparation_owaszap_option.png)

Network > Connection を開き、HTTP Proxy に以下を設定してください。

- Enabled にチェックを入れる
- Host:127.0.0.1
- Port：13128

![](./img/preparation_owaszap_httpproxy.png)

メニューバーにあるツール（または歯車アイコン） > オプション > を開き、Main Proxyに以下を設定してください。

Network > Local Servers/Proxies を開き、Main Proxy に以下を設定してください。

- localhost
- 58888

![](./img/preparation_owaszap_setting.png)

## Proxyの設定

今回は、本書に記載のあるFirefoxは使わず、Chrome を利用します。

### Macの設定方法

1. Chrome を起動し、アドレスバーに `chrome://settings/system` を入力します。
2. 「パソコンのプロキシ設定を開く」をクリックします。
3. プロキシ設定ウィンドウが開きます。「自動プロキシ構成」を `ON` にします。
4. URLに https://raw.githubusercontent.com/SingularitySociety/book_reading/main/2023Spring_DevelopingSecureWebApplications/proxy.pac を入力します。
5. 「OK」をクリックします。
6. http://example.jp/ にアクセスし、本書のコンテンツが表示されるか確認します。

### Windowsの設定方法

1. 「スタートメニュー」から「設定」を開きます。
2. 「ネットワークとインターネット」>「プロキシ」の順にクリックします。
3. プロキシ設定ウィンドウが開きます。「セットアップスクリプトを使う」を `ON` にします。
4. 「スクリプトのアドレス」に https://raw.githubusercontent.com/SingularitySociety/book_reading/main/2023Spring_DevelopingSecureWebApplications/proxy.pac を入力します。
5. 「保存」をクリックします。
6. http://example.jp/ にアクセスし、本書のコンテンツが表示されるか確認します。

## 動作確認

OWAS ZAPとDockerのコンテナが起動した状態で [http://example.jp/](http://example.jp/phpinfo.php) にアクセスしてください。 OWAS ZAP上で、リクエストが表示されていれば、OKです。

![](./img/preparation_owaszap_check.jpg)

Chrome上で画面表示が崩れるときは、OWASP ZAP画面右上にある「Enable the ZAP HUD」をOFFにしてください。

![](./img/preparation_EnabletheZAPHUD.png)

## トラブルシューティング

`docker compose up -d` 起動時に以下のエラーが表示される場合は、こちらの記事「[【Docker】docker-compose build実行時にload metadata for docker.io/library/○○とエラーが表示される](https://qiita.com/so__hei__/items/46bac5698aa36fa456bb)」を試してください。

![](./img/preparation_dockercomposeerr.png)