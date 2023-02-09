import React from "react";
import logo from "../img/tradecool.png";
export default function Home() {
  return (
    <div style={{
      textAlign: 'center',
      marginTop: '30px'
    }}>
        <br/>
      <h1>Willkommen bei</h1>
        <img src={logo} width="65%" alt={"logo"}/>
    </div>
  );
}
