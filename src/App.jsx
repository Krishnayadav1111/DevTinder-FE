import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Feed from "./Pages/Feed"
import Profile from "./Pages/Profile"
import Connections from "./Pages/Connections"
import Request from "./Pages/Request"


function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />}>
            {/* //child routes */}
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Request />} />

          </Route>

        </Routes>

      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
