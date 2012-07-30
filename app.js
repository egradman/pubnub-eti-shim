var util = require("util");
var http = require('http');

var pubnub = require("./pubnub.js").init({
    publish_key   : "pub-52cf166a-92a4-4c94-bbe3-1c5e05f9f8f8",
    subscribe_key : "sub-d7664dfd-da94-11e1-b5a4-bbd2d05aa23a"
});

var client = http.createClient(3000, 'localhost');
client.addListener('error', function(connectionException){
    if (connectionException.errno === process.ECONNREFUSED) {
        util.log('ECONNREFUSED: connection refused to '+client.host+':'+client.port);
    } else {
        util.log(connectionException);
    }
});

pubnub.subscribe({
    channel  : "tussaud",
    callback : function(message) {
        console.log( " > ", message );
        console.log(typeof message);
        var request = client.request('GET', '/users/1');
        //request.write("stuff");
        request.end();
        request.on("response", function (response) {
              console.log(response);
        });
        request.on("clientError", function (exception) {
              console.log(exception);
        });
    }
});
