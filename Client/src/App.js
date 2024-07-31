import { Route, Routes } from "react-router-dom"
import { View } from "./View"
import { Playlists } from "./Playlists"
import { PlaylistV2 } from "./PlaylistV2"


function App() {
    return (
        <Routes>
            <Route path="/" element={<View />} />
            <Route path="/Playlists" element={<Playlists />} />
            <Route path= "/PlaylistsV2" element={<PlaylistV2 />} />

        </Routes>
    )
}

export default App