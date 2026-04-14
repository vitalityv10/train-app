import { Routes, Route } from 'react-router-dom';
import './App.css';

import { AuthProvider } from './components/auth/AuthContext';
import AppNavbar from './components/menu/AppNavbar';

import Home from './pages/Home';
import About from './pages/About';
import LoginPage from './pages/auth/LoginPage';
import UserProfile from './pages/UserProfile';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Cart from './pages/Cart';
import { WishList } from './pages/WishList';

import Footer from './components/menu/Footer';

export default function App() {
  return (
    <AuthProvider>
      <div className="d-flex flex-column min-vh-100 bg-light"> 
        
        <AppNavbar />

        <main className="flex-grow-1">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/wish-list' element={<WishList />} />
            <Route path='/profile' element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } />
          </Routes>
        </main>

        <Footer />
      </div>
    </AuthProvider>
  );
}