/**
 * flashMessages
 * { message: String,
 *   style: String,
 *   seen: Boolean }
 */
flashMessages = new Mongo.Collection(null);

FlashMessages = {
    sendWarning: function(message, title, options) {
        sendMessage(message, title, 'warning', options);
    },
    sendNegative: function(message, title, options) {
        sendMessage(message, title, 'negative alert-danger', options);
    },
    sendPositive: function(message, title, options) {
        sendMessage(message, title, 'positive', options);
    },
    sendInfo: function(message, title, options) {
        sendMessage(message, title, 'info', options);
    },
    clear: function() {
        flashMessages.remove({
            seen: true
        });
    },
    configure: function(options) {
        this.options = this.options || {};
        _.extend(this.options, options);
    },
    options: {
        autoHide: true,
        hideDelay: 5000,
        autoScroll: true
    }
};

sendMessage = function(message, title, style, options) {
    options = options || {};
    options.autoHide = options.autoHide === undefined ? FlashMessages.options.autoHide : options.autoHide;
    options.hideDelay = options.hideDelay || FlashMessages.options.hideDelay;
    flashMessages.insert({
        message: message,
        title: title,
        style: style,
        seen: false,
        options: options
    });
};
