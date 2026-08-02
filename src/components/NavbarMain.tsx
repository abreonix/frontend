"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  cubicBezier,
  useScroll,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useStudent } from "@/components/useStudent";

/* ---------------- CONFIG ---------------- */

const EASE = cubicBezier(0.22, 1, 0.36, 1);
const EASE_OUT = cubicBezier(0.16, 1, 0.3, 1);
const EASE_IN = cubicBezier(0.12, 0, 0.39, 0);

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Education", href: "/education" },
  { name:"Products",href:"/products"},
  { name:"Testimonials",href:"/testimonial"},
  { name:"Contact",href:"/contact"}
];

/* ---------------- AUTH TYPES & UTILS ---------------- */

interface UserData {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: "student" | "admin";
}

// Auth utility functions
const authUtils = {
  getToken: (role?: "student" | "admin"): string | null => {
    if (typeof window === "undefined") return null;

    if (role === "admin") {
      return localStorage.getItem("adminToken");
    } else if (role === "student") {
      return localStorage.getItem("studentToken");
    }

    return (
      localStorage.getItem("studentToken") || localStorage.getItem("adminToken")
    );
  },

  getUserRole: (): "student" | "admin" | null => {
    if (typeof window === "undefined") return null;
    if (localStorage.getItem("studentToken")) return "student";
    if (localStorage.getItem("adminToken")) return "admin";
    return null;
  },

  getUserData: (): UserData | null => {
    if (typeof window === "undefined") return null;
    const userJson = localStorage.getItem("userData");
    if (!userJson) return null;
    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false;
    return !!(
      localStorage.getItem("studentToken") || localStorage.getItem("adminToken")
    );
  },

  logout: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("studentToken");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("userData");
    window.dispatchEvent(new Event("storage"));
  },
};

/* ---------------- USER DROPDOWN ---------------- */

