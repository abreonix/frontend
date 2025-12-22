"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  cubicBezier,
  useScroll,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, User } from "lucide-react";

/* ---------------- CONFIG ---------------- */

const EASE = cubicBezier(0.22, 1, 0.36, 1);
const EASE_OUT = cubicBezier(0.16, 1, 0.3, 1);
const EASE_IN = cubicBezier(0.12, 0, 0.39, 0);

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Education", href: "/education" },
  { name: "Services", href: "/services" },
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
];

/* ---------------- AUTH TYPES & UTILS ---------------- */

interface UserData {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin';
}

// Auth utility functions
const authUtils = {
  getToken: (role?: 'student' | 'admin'): string | null => {
    if (typeof window === 'undefined') return null;
    
    if (role === 'admin') {
      return localStorage.getItem('adminToken');
    } else if (role === 'student') {
      return localStorage.getItem('studentToken');
    }
    
    // Try both if no role specified
    return localStorage.getItem('studentToken') || localStorage.getItem('adminToken');
  },

  getUserRole: (): 'student' | 'admin' | null => {
    if (typeof window === 'undefined') return null;
    
    if (localStorage.getItem('studentToken')) return 'student';
    if (localStorage.getItem('adminToken')) return 'admin';
    return null;
  },

  getUserData: (): UserData | null => {
    if (typeof window === 'undefined') return null;
    
    const userJson = localStorage.getItem('userData');
    if (!userJson) return null;
    
    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false;
    return !!(localStorage.getItem('studentToken') || localStorage.getItem('adminToken'));
  },

  logout: (): void => {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem('studentToken');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userData');
    window.dispatchEvent(new Event('storage'));
  }
};

/* ---------------- MAGNETIC ---------------- */

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { 
    stiffness: 350, 
    damping: 25, 
    mass: 0.1 
  });
  const springY = useSpring(y, { 
    stiffness: 350, 
    damping: 25, 
    mass: 0.1 
  });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ 
        x: springX, 
        y: springY,
        transition: "transform 0.3s ease-out"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- USER DROPDOWN ---------------- */

function UserDropdown({ 
  user, 
  isDark 
}: { 
  user: UserData;
  isDark: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    authUtils.logout();
    setIsOpen(false);
    window.location.href = '/';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300",
          "hover:scale-105 active:scale-95",
          isDark 
            ? "bg-sky-600 hover:bg-sky-500 text-white" 
            : "bg-sky-600 hover:bg-sky-500 text-white"
        )}
      >
        <User size={16} />
        <span className="hidden sm:inline">Dashboard</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: EASE }}
            className={cn(
              "absolute right-0 top-full mt-2 w-48 rounded-xl p-2 shadow-2xl z-50",
              isDark 
                ? "bg-gray-900/95 border border-white/10 backdrop-blur-xl" 
                : "bg-white/95 border border-black/10 backdrop-blur-xl"
            )}
          >
            <div className="px-3 py-2 border-b border-white/10 mb-2">
              <p className="font-medium text-sm truncate">{user.name}</p>
              <p className="text-xs opacity-70 truncate">{user.email}</p>
              <p className="text-xs mt-1 px-2 py-1 rounded-full bg-sky-500/20 text-sky-400 inline-block capitalize">
                {user.role}
              </p>
            </div>
            
            <Link 
              href={`/${user.role}/dashboard`}
              className={cn(
                "flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-all duration-200 mb-1",
                isDark 
                  ? "hover:bg-white/10 text-white/90" 
                  : "hover:bg-black/10 text-gray-800"
              )}
              onClick={() => setIsOpen(false)}
            >
              <User size={14} />
              Dashboard
            </Link>
            
            <button
              onClick={handleLogout}
              className={cn(
                "flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-all duration-200",
                isDark 
                  ? "hover:bg-red-500/20 text-red-400" 
                  : "hover:bg-red-500/10 text-red-600"
              )}
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- MOBILE MENU ---------------- */

