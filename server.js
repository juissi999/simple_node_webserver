const http = require("http")
const fs = require("fs");
const path = require("path")

const port = 80;
const builddir = "build";
const indexfile = "build/index.html";
const cssfile = "build/style.css";

function on_request(request, response) {

   if (request.method == "GET") {

      // index.html
      if (request.url == "/") {
         // indexfile

         fs.readFile(path.join(builddir, "index.html"), {encoding: "utf8"}, (err, data) => {
            if (err) {
               render_404(response);
               return;
            }
            response.writeHead(200, {"Content-type" : "text/html"});
            response.write(data);
            response.end();
         });
         return;
      }

      let filetype = request.url.split(".")[1];
      if (filetype == "html") {
         fs.readFile(path.join(builddir, request.url), (err, data) => {
            if (err) {
               render_404(response);
               return;
            }

            response.writeHead(200, {"Content-type" : "text/html"});
            response.write(data);
            response.end();
         });
      } else if (filetype == "css") {
         // css

         fs.readFile(path.join(builddir, request.url), (err, data) => {
            if (err) {
               render_404(response);
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
               render_404(response);
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
               console.log("error")
               render_404(response);
               return;
            }
            response.writeHead(200, {"Content-type" : "image/png"});
            response.write(data);
            response.end();   
         });
      } else {
         response.writeHead("405");
         response.write("Filetype not supported by server!");
         response.end();
      }
   }
}

function render_404(response) {
   response.writeHead("404");
   response.write("File not found!");
   response.end();
}

http.createServer(on_request).listen(port);