
import React, { useState } from 'react';
import { ShoppingCart, User, LogIn, UserPlus, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import CartDropdown from './CartDropdown';

const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const { getTotalItems } = useCart();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-green-800">HikeGear</Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link to="/" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Home
                </Link>
                <Link to="/products" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Products
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  About
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Contact
                </Link>
              </div>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              {!isLoggedIn ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowLogin(true)}
                    className="hover:bg-green-50"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowRegister(true)}
                    className="border-green-600 text-green-600 hover:bg-green-50"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Register
                  </Button>
                </>
              ) : (
                <>
                  {user?.role === 'user' && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="relative hover:bg-green-50"
                        >
                          <ShoppingCart className="h-5 w-5" />
                          {getTotalItems() > 0 && (
                            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                              {getTotalItems()}
                            </span>
                          )}
                          <ChevronDown className="h-3 w-3 ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-80 bg-white">
                        <CartDropdown />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-gray-600" />
                    <span className="text-sm text-gray-700">{user?.name}</span>
                    {user?.role === 'admin' && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        Admin
                      </span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="hover:bg-red-50 hover:text-red-600"
                  >
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Modals */}
      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />
      <RegisterModal 
        isOpen={showRegister} 
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
    </>
  );
};

export default Navbar;
