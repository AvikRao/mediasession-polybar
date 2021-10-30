const ws = require("ws");
const wss = new ws.WebSocketServer({ port: 3033 });

let data;

console.log("Started MediaSession connection server.");
wss.on('connection', (connection) => {

    console.log("Connected to MediaSession instance.");
    connection.on('message', (message) => {
        data = JSON.parse(message);
        let playing = data.status == "playing";
        if (playing) {
            console.log("%{F#50FA7B}%{F-} %s | %s %{F#F1FA8C}%s%{F-}", data.title, data.artist, '');
        } else {
            console.log("%{F#50FA7B}%{F-} %s | %s %{F#50FA7B}%s%{F-}", data.title, data.artist, '');
        }
    });
    // #F1FA8C pause
    // #50FA7B play
});
