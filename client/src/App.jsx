import Login from "./pages/login_screen/Login";
import Register_screen from "./pages/register_screen/Register";
import {BrowserRouter,  Route, Routes, useLocation } from 'react-router-dom'
import Splash from "./pages/splash_screen/Splash";
import Profile from "./pages/profile_screen/Profile";
import RelationshipPurpose from "./pages/purpose_of_datingAp/Purpose";
import MatrimonyPrompt from "./pages/matrtimony-prompts/Matrimony_Prompts";
import HomeFeed from "./pages/HomeFeed_screen/HomeFeed";
import NavBar from "./pages/Nav_bar/NavBar";
import EmployementDetail from "./pages/employment_detail/EmployementDetail";
import GenderPreference from "./pages/genderPreference/GenderPreference";
import UserProfileDetails from "./pages/user_details/UserDetails";
function App() {
  const ConditionalNavBar = () => {
    const location = useLocation();
    const showNavBar = location.pathname.startsWith('/home');
    return showNavBar ? <NavBar /> : null;
  };
  return <>
  <div className="main">
    <BrowserRouter>
    <ConditionalNavBar />
    <Routes>
      
      <Route path="/" element={<Splash />} />
      <Route path="/register" element={<Register_screen />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/employement" element={<EmployementDetail />} />
      <Route path="/purpose" element={<RelationshipPurpose />} />
      <Route path="/matrimony-splash" element={<MatrimonyPrompt />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/genderPreference" element={<GenderPreference />} />
      <Route path='/home' element={<HomeFeed />} />
      <Route path="/home/userDetails/:id" element={<UserProfileDetails /> } />
    </Routes>
    </BrowserRouter>
  </div>
  </>
}

export default App;