function MobileMenu({ 
  isOpen, 
  onClose, 
  pathname,
  isDark,
  isAuthenticated,
  user
}: { 
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  isDark: boolean;
  isAuthenticated: boolean;
  user: UserData | null;
}) {
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: EASE_IN,
        staggerChildren: 0.05,
        staggerDirection: -1,
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: EASE_OUT,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };

  const handleLogout = () => {
    authUtils.logout();
    onClose();
    window.location.reload();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Menu Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ 
              duration: 0.4, 
              ease: EASE_OUT,
              scale: { type: "spring", damping: 20, stiffness: 300 }
            }}
            className={cn(
              "fixed left-4 right-4 top-24 z-50 rounded-2xl p-6 shadow-2xl",
              "md:hidden",
              isDark 
                ? "bg-gray-900/95 border border-white/10 backdrop-blur-xl" 
                : "bg-white/95 border border-black/10 backdrop-blur-xl"
            )}
          >
            {user && (
              <motion.div 
                variants={itemVariants}
                className="mb-4 px-4 py-3 rounded-lg bg-sky-500/10 border border-sky-500/20"
              >
                <p className="font-medium text-sm text-white truncate">{user.name}</p>
                <p className="text-xs text-white/70 truncate">{user.email}</p>
                <p className="text-xs mt-1 px-2 py-1 rounded-full bg-sky-500/20 text-sky-400 inline-block capitalize">
                  {user.role}
                </p>
              </motion.div>
            )}

            <motion.ul 
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col gap-4"
            >
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <motion.li key={link.name} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={cn(
                        "block py-3 px-4 rounded-lg text-lg transition-all duration-300",
                        active
                          ? "text-blue-200 bg-sky-400/10"
                          : isDark
                          ? "text-white/90 hover:text-white hover:bg-white/5"
                          : "text-white/80 hover:text-white hover:bg-black/5"
                      )}
                    >
                      {link.name}
                      {active && (
                        <motion.span
                          layoutId="mobile-nav"
                          className="block h-0.5 w-full bg-sky-400 mt-1"
                        />
                      )}
                    </Link>
                  </motion.li>
                );
              })}
              
              <motion.li variants={itemVariants} className="pt-4">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <Link href={user ? `/${user.role}/dashboard` : '/student/dashboard'}>
                      <Button 
                        className="w-full rounded-full bg-sky-600 py-6 text-white hover:bg-sky-500 text-lg"
                        onClick={onClose}
                      >
                        Dashboard
                      </Button>
                    </Link>
                    <Button 
                      variant="outline"
                      className="w-full rounded-full py-6 text-lg border-red-500/30 text-red-500 hover:bg-red-500/10 hover:text-red-400"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Link href="/student/login">
                    <Button 
                      className="w-full rounded-full bg-sky-600 py-6 text-white hover:bg-sky-500 text-lg"
                      onClick={onClose}
                    >
                      Login
                    </Button>
                  </Link>
                )}
              </motion.li>
            </motion.ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ---------------- NAVBAR ---------------- */

