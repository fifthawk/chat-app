const httpServer = require("http").createServer();
const options = { 
    cors: true,
    origin: "https://chat-app-eight-green.vercel.app/",
    methods: ["GET", "POST"]

}
const io = require("socket.io")(httpServer, options);



io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on("send-message", ({ recipients, text }) => {
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit("receive-message", {
        recipients: newRecipients,
        sender: id,
        text,
      });
    });
  });
});

httpServer.listen(4000)
