const express = require('express');
const expressWs = require('express-ws');

const app = express();
expressWs(app);

// Define WebSocket handlers for each route
app.ws('/websocket/route1', function(ws, req) {
    ws.on('message', function(msg) {
        console.log('Received message on route1:', msg);
        ws.send('Response from route1: ' + msg);
    });
});

app.ws('/websocket/route2', function(ws, req) {
    ws.on('message', function(msg) {
        console.log('Received message on route2:', msg);
        ws.send('Response from route2: ' + msg);
    });
});

// Define regular HTTP routes
app.get('/route1', function(req, res) {
    res.send('This is route1');
});

app.get('/route2', function(req, res) {
    res.send('This is route2');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
