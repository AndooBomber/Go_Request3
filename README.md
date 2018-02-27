# リクエスト集中講義Go

今回は、クイズ投稿サイトを作りました。
topページで質問と解答を入力することでクイズの問題を作成し、Quizリンクをクリックすると今まで作成されたクイズが一覧で表示されます。

全て解いてAnswerボタンを押すと、正解不正解が円グラフで表示されます。

また、Send resultボタンを押すとクイズの結果をデータベースに登録できる機能もつけました。この登録された結果データベースを用いて他人の点数と比較できるような棒グラフを作ろうとしましたが、上手く表示できませんでした。

一番下のButtonリンクはAjaxを試験したものなので関係ないです。

## 動作方法

$ cd $GOPATH
$ go get github.com/revel/revel
$ go get github.com/revel/cmd/revel
$ revel new GoRequest
$ git clone git@github.com:AndooBomber/Go_Request3.git
$ npm install
$ npm start

## 実装方針

今回は、GoのフレームワークとしてRevelを使いました。理由としては、普段MEANスタックでの開発をしていたのでMVCフレームワークがとっつきやすかったという点と参考サイトが多くあった点が大きかったです。ただ、Revelについて調べていたらメルカリさんの[技術ブログ](http://tech.mercari.com/entry/2016/12/19/180000)にベンチマークが標準パッケージよりも2倍近くかかっていたのを発見し、やはり、フルスタックは速度が落ちるようなので用途に応じて使用するかどうか考えていくようにしたいです。

また、データベースはMongoDBを選択しました。これもMEANでの経験があったという点と、データが蓄積し続ける点よりビックデータ用に選定しました。また、予てよりgoroutineを使ってみたかったので、データベースの処理部分で使ってみました。

フロントはReactで書いています。今まで書いたことは無かったのですが、今回Goと一緒に挑戦してみたかったため取り入れました。その挑戦により、今回全て完成させるまでに至らなかったのでとても反省しております。

ライブラリとしてグラフの描画にRecharts、ボタンやフォームの部分にbootstrapを使っています。ここの選定は見た目のみです。

今回、時間が足りずにテストが作れなかったのでXSS対策やバグが解決できていないので今後は品質を高めるべく、テストコードを書いていこうと思います。

## Welcome to Revel

A high-productivity web framework for the [Go language](http://www.golang.org/).


### Start the web server:

   revel run myapp

### Go to http://localhost:9000/ and you'll see:

    "It works"

## Code Layout

The directory structure of a generated Revel application:

    conf/             Configuration directory
        app.conf      Main app configuration file
        routes        Routes definition file

    app/              App sources
        init.go       Interceptor registration
        controllers/  App controllers go here
        views/        Templates directory

    messages/         Message files

    public/           Public static assets
        css/          CSS files
        js/           Javascript files
        images/       Image files

    tests/            Test suites


## Help

* The [Getting Started with Revel](http://revel.github.io/tutorial/gettingstarted.html).
* The [Revel guides](http://revel.github.io/manual/index.html).
* The [Revel sample apps](http://revel.github.io/examples/index.html).
* The [API documentation](https://godoc.org/github.com/revel/revel).

