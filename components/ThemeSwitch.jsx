import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BiSun, BiMoon } from "react-icons/bi";

const ThemeSwitch = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleTheme = () => {
    if (isMounted) {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  return (
    // <button
    //   aria-label="Toggle Dark Mode"
    //   type="button"
    //   className="w-8 h-8 p-1 ml-1 mr-1 rounded sm:ml-4"
    //   onClick={toggleTheme}
    // >
    //   <span className="text-lg">
    //     {isMounted && theme === "dark" ? (
    //       <BiSun className="text-xl" />
    //     ) : (
    //       <BiMoon className="text-xl" />
    //     )}
    //   </span>
    // </button>

    <button
      className="w-8 h-8 p-1 ml-1 mr-1 rounded sm:ml-4"
      onClick={toggleTheme}
    >
      <span className="text-lg">
        {isMounted && theme === "dark" ? (
          <BiSun className="text-xl" />
        ) : (
          <BiMoon className="text-xl" />
        )}
      </span>
    </button>
  );
};

export default ThemeSwitch;
