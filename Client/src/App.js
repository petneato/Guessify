import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import * as React from 'react';

//Page/View imports
import LoginPage from './Pages/Login'
import CallbackPage from './Pages/PostLogin'


function App() {
    return (
        <Routes>
            {/* Login.js */}
            <Route path="/"  element={<LoginPage/>} />
            <Route path="/callback" element={<CallbackPage/>} />
            <Route
        </Routes>
    )
}

export default App