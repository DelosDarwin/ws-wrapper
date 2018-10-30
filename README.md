# ws

Wrapper around "ws" npm package with implementation of websocket reconnection when connection's readyState changes to CLOSED ('close' event is fired).

## Usage

```javascript
const WebSocketWrapper = require('ws-wrapper');

const ws = new WebSocketWrapper({
    url: 'http://localhost:3030',
    reconnectDelay: 3000    // optional, default is 1000
}).ws;

ws.on('open', e => { ... });
ws.on('message', e => { ... });
ws.on('close', e => { ... });
ws.on('error', e => { ... });
```

We need "ws" property from WebSocketWrapper because WebSocketWrapper isn't extended from WebSocket ('ws' package), but it has ws property which is a child of WebSocket ('ws' package) class.
