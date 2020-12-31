import io from "socket.io-client";
import getenv from "getenv";

const HOST_URL = getenv("REACT_APP_HOST_IP", "");

export default class SocketClient {
  socket;
  username;
  image;

  static connect(name, image) {
    this.username = name;
    this.image = image;
    this.socket = io(HOST_URL);

    this.socket.on("connect", () => {
      this.socket.emit("join", {name, image});
    });
  }

  static on(event, callback) {
    this.socket.on(event, callback);
  }

  static typing() {
    this.socket.emit("typing", this.username);
  }

  static stoppedTyping() {
    this.socket.emit("stoppedtyping", this.username);
  }

  static send(message) {
    this.socket.emit("chat", {
      name: this.username,
      message,
      image: this.image
    });
  }

  static listenFor(event, callback) {
    this.socket.on(event, callback);
  }

  static disconnect() {
    this.socket.emit("left", {name: this.username, image: this.image});
    this.socket.disconnect();
  }
}
