# BookReading-02 2023-03-04

## 読んだところ
- ３．Webセキュリティの基礎
  - 3-1. HTTPとセッション管理
    - クッキーによるセッション管理（P65 ここから）
  - 3-2. 受動的攻撃と同一オリジンポリシー
  - 3-3. CORS(Cross-Origin Resource Sharing)
- ４．Webアプリケーションの機能別に見るセキュリティバグ
  - 4-1. Webアプリケーションの機能と脆弱性の対応

## Note

### セッション管理機構とは（P67）

- httpはステートレスなので、毎回、誰がアクセスしているか、サーバ側ではわかりません。
「セッション管理機構」は、サーバ側にアクセスがある度にそのアクセスが誰からのアクセスなのかを特定する為の仕組みのことです。
- セキュリティのことを全く考えなくてよければ、クッキーにuser idを入れてそのアクセスをしているユーザを特定することができます（最も簡単な「セッション管理機構」）

### プリフライトリクエストって必要なんでしょうか？（P88）
- 徳丸さん動画（以下）が参考になります。

  - [今日こそ理解するCORS - プリフライトリクエストは本当に必要？](https://youtu.be/yBcnonX8Eak?t=674)

- ブラウザでcross originでpostのリクエストをするとoptionでプリフライトリクエストが走ります。同じapiを叩くときに2回requestが走ります。

![](./img/2023030401.png)

### Chromeで、/33/33-005b.html のカウンターが動かない
参加者の方からコメントをいただきました。

- Firefoxだと動作します。
- Chromeでは、3rd Party Cookieの関係で、セキュリティ強化されて動作しなくなりました。[参考](https://qiita.com/emacs_hhkb/items/ff6af4361b8a10f781a9)
- サーバをhttps化して、php側でヘッダーのCookieで Secre; SameSite=None;をつけると動作します。

上記を適用するための[パッチファイル](/2023Spring_DevelopingSecureWebApplications/diff.patch)を準備しました。
以下は適用手順の例になります。

- wasbook-docker のコンテナを停止させておく
- wasbook-docker.zip を再ダウンロードして解凍し、wasbook-docker_test に名前を変更する
- wasbook-docker_test に [diff.patch](/2023Spring_DevelopingSecureWebApplications/diff.patch) を移動させる
- wasbook-docker_test で、```git init```、```git add README.md```、```git commit -m "first commit"``` をしたあとで、```git apply diff.patch``` を実行する
- ```docker compose up -d``` を実行してコンテナを起動する
- ブラウザから https://api.example.net へアクセスし、「プライバシーが保護されません」を了承しておく
- https://example.jp/33/ に「33-005bc:(chrome対応)アクセスカウンタ（Access-Control-Allow-Credentialsあり）」が表示され、リンク先でカウンターが正常に動いていれば成功

## 次回
- 3/18（土）10:00 - 12:00
- P99 インジェクション系脆弱性とは から読みます
