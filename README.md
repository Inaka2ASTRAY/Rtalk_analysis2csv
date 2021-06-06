# Radiotalkアプリ内再生数推計

[推計ツールリンク](https://inaka2astray.github.io/Rtalk_analysis2csv/)

## 概要
Radiotalkにて取得できるアナリティクス(聴取データ)は「累計再生数」「累計再生時間」「平均再生率」の3つです。この時「累計再生時間」と「平均再生率」に関しては、Radiotalkアプリ内での再生にのみ対応しています([公式のアナリティクスに関するページ](https://radiotalk.jp/articles/analytics))。そのため、「総再生数」や「トーク時間」で単純に計算し、分析することはできません。また、アナリティクスをCSVに起こすことができないため、より踏み入った分析を行いたいというユーザーには対応出来ていないのが現状です。
このリポジトリのPagesでは、アナリティクスで得られるデータを入力するとアプリ内での再生数とそれ以外での再生数を算出し、それらをCSVに書き起こします。

次には使用方法について簡単な説明を記しますので、おかしな点がありましたらissueなどでご指摘いただければ幸いです。また、筆者は開発経験に乏しいためコードに関してもご指摘いただければ嬉しいです。

## 使い方
必要な情報として番組内にあるトークの「トークタイトル」、そのトークのアナリティクスにある「累計再生数」「累計再生時間」「平均再生率」とトークしている時間「トーク時間」を各項目名の下にある入力バーに入力します。その後sendtocsvを押すことでcsvに書き込む準備をします。この際、アプリ内再生数のみ確認したい人はボタン下の欄にアプリ内再生数の推計が表示されますのでそれを参考にしてください。間違った値で送った場合は、同じトークタイトルで登録することで上書きされるのでそちらでご対応できます。
そして、アナリティクスの内容を書き起こしたいトークまで入力が終わったら、DLCSVを押すとアナリティクスのデータとアプリ内再生数(推計)が書き込まれたCSVファイルをダウンロードすることができます。

## アプリ内再生数の算出方法
平均再生率(Arv)の計算で必要な値を「累計再生時間(Total)」「アプリ内再生数(App_pv)」「トーク時間(Talk)」とした時、平均再生率(Arv)は以下のように求められると考えられます。

Arv = Total ÷ App_pv ÷ Talk × 100 (変数は各項目()内を参照)

これらの値は、アプリ内再生数(App_pv)以外はトーカーが取得できるデータですので、これを当てはめ計算し、アプリ内再生数を求めています。なお、この時算出されるアプリ内再生数は四捨五入しています。

## 利用者イメージ
* アプリ内でどれくらい聞かれているかをある程度知りたい方
* アナリティクスのデータをCSV等に書き起こしたい方
* 簡単な分析を行ってみたいと思っている方
* etc....

## 利用のヒント
* TwitterやInstagram等の他のSNSと連携して、そこからのアクセス数と再生数での計算
* 再生率のバラツキを大まかに推測
* 各項目とその値の関係
* etc....

## Q&A
 Q.この値は正しいのか

 A.必ずしも正しいとは言えません。今回使っている累計再生時間や平均再生率などは見えている範囲のデータでしかありません。裏でどれくらいの値(小数点以下何位から等)で計算を行っているかはわからないため、おおよその値とならざるおえません。

 Q.入力されたデータは誰かから見られる状況にあるのか

 A.基本的にはありません。今回行っているデータのやり取りはすべてブラウザ上で完結しているため入力者以外は中身を見ることはできません。筆者も見ることはできません。

 Q.入力が面倒くさい

 A.画像から読み込む機能をつけたバージョンも出す予定です。いつか出したいです。それを待つか入力するかどちらか選んでください。

 Q.UIがわかりずらい

 A.ごめん

## ライセンス他
Radiotalk は、Radiotalk株式会社で開発・運営されている音声配信プラットフォームです。本リポジトリは有志によって作成されたものであり、公式のものではありません。予めご了承ください。
