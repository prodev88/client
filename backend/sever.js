var express = require("express");
var app = express();
var path = require("path");
const port = process.env.PORT || 3000;

// serve the static files
var static_location = path.join(__dirname, "../", "build");
app.use(express.static(static_location));
app.get("*", (req, res) => {
  var htmlFilePath = path.join(__dirname, "../", "build", "index.html");
  res.sendFile(htmlFilePath);
});

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log(`running on port: ${port}`);
});
