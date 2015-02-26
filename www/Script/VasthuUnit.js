function VasthuUnit(cm) {
	this.koal = 0;
	this.viral = 0;
	this.yava = 0;
	this.cm = 0;
	if (arguments.length == 1) {
		var reminder;
		this.cm = cm;
		this.koal = Math.floor(cm / 72);
		reminder = cm % 72;
		this.viral = Math.floor(reminder / 3);
		reminder = reminder % 3;
		this.yava = reminder / (3 / 8);
		this.yava = this.yava.toFixed(1);
	} else if (arguments.length == 3) {
		this.koal = arguments[0];
		this.viral = arguments[1];
		this.yava = arguments[2];
		this.cm = this.koal * 72 + this.viral * 3 + this.yava * (3 / 8);
	}
	this.getCM = function() {
		cm = this.koal * 72 + this.viral * 3 + this.yava * (3 / 8);
		return (cm.toFixed(2));
	}
	this.getVasthuUnit = function() {
		var ret = {};
		ret.koal = Math.floor(this.cm / 72);
		var reminder = this.cm % 72;
		ret.viral = Math.floor(reminder / 3);
		reminder = reminder % 3;
		ret.yava = reminder / (3 / 8);
		ret.yava = ret.yava.toFixed(1);
		return ret;
	}
	this.add = function(val) {
		this.cm = Math.floor(this.cm + val.cm);
		this.koal = Math.floor(this.koal + val.koal);
		this.viral = Math.floor(this.viral + val.viral);
		this.yava = Math.floor(this.yava + val.yava);
		this.rearrange();
	}
	this.subtract = function(val) {
		this.cm = Math.floor(this.cm - val.cm);
		this.koal = Math.floor(this.koal - val.koal);
		this.viral = Math.floor(this.viral - val.viral);
		this.yava = Math.floor(this.yava - val.yava);
		this.rearrange();
	}
	this.multiply = function(val) {
		this.cm = this.cm * val;
		this.koal = this.koal * val;
		this.viral = this.viral * val;
		this.yava = this.yava * val;
		this.rearrange();
	}
	this.divide = function(val) {
		var r = 0;
		this.koal = this.koal / val;
		r = this.koal - Math.floor(this.koal);
		this.viral = this.viral + r * 72;
		this.koal = Math.floor(this.koal);
		this.viral = this.viral / val;
		r = this.viral - Math.floor(this.viral);
		this.yava = this.yava + r * (8);
		this.viral = Math.floor(this.viral);
		this.yava = (this.yava / val).toFixed(2);
		if (this.yava >= 8) {
			this.rearrange();
		}
	}
	this.rearrange = function() {
		var integerPart = Math.floor(this.koal);
		var r = 0;
		if (this.koal != integerPart) {
			r = this.koal - integerPart;
			this.koal = r;
			this.viral = this.viral + r * 24;
			integerPart = Math.floor(this.koal);
			r = this.viral - integerPart;
			this.viral = r;
			this.yava = this.yava + r * 8;
		}
		if (this.yava >= 8) {
			this.viral = Math.floor(this.viral + this.yava / 8);
			this.yava = this.yava % 8;
			this.yava = this.yava.toFixed(2);
		}
		if (this.viral >= 24) {
			this.koal = Math.floor(this.koal + this.viral / 24);
			this.viral = this.viral % 24;
		}
	}
	this.clone = function() {
		return new VasthuUnit(this.koal, this.viral, this.yava);
	}
	this.toString = function() {
		return this.koal + " koal " + this.viral + " viral " + this.yava + " yava";
	}
}