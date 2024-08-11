const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

console.log("WebSocket server is running on port 8080");

wss.on('connection', (ws) => {
    console.log("A new client has connected");

    ws.on("message", (message) => {
        console.log("Received message:", message);

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on("close", () => {
        console.log("Client Disconnected");
    });
});
