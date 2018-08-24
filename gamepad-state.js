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
Gamepad.prototype.send = function() {
    var array = binarySerializer(this.getDsl());
    this.sender.send(array);
}
Gamepad.prototype.getDsl = function() {
  var dsl = [{"dpad":this.dpad, "btn":this.btn, "ang":this.ang, "dur":-1}];
//  console.log(dsl);
  return dsl;
}
