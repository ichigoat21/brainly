import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Dashboard } from "./pages/dashboard"
import { Signin } from "./pages/signin"
import { SignUp } from "./pages/signup"

const App = () => {
  return <BrowserRouter>
  <Routes>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
  </Routes>
  </BrowserRouter>
}
export default App

