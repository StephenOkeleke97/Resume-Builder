import React, { useState } from "react";
import { VscColorMode } from "react-icons/vsc";

const Header = () => {
  const [nameColor, setNameColor] = useState("#000");
  const [titleColor, setTitleColor] = useState("#8e8e8e");

  const nameStyle = {
    color: nameColor,
  };

  const titleStyle = {
    color: titleColor,
  };

  return (
    <div className="header">
      <div className="header-image">
        <img alt="candidate" src="/image/placeholder.png" />
      </div>

      <div className="header-description">
        <div className="header-editable">
          <h1 style={nameStyle}>Michael Levinson</h1>

          <div className="no-print">
            <label htmlFor="namecolor">
              <VscColorMode color="dodgerblue" />
            </label>
            <input
              type={"color"}
              id="namecolor"
              value={nameColor}
              onChange={(e) => {
                setNameColor(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="header-editable">
          <h2 style={titleStyle}>Senior Software Engineer</h2>

          <div className="no-print">
            <label htmlFor="titlecolor">
              <VscColorMode color="dodgerblue" />
            </label>
            <input
              type={"color"}
              id="titlecolor"
              value={titleColor}
              onChange={(e) => {
                setTitleColor(e.target.value);
              }}
            />
          </div>
        </div>

        <p>
          Seasoned, forward-looking Software Engineer with 14+ years' background
          in creating and executing innovative software solutions to enhance
          business productivity. Highly experienced in all aspects of the
          software development lifecycle and end-to-end project management, from
          concept through developmebt and delivery. Consistently recognized as a
          hands-on and competent leader, skilled at coordinating
          cross-functional teams in a fast-paced, deadline-driven environment to
          steer timely project completion within budgetary constraints
        </p>
      </div>
    </div>
  );
};

export default Header;
