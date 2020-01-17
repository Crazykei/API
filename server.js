const express = require("express");
const app = express();
const request = require("request");

app.use(express.static("public"));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.listen(3000, function() {
  console.log("listening on port " + 3000);
});


//JavaScriptからのGET通信を処理する
app.get("/data", function(request, response) {
  getCameraData()
  .then(data => response.send(data));
});


//webcams.travelから情報を取得する
function getCameraData() {
  const options = {
    method: 'GET',
    url: 'https://webcamstravel.p.rapidapi.com/webcams/list/country=JP/limit=20',
    qs: {lang: 'en', show: 'webcams:image'},
    headers: {
      'x-rapidapi-host': 'webcamstravel.p.rapidapi.com',
      'x-rapidapi-key': 'f22fe5b2a3msh3c49470c5b76558p13eaddjsnff5a809e993b'
    }
  };

  return new Promise((resolve) => {
    request(options, function (error, response, body) {
      const json = JSON.parse(body);

      resolve(json.result.webcams);
    });
  })
}