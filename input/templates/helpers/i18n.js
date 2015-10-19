module.exports = function (i18nKey, options) {
    var opts = options.hash;

    if (opts.bundle) {
        i18nKey = opts.bundle + ':' + i18nKey;
    }
    var result = i18n.t(i18nKey, opts);
    return new Handlebars.SafeString(result);
};
