const http = require("http")
const fs = require("fs");
const path = require("path")

const port = 80;
const builddir = "build";
const indexfile = "build/index.html";
const cssfile = "build/style.css";

function on_request(request, response) {

   if (request.method == "GET") {
      let filetype = request.url.split(".")[1];
      if (request.url == "/") {
         // indexfile

         var filecontents = fs.readFileSync(path.join(builddir, "index.html"), {encoding: "utf8"});
         response.writeHead(200, {"Content-type" : "text/html"});
         response.write(filecontents);
         response.end();
      } else if (filetype == "css") {
         // css

         fs.readFile(path.join(builddir, request.url), (err, data) => {
            if (err) {
               return;
            }
            response.writeHead(200, {"Content-type" : "text/css"});
            response.write(data);
            response.end();
         });
      } else if (filetype == "js") {
         // javascript

         fs.readFile(path.join(builddir, request.url), (err, data) => {
            if (err) {
               return;
            }
            response.writeHead(200, {"Content-type" : "application/javascript"});
            response.write(data);
            response.end();
         });
      } else if (filetype == "png") {
         // png images

         fs.readFile(path.join(builddir, request.url), (err, data) => {
            if (err) {
               return;
            }
            response.writeHead(200, {"Content-type" : "image/png"});
            response.write(data);
            response.end();   
         });
      }
   }
}

http.createServer(on_request).listen(port);