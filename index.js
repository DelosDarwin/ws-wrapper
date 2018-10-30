const WebSocket = require('ws');

class WebSocketWrapper {
    constructor({ url, reconnectDelay }) {
        this.reconnectDelay = reconnectDelay || 1000;
        this.init(url);
    }

    init(url) {
        if (this.ws) {
            const prevEventHandlers = { ...this.ws._events };

            this.ws = new WebSocket(url);
            this.ws._events = { ...prevEventHandlers };
        } else {
            this.ws = new WebSocket(url);
            this.url = url;

            this.ws.on('close', () => {
                this.onclose();
            });

            this.ws.on('open', () => {
                console.log('Connection is open');
                
                if (this.interval) clearInterval(this.interval);
            });

            this.ws.on('error', () => {
                this.onclose();
            });
        }
    }

    onclose() {
        if (this.interval) clearInterval(this.interval);

        this.interval = setInterval(() => {
            console.log('Trying to reconnect to ', this.url);

            this.init(this.url);
        }, this.reconnectDelay); 
    }
};

module.exports = WebSocketWrapper;
