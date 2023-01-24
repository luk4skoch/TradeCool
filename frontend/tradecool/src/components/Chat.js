import React, {useEffect, useState} from "react";
import '../chat.css';

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

    useEffect(getMessages, [messages]);

    function getMessages() {
        fetch(`http://localhost:8080/message/${senderId}/${productId}/${receiverId}`)
            .then(response => response.json())
            .then(data => setMessages(data))
    }

    function postMessage() {
        const text = document.getElementById("text-input").value;
        console.log(text)

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                text: text,
                sender: {
                    id: 1, name: "Pete"
                },
                product: {title: "myProduct", id: 1},
                receiverId: 2
            })
        };
        fetch('http://localhost:8080/message', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({postId: data.id}));
        getMessages();

        document.getElementById("text-input").value = "";
    }




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
            <div className={"scrollBox"} >
                <div className={"inner-scrollBox"}>
                    { messages && messages.map(item => (
                        <div key={item.id}>
                            <p><b>{item.sender.name}: </b> {item.text}</p>
                        </div>
                    ))}
                </div>

            </div>
            <div style={{position: "absolute", bottom: 100}}>
                    <label htmlFor={"text-input"} >Write here:&nbsp;</label>
                    <input type={"text"} id={"text-input"} size={60} onKeyUp={function (e) {
                        if (e.key === 'Enter') {
                        postMessage();
                    }
                    }} />
                    <button onClick={postMessage}>SEND</button>
            </div>
        </div>
    )
}



export default Chat;