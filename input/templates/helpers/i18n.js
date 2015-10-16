module.exports = function (i18nKey, options) {
    var opts = options.hash;


    i18n.pluralExtensions.currentRule = function() {

    };
    var result = i18n.t(i18nKey, opts);
    return new Handlebars.SafeString(result);
};
