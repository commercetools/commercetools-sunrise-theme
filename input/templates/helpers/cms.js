module.exports = {
    init: function (options) {
        var handlebars = require('handlebars');
        var i18n = options.i18n;

        return function (cmsKey, options) {
            var opts = options.hash;

            if (opts.bundle) {
                cmsKey = opts.bundle + ':' + cmsKey;
            }

            var result = i18n.t(cmsKey, opts);
            return new handlebars.SafeString(result);
        }
    }
};
