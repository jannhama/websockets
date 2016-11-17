/**
 * Simple client side websocket handler
 *
 */


var socketHandler = (function(){

    var ip = "";
    var port = "";
    var ws = null;
    var buffer = new Uint8Array(10);

    function addHandlers() {
        //$("#connect").click(connectClick);
        $("#disconnect").click(disconnectClick);
        $("#send01").click(send01Click);
        $("#send02").click(send02Click);
        $("#send03").click(send03Click);
        $("#sendtext").click(sendTextClick);

        $('#connect').on('click', connectClick);
    }

    function initBuffer(buffer, param) {
        var i;
        for (i = 0; i < buffer.length - 1; i++) {
            buffer[i] = 0x00;
        }
        buffer[0] = param;
    }


    function connectClick() {
        if ("WebSocket" in window) {

            ip = document.getElementById('ipaddress').value;
            port = document.getElementById('portnumber').value;

            const socks = "ws://" + ip + ":" + port + "";
            console.log(socks);
            addText("clientmessages", "Socket: " + socks + "\n");

            // Let us open a web socket
            ws = new WebSocket(socks);
            ws.onopen = onOpen;
            ws.onclose = onClose;
            ws.onmessage = onMessage;
            ws.onerror = onError;
        }
        else {
            // The browser doesn't support WebSocket
            alert("WebSocket NOT supported by your Browser!");
        }
    }

    function disconnectClick() {
        ws.close();
        addText("clientmessages", "Socket closed!\n");
    }

    function send01Click() {
        initBuffer(buffer,0x01);
        ws.binaryType = 'arraybuffer';
        ws.send(buffer.buffer);
        addText("clientmessages", "Data sent!\n");
    }

    function send02Click() {
        initBuffer(buffer,0x02);
        ws.binaryType = 'arraybuffer';
        ws.send(buffer.buffer);
        addText("clientmessages", "Data sent!\n");
    }

    function send03Click() {
        initBuffer(buffer,0x03);
        ws.binaryType = 'arraybuffer';
        ws.send(buffer.buffer);
        addText("clientmessages", "Data sent!\n");
    }


    function sendTextClick() {
        ws.send("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam laoreet neque non neque lacinia, nec sollicitudin nisi ultrices. Cras consectetur orci vitae tellus egestas placerat. Nunc in tristique risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam id molestie tortor, in aliquam ante. Donec ornare elit eu tortor ultrices, nec semper ligula vulputate. Aenean et elit vitae tellus viverra molestie. Vestibulum accumsan lectus eu sem imperdiet, vitae sagittis dui suscipit. Cras nisi nibh, ornare non tincidunt id, pharetra sed nulla. Mauris ac nulla ut felis congue vulputate. Praesent hendrerit varius lacus, non aliquet orci posuere eget.");
        addText("clientmessages", "Text sent!\n");
    }


    function onOpen() {
        addText("clientmessages", "Connection done\n");
    }

    function onClose() {
        // websocket is closed.
        alert("Connection is closed...");
    }

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

    function onError(e) {
        addText("clientmessages", "Error occured!\n");
    }

    function addText(elId, text) {
        document.getElementById(elId).value += text;
    }


    // API
    return {
        addHandlers
    }


}());



