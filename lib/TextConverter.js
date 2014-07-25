var BaseConverter = require('./BaseConverter');
var log           = require('./util/logger').log;

module.exports = TFCTextConverter;

function TFCTextConverter(src, ratio) {
    this.src = src;
    this.ratio = ratio;
    this.parseArguments();
}

TFCTextConverter.prototype = new BaseConverter();

TFCTextConverter.execute = function(src, ratio) {
    var conv = new TFCTextConverter(src, ratio);

    return conv.convert();
};

TFCTextConverter.prototype.convert = function() {
    var cvd = [];

    cvd[0] = this.args[0];
    cvd[1] = this._convertFontSize(this.args[1]);

    if (this.args[2]) {
        cvd[2] = this.args[2];
    }

    log('Text convert (' + this.src + ') -> (' + cvd.join(', ') + ')');

    return cvd.join(',');
};

TFCTextConverter.prototype._convertFontSize = function(text) {
    var ratio = this.ratio;

    return text.replace(/([0-9]+)px/, function(match, size) {
         return match.replace(size, parseInt(size, 10) * ratio);
    });
};
