import React, { useState } from 'react';
// import axios, { AxiosResponse, AxiosError } from 'axios';


function App() {

  enum mqttCommand {
    LED_ON
  };
  
  // interface MQTT_Message {
  //   message: string;
  //   isCommand: boolean;
  //   command?: mqttCommand;
  // };

  const [messageInput, setMessageInput] = useState<string>('');
  const [testData, setTestData] = useState<string>('');
  
  const handleSendButtonPress = async () => {
    // Make post request to /mqtt/
    const response = await fetch('http://localhost:3200/mqtt/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({message: messageInput, isCommand: false})
    });
    
    if (!response.ok) throw new Error('Request failed');
    console.log(messageInput);
    setMessageInput('');
  };

  const  handleConnectButtonPress = async () => {
    // Make get request to /mqtt/
    const response = await fetch('http://localhost:3200/mqtt/', {
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

  const handleLEDButtonPress = async () => {
    const response = await fetch('http://localhost:3200/mqtt/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({message: messageInput, isCommand: true, 
                            mqttCommand: mqttCommand.LED_ON})
    });

    if (!response.ok) throw new Error('Request failed');
    console.log(messageInput);
    setMessageInput('');

  }


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
        <button className='ledButton' onClick={handleLEDButtonPress}>LED</button>
        <br />
        <p>{testData}</p>
      </div>
      
    </div>
  );
}

export default App;
