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
import Message from "./pages/message/Message";
import ChatList from "./pages/chat_page/ChatList";
import Sent from "./pages/sent_page/Sent";
import ShortList from "./pages/shortList_page/ShortList";
import ShortListedBy from "./pages/shortlistedBy_page/ShortListedBy";
import Accept from "./pages/accept_page/Accept";
import Receive from "./pages/recieved_page/Received";
import Reject from "./pages/reject_page/Reject";
import { SocketProvider } from "./routing/SocketProvider";
import EditProfile from "./pages/edit_profile_page/EditProfile";
import ServiceSelection from "./pages/service_page/Service";
function App() {
  const ConditionalNavBar = () => {
    const location = useLocation();
    const showNavBar = location.pathname.startsWith('/home');
    return showNavBar ? <NavBar /> : null;
  };
  return <>
  <div className="main">
    <SocketProvider>
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
      <Route path="/home/editProfile" element={<EditProfile />} />
      <Route path="/home/userDetails/:id" element={<UserProfileDetails /> } />
      <Route path="/home/message/:conversationId/:receiverId" element={<Message />} />
      <Route path="/home/chatList" element={<ChatList />} />
      <Route path="/home/sent" element={<Sent />} />
      <Route path="/home/received" element={<Receive />} />
      <Route path="/home/accept" element={<Accept />} />
      <Route path="/home/shortList" element={<ShortList />}/>
      <Route path="/home/shortListedBy" element={<ShortListedBy />}/>
      <Route path="/home/reject" element={<Reject />} />
      <Route path="/service" element={<ServiceSelection />} />
    </Routes>
    </BrowserRouter>
    </SocketProvider>
  </div>
  </>
}

export default App;
