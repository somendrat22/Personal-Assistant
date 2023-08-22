import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<SignUp/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
