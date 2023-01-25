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

    const [messages, setMessages] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/message/${senderId}/${productId}/${receiverId}`)
            .then(response => response.json())
            .then(data => setMessages(data))
    }, []);


    console.log(messages);

    return (
        <div>
            <h1>
                Chat of {messages && messages[0].product.title}
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