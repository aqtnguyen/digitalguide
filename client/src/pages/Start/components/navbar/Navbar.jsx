import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../logo.svg";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="dgNavbarContainer">
      <div className="dgNavbarLinksContainer">
        <div className="dgNavbarLogo" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" />
        </div>
        <div className="dgNavbarLinks">
          <p>
            <a href="#home">Home</a>
          </p>
          <p>
            <a href="#wdg">What is DG?</a>
          </p>
          <p>
            <a href="#possibility">Community</a>
          </p>
          <p>
            <a href="#blog">Reviews</a>
          </p>
          <p>
            <a href="#footer">Contact</a>
          </p>
        </div>
      </div>
      <div className="dgNavbarSign">
        <a href="/login">Sign In</a>
        <form action="/signup">
          <button type="submit">Sign up</button>
        </form>
      </div>
      <div className="dgNavbarMenuContainer">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="dgNavbarMenu scale-up-center">
            <div className="dgNavbarMenuLinks">
              <p>
                <a href="#home">Home</a>
              </p>
              <p>
                <a href="#wdg">What is DG?</a>
              </p>
              <p>
                <a href="#possibility">Community</a>
              </p>
              <p>
                <a href="#blog">Reviews</a>
              </p>
              <p>
                <a href="#footer">Contact</a>
              </p>
            </div>
            <div className="dgNavbarMenuSignLinks">
              <p>Sign in</p>
              <button type="button" component={Link} to="/auth">
                Sign up
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
