/*
    ----------------------
        MAIN js scipt
    ----------------------
*/

/*
    ----------------------
        VARIABLES
    ----------------------
*/

const API_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-3.5-turbo";
const API_KEY = "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";

/*
    ----------------------
        FUNCTIONS
    ----------------------
*/

// Function to send user message and get a response from the chatbot
async function sendMessageToChatbot(message) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: MODEL,
            messages: [{ role: "user", content: message }],
            temperature: 0.9,
            max_tokens: 150,
        }),
    });

    const data = await response.json();
    console.log("API Response:", data);
    return data.choices[0].message.content;
}

// Function to add a new message to the chat window
function addMessageToChatWindow(role, message) {
    const chatContainer = document.querySelector(".chat");
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message", role);

    const avatarContainer = document.createElement("div");
    avatarContainer.classList.add(role + "-avatar");
    avatarContainer.innerHTML = '<img src="/images/' + role + '-avatar.png" alt="' + role + ' Avatar">';
    messageContainer.appendChild(avatarContainer);

    const messageContent = document.createElement("div");
    messageContent.classList.add(role + "-message");
    messageContent.textContent = message;
    messageContainer.appendChild(avatarContainer);
    messageContainer.appendChild(messageContent);
    chatContainer.appendChild(messageContainer);

    // Scroll to the bottom of the chat window
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

/*
    ----------------------
        EVENT HANDLERS
    ----------------------
*/

// Function to handle user sending a message
async function handleUserMessage() {
    const userInput = document.getElementById("user-input");
    const userMessage = userInput.value.trim();


    if (userMessage !== "") {
        addMessageToChatWindow("user", userMessage);

        // Clear the user input field
        userInput.value = "";

        // Send the user message to the chatbot and get a response
        botResponse = await sendMessageToChatbot(userMessage);

        if (botResponse && botResponse.trim() !== "") {
            addMessageToChatWindow("bot", botResponse);
        }
    }
}

// Add event listener for sending a message when the send button is clicked
document.getElementById("send-button").addEventListener("click", handleUserMessage);

// Add event listener for sending a message when the Enter key is pressed in the input field
document.getElementById("user-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        handleUserMessage();
    }
});