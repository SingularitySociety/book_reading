# diff.patch

## これは何？

当読書会で使用するChromeですが、Chromeだと動かないハンズオンがいくつかあります。

Chromeでは、3rd Party Cookieの関係でセキュリティ強化され（[参考](https://qiita.com/emacs_hhkb/items/ff6af4361b8a10f781a9)）これによる影響で、ハンズオンが動かない現象が発生しています。

## 回避方法
1. Chromeで動かいないハンズオンは、Firefoxだと動作します。
2. サーバをhttps化して、php側でヘッダーのCookieで `Secre; SameSite=None;` をつけると動作します。

上記「2」を適用するパッチ(diff.patch)を用意しました。

（読書会参加者の方に作っていただきました🙏）

## diff.patch について
- wasbookの資源を直接変更しパブリックな場に公開するのは著作権の侵害にあたりますので、修正した部分の差分をとってパッチにしています。
- diff.patchは、wasbookをhttps化するためのものです。

変更箇所は、後述しています。

## 適用方法
### 準備編
必要なもの
- wasbook-docker.zip（オリジナル）
- diff.20230401.patch（[こちら](https://github.com/SingularitySociety/book_reading/blob/main/2023Spring_DevelopingSecureWebApplications/diffpatch.md)をダウンロードしてください）

前提
- gitがインストールされていること（[こちら](https://git-scm.com/book/ja/v2/使い始める-Gitのインストール)からインストールできます）

### 手順
1. Dockerを停止します。
2. wasbook-docker.zip 解凍します。
3. 解凍した wasbook-docker をリネームします（リネームは任意ですが、オリジナルはオリジナルで動くようにしておくと良いです）
4. Powershellまたはコマンドプロンプト(Windows)/ターミナル(Mac)を起動し、解凍＆リネームしたディレクトリに移動します。
5. 次のコマンドを順番に実行します。
   1. `git init`
   2. `git add .` ※ピリオドを忘れずに
   3. `git commit -m ”originl wasbook”`
6. 解凍＆リネームしたディレクトリに、diff.20230401.patch をコピーまたは移動してください。
7. 次のコマンドを実行します。
   1. `git apply diff.20230401.patch`
8. Dockerを起動し `docker-compose up -d` を実行します。
   1. うっかりDockerの停止を忘れていたら、次のコマンドでイメージを再構築してください。
   2. `docer-compose build apache`
   3. `docer-compose build nginx`
   4. Error response from daemon: i/o timeout のようなタイムアウトが出た場合は、`docker-compose up -d` を再度実行してください。（タイムアウト後の処理を継続して実行します）

## 利用方法
### 準備編
#### 証明書を取り込む（任意）
1. OWASPにhttpsでアクセスできるように、OWASPの証明書を取り込んでください。（参考：https://www.pupha.net/archives/3610/）
2. OWASPの証明書を保存（ダウンロード）し、owasp_zap_ca.cer をダブルクリックで、信頼できるルート証明書として、PCに保存します。

#### Chromeのキャッシュをクリアと再起動
Chromeのキャッシュをクリアし再起動してください。

### 利用する
ChromeでwasbookのURLにアクセスします。httpではなく、httpsに変更してアクセスしてください。

https://example.jp

## 注意点
- httpでアクセスすると、phpの参照がhttpsなため、エラーになるところが多数あります。必ず、httpsで利用するようにしてください。
- CORSに関係ないところは動作します。しかし、CORS関係のところは、エラーになります。（phpの修正が必要）

## オリジナルのwasbook-dockerに戻りたい場合
- https版のwasbookのディレクトリにて、docker-composeでコンテナを終了してください。
  - `docker-compose down`
- オリジナルのwasbook-dockerのディレクトリに移動し、コンテナを起動します。
  - `docer-compose up -d`

## 変更箇所
- apache、ngingxの2カ所です。
- phpの参照先：http://　→　https:// に単純に変更しています.
- 3-3のところで、33-005bをChrome用に33-005bcを追加してphpのヘッダーのset-cookieに `secure; SameSite="None";` を追加するように修正しています。
  - 同様に、4-3,4-5も同様に、 `set-cookieにsecure; SameSite="None";` を付与しています。
- 4章13迄で動作確認済み（3-3,4-3,4-5 CORSを動作させるためphpのソースを修正しています,4-13:/tmpを取得するための箇所を追加）
- httpsにするために、サーバ証明書を付与しています。
  - この修正は、（パッチ適用版）wasbook-docker\apacheにあります。
  - 上記の反映をDockerfileにDockerfileに取り込むための証明書部分を追加しています。
- docker-compse.yml
  - apache部分を直接https(443)でアクセスできるようにしています。

## OWASP経由で動作しない場合

以下を試してみてください。

- apahceに直接アクセス
- wasbookのProxyへアクセス

### apahceに直接アクセス　https://example.jp/

OWASPを利用しない方法で、直接コンテナのapahceにアクセスしてみてください。
- etc/hosts に追加 
  - 127.0.0.1  example.jp
- Chromeのプロキシーを外してください（直接アクセスに変更）
  - これにより、https://example.jp　　で、localhostのhttps(443）へアクセスします。
- （オプション）https://example.jp/のアクセスでは、「wasbook CA」の証明書をルート証明書として、取込んでください。テスト確認後、ルート証明書から削除してください。
    　　　
    　※動作するようなら、次を試してみてください。

### wasbookのProxyへアクセス

OWASPのPrxyを利用しない方法で、直接コンテナのProxyにアクセスしてみてください。
- Chromeのプロキシーを58888→13128に変更して、プロキシー経由でアクセスに変更
  - これにより、https://example.jp　　で、wasbookのProxy(13128）へアクセスします。
-（オプション）https://example.jp/のアクセスでは、「wasbook CA」の証明書をルート証明書として、取込んでください。テスト確認後、ルート証明書から削除してください。

※動作するようなら、Chromeのプロキシーを読書会用に設定しなおし、OWASPのプロキシー関係を見直してください。
