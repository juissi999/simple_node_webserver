const http = require("http")
const fs = require("fs");

var port = 80;


function on_request(request, response) {

   if (request.method == "GET") {
      if (request.url == "/") {
         response.write("hello world!");
         response.end();
      }
   }

}



http.createServer(on_request).listen(port);