import React, { useState, useEffect } from 'react';


function App() {

  enum mqttCommand {
    LED_ON
  };
  
  interface MQTT_Message {
    message: string;
    isCommand: boolean;
    command?: mqttCommand;
  };

  const [userMessage, setUserMessage] = useState<MQTT_Message>(); 
  const [messageInput, setMessageInput] = useState<string> ('');
  
  const handleSendButtonPress = () => {
    setUserMessage({message:messageInput, isCommand:false});
    // Make post request to /mqtt/
    console.log(messageInput);
    setMessageInput('');
  };

  const  handleConnectButtonPress = async () => {
    // Make get request to /mqtt/
    const response = await fetch('http://localhost:3000/mqtt/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) throw new Error('Request failed');
    else console.log("Connected");
    
  };

  const handleMessageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(event.target.value);
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>MQTT Message App</h1>
      </header>
      <div>
        <input type='text' value={messageInput} onChange={handleMessageInput}
        placeholder='Enter Message' />
        <button onClick={handleSendButtonPress}>Send</button>
        <br/>
        <button onClick={handleConnectButtonPress}>Connect</button>
        <button className='ledButton'>LED</button>
      </div>
      
    </div>
  );
}

export default App;
