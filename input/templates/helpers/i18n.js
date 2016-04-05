module.exports = {
    init: function (options) {
        var handlebars = require('handlebars');
        var i18n = options.i18n;

        return function (i18nKey, options) {
            var handlebars = require('handlebars');
            var opts = options.hash;

            if (opts.bundle) {
                i18nKey = opts.bundle + ':' + i18nKey;
            }
            var result = i18n.t(i18nKey, opts);
            if (i18n.options.lng == 'zz') {
                var replaceChar = 'z';
                if (result !== i18nKey) {
                    result = result.replace(/[a-z]/g, replaceChar).replace(/[A-Z]/g,replaceChar.toUpperCase());
                }
            }

            return new handlebars.SafeString(result);
        }
    }
};
