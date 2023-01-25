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

    async function postMessage() {
        const text = document.getElementById("text-input").value;
        const sender = await getSender();
        const product = await getProduct();

        console.log(sender)

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                text: text,
                sender: sender,
                product: product,
                receiverId: receiverId
            })
        };
        fetch('http://localhost:8080/message', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({postId: data.id}));
        getMessages();

        document.getElementById("text-input").value = "";
    }


    async function getSender() {
        let result;
        await fetch(`http://localhost:8080/api/user/${senderId}`)
            .then(response => response.json())
            .then(data => result = data)
        return result;
    }

    async function getProduct() {
        let result;
        await fetch(`http://localhost:8080/api/products/${productId}`)
            .then(response => response.json())
            .then(data => result = data)
        return result;
    }




    function getTitle() {
        if (messages.length > 0) {
            return "Chat of " + messages[0].product.title
        }
        return "Chat"
    }

    let title = getTitle();

    return (
        <div>
            <h1 id={"lol"}>
                {title}
            </h1>
            <div className={"scrollBox"} >
                <div className={"inner-scrollBox"}>
                    { messages && messages.map(item => (
                        <div key={item.id}>
                            <p><b>{item.sender.username}: </b> {item.text}</p>
                        </div>
                    ))}
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

        </div>
    )
}



export default Chat;