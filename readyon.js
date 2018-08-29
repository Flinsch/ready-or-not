
(function() {

    var readyon = (function() {
        
        var readyon = {};
        readyon.config = {};

        var defaultConfig = {
            domLoadDefault: true,
            ajaxCompleteDefault: true,
            log: false
        };

        var onReadyCallbacks = [];
        var onReadyOnceCallbacks = [];

        readyon.onReady = function(callback) {
            onReadyCallbacks.push(callback);
            return readyon;
        };

        readyon.onReadyOnce = function(callback) {
            onReadyOnceCallbacks.push(callback);
            return readyon;
        };

        readyon.ready = function(data) {
            if (readyon.config.log) {
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

        return readyon;
    })();

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = readyon;
    } else {
        window.readyon = readyon;
    }
})();
