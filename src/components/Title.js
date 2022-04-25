import React, { useState } from "react";
import { VscColorMode } from "react-icons/vsc";

const Title = ({ id, style, defaultColor, defaultText, onChange }) => {
  const colorIconColor = "dodgerblue";
  const [title, setTitle] = useState(defaultText ? defaultText : "TITLE");
  const [titleColor, setTitleColor] = useState(
    defaultColor ? defaultColor : "#6D6E71"
  );

  const defaultStyle = {
    color: titleColor,
    fontSize: "20px",
    fontWeight: "700",
    width: title.length + 1 + "ch",
  };

  const titleStyle = style ? { ...defaultStyle, ...style } : defaultStyle;
  return (
    <div className="header-editable">
      <input
        type={"text"}
        value={title}
        style={titleStyle}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />

      <div className="no-print">
        <label htmlFor={id.toString()}>
          <VscColorMode color={colorIconColor} />
        </label>
        <input
          type={"color"}
          id={id.toString()}
          value={titleColor}
          onChange={(e) => {
            setTitleColor(e.target.value);
            if (onChange) onChange(e.target.value);
          }}
          className="color-input"
        />
      </div>
    </div>
  );
};

export default Title;
