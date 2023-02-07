import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import '../chat.css';

function Chat() {
    let tempDate;

    const navigate = useNavigate();

    let currentUrl = window.location.href;
    let variableString = currentUrl.substring(27);
    //console.log("allVariables: " + variableString);
    const senderId = variableString.substring(0, variableString.indexOf("/"));
    //console.log("sender: " + senderId);
    variableString = variableString.substring(variableString.indexOf("/") + 1);
    const productId = variableString.substring(0, variableString.indexOf("/"));
    //console.log("product: " + productId);
    let receiverId = variableString.substring(variableString.indexOf("/") + 1);
    //console.log("receiver: " + receiverId);

    const [messages, setMessages] = useState([]);
    const [otherUsers, setOtherUsers] = useState([]);
    const [startUpChatOptions, setStartUpChatOptions] = useState(true);
    const [startUpMessages, setStartUpMessages] = useState(true);
    const [product, setProduct] = useState();

    useEffect(() => {
        if (startUpMessages) {
            getMessages();
            getProduct();
            setStartUpMessages(false);
        }
            const interval = setInterval(() => { getMessages() }, 3000);
            return () => clearInterval(interval);
        }, []);

    function getMessages() {
        refreshReceiverId()
        fetch(`http://localhost:8080/message/${senderId}/${productId}/${receiverId}`)
            .then(response => response.json())
            .then(data => setMessages(data))

    }

    function refreshReceiverId() {
        receiverId = window.location.href.substring(29 + senderId.toString().length + productId.toString().length);
    }

    async function postMessage() {
        const text = document.getElementById("text-input").value;
        const sender = await getSender();
       // const product = await getProduct();

        //console.log(sender)

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

        setTimeout(() => {
            getMessages();
        }, 200);



        document.getElementById("text-input").value = "";
    }


    async function getSender() {
        let result;
        await fetch(`http://localhost:8080/api/user/${senderId}`)
            .then(response => response.json())
            .then(data => result = data)
        return result;
    }

    function getProduct() {
        fetch(`http://localhost:8080/api/products/${productId}`)
            .then(response => response.json())
            .then(data => setProduct(data))
    }




    function getTitle() {
        if (messages.length > 0) {
            return "Chat of " + messages[0].product.title
        }
        return "Chat"
    }

    const title = getTitle();



    function getTime(timestamp) {
        const date = new Date(timestamp);
        let hours = date.getHours().toString();
        let minutes = date.getMinutes().toString();
        if (hours.length === 1) {
            hours = "0" + hours;
        }
        if (minutes.length === 1) {
            minutes = "0" + minutes;
        }
        return hours + ":" + minutes;
    }

    function processDate(timestamp) {
        const date = new Date(timestamp);
        const dateString = date.toDateString();
        if (dateString !== tempDate) {
            tempDate = dateString;
            return dateString;
        }
    }

    function getDateClasses(timestamp) {
        const date = new Date(timestamp);
        if (date.toDateString() !== tempDate) {
            return "message date"
        }
        return ""
    }

    function getMessageClasses(message) {
        if (message.sender.id == senderId) {
            return "message right";
        }
        return "message left";
    }

    function changeChat() {

        const newId = document.getElementById("input-select").value;
        let newUrl = currentUrl.substring(21, currentUrl.length - 1) + newId;
        //console.log(newUrl)
        //window.location.href = newUrl;
        navigate(newUrl)
        receiverId = variableString.substring(variableString.indexOf("/") + 1);
        getMessages()
    }

     function getChatOptions() {
        let html = <></>;
        if (product !== undefined) {
            if (product.user.id == senderId) {
                if (startUpChatOptions) {
                    fetchChatOptions()
                    setStartUpChatOptions( false);
                }
                html = <div>
                    <label htmlFor={"input-select"}>Chose a Chat:</label>
                    <select id={"input-select"} >
                        {otherUsers && otherUsers.map(user => (
                            <option onClick={changeChat} value={user.id}>{user.username}</option>
                        ))}
                        <div key={otherUsers.id}>
                        </div>
                    </select>
                </div>
            }
        }
        return (html)
    }

    function fetchChatOptions() {
        fetch(`http://localhost:8080/message/options/${senderId}/${productId}`)
            .then(response => response.json())
            .then(data => setOtherUsers(data))
    }


    return (
        <div>
            <h1>
                {title}
            </h1>

            {getChatOptions()}



            <div className={"scrollBox"} >
                <div className={"inner-scrollBox"} id={"chatbox"}>
                    { messages && messages.map(message => (
                        <div key={message.id} >
                            <div className={getDateClasses(message.timestamp)}>
                                {processDate(message.timestamp)}
                            </div>

                            <div className={getMessageClasses(message)}>
                                <p><b>{message.sender.username}: </b> {message.text}</p>
                                <p className={"time"}>{getTime(message.timestamp)}</p>
                            </div>

                        </div>
                    ))}
                </div>
                <div className={"textBox"}>
                    <label htmlFor={"text-input"} >Write here:&nbsp;</label>
                    <input type={"text"} id={"text-input"} size={window.innerWidth / 26} onKeyUp={function (e) {
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