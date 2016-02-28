var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;
var niceComments = ["Are y'all talking about Ellen? She is the nicest girl I have ever met.",
                    "Can you teach me how to have game like Ellen?",
                    "Ellen is soooo cool",
                    "Can you be my lunch date? Ellen",
                    "I just wanna be like Ellen",
                    "Did you just mention Ellen?",
                    "Did you just mention Ellen? Are you secretly in love with her?",
                    "I have enough Ellen for today",
                    "@Clayton",
                    "I like country dance too",
                    "@Ellen's bf application is still open. Apply here http://ellenstanfill.com/",
                    "You can never be as good as Ellen",
                    "@Ellen",
                    "@Ellen @Clayton",
                    "Happy @Ellen day",
                    "Knock, Knock\n Who's there?\n very long pause... \"Java\"",
                    cool(),
                    "Ellen is so awesome; everyone wants to be her friend.",
                    "Don't talk to @Ellen like that",
                    "Ellen's beauty makes me stack overflow",
                    "I want to marry a cat lady",
                    "Ellen's beauty is illegal to have",
                    "Ellen Ella ella eh eh eh",
                    "No you can't be as good as Ellen",
                    "You will never be as good as Ellen. Not even close",
                    "@Clayton",
                    "You better be talkin' nice about Ellen",
                    "Ellen, teach me how to life.",
                    "I haven't seen a girl as smart as Ellen",
                    "Cat > Dog",
                    "Is it just me or 313 sucks",
                    "@Clayton",
                    "You just mentioned Ellen. What do you want?",
                    "Sorry she has a boyfriend.",
                    "Imaginary",
                    "Error 69: Ellen is not defined in the scope.",
                    "@Clayton's steel finger is always ready for @Ellen.",
                    "Cool story",
                    "Every day is great day because of @Ellen."
                    ];
function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/Ellen$/;
    var validText = request.text.indexOf("Ellen") > -1 || request.text.indexOf("ellen") > -1;
  console.log(request);
  if(request.text && validText && request.name != "Ellen\'s Secret Admirer" ) {
    this.res.writeHead(200);
    postMessage(false);
    this.res.end();
  }else if(request.text && request.user_id == "15802842") {
      this.res.writeHead(200);
      postMessage(true);
      this.res.end();
  }
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(claytonPost) {
  var botResponse, options, body, botReq;
   if (claytonPost){
       botResponse = "@Ellen";
   } else {
       botResponse = niceComments[Math.floor(Math.random() * (niceComments.length))];
   }
  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };
    if (botResponse.indexOf("@Ellen") != -1 && botResponse.indexOf("@Clayton") != -1){
        body = {
            attachments: [ { loci: [[botResponse.indexOf("@Ellen"),6],[botResponse.indexOf("@Clayton"),8]], type: 'mentions', user_ids: ["20497030","15802842"] } ],
            "bot_id": botID,
            "text": botResponse
        };
    }else if (botResponse.indexOf("@Ellen") != -1){
      body = {
          attachments: [ { loci: [[botResponse.indexOf("@Ellen"),6]], type: 'mentions', user_ids: ["20497030"] } ],
          "bot_id": botID,
          "text": botResponse
      };
  }else if (botResponse.indexOf("@Clayton") != -1){
      body = {
          attachments: [ { loci: [[botResponse.indexOf("@Clayton"),8]], type: 'mentions', user_ids: ["15802842"] } ],
          "bot_id": botID,
          "text": botResponse
      };
  }
  else {
      body = {
          "bot_id": botID,
          "text": botResponse
      };
  }

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