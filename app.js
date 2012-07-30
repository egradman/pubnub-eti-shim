var util = require("util");
var http = require('http');
var videos = require("./videos.json");

var pubnub = require("./pubnub.js").init({
    publish_key   : "pub-52cf166a-92a4-4c94-bbe3-1c5e05f9f8f8",
    subscribe_key : "sub-d7664dfd-da94-11e1-b5a4-bbd2d05aa23a"
});


pubnub.subscribe({
    channel  : "tussaud",
    callback : function(message) {
      console.log( "pubnub", message );
      video_name = message['video'];
      video_id = videos[video_name];
      options = {
        host: "localhost",
        port: 8000,
        path: "/playlist/play/"+video_id,
        method: "GET"
      };
        req = http.request(options, function(res) {
        res.on("data", function(chunk) {
          console.log("DATA" + chunk);
        });
      });
      req.on("error", function(e) {
      console.log("error" + e.message);
    });
    req.end();
  }
});
