const port = browser.runtime.connect();

port.onMessage.addListener((message) => {
    console.log(message);
});

let elem = document.createElement("script");

window.addEventListener("message", (e) => {
    console.log(e.data);
    
    if (!e.data || !e.data.title || !e.data.artist)
        return;

    let { title, artist, state } = e.data;

    port.postMessage({
        title,
        artist,
        state
    });
})

elem.innerHTML = "\
    Object.defineProperty(navigator.mediaSession, 'metadata', {\
        get: function() { return this.__metadata; },\
        set: function (v) {\
            this.__metadata = v;\
            console.log(v);\
            window.postMessage({\
                title: v.title,\
                artist: v.artist,\
                state: navigator.mediaSession.playbackState\
            }, '*');\
            console.log('poggers');\
        }\
    });\
    \
";

document.head.appendChild(elem);
