var stompClient = null;
var typing = false;
var timeout = undefined;

// Send message function
// most important part of project.
function sendMessage() {
    let jsonOb = {
        name: localStorage.getItem("name"),
        // JQuery ki help sai message ki value nikal li input field sai.
        content: $("#message-value").val(),
        timestamp: new Date().toLocaleTimeString() // Add timestamp here
    };
    
    // jsonOb sai message ko nikal kai es url par bej diya server ko.
    // yeah beje ga message sidha message controller ko
    stompClient.send("/app/message", {}, JSON.stringify(jsonOb));
    $("#message-value").val(''); // Clear input field
    clearTimeout(timeout);
    typing = false;
    stompClient.send("/app/typing", {}, JSON.stringify({ name: localStorage.getItem("name"), typing: false })); // Send typing status false
}

// Show message with timestamp
// Messages show karvane vala function.
function showMessage(message) {
    // Check if timestamp is available, if not use the current time
    let timestamp = message.timestamp ? message.timestamp : new Date().toLocaleTimeString();

    // prepend matlab yeah message table mai aake upar ki taraf show hoga.
    let messageElement = `
        <tr>
            <td>
                <b>${message.name}: </b> ${message.content} 
                <span class="timestamp">${timestamp}</span>
            </td>
        </tr>`;
    $("#message-container-table").prepend(messageElement);
}

// Connect to WebSocket
function connect() {
    // yeah socket ka object server1 sai connect kar dega.
    // This line creates a connection to your server 
    let socket = new SockJS("/server1");
    
    // The Stomp.over(socket) means you're taking the connection (created with SockJS) and telling STOMP to use it for sending and receiving messages.
    stompClient = Stomp.over(socket);
    
    // This line actually connects to the server.
    stompClient.connect({}, function(frame) {
        // Once connected, this prints the message in console
        console.log("Connected: " + frame);
        
        // Es line sai name hide ho jayega bootstrap class d-none 
        //  Hides the "name input" section where users enter their name.
        $("#name-from").addClass('d-none');
        
        // This removes the d-none class from the #chat-room element, making it visible on the page (if it was hidden before).
        $("#chat-room").removeClass('d-none');
        
        // stompClient.subscribe: You are "listening" for messages that are sent to the channel /topic/return-to.
        // When a message arrives, it's converted from a text format (JSON) into a JavaScript object using JSON.parse.
        // After that, the showMessage() function is called to display the message in the chat
        // back end sai message phir yaha ayega.
        stompClient.subscribe("/topic/return-to", function(response) {
            showMessage(JSON.parse(response.body));
        });
        
        // Uncomment for typing indicator
        // stompClient.subscribe("/topic/typing", function(response) {
        //     showTypingIndicator(JSON.parse(response.body));
        // });
    });
}

// Document ready functions
// eska matlab jaise hi page load ho, vaise hi yeah chale.
$(document).ready(() => {
    
    // Jaise hi mere login naam ki id click hogi, tabhi eske andar vala content chal padega.
    $("#login").click(() => {
        // yeah input field kai name ki value utha kai local storage mai daal dega, taaki hum baad mai ese use kar paye
        let name = $("#name-value").val();
        localStorage.setItem("name", name);
        $("#name-title").html(`Welcome, <b> ${name} </b>`);
        connect();
    });

    // jaise he send button click hoga send message chale ga.
    $("#send-btn").click(() => {
        sendMessage();
    });

    // onTyping function triggers when the user is typing
    $("#message-value").on("input", () => {
        onTyping();
    });

    // When the logout button is clicked
    $("#logout").click(() => {
        localStorage.removeItem("name");
        if (stompClient !== null) {
            stompClient.disconnect();
            // Reverting back to the name input screen after logout
            $("#name-from").removeClass('d-none');
            $("#chat-room").addClass('d-none');
        }
    });
});
