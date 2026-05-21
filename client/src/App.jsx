import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Templates from "./pages/Template";
import Favorites from "./pages/Favourites";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { FavoriteProvider } from "./context/FavoriteContext";

function App() {
  return (
    <FavoriteProvider>
      <Router>
        <div className="flex min-h-screen flex-col bg-slate-100">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/templates" element={<Templates />} />
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </FavoriteProvider>
  );
}

export default App;
