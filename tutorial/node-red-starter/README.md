# チュートリアル：Node-REDで始めるGameControllerizer ~世の中すべてをコントローラに！編

それではGameControllerizerをNode-REDで遊んでいきましょう。本チュートリアルは、作業としては簡単ですが、知識としては少し発展的な内容です。ネットワーク設定、サーバクライアントアーキテクチャの知識、およびHTTPに関するプログラミングの知識が必要です。 あなたの好きなプログラミング言語で、ゲームコントローラのプログラミングをしていきます。身の回りのいろいろなものを、ゲームコントローラにしてしまいましょう！

-目次
   - 準備するもの
   - 接続
   - Node−REDについて
   - 最初のGameControllerizerサンプル
   - 詳しく見てみよう
   - ボタンをゲームに対応づけたい
   - いろいろなプログラミング言語とシステムから使う
   - 反応速度を上げたい
   - その他のトピック

## 準備するもの
* パソコン
    * Windows PC ★1 （webブラウザと、ゲームが動くマシンとして使います。プログラミングする場合は、好みのプログラミング環境をご準備ください。）
* ハードウェア
    * Raspberry pi zero wに接続された状態のGameControllerizer基板
    * USBケーブル（PCとGameControllerizerをつなぐ。ゲームコントローラとしてPCに操作指示を送るためのもの。）
* ソフトウェア
    * Windows 上で動く、好きなゲーム（ゲームパッドで動くもの）。特にこだわりがないようなら、ブラウザで動く https://yoh7686.github.io/SaveTheApple/index.html をご活用ください。


★１ macでもなんとかなります。しかしmacは仕様上ゲームパッドを外付けキーボードとして扱うので、ゲームパッドをキーボード入力に変換するソフトウェア https://yukkurigames.com/enjoyable/ を用いるか、別のゲーム機を用意してください。

## 接続
Raspberry piに接続されたGameControllerizer基板のUSB端子とPCのUSB端子をUSBケーブルで接続します。PCに電源が入っていれば、Raspberry piにも給電され、電源が入ります。Raspberry piの起動には1分くらいかかるので、待ちましょう。  
PCのブラウザから、  

http://<Raspberry piのIPアドレス>:1880  

にアクセスしてください。
あなたのRaspberry piのIPアドレスが192.168.0.4なら、  
http://192.168.0.4:1880  
です。
Node-REDが表示されるはずです。
また、PCでゲームを起動しておきましょう。これで準備完了です。

注：ハッカソン等のイベントでは、Raspberry piで無線LANに接続し、IPアドレスが付与されるところまでは運営者がやっています。皆さんは運営者からIPアドレスを聞いてください。もしご自身で作業される場合は、Raspberry piにディスプレイとマウス、キーボードを接続し、無線LANの設定を行い、IPアドレスをメモしておきましょう。RaspbianのGUIデスクトップの右上の無線のアイコンから行います。

## Node-REDについて
Node-REDのことが全くわからない方は、以下を見てください。しかしNode-REDを全く知らなくても、なんとかなります。  
https://nodered.jp/  

###### **【参考：最初は読まなくて良い】**  Node-REDは、Raspberry Pi 上に各種サーバを構築するために使われています。Raspberry Piに来た通信を、GameControllerizerへの指示へと変換します。具体的にはHTTPサーバ、WebSocketサーバなどを構築しています。

## 最初のGameControllerizerサンプル
ずばり、ブラウザで、  

http://<Raspberry piのIPアドレス>:1880/btn/hold/6  

と入力してエンターキーを押してみましょう。ゲームの中で、キャラクターが右に動くはずです！
しかも、同時に別のPCの複数のブラウザからアクセスできます。もうこれだけで、普通のゲームが「みんなで協力したり邪魔しながら楽しむゲーム」に早変わりします。

さて、これはRaspberry piの指定のURLにGETリクエストを送ることで、ゲームコントローラを制御できるということを意味します。
HTTP GETリクエストが行えるプログラミング言語であれば、どんなシステムからでもネットワーク越しにGameControllerizerを制御できるのです。これぞIoTならぬ、Internet of Gamesですね！

## 詳しく見てみよう
Node-REDが準備している、ゲームコントローラ制御のためのURLの一覧は以下です。  

