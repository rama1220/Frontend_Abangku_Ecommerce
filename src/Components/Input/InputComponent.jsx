import TextInput from "../../TextInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Scrollbar } from "../../helper/Scrollbar";
import { useAuth } from "../../Context/AuthContext";

export default function InputComponent() {
  const { Search } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const handleInput = (e) => {
    const term = e.target.value;
    setSearchInput(term.toLowerCase());
  };

  const handleEnterKeyPress = (e) => {
    const searchInputValue = searchInput.trim();

    if (e.key === "Enter" && searchInputValue !== "") {
      Search(searchInputValue)
        .then(() => {
          localStorage.setItem("item", searchInputValue);
          navigate("/search");
          Scrollbar();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleClick = () => {
    if (searchInput.trim() !== "") {
      const searchInputValue = searchInput.trim();
      Search(searchInputValue) 
        .then(() => {
          localStorage.setItem("item", searchInputValue);
          navigate("/search");
          Scrollbar();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  return (
    <>
      <div className="form-input">
        <TextInput required={true} label="" placeholder="Search your cloth..." onChange={handleInput} onKeyDown={(e) => handleEnterKeyPress(e, navigate, Scrollbar)} className="input" />
        <button
          className="btn-Search"
          onChange={handleInput}
          onClick={() => {
            handleClick(navigate);
            Scrollbar();
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
      </div>
    </>
  );
}
