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

Windowsの方はこちらも参考にしてください（徳丸さんのYoutube）：[徳丸本実習環境Docker版をWindows10/11に30分で導入する](https://youtu.be/07k-7Q2xGzY)

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
- Host: 127.0.0.1
- Port: 13128

![](./img/preparation_owaszap_httpproxy.png)

Network > Local Servers/Proxies を開き、Main Proxy に以下を設定してください。

- Host: localhost
- Port: 58888

![](./img/preparation_owaszap_setting.png)

## Proxyの設定

本書ではFirefoxを利用しています。Firefoxで進めたい方は、本書の「実習環境セットアップ」の「Firefoxインストール」と「Firefoxの拡張FoxyProxy-Standardのインストール」をご確認ただき、環境をご用意ください。

Chromeで動かしたい場合は以下を実施してください。

（⚠️本ページの内容で一部 Chrome で動かないところがあります！（Firefoxだと動作する）。Chromeで動かせるようパッチを用意しています。詳しくは→[こちら](https://github.com/SingularitySociety/book_reading/blob/main/2023Spring_DevelopingSecureWebApplications/diffpatch.md)を御覧ください）

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

## トラブルシューティング　😖🥺😵

### docker-compose build実行時にload metadata for docker.io/library/○○とエラーが表示される

`docker compose up -d` 起動時に以下のエラーが表示される場合は、こちらの記事「[【Docker】docker-compose build実行時にload metadata for docker.io/library/○○とエラーが表示される](https://qiita.com/so__hei__/items/46bac5698aa36fa456bb)」を試してください。

![](./img/preparation_dockercomposeerr.png)

### An unexpected error occurred　というエラーが表示された

Windows＋Docker環境で以下のメッセージを含んだダイアログが表示された。

```
An unexpected error occurred

A timeout occured while waiting for a WSL integration agent to become
ready.

This can occur when starting after an abrupt termination. To work around the
issue, please terminate WSL (ws --shutdown) and start Docker Desktop
again. If the issue persists please collect diagnostics and submit an issue
(https://docs.docker.com/desktop/troubleshoot/overview/#diagnose-from-
the-terminal).

Error details:
1 error occurred:
* starting WSL integration service: synchronising agents: starting
added distros: 1 error occurred:
* waiting for WSL integration for Ubuntu: waiting for WSL distro
integration to become ready in "Ubuntu": timeout
```

以下の２パターンで対応してみてください。（読書会参加の Senten様より情報いただきました。ありがとうございます）

**パターン１：**

1. Docker desktopを停止する。
2. `wsl --shutdown` を実行する。
3. `wsl` を実行する。
4. Docker desktopを起動する。

**パターン２：**

`wsl --set-default-version 2` を実行する。

この節冒頭のエラーが出た前に `Docker.Core.HttpBadResponseException` エラーが出た場合は、以下の方法で直ることがあるそうです。

1. 「Windowsセキュリティ」を開く。
2. 「アプリとブラウザーコントロール」を開く。
3. 「Exploit Protectionの設定]をクリックする。
4. 「プログラム設定」をクリックする。
5. `vmcompute.exe` を入力して、「編集」をクリックする。
6. プログラム設定のダイアログが表示されるので、一覧をスクロールで下げて「制御フローガード（CFG）」の「システム設定の上書き」のチェックを付けて、オフにし、「適用」をクリックする。
7. PowerShellを管理者で起動して、`net stop vmcompute`　`net start vmcompute`　を実行　＜－サービスが起動しない。
8. プログラム設定のダイアログが表示されるので、一覧をスクロールで下げて「制御フローガード（CFG）」の「システム設定の上書き」のチェックを外して「適用」をクリックする。
9. PowerShellを管理者で起動して、`net stop vmcompute`　`net start vmcompute` を実行する。

表示されたエラー画面のもとのエラーを特定できないと対処ができないかもしれません。
同じなら直ると思います。

**ご報告頂いた参加者の方より追記：** 私のWindows11の環境下では、WindowsのUpdateを適用するたびに上記設定がリセットされるようで、3月のパッチ適用後も同様なエラーが発生しました。
厳密にはエラー画面の表示まで待っていないのですが、上記設定した情報がクリアされているので、再度、「Windowsセキュリティ」→「アプリとブラウザーコントロール」→
「Exploit Protectionの設定]→「プログラム設定」→・・・・（上の手順みてね）を実施して、Docker Desktopが利用できるようになりました。👏👏👏