* /btn/push/[id]
* /btn/hold/[id]
* /btn/release/[id]
* /btn/[id] ※push のシンタックスシュガー
* /dpad/push/[id]
* /dpad/hold/[id]
* /dpad/[id] ※pushのシンタックスシュガー
* /stk0/{x,y}/[value] ※valueは -127 ～127
* /stk1/{x,y}/[value]
* /input_config/{0,1} ※DPAD入力向き
* /halt ※シャットダウン

「http://<Raspberry piのIPアドレス>:1880」のあとに、これらをつなげてURLを完成させます。  
/btnはボタンの動作です。push（押してすぐ離す）, hold（押し続ける）, release（離す）の３種類があります。0から11でボタン番号を指定します。  
/dpadは十字キーの動作です。push（押してすぐ離す）, hold（押し続ける）の２種類があります。1から9までの数字で方向を指定し、5が十字キーをどこも押さない状態です。  

7（左上） 8（上　） 9（右上）  
4（左　） 5（中立） 6（右　）  
1（左下） 2（下　） 3（右下）  

/stk0と/stk1が、左右のアナログスティックです。x,y軸ともに-127~127を設定します。(0,0)がニュートラル位置です。  
/input_configは十字キーとアナログスティックの左右方向を入れ替える設定で、格闘ゲームなどでキャラクターの向きが変わったときに設定するとよいでしょう。左右別の操作を実装しないですみます。  
/haltは、raspberry piのシャットダウンを行うコマンドです。  

## ボタンをゲームに対応づけたい
ちょっと面倒だけど必ず考えなければならないのが、ボタンの対応づけです。
GameControllerizerは0から11まで番号のついたボタンを扱えますが、何番のボタンがゲーム機のどのボタンに対応するかは、ゲーム機ごとに違います。以下にPCゲームでよく用いられるUSBコントローラの仕様であるxboxコントローラ、Nintendo Switch、およびレトロゲーム互換機レトロフリークにおける対応表を書きますので、参考にしてください。わからなくても実際にゲーム機とつないで、一つ一つボタンを試してみれば、調べることができますね。


| ボタン番号 |    xboxボタン | Switchボタン（XFPSコンバータ使用時） | ファミコン・スーパーファミコン・ゲームボーイボタン（レトロフリーク使用時）
----|----|----|----
| 0 |    left bumper | Y | - |
| 1 |    right bumper | X | - |
| 2 |    left trigger | ZL | L |
| 3 |    right trigger | ZR | R |
| 4 |    back | L | start |
| 5 |    start | R | select |
| 6 |    left stick | L stick | game menu |
| 7 |    right stick | R stick | main menu |
| 8 |    X | + | A |
| 9 |    A | - | B |
| 10 |    B | B | X |
| 11 |    Y | A | Y |

## いろいろなプログラミング言語とシステムから使う
### JavaScript

jQueryを使えば１行ですね！

```
$.get("http://xxxx:1880/dpad/6");
```

参考：http://semooh.jp/jquery/api/ajax/jQuery.get/+url,+data,+callback+/

### Processing

Processingには、HTTPリクエストのライブラリがあります。  
https://github.com/runemadsen/HTTP-Requests-for-Processing/releases  
でライブラリをダウンロードし、適切に配置します。（編集しているプログラムのエディタに直接ドラッグアンドドロップすればOKだと思います。あるいは、processingのライブラリフォルダをしらべてそこにフォルダごとおきます。）

以下のようなコードでGameControllerizerを制御できます。  
```
import http.requests.*;
public void setup() 
{
    GetRequest get = new GetRequest("http://xxxxxxx:1880/dpad/6");
    get.send();
    //println("Reponse Content: " + get.getContent());
}
```

### Sony MESH
Sony MESHのSDKを用いると、独自のプログラミングの部品（タグ）を使うことができます。以下に信号が入力されると指定のHTTPアドレスにGETアクセスするタグのコードを示します。これを用いることで、Sony MESHの様々なタグをブロックプログラミングで組み合わせて、ゲームコントローラとして用いることができるようになります。

