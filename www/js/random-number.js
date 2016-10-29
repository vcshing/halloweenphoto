// if only one argument is passed, it will assume that is the high
// limit and the low limit will be set to zero
// so you can use either r = new randomeGenerator(9);
// or r = new randomGenerator(0, 9);
function randomGenerator(low, high) {
    if (arguments.length < 2) {
        high = low;
        low = 0;
    }
    this.low = low;
    this.high = high;
    this.reset();
}

randomGenerator.prototype = {
    reset: function() {
        this.remaining = [];
        for (var i = this.low; i <= this.high; i++) {
            this.remaining.push(i);
        }
    },
    get: function() {
        if (!this.remaining.length) {
           return 0;
		   //this.reset();
        }
        var index = Math.floor(Math.random() * this.remaining.length);
        var val = this.remaining[index];
        this.remaining.splice(index, 1);
        return val;        
    }
}