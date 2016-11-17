# nodejs-websocket

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


#### License

&copy; 2016 Janne Hämäläinen, released under MIT license.