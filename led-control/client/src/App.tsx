import React, { useEffect } from 'react';
import { useNavigate, NavLink } from "react-router-dom";



function App() {



  return(
    <div>
      Hello World 
      <br/>
      <NavLink to={"/mqtt"}>MQTT</NavLink>
      <br></br>
      <NavLink to={"/sf"}>Salesforce Connect</NavLink>
    </div>
  )
}

export default App;
