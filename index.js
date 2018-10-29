const WebSocket = require('ws');

class WebSocketWrapper {
    constructor({ url, onOpen, onClose, onError }) {
        this.onOpen = onOpen;
        this.onClose = onClose;
        this.onError = onError;
        this.init(url);
    }

    init(url) {
        this.ws = new WebSocket(url);
        this.url = url;

        this.ws.on('close', () => {
            this.onclose();
            this.onClose && this.onClose();
        });

        this.ws.on('open', () => {
            console.log('Connection is open');
            
            if (this.interval) clearInterval(this.interval);
            this.onOpen && this.onOpen();
        });

        this.ws.on('error', () => {
            this.onclose();
            this.onError && this.onError();
        });
    }

    onclose() {
        if (this.interval) clearInterval(this.interval);
        
        this.interval = setInterval(() => {
            console.log('Trying to reconnect to ', this.url);
            
            this.init(this.url);
        }, 1000); 
    }
};

module.exports = WebSocketWrapper;