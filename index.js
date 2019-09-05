const WebSocket = require('ws');

class WebSocketWrapper {
    constructor(url, options = {}) {
        this.url = url;
        this.isReconnect = true;
        this.reconnectDelay = options.reconnectDelay || 2000;
        this.handlers = {
            open: [],
            message: [],
            error: [],
            close: []
        };

        this.init();
    }

    init() {
        if (this.ws) {
            console.log(`Reconnecting to ${this.url}`);
            this.ws.terminate();
        }

        this.ws = new WebSocket(this.url);

        this.ws.on('close', () => {
            this._executeHandlers('close');
            if (this.isReconnect) this.reconnect();
        });

        this.ws.on('open',   () => this._executeHandlers('open'));
        this.ws.on('message', m => this._executeHandlers('message', m));
        this.ws.on('error',   e => this._executeHandlers('error', e));
    }

    on(event, handler) {
        this.handlers[event].push(handler);
    }

    removeListener(event, handler) {
        const indexOfHandlerToRemove = this.handlers[event].indexOf(handler);

        this.handlers[event].splice(indexOfHandlerToRemove, 1);
    }

    reconnect() {
        setTimeout(() => {
            this.init();
        }, this.reconnectDelay);
    }

    send() {
        try {
            this.ws.send(...arguments);
        } catch (e) {
            console.log(e);
        }
    }

    close() {
        this.ws.close(...arguments);
    }

    ping() {
        this.ws.ping(...arguments);
    }

    pong() {
        this.ws.pong(...arguments);
    }

    terminate() {
        this.ws.terminate(...arguments);
    }

    _executeHandlers(event, eventResp) {
        this.handlers[event].forEach(handler => handler(eventResp));
    }
};

WebSocketWrapper.Server   = WebSocket.Server;
WebSocketWrapper.Receiver = WebSocket.Receiver;
WebSocketWrapper.Sender   = WebSocket.Sender;

module.exports = WebSocketWrapper;
