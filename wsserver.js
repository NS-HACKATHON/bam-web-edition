var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({ port: 9090 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        const fs = require('fs');

        let txtFile = "./samples/werklijnen-voorbeeld.json";
        let contents = fs.readFileSync(txtFile,'utf8');
        ws.send(contents);
    });
    const fs = require('fs');

    let txtFile = "./samples/werklijnen-voorbeeld.json";
    let contents = fs.readFileSync(txtFile,'utf8');
    ws.send(contents);
});