import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard, Login } from "@/pages";
import PrivateRoute from "./auth/PrivateRoute";
import { Navbar } from "@/components/appComp";

const App = () => {
  return (
    <Router>
      <Navbar />
      <main className="container mx-auto px-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
