const socket = io("https://chatapp-backend-lu84.onrender.com/");

const msgContainer = document.querySelector(".container");
const form = document.querySelector(".message_send");
const msg = document.querySelector(".message");
var audio = new Audio('chat_audio.mp3');


const append = (message, position, extraClass) => {
  const msgElement = document.createElement("div");
  msgElement.innerText = message;
  msgElement.classList.add("msgbox", position);
  if (extraClass) msgElement.classList.add(extraClass);
  msgContainer.append(msgElement);
  if(position == 'left'){
    audio.play();
  }
};


form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = msg.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  msg.value = "";
});


const name = prompt("Enter your name to join chat");
socket.emit("new-user-joined", name);

socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "left", "notify");
});

socket.on("recieve", (data) => {
  append(`${data.name}: ${data.message}`, "left");
});

socket.on("left", (name) => {
  append(`${name} left the chat`, "left", "notify");
});
