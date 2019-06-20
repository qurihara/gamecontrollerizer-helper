# チュートリアル：【Windows/Mac対応】micro:bitで始めるGameControllerizer ~とりあえず動かしたい！編

それではGameControllerizerをmicro:bitで遊んでいきましょう。本チュートリアルは、とりあえずGameControllerizerを動かすところまで最速で進めます。

- 目次
  - 準備するもの
  - 接続
  - micro:bitについて
  - 最初のGameControllerizerサンプル
  - 次のステップ

## 準備するもの
- パソコン  
  - 【推奨】USBコネクタが２つ以上あるWindowsもしくはMac
    - パソコンは、プログラミング用とゲーム動作マシンの２つの役割に使います。
    - USBコネクタが１つしかないPCの場合、micro:bitにプログラムを書き込みたいときと、ゲームコントローラとして遊びたいときでUSBケーブルを選んで抜き差しすれば大丈夫です。ただし、だいたいの場合、micro:bitへの給電が別途必要です。
- ハードウェア
  - GameControllerizer基板  
  - Groveコネクタケーブル  
  - micro:bit  
  - micro:bit Groveシールド  
  - USBケーブル（PCとmicro:bitをつなぐ。micro:bitに給電し、プログラムを書き込むためのもの。）  
  - USBケーブル（PCとGameControllerizerをつなぐ。ゲームコントローラとしてPCに操作指示を送るためのもの。）  
- ゲーム
    - パソコン上のブラウザで動くゲームとして https://yoh7686.github.io/SpaceReflection/ を開いてください。アナログスティックとワンボタンのみを用いるゲームです。

## 接続
まず図のようにハードウェアを接続します。  

PC --> USBケーブル --> micro:bit --> micro:bit Groveシールド --> Groveコネクタケーブル（P0/P14へ接続） --> GameControllerizer基板 --> USBケーブル --> PC

## micro:bitについて
micro:bitのプログラミングやダウンロードの仕方が全くわからない方は、以下を見てください。  
https://microbit.org/ja/guide/quick/  
以下、micro:bitのプログラミングとダウンロードの方法は最低限理解した前提で進めます。  
（micro:bitのプログラミングは、スマホやタブレットでもできます。その場合は、無線を使ってプログラムのダウンロードをします。）  

## 最初のGameControllerizerサンプル
以下のリンクを開いてください。    
https://makecode.microbit.org/_LzJ7iJ4koTYR  
基本的には、このようにmicro:bitの通常のプログラミングの中に、GameControllerizer独自のブロックたちを組み込むことでゲームコントローラのプログラミングを進めていきます。簡単ですね！  

「編集」を押してください。このサンプルプログラムを、自分のプログラムとしてコピーして編集できるようになります。
自分のmicro:bitにダウンロードして、動作確認してみましょう。micro:bitを上下左右に傾けると、ゲーム内でキャラクタも動きます。Aボタンで弾発射とバリア発動（序盤のアイテム取得後）です。
That's it!

## 次のステップ

チュートリアル：micro:bitで始めるGameControllerizer ~そこそこコントローラ制作編  
https://github.com/qurihara/gamecontrollerizer-helper/tree/gh-pages/tutorial/microbit-starter
