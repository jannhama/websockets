# Websockets

This is simple starter project to get you familiar with websocket server from (ws) package.
Project includes also simple client where you can try out different data transfer modes (binary/text).

## Server

Socket uses ws NPM package that is one of the most common ones for websocket usage.
 Server has only two main functions:
 * Create connection when client requests it.
 * Listen to incoming messages from client

This is achieved with code below

```
    wss.on('connection', function (ws) {
    console.log((new Date()) + '  Connection accepted.' );
    ws.on('message', function (data, flags) {

```
Depending on the data format you have you might need to allocate corresponding buffer to store
the data. There are many kind of typed buffers available including little-endian or big-endian
 formats. For simplicity we use unsigned int8 array (byte array) here.  


Optionally and like in our case we will send response to the client.
This is done via connection object ws like:

Binary:
```
    // convert text to binary array
    const buffer = Buffer.from('This is binary');
    ws.send(buffer);

```
Text format:
```
    ws.send('This is text');
```


## Client


Key part of the client is the socket event handler - similar way as it was in
the server.

```
    function onMessage(event) {
        console.log("Message is received...");
        addText("clientmessages", "Message is received...\n");

        if (event.data instanceof ArrayBuffer) {
            var byteArray = new Uint8Array(event.data);

            if (byteArray.length == buffer.length) {
                buffer.set(byteArray);
            }

            for (var i = 0; i < byteArray.length; i++) {
                addText("clientmessages", "read:" + byteArray[i].toString(16) + "\n");
                console.log(byteArray[i]);
            }
            addText("clientmessages", "End of message\n");
            console.log("End of binary message");
        }
        else if (event.data instanceof Blob) {
            addText("clientmessages", "We received blob!\n");
        }

        else {
            addText("clientmessages", "We received something, but it is not binary. Assuming text!\n");
            addText("clientmessages", event.data);
            console.log(event.data);
        }
    }

```


#### License

&copy; 2016 Janne Hämäläinen. Released under [MIT](https://opensource.org/licenses/MIT) license.