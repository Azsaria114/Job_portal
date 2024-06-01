
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Loginpage from './pages/Loginpage';
import Userpage from './pages/Userpage';

import Jobpost from './pages/Jobpost';
import Jobseek from './pages/Jobseek';
import UserDash from './pages/UserDash';
import WelcomePage from './pages/WelcomePage';


function App() {
 return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage/>} />
          <Route path="/userpage" element={<Userpage/>} />
          <Route path="/loginform" element={<Loginpage />} />    
          <Route path="/jobform" element={<Jobpost />} />
          <Route path="/jobdetails" element={<Jobseek/>} />
          <Route path="/userprofile" element={<UserDash/>} />
          </Routes>
      </Router>
    


     
    </div>
  );
}

export default App;
