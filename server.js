const http = require("http")
const fs = require("fs")
const path = require("path")

// cut unnecessary cli arguments out
var arguments = process.argv.slice(2);

// process arguments
var builddir = "./build/"
var port = 80;   
if (arguments.length == 1) {
   var builddir = "./build/"
   var port = Number(arguments[0])
} else if (arguments.length == 2) {
   var port = Number(arguments[0])
   var builddir = arguments[1]
} else if (arguments.length > 2) {
   return console.log("Incompatible argument count. Usage: \nnode server [portnum] [builddir]")
}

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
               render_404(response);
               return;
            }
            response.writeHead(200, {"Content-type" : "image/png"});
            response.write(data);
            response.end();   
         });
      } else if (filetype == "jpg") {
         // png images

         fs.readFile(path.join(builddir, request.url), (err, data) => {
            if (err) {
               render_404(response);
               return;
            }
            response.writeHead(200, {"Content-type" : "image/jpg"});
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

console.log("Server listening on port " + port.toString() + " using builddir \"" + builddir + "\"")
http.createServer(on_request).listen(port);