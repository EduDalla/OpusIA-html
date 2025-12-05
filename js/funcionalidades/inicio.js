async function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    if (!userInput) return; // If there's no input, do nothing

    // Display the user's message in the chat
    displayMessage(userInput, 'user');

    // Disable the send button while waiting for the response
    document.getElementById('sendBtn').disabled = true;

    try {
        // Send the message via AJAX (fetch)
        const response = await fetch('/pdi/processInteractionAjax', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `user_input=${encodeURIComponent(userInput)}`
        });

        // Log the raw response text to check what we're actually getting
        const text = await response.text(); // Use .text() to see the raw response
        console.log("Raw response:", text);

        // Attempt to parse the response as JSON
        let data;
        try {
            data = JSON.parse(text);  // Attempt to parse the response
            // Display the response from ChatGPT in the chat
            displayMessage(data.response, 'chatgpt');
        } catch (jsonError) {
            console.error("Error parsing JSON:", jsonError);
            console.error("Response text:", text);  // Log the raw response text for debugging

            // If parsing fails, alert the user
            alert("There was an error with the response from the server. Please try again later.");
        }

    } catch (error) {
        console.error("Request failed:", error);  // Log fetch or network errors
        alert("There was an error while sending the request. Please check your network or try again later.");
    } finally {
        // Re-enable the send button
        document.getElementById('sendBtn').disabled = false;

        // Clear the input field and focus it for the next message
        document.getElementById('userInput').value = '';
        document.getElementById('userInput').focus();
    }
}


// Function to display messages in the chat
function displayMessage(message, sender) {
    const chatContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');

    // Add the appropriate classes based on the sender
    messageElement.classList.add('message', sender === 'user' ? 'user' : 'ai');

    // Set the message content (render HTML for AI messages)
    if (sender === 'user') {
        messageElement.textContent = message;
    } else {
        messageElement.innerHTML = message;
    }

    // Append the new message element to the chat container
    chatContainer.appendChild(messageElement);

    // Scroll to the bottom of the chat container to show the latest message
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
