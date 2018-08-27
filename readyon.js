var readyon = readyon || {};

(function() {

    var onReadyCallbacks = [];
    var onReadyOnceCallbacks = [];

    var defaultConfig = {
        domLoadDefault: true,
        ajaxCompleteDefault: true,
        log: false
    };

    readyon.config = {};

    readyon.onReady = function(callback) {
        onReadyCallbacks.push(callback);
        return readyon;
    };

    readyon.onReadyOnce = function(callback) {
        onReadyOnceCallbacks.push(callback);
        return readyon;
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
        return readyon;
    };

    readyon.init = function(config) {
        config = config || {};
        for (var prop in defaultConfig) {
            if (prop in config) {
                readyon.config[prop] = config[prop];
            } else {
                readyon.config[prop] = defaultConfig[prop];
            }
        }
        return readyon;
    };

    readyon.bind = function() {
        if (readyon.config.domLoadDefault) {
            $(function() {
                readyon.ready();
            });
        }
        if (readyon.config.ajaxCompleteDefault) {
            $(document).ajaxComplete(function() {
                readyon.ready();
            });
        }
        return readyon;
    };
})();
