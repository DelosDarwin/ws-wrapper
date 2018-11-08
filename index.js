const WebSocket = require('ws');

class WebSocketWrapper {
    constructor(url, options = {}) {
        this.url = url;
        this.isReconnect = true;
        this.reconnectDelay = options.reconnectDelay || 2000;
        this.handlers = {};

        this.init();
    }

    init() {
        if (this.ws) {
            console.log(`Reconnecting to ${this.url}`);
            this.handlers = {};
            this.ws.terminate();
        }

        this.ws = new WebSocket(this.url);

        this.ws.on('close', () => {
            if (this.handlers.close) this.handlers.close();
            if (this.isReconnect) this.reconnect();
        });

        this.ws.on('open', () => {
            if (this.handlers.open) this.handlers.open();
            
        });

        this.ws.on('message', (m) => {
            if (this.handlers.message) this.handlers.message(m);
            
        });

        this.ws.on('error', (e) => {
            if (this.handlers.error) this.handlers.error(e);
        });
    }

    on(event, handler) {
        this.handlers[event] = handler;
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
};

WebSocketWrapper.Server = WebSocket.Server;
WebSocketWrapper.Receiver = WebSocket.Receiver;
WebSocketWrapper.Sender = WebSocket.Sender;

module.exports = WebSocketWrapper;
