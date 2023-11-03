import { Route, Routes } from "react-router-dom"
import App from "./App"
import MqttPage from "./pages/MQTT"
import SfConnect from "./pages/SfConnect"

const Router = () => {
    return(
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/mqtt" element={<MqttPage/>}/>
            <Route path="/sf" element={<SfConnect />}/>
        </Routes>
    )
}

export default Router;