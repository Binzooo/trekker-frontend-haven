
import React, { useState } from 'react';
import { ShoppingCart, User, LogIn, UserPlus, ChevronDown, Receipt, Moon, Sun, ExternalLink, ArrowLeft } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import CartDropdown from './CartDropdown';
import UserTransactions from './UserTransactions';

const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const { getTotalItems } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);

  const isAdminRoute = location.pathname === '/admin';

  const handleLogout = () => {
    logout();
  };

  const handleNavigation = () => {
    if (isAdminRoute) {
      navigate('/');
    } else {
      navigate('/admin');
    }
  };

  return (
    <>
      <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
                HikeGear
              </Link>
            </div>

            {/* Navigation Links - Show different links for admin vs regular users */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {user?.role === 'admin' ? (
                  <Button
                    variant="ghost"
                    onClick={handleNavigation}
                    className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    {isAdminRoute ? (
                      <>
                        <ExternalLink className="h-4 w-4" />
                        Visit Website
                      </>
                    ) : (
                      <>
                        <ArrowLeft className="h-4 w-4" />
                        Back to Admin
                      </>
                    )}
                  </Button>
                ) : (
                  <>
                    <Link to="/" className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Home
                    </Link>
                    <Link to="/products" className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Products
                    </Link>
                    <Link to="/about" className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      About
                    </Link>
                    <Link to="/contact" className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Contact
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              {/* Dark mode toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="hover:bg-accent"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              {!isLoggedIn ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowLogin(true)}
                    className="hover:bg-accent"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowRegister(true)}
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
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
                          className="relative hover:bg-accent"
                        >
                          <ShoppingCart className="h-5 w-5" />
                          {getTotalItems() > 0 && (
                            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                              {getTotalItems()}
                            </span>
                          )}
                          <ChevronDown className="h-3 w-3 ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-80 bg-background border border-border">
                        <CartDropdown />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center space-x-2 hover:bg-accent">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {user?.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-foreground">{user?.name}</span>
                        {user?.role === 'admin' && (
                          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs px-2 py-1 rounded-full">
                            Admin
                          </span>
                        )}
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-background border border-border" align="end">
                      {user?.role === 'user' && (
                        <>
                          <DropdownMenuItem 
                            onClick={() => setShowTransactions(true)}
                            className="cursor-pointer hover:bg-accent"
                          >
                            <Receipt className="h-4 w-4 mr-2" />
                            Transaction History
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      )}
                      <DropdownMenuItem 
                        onClick={handleLogout}
                        className="cursor-pointer text-destructive hover:text-destructive focus:text-destructive hover:bg-destructive/10"
                      >
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
      <UserTransactions 
        isOpen={showTransactions}
        onClose={() => setShowTransactions(false)}
      />
    </>
  );
};

export default Navbar;
