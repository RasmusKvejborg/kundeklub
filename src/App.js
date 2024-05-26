import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {Statistik} from "./pages/Statistik";
import {Medlemmer} from "./pages/Medlemmer";
import Navbar from "./components/Navbar";
import {signal} from "@preact/signals-react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";



export const customersSignal = signal(fetchCustomers());
async function fetchCustomers() {
    try {
        console.log("Kalder API...")
        const response = await fetch('https://us-central1-crudapifirebase.cloudfunctions.net/app/api/read');
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error fetching customers:', error);
    }
};

function App() {

    return(
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/statistik" element={<Statistik/>}/>
                <Route path="/Medlemmer" element={<Medlemmer/>}/>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/Register" element={<Register/>}/>
                <Route path="/Settings" element={<Settings/>}/>

            </Routes>
        </div>
    )
}

export default App;
