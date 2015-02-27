function VasthuUnit(cm) {
	this.koal = 0;
	this.viral = 0;
	this.yava = 0;
	this.cm = 0;
	if (arguments.length == 1) {
	    this.cm = arguments[0];
	    var negative = false;
        if (cm < 0)
        {
            negative = true;
            cm = cm * -1;
        }
        var reminder;
		this.koal = Math.floor(cm / 72);
		reminder = cm % 72;
		this.viral = Math.floor(reminder / 3);
		reminder = reminder % 3;
		this.yava = reminder / (3 / 8);
		this.yava = parseFloat(this.yava);
        if (negative)
        {
            this.koal = this.koal * -1;
            this.viral = this.viral * -1;
            this.yava = this.yava * -1;
        }
	} else if (arguments.length == 3) {
		this.koal = arguments[0];
		this.viral = arguments[1];
		this.yava = arguments[2];
		this.cm = this.koal * 72 + this.viral * 3 + this.yava * (3 / 8);
	}
	this.getCM = function() {
		cm = this.koal * 72.0 + this.viral * 3.0 + this.yava * (3 / 8);
		return (parseFloat(cm));
	}
	this.getVasthuUnit = function () {
	    if (cm < 0) {
	        console.log("Reverse");
	        reverseSign();
	    }
	    var k = Math.floor(this.cm / 72);
	    var reminder = this.cm % 72;
	    var v = Math.floor(reminder / 3);
	    reminder = reminder % 3;
	    var y = reminder / (3 / 8);
	    y = parseFloat(y).toFixed(2);
	    var ret = new VasthuUnit(k, v, y);
	    if (cm < 0) {
	        ret.reverseSign();
	    }
	    return ret;
	}
	this.add = function(val) {
		this.cm = Math.floor(this.cm + val.cm);
		this.koal = this.koal + val.koal;
		this.viral = this.viral + val.viral;
		this.yava = this.yava + val.yava;
		this.rearrange();
	}
	this.subtract = function (val) {
	    this.cm = Math.floor(this.cm - val.cm);
	    var sum = this.getCM() - val.getCM();

	    this.koal = this.koal - val.koal;
	    this.viral = this.viral - val.viral;
	    this.yava = this.yava - val.yava;
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
		this.koal = this.koal / val;
		this.viral = this.viral / val;
		this.yava = this.yava / val;
		this.rearrange();
	}
	this.rearrange = function () {
	    var negative = this.isNegative();
	    if (negative) {
	        reverseSign();
	    }
	    var fractionKoal = parseFloat(this.koal % 1);
	    if (fractionKoal > 0) {
	        this.koal = Math.floor(this.koal);
	        this.viral = this.viral + fractionKoal * 24;
	    }
	    var fractionViral = parseFloat(this.viral % 1);
	    if (fractionViral > 0) {
	        this.viral = Math.floor(this.viral);
	        this.yava = this.yava + fractionViral * 8;
	    }
	    if (this.yava >= 8) {
	        var viralToAdd = Math.floor(this.yava / 8);
	        this.viral = this.viral + viralToAdd;
	        this.yava = parseFloat(this.yava % 8);
	    }
	    if (this.viral >= 24) {
	        var koalToAdd = Math.floor(this.viral / 24);
	        this.koal = this.koal + koalToAdd;
	        this.viral = this.viral % 24;
	    }
        if (negative)
        {
            reverseSign();
        }
	}
	this.clone = function() {
		return new VasthuUnit(this.koal, this.viral, this.yava);
	}
	this.toString = function() {
		return this.koal + " koal " + this.viral + " viral " + parseFloat(this.yava).toFixed(2) + " yava";
	}
	this.reverseSign = function () {
	    this.cm = this.cm * -1;
	    this.koal = this.koal * -1;
	    this.viral = this.viral * -1;
	    this.yava = this.yava * -1;
	}
	this.updateCMValue = function () {
	    if (arguments.length > 0) {
	        this.cm = arguments[0];
	    }
        var reminder;
		this.koal = Math.floor(cm / 72);
		reminder = cm % 72;
		this.viral = Math.floor(reminder / 3);
		reminder = reminder % 3;
		this.yava = reminder / (3 / 8);
		this.yava = parseFloat(this.yava);
	}
	this.isNegative = function () {
	    return this.koal < 0 && this.viral < 0 && this.yava < 0;
	}
}