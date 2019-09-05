# ws-wrapper

Wrapper around "ws" npm package with implementation of websocket reconnection when connection's readyState changes to CLOSED ('close' event is fired).

## Usage

### Client
```javascript
const WebSocketWrapper = require('ws-wrapper');

const ws = new WebSocketWrapper('ws://0.0.0.0:8080', { reconnectDelay: 3000 });
// reconnectDelay is optional, default is 2000
// Also, second argument can contain some options for "ws", like perMessageDeflate etc

ws.on('open', () => { ... });
ws.on('message', m => { ... });
ws.on('close', () => { ... });
ws.on('error', e => { ... });
```

### Server
```javascript
const WebSocketWrapper = require('ws-wrapper');

const wss = new WebSocketWrapper.Server({ port: '8080' });

wss.on('connection', ws => {
    console.log('connected to server');

    ws.on('message', m => {
        console.log('MESSAGE', m);
    });

    ws.on('error', e => {
        console.log('Error', e);
    });
});
```
