var HTTPS = require('https');
var cool = require('cool-ascii-faces');
APOD        = require('node-nasa-pic-of-day')

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]);
      //botRegex = /^\/cool guy$/;
  console.log(request);
  if(request.text.indexOf('#apod')>-1){
    apod = new APOD({
      key: 'FPEarLkn8Rlt1wPk5ajUp270WX5fu2flRZvMV5ck'
    });
    var url;
    var imagedata = apod.getAllData(function(body){
      url = body.url;});
      this.res.writeHead(200);
      postMessage(url);
      this.res.end();
  }
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(message) {
  var botResponse, options, body, botReq;

  botResponse = message;
  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
