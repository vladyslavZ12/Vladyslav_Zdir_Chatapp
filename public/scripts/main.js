import ChatMessage from "./components/TheMessageComponent.js";

(() => {

    var messageBody = document.querySelector('.message-wrapper');


    console.log('fired');

    // load the socket library

    // make the connection back to the app.js
    // and it listens for messenger and socket
    // generates new socket
    // and emits the event
    const socket = io();

    // messenger service event handling -> incoming from the manager

    function setUserId({ sID, message }) {
        // incoming connected event with data
        // destructuring operation
        //debugger;
        vm.socketID = sID;

    }

    function appendMessage(message) {
        vm.messages.push(message);
    }

    const vm = new Vue({
        data: {
            // we gonna iterate through aeeay and create component for 
            // each message we receive
            // we want to store all the incoming messages in an array
            messages: [],
            nickname: "",
            username: "",
            socketID: "",
            message: ""
        },
        created: function () {
            console.log('uts alive');
        },
        methods: {
            dispatchMessage() {
                //debugger;
                // emit a message and send it as payload
                this.nickname = document.querySelector('#name').value;
                messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
                socket.emit('chatmessage', { content: this.message, name: this.nickname || "Anonymys" });
                this.message = "";
            }
        },
        components: {
            newmessage: ChatMessage
        }
    }).$mount("#app");

    socket.addEventListener("connected", setUserId);
    socket.addEventListener("message", appendMessage);
})();