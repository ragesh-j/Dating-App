import Login from "./pages/login_screen/Login";
import Register_screen from "./pages/register_screen/Register";
import {BrowserRouter,  Route, Routes } from 'react-router-dom'
import Splash from "./pages/splash_screen/Splash";
import Profile from "./pages/profile_screen/Profile";
import RelationshipPurpose from "./pages/purpose_of_datingAp/Purpose";
import MatrimonyPrompt from "./pages/matrtimony-prompts/Matrimony_Prompts";
function App() {
  return <>
  <div className="main">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/register" element={<Register_screen />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/purpose" element={<RelationshipPurpose />} />
      <Route path="/matrimony-splash" element={<MatrimonyPrompt />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
    </BrowserRouter>
  </div>
  </>
}

export default App;
