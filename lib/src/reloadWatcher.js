const chokidar = require("chokidar");
const chalk = require("chalk");

function reloadWatcher() {
  const WebSocketServer = require("websocket").server;
  const http = require("http");

  const watcher = chokidar.watch(process.cwd(), {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
  });

  const server = http.createServer(function (request, response) {
    console.log(new Date() + " Received request for " + request.url);
    response.writeHead(404);
    response.end();
  });

  server.listen(8080, function () {
    console.log(new Date() + " Server is listening on port 8080");
  });

  const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false,
  });

  function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
  }

  wsServer.on("request", function (request) {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      return;
    }

    const connection = request.accept("echo-protocol", request.origin);

    watcher.on("change", (path, stats) => {
      if (stats) {
        console.log(chalk.green(`App reloading due to file ${path} changes.`));
        connection.send("reload");
        console.log(chalk.green(`App reloaded due to file ${path} changes.`));
      }
    });

    connection.on("close", function () {
      console.log(
        chalk.red(
          new Date() + "Client " + connection.remoteAddress + " disconnected."
        )
      );
    });
  });
}

module.exports = reloadWatcher;
