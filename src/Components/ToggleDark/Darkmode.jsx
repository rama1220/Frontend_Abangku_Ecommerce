import { useAuth } from "../../Context/AuthContext";
import { useEffect } from "react";

export default function Darkmode() {
  const { toggleDarkMode, isDarkMode, setIsDarkMode } = useAuth();

  useEffect(() => {
    const darkModePreference = localStorage.getItem("isDarkMode");
    if (darkModePreference !== null) {
      setIsDarkMode(JSON.parse(darkModePreference));
    }
  }, [setIsDarkMode]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <>
      <div className="darkmode-toggle">
        <label className="switch">
          <input type="checkbox" checked={isDarkMode} onChange={() => toggleDarkMode(!isDarkMode)} />
          <span className="slider"></span>
        </label>
      </div>
    </>
  );
}
