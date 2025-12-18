import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Feed from "./Pages/Feed"


function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />}>
            {/* //child routes */}
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />

          </Route>

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
