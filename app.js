const express = require('express');
const expressWs = require('express-ws');
const cors = require('cors');
const WebSocket = require('ws');

const app = express();
app.use(cors());
expressWs(app);

// Websocket Clients
const TdataClients = new Set();
const MessagesClients = new Set();
const WaypointsClients = new Set();
const ConnectClients = new Set();

app.ws('/tdata', (ws, req) => {
  TdataClients.add(ws);

  ws.on('message', (msg) => {
    // Broadcast message to all clients in '/data' route
    TdataClients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });

  ws.on('close', () => {
    // Remove closed connection from the clients list
    TdataClients.delete(ws);
  });
});

app.ws('/messages', (ws, req) => {
  MessagesClients.add(ws);

  ws.on('message', (msg) => {
    // Broadcast message to all clients in '/messages' route
    MessagesClients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });

  ws.on('close', () => {
    // Remove closed connection from the clients list
    MessagesClients.delete(ws);
  });
});

app.ws('/waypoints', (ws, req) => {
  WaypointsClients.add(ws);

  ws.on('message', (msg) => {
    // Broadcast message to all clients in '/messages' route
    WaypointsClients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        //console.log(msg)
        client.send(msg);
      }
    });
  });

  ws.on('close', () => {
    // Remove closed connection from the clients list
    WaypointsClients.delete(ws);
  });
});

app.ws('/connect', (ws, req) => {
  ConnectClients.add(ws);

  ws.on('message', (msg) => {
    // Broadcast message to all clients in '/messages' route
    ConnectClients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        //console.log(msg)
        client.send(msg);
      }
    });
  });

  ws.on('close', () => {
    // Remove closed connection from the clients list
    ConnectClients.delete(ws);
  });
});

app.listen(4000, () => {
  console.log('WebSocket server running on port 4000');
});