function UserDropdown({ user, isDark }: { user: UserData; isDark: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    authUtils.logout();
    setIsOpen(false);
    router.refresh(); // Refresh current route
    router.push("/"); // Redirect to home
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-5 h-8 rounded-full transition-all duration-300",
          "hover:scale-105 active:scale-95",
          "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-900 font-semibold shadow-lg shadow-amber-500/40 neon-glow",
        )}
      >
        <div className="relative w-8 h-8 rounded-full border-4 -ml-2 border-white/20 overflow-hidden bg-gradient-to-br">
          <Avatar className="w-full h-full">
            {user.avatarUrl ? (
              <AvatarImage src={user.avatarUrl} alt={user.name} />
            ) : (
              <AvatarFallback className="bg-blue-400 flex items-center justify-center text-white font-serif italic font-semibold">
                {user.name.charAt(0)}
              </AvatarFallback>
            )}
          </Avatar>
        </div>

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
              "absolute right-0 top-full mt-2 w-48 rounded-xl p-2 shadow-2xl z-50 backdrop-blur-xl",
              "bg-gray-800/95 border border-white/10",
            )}
          >
            <div className="px-3 py-2 border-b border-white/10 mb-2">
              <p className="font-medium text-sm truncate text-white">
                {user.name}
              </p>
              <p className="text-xs opacity-70 truncate text-white/70">
                {user.email}
              </p>
              <p className="text-xs mt-1 px-2 py-1 rounded-full bg-sky-500/20 text-sky-400 inline-block capitalize">
                {user.role}
              </p>
            </div>

            <Link
              href={`/${user.role}/dashboard`}
              className={cn(
                "flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-all duration-200 mb-1",
                "hover:bg-white/10 text-white/90",
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
                "hover:bg-amber-500/20 text-amber-300",
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
  isAuthenticated,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  isAuthenticated: boolean;
  user: UserData | null;
}) {
  const router = useRouter();

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: EASE_IN,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: EASE_OUT,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  const handleLogout = () => {
    authUtils.logout();
    onClose();
    router.refresh();
    router.push("/");
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
              scale: { type: "spring", damping: 20, stiffness: 300 },
            }}
            className={cn(
              "fixed left-4 right-4 top-24 z-50 rounded-2xl p-6 shadow-2xl",
              "md:hidden",
              "bg-gray-800/95 border border-white/10 backdrop-blur-xl",
            )}
          >
            {user && (
              <motion.div
                variants={itemVariants}
                className="mb-4 px-4 py-3 rounded-lg bg-sky-500/10 border border-sky-500/20"
              >
                <p className="font-medium text-sm text-white truncate">
                  {user.name}
                </p>
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
                          ? "text-sky-400 bg-sky-400/10"
                          : "text-white/80 hover:text-white hover:bg-white/5",
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
                    <Link
                      href={
                        user ? `/${user.role}/dashboard` : "/student/dashboard"
                      }
                    >
                      <Button
                        className="w-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 py-6 text-slate-900 hover:from-amber-400 hover:to-yellow-400 text-lg font-semibold shadow-lg shadow-amber-500/30"
                        onClick={onClose}
                      >
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full rounded-full py-6 text-lg border-amber-500/30 text-amber-300 hover:bg-amber-500/10 hover:text-amber-200"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Link href="/student/login">
                    <Button
                      className="w-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 py-6 text-slate-900 hover:from-amber-400 hover:to-yellow-400 text-lg font-semibold shadow-lg shadow-amber-500/30"
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

export default function NavbarMain({ variant = "default" }) {
  const pathname = usePathname() || "/";
  const { scrollY, scrollYProgress } = useScroll(); // Added scrollYProgress
  const containerRef = useRef<HTMLDivElement>(null);

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { student, loading: studentLoading } = useStudent();

  // Motion values
  const navHeight = useMotionValue(72);
  const navWidth = useMotionValue(1280);
  const scaleX = useMotionValue(1);
  const blur = useMotionValue(0);
  const backgroundOpacity = useMotionValue(0.7);

  // Smooth springs
  const springHeight = useSpring(navHeight, {
    stiffness: 280,
    damping: 30,
    mass: 0.5,
  });
  const springWidth = useSpring(navWidth, {
    stiffness: 220,
    damping: 28,
    mass: 0.5,
  });
  const springScaleX = useSpring(scaleX, {
    stiffness: 220,
    damping: 26,
    mass: 0.5,
  });
  const springBlur = useSpring(blur, {
    stiffness: 300,
    damping: 30,
  });

  // Progress Bar Spring
  const scaleXProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Transforms
  const navScale = useTransform(scrollY, [0, 100], [1, 0.98]);

  // States
  const [hidden, setHidden] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (student) {
      setUser({
        id: student.id,
        name: student.name,
        email: student.email,
        avatarUrl: student.image, // backend safe
        role: "student",
      });
      setIsAuthenticated(true);
    }
    // We don't overwrite with null here to prevent flickering if useStudent is loading
    setIsLoading(studentLoading);
  }, [student, studentLoading]);

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
    const shrinkPoint =
      typeof window !== "undefined" ? window.innerHeight * 0.75 : 800;
    const hideThreshold = 100;
    const velocityThreshold = 0.3;

    const updateNavbar = () => {
      const currentY = scrollY.get();
      const deltaY = currentY - lastY;
      const timeDelta = 16; // ~60fps
      velocity = deltaY / timeDelta;

      // Responsive adjustments
      const isMobileView =
        isMobile || (typeof window !== "undefined" && window.innerWidth < 768);
      const baseHeight = isMobileView ? 60 : 72;
      const shrunkHeight = isMobileView ? 50 : 54;

      // Enhanced scroll zones
      if (currentY >= shrinkPoint) {
        // Shrunk zone
        if (!isShrunk) {
          setIsShrunk(true);
          setHidden(false);
        }

        navHeight.set(shrunkHeight);
        navWidth.set(
          isMobileView
            ? typeof window !== "undefined"
              ? window.innerWidth * 0.88
              : 300
            : 1150,
        );
        scaleX.set(0.98);
        blur.set(12);
        backgroundOpacity.set(0.85);
      } else {
        // Hero zone with auto-hide
        setIsShrunk(false);

        navHeight.set(baseHeight);
        navWidth.set(
          isMobileView
            ? typeof window !== "undefined"
              ? window.innerWidth * 0.9
              : 320
            : 1280,
        );
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
  }, [
    scrollY,
    navHeight,
    navWidth,
    scaleX,
    blur,
    backgroundOpacity,
    isShrunk,
    isMobile,
  ]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

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
              backgroundColor: "rgba(40, 39, 39, 0.85)",
              borderColor: "rgba(255, 255, 255, 0.15)",
            }}
            className={cn(
              "fixed inset-x-0 top-4 z-50 mx-auto origin-top rounded-2xl border",
              "shadow-[0_12px_40px_rgba(0,0,0,0.45)]",
              "transition-[background,backdrop-filter] duration-300",
              "md:top-6",
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
                      width={34}
                      height={34}
                      className="w-7 h-7 md:w-9 md:h-9 transition-transform duration-300 hover:rotate-12"
                    />
                  </div>
                  <span className="font-serif italic text-sm md:text-base text-white">
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
                              ease: EASE_OUT,
                            }}
                          >
                            <Link
                              href={link.href}
                              className={cn(
                                "relative px-2 py-1 text-sm transition-all duration-300",
                                active
                                  ? "text-sky-400"
                                  : "text-white/80 hover:text-white",
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
                                    damping: 25,
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
                  <div className="h-10 w-24 rounded-full bg-white/10 animate-pulse" />
                ) : isAuthenticated ? (
                  <UserDropdown
                    user={
                      user ?? {
                        role: "student",
                        name: "User",
                        email: "",
                        id: "",
                      }
                    }
                    isDark={isDark} // <-- 🚨 FIXED SYNTAX ERROR HERE
                  />
                ) : (
                  <Link href="/student/login">
                    <Button className="rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-6 text-slate-900 font-semibold hover:from-amber-400 hover:to-yellow-400 shadow-lg shadow-amber-500/30">
                      Login
                    </Button>
                  </Link>
                )}
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                className={cn(
                  "md:hidden p-2 rounded-lg",
                  "transition-colors duration-200",
                  "text-white/80 hover:text-white hover:bg-white/10",
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
        isAuthenticated={isAuthenticated}
        user={user}
      />

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-sky-400 z-40 origin-left"
        style={{
          scaleX: scaleXProgress, // <-- FIXED: Uses true page progress
          opacity: useTransform(scrollY, [0, 50], [0, 0.8]),
        }}
      />
    </>
  );
}
