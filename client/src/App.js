import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ProtectedRoute from './components/ProtectedRoute';
import CreateItem from './pages/CreateItem';
import EditItem from './pages/EditItem';
import ItemDetails from './pages/ItemDetails';
import Profile from './pages/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
          <Route path="/create-item" element={<ProtectedRoute><CreateItem /></ProtectedRoute>}/>
          <Route path="/edit-item/:id" element={<ProtectedRoute><EditItem /></ProtectedRoute>}/>
          <Route path="/item/:id" element={<ProtectedRoute><ItemDetails /></ProtectedRoute>}/>
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
    </div>
  );
}

export default App;
