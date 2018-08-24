var Gamepad = function(sender) {
    if(!(this instanceof Gamepad)) {
        return new Gamepad(sender);
    }
    this.sender = sender;
    this.dpad = [];
    this.btn  = [];
    this.ang = [0,0,0,0];
}

Gamepad.prototype.setDpad = function(dpad) {
    this.dpad = dpad;
    return this;
}
Gamepad.prototype.setBtn = function(btn) {
    this.unsetBtn(btn);
    this.btn.push(btn);
    return this;
}
Gamepad.prototype.unsetBtn = function(btn) {
    this.btn = this.btn.filter(n => n !== btn);
    return this;
}
Gamepad.prototype.setAng0 = function(x,y) {
    this.ang = [x,y,this.ang[2],this.ang[3]];
    return this;
}
Gamepad.prototype.setAng1 = function(x,y) {
    this.ang = [this.ang[0],this.ang[1],x,y];
    return this;
}
Gamepad.prototype.getDsl = function() {
  var dsl = [{"dpad":this.dpad, "btn":this.btn, "ang":this.ang, "dur":-1}];
//  console.log(dsl);
  return dsl;
}
Gamepad.prototype.send = function() {
    return this.sendDsl(this.getDsl());
}
Gamepad.prototype.sendDsl = function(dsl) {
    var array = this.binarySerializer(dsl);
    this.sender.send(array);
    return this;
}

Gamepad.prototype.binarySerializer = function(gc_sentence) {
  //            try {
  var binary_sentence = [];
  for (let gc_word of gc_sentence)
  binary_sentence = binary_sentence.concat(Array.from(this.toBinGamepad(gc_word)));
  return binary_sentence;
  //            } catch (e) {
  //            }
}
Gamepad.prototype.toBinGamepad = function(c) {
  var btn = 0x000;
  for (let i=0; i<c.btn.length; i++)
  btn |= (0x001<<c.btn[i]);
  const buf = new Uint8Array(8);//Buffer.alloc(8, 0);
  buf[0] = 0x5A;
  buf[1] = c.dur;
  buf[2] = dpad_encode_table[c.dpad] | (btn>>8);
  buf[3] = btn;
  buf[4] = c.ang[0];
  buf[5] = c.ang[1];
  buf[6] = c.ang[2];
  buf[7] = c.ang[3];
  //console.log(buf);
  return buf;
}

// data[02] LF DW  RT  UP  ST  --  --  SE
// data[03] |_  X   O  /\  R2  R1  L1  L2
const dpad_encode_table = [
  0x00,
  0xC0,
  0x40,
  0x60,
  0x80,
  0x00,
  0x20,
  0x90,
  0x10,
  0x30
];
//const dpad_flip_table = [0,3,2,1,6,5,4,9,8,7];
