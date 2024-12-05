var http = require("http");
var fs = require("fs");
var url = require("url");

http
  .createServer((req, res) => {
    var page = url.parse(req.url, true);
    var pageName = page.pathname;
    if (pageName.length > 1) {
      console.log("pageName: " + pageName + ".");
      fs.readFile(`.${pageName}.html`, (err, data) => {
        if (err) {
          fs.readFile("./404.html", (err, data) => {
            res.writeHead(404, { "content-type": "text/html" });
            res.write(data);
            return res.end();
          });
        } else {
          res.writeHead(200, { "content-type": "text/html" });
          res.write(data);
          return res.end();
        }
      });
    } else {
      fs.readFile("./index.html", (err, data) => {
        res.writeHead(200, { "content-type": "text/html" });
        res.write(data);
        return res.end();
      });
    }
  })
  .listen(8080);
