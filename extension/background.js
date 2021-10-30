const ws = new WebSocket("ws://localhost:3033");

ws.onmessage = (message) => {
    console.log(message);
}

browser.runtime.onConnect.addListener((connection) => {
    connection.onMessage.addListener(function(message) {
        console.log(message);
        ws.send(JSON.stringify(message));
    });
});

