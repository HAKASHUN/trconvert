var BaseConverter = require('../BaseConverter');
var log           = require('../util/logger').log;
var _             = require('lodash');

module.exports = Rect;

function Rect(src, ratio) {
    this.src = src;
    this.ratio = ratio;
    this.parseArguments();
}

Rect.prototype = new BaseConverter();

Rect.execute = function(src, ratio) {
    var rect = new Rect(src, ratio);

    return rect.convert();
};

Rect.prototype.convert = function() {
    var ratio = this.ratio;
    var cvd   = this.args.map(function(arg) {
        var result = arg * ratio;

        if (_.isNaN(result)) {
          // stringの場合は ratioをかけた式にして返却
            return '(' + arg + ') *' +  ratio;
        }
        
        return result;
    });

    log('Rect convert (' + this.src + ') -> (' + cvd.join(', ') + ')');

    return cvd.join(',');
};

