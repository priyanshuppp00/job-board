import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Container = ({ children }) => {
  const { darkMode } = useContext(AppContext);
  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
