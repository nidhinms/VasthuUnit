function VasthuUnit(cm) {

    this.koal = 0;
    this.viral = 0;
    this.yava = 0;

    if (arguments.length == 1) {
        var reminder;

        this.koal = cm / 72;
        reminder = cm % 72;
        this.viral = reminder / 3;
        this.yava = reminder / 8;
    }
    else if (arguments.length == 3) {
        this.koal = arguments[0];
        this.viral = arguments[1];
        this.yava = arguments[2];
    }

    this.updateCMValue = function(cm){
        var reminder;

        this.koal = Math.floor(cm / 72);
        reminder = cm % 72;
        this.viral = Math.floor(reminder / 3);
        this.yava = Math.floor(reminder / 8);
    }
}

