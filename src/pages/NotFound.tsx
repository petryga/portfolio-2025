import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="backdrop-blur-sm bg-background/30 rounded-lg p-10 md:p-14 text-center space-y-4">
        <h1 className="font-mono text-6xl font-light text-accent">404</h1>
        <p className="text-lg font-light text-subtle">Oops! Page not found</p>
        <Link
          to="/"
          className="inline-block font-mono text-sm text-foreground hover:text-accent transition-smooth"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
