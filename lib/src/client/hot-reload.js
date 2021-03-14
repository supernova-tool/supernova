module.exports = function () {
  try {
    const wsClient = new WebSocket("ws://localhost:8080/", "echo-protocol");

    wsClient.onerror = function () {
      console.log("Connection Error");
    };

    wsClient.onopen = function () {
      console.log("Server autoreload connected");
    };

    wsClient.onclose = function () {
      console.log("Server autoreload disconnected");
    };

    wsClient.onmessage = function ({ data }) {
      if ("string" == typeof data && "reload" === data) {
        return location.reload();
      }
    };
  } catch (e) {}
};
