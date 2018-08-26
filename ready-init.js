var readyon = readyon || {};

(function() {

    var onReadyCallbacks = [];
    var onReadyOnceCallbacks = [];

    var defaultConfig = {
        domLoadDefault: true,
        ajaxCompleteDefault: true,
        log: false
    };

    readyon.config = readyon.config || {};

    for (var prop in defaultConfig) {
        if (!(prop in readyon.config)) {
            readyon.config[prop] = defaultConfig[prop];
        }
    }

    readyon.onReady = function(callback) {
        onReadyCallbacks.push(callback);
    };

    readyon.onReadyOnce = function(callback) {
        onReadyOnceCallbacks.push(callback);
    };

    readyon.ready = function(data) {
        if (readyon.config.hasOwnProperty('log') && readyon.config.log) {
            console.log('ready');
        }
        var tmpReadyCallbacks = onReadyCallbacks;
        var tmpReadyOnceCallbacks = onReadyOnceCallbacks;
        onReadyOnceCallbacks = [];
        for (var i = 0; i < tmpReadyCallbacks.length; ++i) {
            tmpReadyCallbacks[i](data);
        }
        for (var i = 0; i < tmpReadyOnceCallbacks.length; ++i) {
            tmpReadyOnceCallbacks[i](data);
        }
    };
})();
