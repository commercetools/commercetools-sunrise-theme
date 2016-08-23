module.exports = function () {
    var params = [];
    for(i = 0; i < arguments.length - 1; i++) {
        params.push(arguments[i]);
    }
    return params.join('');
};
