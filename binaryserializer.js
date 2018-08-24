var toBinX = toBinGamepad;
//var toBinX = toBinMouse;
//var toBinX = toBinKeyboard;

function binarySerializer(gc_sentence) {
  //            try {
  var binary_sentence = [];
  for (let gc_word of gc_sentence)
  binary_sentence = binary_sentence.concat(Array.from(toBinX(gc_word)));
  return binary_sentence;
  //            } catch (e) {
  //            }
}
function toBinGamepad(c) {
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
const dpad_flip_table = [0,3,2,1,6,5,4,9,8,7];

// HID key code
// http://www.usb.org/developers/hidpage/Hut1_12v2.pdf
// page.53
const hidkey_encode_table = {
  "a" : 0x04,
  "b" : 0x05,
  "c" : 0x06,
  "d" : 0x07,
  "e" : 0x08,
  "f" : 0x09,
  "g" : 0x0A,
  "h" : 0x0B,
  "i" : 0x0C,
  "j" : 0x0D,
  "k" : 0x0E,
  "l" : 0x0F,
  "m" : 0x10,
  "n" : 0x11,
  "o" : 0x12,
  "p" : 0x13,
  "q" : 0x14,
  "r" : 0x15,
  "s" : 0x16,
  "t" : 0x17,
  "u" : 0x18,
  "v" : 0x19,
  "w" : 0x1A,
  "x" : 0x1B,
  "y" : 0x1C,
  "z" : 0x1D,
  "1" : 0x1E,
  "2" : 0x1F,
  "3" : 0x20,
  "4" : 0x21,
  "5" : 0x22,
  "6" : 0x23,
  "7" : 0x24,
  "8" : 0x25,
  "9" : 0x26,
  "0" : 0x27,
  "Enter" : 0x28,
  "Escape" : 0x29,
  "Backspace" : 0x2A,
  "Tab" : 0x2B,
  "Space" : 0x2C,
  "F1" : 0x3A,
  "F2" : 0x3B,
  "F3" : 0x3C,
  "F4" : 0x3D,
  "F5" : 0x3E,
  "F6" : 0x3F,
  "F7" : 0x40,
  "F8" : 0x41,
  "F9" : 0x42,
  "F10" : 0x43,
  "F11" : 0x44,
  "F12" : 0x45,
  "Delete" : 0x4C,
  "ArrowRight" : 0x4F,
  "ArrowLeft" : 0x50,
  "ArrowDown" : 0x51,
  "ArrowUp" : 0x52
};
function toBinMouse(c) {
  var btn = 0x00; // bit 0: MOUSE_LEFT, bit 1: MOUSE_RIGHT, bit 2: MOUSE_MIDDLE
  for (let i=0; i<c.btn.length; i++)
  btn |= (0x01<<c.btn[i]);
  const buf = new Uint8Array(8);//Buffer.alloc(8, 0);
  buf[0] = 0x5B;
  buf[1] = c.dur;
  buf[2] = btn;
  buf[3] = c.mov[0];
  buf[4] = c.mov[1];
  buf[5] = 0;
  buf[6] = 0;
  buf[7] = 0;
  return buf;
}
function toBinKeyboard(c) {
  var key = [0,0,0,0,0];
  for (let i=0; i<Math.min(c.key.length, 5); i++){
    const keycode = hidkey_encode_table[c.key];
    if (keycode)
    key[i] = keycode;
  }
  var mod = 0x00; // bit 0: KEY_CTRL, bit 1: KEY_SHIFT, bit 2: KEY_ALT (default: 0)
  for (let i=0; i<c.mod.length; i++)
  mod |= (0x01<<c.mod[i]);
  const buf = new Uint8Array(8);//Buffer.alloc(8, 0);
  buf[0] = 0x5C;
  buf[1] = c.dur;
  buf[2] = mod;
  buf[3] = key[0];
  buf[4] = key[1];
  buf[5] = key[2];
  buf[6] = key[3];
  buf[7] = key[4];
  return buf;
}