export default function Navbar({ variant = "default" }) {
  const pathname = usePathname() || "/";
  const { scrollY } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Motion values
  const navHeight = useMotionValue(72);
  const navWidth = useMotionValue(1024);
  const scaleX = useMotionValue(1);
  const blur = useMotionValue(0);
  const backgroundOpacity = useMotionValue(0.7);
  
  // Smooth springs
  const springHeight = useSpring(navHeight, { 
    stiffness: 280, 
    damping: 30,
    mass: 0.5
  });
  const springWidth = useSpring(navWidth, { 
    stiffness: 220, 
    damping: 28,
    mass: 0.5
  });
  const springScaleX = useSpring(scaleX, { 
    stiffness: 220, 
    damping: 26,
    mass: 0.5
  });
  const springBlur = useSpring(blur, {
    stiffness: 300,
    damping: 30
  });
  const springBackgroundOpacity = useSpring(backgroundOpacity, {
    stiffness: 300,
    damping: 30
  });

  // Transforms
  const navScale = useTransform(scrollY, [0, 100], [1, 0.98]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0.1, 0.15]);

  // States
  const [hidden, setHidden] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const isDark = variant === "dark";

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = authUtils.isAuthenticated();
      setIsAuthenticated(authStatus);
      setUser(authUtils.getUserData());
      setIsLoading(false);
    };

    checkAuth();

    // Listen for auth changes (login/logout in other tabs)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Check mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* ---------------- ENHANCED SCROLL LOGIC ---------------- */

  useEffect(() => {
    let animationFrameId: number;
    let lastY = scrollY.get();
    let velocity = 0;
    const shrinkPoint = window.innerHeight * 0.75;
    const hideThreshold = 100;
    const velocityThreshold = 0.3;

    const updateNavbar = () => {
      const currentY = scrollY.get();
      const deltaY = currentY - lastY;
      const timeDelta = 16; // ~60fps
      velocity = deltaY / timeDelta;

      // Responsive adjustments
      const isMobileView = isMobile || window.innerWidth < 768;
      const baseHeight = isMobileView ? 60 : 72;
      const shrunkHeight = isMobileView ? 50 : 54;
      const baseWidth = isMobileView ? "90vw" : 1024;
      const shrunkWidth = isMobileView ? "88vw" : 860;

      // Enhanced scroll zones
      if (currentY >= shrinkPoint) {
        // Shrunk zone
        if (!isShrunk) {
          setIsShrunk(true);
          setHidden(false);
        }

        navHeight.set(shrunkHeight);
        navWidth.set(isMobileView ? window.innerWidth * 0.88 : 860);
        scaleX.set(0.98);
        blur.set(12);
        backgroundOpacity.set(0.85);
      } else {
        // Hero zone with auto-hide
        setIsShrunk(false);

        navHeight.set(baseHeight);
        navWidth.set(isMobileView ? window.innerWidth * 0.9 : 1024);
        scaleX.set(1);
        blur.set(8);
        backgroundOpacity.set(0.7);

        // Smooth hide/show based on velocity and position
        if (Math.abs(velocity) > velocityThreshold) {
          if (velocity > 0 && currentY > hideThreshold) {
            setHidden(true);
          } else if (velocity < -0.5) {
            setHidden(false);
          }
        }
      }

      lastY = currentY;
      setLastScrollY(currentY);
      animationFrameId = requestAnimationFrame(updateNavbar);
    };

    animationFrameId = requestAnimationFrame(updateNavbar);
    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollY, navHeight, navWidth, scaleX, blur, backgroundOpacity, isShrunk, isMobile]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle scroll to hide/show mobile menu
  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen && scrollY.get() > lastScrollY + 50) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen, lastScrollY, scrollY]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SiteNavigationElement",
            name: navLinks.map((l) => l.name),
            url: navLinks.map((l) => `https://abreonix.in${l.href}`),
          }),
        }}
      />

      <AnimatePresence mode="wait">
        {!hidden && (
          <motion.header
            ref={containerRef}
            initial={{ y: -100, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 0.5,
              },
            }}
            exit={{
              y: -100,
              opacity: 0,
              transition: { duration: 0.3, ease: EASE_IN },
            }}
            style={{
              height: springHeight,
              maxWidth: springWidth,
              scaleX: springScaleX,
              scale: navScale,
              backdropFilter: `blur(${springBlur.get()}px) saturate(160%)`,
              WebkitBackdropFilter: `blur(${springBlur.get()}px) saturate(160%)`,
              backgroundColor: isDark
                ? "rgba(8,8,8,0.55)"
                : "rgb(40 39 39 / 55%)",
              borderColor: isDark
                ? "rgba(255,255,255,0.18)"
                : "rgba(0,0,0,0.12)",
            }}
            className={cn(
              "fixed inset-x-0 top-4 z-50 mx-auto origin-top rounded-2xl border",
              "shadow-[0_12px_40px_rgba(0,0,0,0.45)]",
              "transition-[background,backdrop-filter] duration-300",
              "md:top-6"
            )}
          >
            <nav className="flex h-full items-center justify-between px-4 md:px-6">
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Link href="/" className="flex items-center gap-2 md:gap-3">
                  <div className="relative overflow-hidden rounded-full">
                    <Image 
                      src="/logo2.png" 
                      alt="Abreonix" 
                      width={isMobile ? 28 : 34} 
                      height={isMobile ? 28 : 34}
                      className="transition-transform duration-300 hover:rotate-12"
                    />
                  </div>
                  <span className={cn(
                    "font-serif italic text-sm md:text-base",
                    isDark ? "text-white" : "text-white"
                  )}>
                    Abreonix
                  </span>
                </Link>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <NavigationMenu>
                  <NavigationMenuList className="gap-4 lg:gap-6">
                    {navLinks.map((link, index) => {
                      const active = pathname === link.href;
                      return (
                        <NavigationMenuItem key={link.name}>
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: index * 0.1,
                              duration: 0.4,
                              ease: EASE_OUT
                            }}
                          >
                            <Link
                              href={link.href}
                              className={cn(
                                "relative px-2 py-1 text-sm transition-all duration-300",
                                active
                                  ? "text-sky-400"
                                  : isDark
                                  ? "text-white/80 hover:text-white"
                                  : "text-white/70 hover:text-white"
                              )}
                            >
                              {link.name}
                              {active && (
                                <motion.span
                                  layoutId="nav-indicator"
                                  className="absolute -bottom-1 left-0 h-0.5 w-full bg-sky-400"
                                  transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 25
                                  }}
                                />
                              )}
                              {!active && (
                                <motion.span
                                  className="absolute -bottom-1 left-0 h-0.5 w-0 bg-sky-400"
                                  whileHover={{ width: "100%" }}
                                  transition={{ duration: 0.3, ease: EASE }}
                                />
                              )}
                            </Link>
                          </motion.div>
                        </NavigationMenuItem>
                      );
                    })}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              {/* Desktop Button */}
              <div className="hidden md:block">
                {isLoading ? (
                  // Skeleton loader while checking auth
                  <div className="h-10 w-24 rounded-full bg-gray-300/20 animate-pulse" />
                ) : isAuthenticated && user ? (
                  <Magnetic>
                    <motion.div
                      whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.2, ease: EASE_OUT }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <UserDropdown user={user} isDark={isDark} />
                    </motion.div>
                  </Magnetic>
                ) : (
                  <Magnetic>
                    <motion.div
                      whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.2, ease: EASE_OUT }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link href="/student/login">
                        <Button 
                          className="rounded-full bg-sky-600 px-6 text-white hover:bg-sky-500 shadow-lg shadow-sky-500/20"
                        >
                          Login
                        </Button>
                      </Link>
                    </motion.div>
                  </Magnetic>
                )}
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                className={cn(
                  "md:hidden p-2 rounded-lg",
                  "transition-colors duration-200",
                  isDark 
                    ? "text-white/80 hover:text-white hover:bg-white/10" 
                    : "text-white/70 hover:text-white hover:bg-black/10"
                )}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2, ease: EASE }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2, ease: EASE }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        pathname={pathname}
        isDark={isDark}
        isAuthenticated={isAuthenticated}
        user={user}
      />

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-sky-400 z-40 origin-left"
        style={{ 
          scaleX: useTransform(scrollY, [0, 200], [0, 1]),
          opacity: useTransform(scrollY, [0, 50], [0, 0.8])
        }}
      />
    </>
  );
}