# Websockets

This is simple starter project to get you familiar with websocket server from (ws) package.
Project includes also simple client where you can try out different data transfer modes (binary/text).

## Installation

* Clone or download. run ```npm install``` in project folder.
* Start server using ```node server.js```
* Open client from ```web-client folder``` by opening ```ws_client.html``` in your browser.

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

Client has simple UI with ip address/port configuration, message area and
buttons to send different kind of messages. Buttons are:

* Connect - connects you to the socket server
* Disconnect - disconnects from the server
* Send 01 - sends binary buffer with number one (0x01) as first byte
* Send 02 - sends binary buffer with number one (0x02) as first byte
* Send 03 - sends binary buffer with number one (0x03) as first byte
* Send Text - sends text data to the server

On the server side we can check binary messages and act accordingly. Messages 0x01 and 0x02
are recognised, 0x03 is considered as unknown message. Text data is converted into JSON format
and sent back to client.


### Client message handler


Key part of the client is the socket event handler - similar way as it was in
the server. First we check what is the type of the message. In case it is
binary we handle it own handlers. Otherwise we assume it is text.

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