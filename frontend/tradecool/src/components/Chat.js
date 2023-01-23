import React, {useEffect, useState} from "react";

function Chat() {
    let currentUrl = window.location.href;
    let variableString = currentUrl.substring(27);
    //console.log("allVariables: " + variableString);
    let senderId = variableString.substring(0, variableString.indexOf("/"));
    //console.log("sender: " + senderId);
    variableString = variableString.substring(variableString.indexOf("/") + 1);
    let productId = variableString.substring(0, variableString.indexOf("/"));
    //console.log("product: " + productId);
    let receiverId = variableString.substring(variableString.indexOf("/") + 1);
    //console.log("receiver: " + receiverId);

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/message/${senderId}/${productId}/${receiverId}`)
            .then(response => response.json())
            .then(data => setMessages(data))
    }, []);


    function getTitle() {
        if (messages.length > 0) {
            return "Chat of " + messages[0].product.title
        }
        return "Chat"
    }

    return (
        <div>
            <h1>
                {getTitle}
            </h1>
            <div>
                { messages && messages.map(item => (
                    <div key={item.id}>
                        <p><b>{item.sender.name}: </b> {item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Chat;