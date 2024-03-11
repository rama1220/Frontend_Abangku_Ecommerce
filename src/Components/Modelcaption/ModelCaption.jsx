import men from "../Assets/men.jpg";
import women from "../Assets/women.jpg";
import kids from "../Assets/kids.jpg";
import family from "../Assets/family.jpg";
import { Link } from "react-router-dom";
import {Scrollbar} from "../../helper/Scrollbar";


export default function ModelCaption() {
  return (
    <>
      <div className="caption-container">
        <h2>Life Style</h2>
        <div className="box-style">
          <Link to="/men" onClick={Scrollbar}>
            <img src={men} alt="" />
          </Link>
          <Link to="/women" onClick={Scrollbar}>
            <img src={women} alt="" />
          </Link>
          <Link to="/kid" onClick={Scrollbar}>
            <img src={kids} alt="" />
          </Link>
          <Link to="/family" onClick={Scrollbar}>
            <img src={family} alt="" />
          </Link>
        </div>
      </div>
    </>
  );
}

