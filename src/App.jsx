import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<div className="text-center mt-10 text-2xl font-bold">EarnStack Home <br/> <a href="/register" className="text-blue-500 underline text-base">Go to Register</a> <br/> <a href="/login" className="text-blue-500 underline text-base">Go to Login</a></div>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
