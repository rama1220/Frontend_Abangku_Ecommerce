import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";

export default function SelectOption() {
  const [showOption, setShowOption] = useState("Select Filter");
  const { setFilter } = useAuth();

  const handleOption = (option) => {
    setShowOption(option);
    setFilter(option); 
  };

  return (
    <>
      <div className="dropdown">
        <span>{showOption}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>
        <div className="dropdown-content">
          <p onClick={() => handleOption("Newest Product")}>Newest Product</p>
          <p onClick={() => handleOption("Most Expensive")}>Most Expensive</p>
          <p onClick={() => handleOption("Cheapest")}>Cheapest</p>
          <p onClick={() => handleOption("Alphabets A-Z")}>Alphabets A-Z</p>
          <p onClick={() => handleOption("Alphabets Z-A")}>Alphabets Z-A</p>
        </div>
      </div>
    </>
  );
}
