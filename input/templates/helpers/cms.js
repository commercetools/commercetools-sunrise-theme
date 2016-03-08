module.exports = function (cmsKey, options) {
    var opts = options.hash;

    if (opts.bundle) {
        cmsKey = opts.bundle + ':' + cmsKey;
    }
    
    var result = i18n.t(cmsKey, opts);
    return new Handlebars.SafeString(result);
};
