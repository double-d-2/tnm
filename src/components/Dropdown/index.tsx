import { useState } from "react";
import "./style.css";

interface IDropDownProps {
  buttonText: string;
  content: JSX.Element;
}

const Dropdown = ({ buttonText, content }: IDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="dropdown">
      <span className="dropdown-button" onClick={toggleOpen}>
        {buttonText}
      </span>
      {isOpen && <div className="dropdown-content">{content}</div>}
    </div>
  );
};

export default Dropdown;
