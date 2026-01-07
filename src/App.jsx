import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ExploreTasks from "./pages/ExploreTasks";
import TaskDetails from "./pages/TaskDetails";
import DesignShowcase from "./pages/DesignShowcase";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MainLayout from "./layout/MainLayout";
import DashboardLayout from "./layout/DashboardLayout";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import Profile from "./pages/Dashboard/Profile";
import ManageUsers from "./pages/Dashboard/ManageUsers";
import WorkerSubmissions from "./pages/Dashboard/WorkerSubmissions";
import AddTask from "./pages/Dashboard/Buyer/AddTask";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="tasks" element={<ExploreTasks />} />
        <Route path="tasks/:id" element={<TaskDetails />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="design-showcase" element={<DesignShowcase />} />
      </Route>

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="admin-home" element={<DashboardHome />} />
        <Route path="worker-home" element={<DashboardHome />} />
        <Route path="buyer-home" element={<DashboardHome />} />
        
        <Route path="profile" element={<Profile />} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="my-submissions" element={<WorkerSubmissions />} />
        
        {/* Placeholders for other routes */}
        <Route path="manage-tasks" element={<DashboardHome />} />
        <Route path="withdrawals" element={<DashboardHome />} />
        <Route path="withdraw" element={<DashboardHome />} />
        <Route path="add-tasks" element={<AddTask />} />
        <Route path="my-tasks" element={<DashboardHome />} />
        <Route path="payments" element={<DashboardHome />} />
      </Route>
    </Routes>
  );
}


export default App;
