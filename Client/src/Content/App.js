import { Route, Routes } from "react-router-dom"
import { View } from "./View"
import { Playlists } from "./Playlists"


function App() {
    return (
        <Routes>
            <Route path="/" element={<View />} />
            <Route path="/Playlists" element={<Playlists />} />
        </Routes>
    )
}

export default App