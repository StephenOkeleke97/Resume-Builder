import React, { useEffect, useState } from "react";
import { VscColorMode } from "react-icons/vsc";

const Title = ({ id, style, title, onChange }) => {
  const colorIconColor = "dodgerblue";
  const [myObj, setMyObj] = useState(title);

  useEffect(() => {
    onChange(myObj);
  }, [myObj]);

  const defaultStyle = {
    color: myObj.color,
    fontSize: "20px",
    fontWeight: "700",
    width: myObj.value.length + 2 + "ch",
  };

  const titleStyle = style ? { ...defaultStyle, ...style } : defaultStyle;
  return (
    <div className={`header-editable ${!myObj.value.trim() && "no-print"}`}>
      <input
        type={"text"}
        value={myObj.value}
        style={titleStyle}
        onChange={(e) => {
          setMyObj((prevData) => ({
            ...prevData,
            value: e.target.value,
          }));
        }}
      />

      <div className="no-print">
        <label htmlFor={id.toString()}>
          <VscColorMode color={colorIconColor} />
        </label>
        <input
          type={"color"}
          id={id.toString()}
          value={myObj.color}
          onChange={(e) => {
            setMyObj((prevData) => ({
              ...prevData,
              color: e.target.value,
            }));
          }}
          className="color-input"
        />
      </div>
    </div>
  );
};

export default Title;
