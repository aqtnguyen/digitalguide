import React from "react";
import dgLogo from "../../logo.svg";
import "./footer.css";

const Footer = () => (
  <div className="dgFooterContainer section__padding" id="footer">
    <div className="dgFooterContent">
      <h1 className="gradient__text">Do you want to step up your city game?</h1>
    </div>

    <div className="dgFooterJoin">
      <a href="/signup">Join now here</a>
    </div>

    <div className="dgFooterLinksContainer">
      <div className="dgFooterLinksLogo">
        <img src={dgLogo} alt="dg_logo" />
      </div>
      <div className="dgFooterLinks">
        <h4>Links</h4>
        <p>Instagram</p>
        <p>LinkedIn</p>
        <p>Facebook</p>
        <p>Twitter</p>
      </div>
      <div className="dgFooterLinks">
        <h4>Company</h4>
        <p>Terms & Conditions </p>
        <p>Privacy Policy</p>
        <p>Contact</p>
        <p>Imprint</p>
      </div>
      <div className="dgFooterLinks">
        <h4>Digital Guide</h4>
        <h4>Anh Tuan Nguyen</h4>
        <h4>224241</h4>
        <h4>anhtuan.nguyen@tu-dortmund.de</h4>
      </div>
    </div>

    <div className="dgFooterCopyright">
      <p>@2022 Digital Guide. Anh Tuan Nguyen.</p>
    </div>
  </div>
);

export default Footer;
