var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var exec = require('child_process').exec;
var fs = require('fs');

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
                    "@Clayton's steel fingers are always ready for @Ellen.",
                    "Cool story",
                    "Every day is great day because of @Ellen.",
                    "Yes sure I think Sahil is asshole too",
                    "It is pronounced Saaa-aa-hilll"
                    ];
function respond() {
    var compileFlag = false;
    var splitedStrs;
    var request = JSON.parse(this.req.chunks[0]);
    console.log(request);
    if (request.text) {
        console.log("spliting string here");
        splitedStrs = request.text.replace(/\s+/, '\x01').split('\x01');
    }else{
        splitedStrs = null;
    }
    console.log("Ending");
    if (splitedStrs != null && splitedStrs.length > 1) {
        var command = splitedStrs[0].toLowerCase();
        var content = splitedStrs[1].trim();
        if (command == "ellenisthebest" && request.name != "Ellen\'s Secret Admirer") {
            if (content.indexOf("os") != -1 || content.indexOf("sys") != -1 ||
                content.indexOf("open") != -1 || content.indexOf("process") != -1
            ) {
                compileFlag = true;
                postMessage(false, "Don't use system call you motha fucka", null);
            } else {
                console.log(content);
                compileFlag = true;
                postMessage(false, null, content);
            }
        }
    }
    if (compileFlag == false) {
        console.log("It is here now.. Regular cases");
        var validText = request.text.indexOf("Ellen") > -1 || request.text.indexOf("ellen") > -1;
        if (request.text && validText && request.name != "Ellen\'s Secret Admirer") {
            this.res.writeHead(200);
            postMessage(false, null, null);
            this.res.end();
        } else if (request.text && request.user_id == "15802842") {
            this.res.writeHead(200);
            var shouldPost = Math.random();
            if (shouldPost < 0.30) {
                postMessage(true, null, null);
            }else{
                console.log("don't care");
            }
            this.res.end();
        } else {
            console.log("don't care");
            this.res.writeHead(200);
            this.res.end();
        }
    }

}

function postMessage(claytonPost,errorMessage,content) {
  var botResponse, options, body, botReq,randomNumber;
    options = {
        hostname: 'api.groupme.com',
        path: '/v3/bots/post',
        method: 'POST'
    };
    console.log("in post message");
    if (claytonPost){

       randomNumber = Math.random();
       if (randomNumber < 0.25) {
           botResponse = "The Hulk > Antman > literally anything > Captain America";
       }
       else if (randomNumber < 0.5) {
           botResponse = "@Ellen, Clayton has spoken";
       }
       else if (randomNumber < 0.75) {
           botResponse = "Notifying @Ellen";
       }
       else {
           botResponse = "@Clayton Iron Man sucks";
       }
   }else if (errorMessage != null){
       botResponse = errorMessage;
   } else if (content != null){
       console.log("In here!!!!!!!!");
       fs.writeFile("prog.py", content,
           function(err) {
               botReq = HTTPS.request(options, function(res) {
                   if(res.statusCode == 202) {
                       //neat
                   } else {
                       console.log('rejecting bad status code ' + res.statusCode);
                   }
               });
               if(err) {
                   console.log("Error code: " + err);
                   body = {
                       "bot_id": botID,
                       "text": "You don't know how to Python"
                   };
                   botReq.end(JSON.stringify(body));
               }
               var cmd = "python prog.py";
               exec(cmd,function(error,stdout,stderr){
                   if (error)
                   {
                       console.log("Error code: " + error);
                       body = {
                           "bot_id": botID,
                           "text": "You don't know how to Python"
                       };
                       botReq.end(JSON.stringify(body));
                   }
                   else
                   {
                       var claytonIndex = stdout.indexOf("@Clayton");
                       if (claytonIndex != -1){
                           body = {
                               "attachments": [ { loci: [[claytonIndex,8]], type: 'mentions', user_ids: ["15802842"] } ],
                               "bot_id": botID,
                               "text": stdout
                           }
                       }else {
                           body = {
                               "bot_id": botID,
                               "text": stdout
                           };
                       }
                       botReq.end(JSON.stringify(body));
                   }
               });
           });
       return;
   }
   else {
       botResponse = niceComments[Math.floor(Math.random() * (niceComments.length))];
   }

    if (botResponse.indexOf("@Ellen") != -1 && botResponse.indexOf("@Clayton") != -1){
        body = {
            "attachments": [ { loci: [[botResponse.indexOf("@Ellen"),6],[botResponse.indexOf("@Clayton"),8]], type: 'mentions', user_ids: ["20497030","15802842"] } ],
            "bot_id": botID,
            "text": botResponse
        };
    }else if (botResponse.indexOf("@Ellen") != -1){
      body = {
          "attachments": [ { loci: [[botResponse.indexOf("@Ellen"),6]], type: 'mentions', user_ids: ["20497030"] } ],
          "bot_id": botID,
          "text": botResponse
      };
  }else if (botResponse.indexOf("@Clayton") != -1){
      body = {
          "attachments": [ { loci: [[botResponse.indexOf("@Clayton"),8]], type: 'mentions', user_ids: ["15802842"] } ],
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