```
{"formatVersion":"1.0","tagData":{"name":"HttpGet","icon":"./res/x2/default_icon.png","description":"just send httpGET","functions":[{"id":"function_0","name":"New Function","connector":{"inputs":[{"label":""}],"outputs":[]},"properties":[{"name":"Http Address","referenceName":"url","type":"string","defaultValue":"192.168.11."},{"name":"Topic","referenceName":"topic","type":"string","defaultValue":"hado"}],"extension":{"initialize":"return {\n    runtimeValues : {\n        v : 0\n    },\t\n    resultType : \"continue\"\n};\n","receive":"return {\n\truntimeValues : runtimeValues,\n\tresultType : \"continue\"\n};","execute":"var local_uri = 'http://' + properties.url + ':1880/' + properties.topic;\n\nvar data = \"abc\";\n\najax({\n\turl : local_uri,\n\tdata : data,\n\ttype : 'GET',\n\tcontentType: 'application/text',\n\ttimeout : 250,\n\tsuccess : function (d) {\n\t\tlog(\"Http send success\");\n        callbackSuccess( {\n            resultType : \"continue\",\n            runtimeValues : runtimeValues\n        });\t\t\n\t},\n\terror : function (req, e) {\n\t\tlog(\"Error : \" + e);\n        callbackSuccess( {\n            resultType : \"continue\",\n            runtimeValues : runtimeValues\n        });\t\t\n\t}\n});\n\nreturn {\n    runtimeValues : runtimeValues,\n    resultType : \"pause\"\n};","result":""}}]}}
```

### M5Stack
M5Stackはクラウド上からpythonによってプログラミングが可能です。  
http://cloud.m5stack.com/  
以下のようなプログラムにより、ボタンを押すとGameControllerizerに通信するプログラムが書けます。  

```
from m5stack import lcd, buttonA, buttonB, buttonC
import urequests
server = 'http://xxxxx:1880'
lcd.clear()
lcd.setCursor(0, 0)
lcd.setColor(lcd.WHITE)
lcd.print("Ready.\n")
lcd.print(server)
def on_AwasPressed():
  lcd.print('Button A was Pressed.')
  r = urequests.get(server + '/dpad/hold/6')
  lcd.print(r.text + "\n")
def on_Released():
  lcd.print('Released.')
  r = urequests.get(server + '/get?button=none')
  lcd.print(r.text + "\n")
  
buttonA.wasPressed(on_AwasPressed)
buttonA.wasReleased(on_Released)
```

## 反応速度を上げたい
無線ネットワーク越しにGameControllerizerを制御すると、どうしても遅延が生まれます。だいたい10~50msくらいでしょうか。微々たる時間ですが、ゲームをしている人間にはこの遅延は知覚できます。遅延があってもそれが「もっさりしてるな」という感覚にとどまり、せいぜいゲーム操作の難易度が多少上がるだけであれば、それは慣れで克服できたり、新しい楽しさにつながる可能性を持つものですが、たとえば音楽ゲームなどのように、遅延が無いことがゲームの喜びに本質的に重要な役割は果たす場合は、対策が必要です。

一般的な対策としては、  
* 空いているネットワークを使う
* ハードウェア入力を扱う場合、Raspberry piのUSB端子やGPIO端子に直接有線接続して処理する
* Raspberry piをよりハイスピードなコンピュータに置き換える

などが考えられます。

## その他のトピック
### GameControllerizerの外部ボタンを使う
GameControllerizer ver.1基板には、４つのボタン（B0,B1,B2,B3）がついています。これらのボタンが押されたときの動作をプログラミングするためフローがNode-REDに用意されています。 タイトル画面からゲームスタートまでのメニュー操作を行うことなどに使うと良いかもしれません。

### GcScannerについて
http://<Raspberry piのIPアドレス>:8080  
にFireFoxブラウザからアクセスしてください。すると、そのPCに接続されているUSBゲームパッドの入力をそのままRaspberry Piに伝送することができます。通常のゲームコントローラ操作に加えてなにか補助的な入力システムを作りたいときなどにご活用ください。

###### **【参考：最初は読まなくて良い】**  【参考：最初は読まなくて良い】 GameControllerzerは、現在サポート外としていますが、ゲームパッドだけでなく、マウスとキーボードによる入力も扱う設計となっています。GcScannerでも、チェックボックスをクリックすることにより、ゲームパッド、マウス、キーボードの入力をRaspberry Pi上のNode-REDに伝えることができます。また、Node-RED側のプログラムを書き換えれば、キーボード入力をゲームパッド入力に変換するなども可能です。

### お役立ちリンク：
* x360ce:　windowsの「コントローラエミュレータ」で、ゲームパッドのボタンが押されてたことを視覚的に教えてくれるチェックソフトです。
    * https://www.x360ce.com/　
