let socket = null; // Singleton variable

export const getSocket = (url) => {
  if (!socket) {
    socket = new WebSocket(url);
    console.log("WebSocket created!");
  }
  return socket;
};
