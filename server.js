const http = require("http")
const fs = require("fs");

const port = 80;
const indexfile = "build/index.html";
const cssfile = "build/style.css";

function on_request(request, response) {

   if (request.method == "GET") {
      if (request.url == "/") {
         // indexfile

         var filecontents = fs.readFileSync(indexfile, {encoding: "utf8"});
         response.writeHead(200, {"Content-type" : "text/html"});
         response.write(filecontents);
         response.end();
      } else if (request.url == "style.css") {
         // css

         var filecontents = fs.readFileSync(cssfile, {encoding: "utf8"});
         response.writeHead(200, {"Content-type" : "text/css"});
         response.write(filecontents);
         response.end();
      } else {
         // all other pages

         response.writeHead(404);
         response.write("File not found!");
         response.end();
      }
   }
}

http.createServer(on_request).listen(port);