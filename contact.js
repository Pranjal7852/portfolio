const express = require("express");
const app = express();
const BodyParser = require("body-parser"); 
app.use(BodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
const https = require("https");

app.post("/", function(req, res) {
    const inputName = req.body.inputName;
    const inputEmail = req.body.inputEmail;
    const inputMsg = req.body.inputMsg;

    const inputData = {
        members: [
            {
                email_address: inputEmail,
                status: "subscribed",
                merge_fields: {
                    FNAME: inputName,
                    FEEDBACK: inputMsg
                }
            }
        ]
    };
    const dataSend = JSON.stringify(inputData);
    console.log(dataSend);
    const listId = "bfa116bf08";
   const apiKey = "a237cf4c23f40be71cfff6bd86efe79f-us5";
   const url = `https://us5.api.mailchimp.com/3.0/lists/${listId}`;
   const option = {
       method: "POST",
       auth: `pranjal:${apiKey}`
   }
    const request = https.request(url, option, function(response) {
                    response.on("data", function(data) {
                        console.log(JSON.parse(data));
                    })
    });
    request.write(dataSend);
    request.end();
});
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
})
app.listen(process.env.PORT ||3000, function() {
    console.log("Working ok");
})