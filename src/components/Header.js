import React, { useEffect, useRef, useState } from "react";
import { VscColorMode } from "react-icons/vsc";
import { AiOutlineClose } from "react-icons/ai";

const Header = ({ remove, obj, onChange }) => {
  const nameInput = useRef(null);
  const titleInput = useRef(null);
  const descInput = useRef(null);
  const descPrint = useRef(null);

  const [myObj, setMyObj] = useState(obj);

  const colorIconColor = "dodgerblue";

  useEffect(() => {
    onChange(myObj);
  }, [myObj]);

  useEffect(() => {
    function resizeInput(event) {
      if (this.current)
        this.current.style.width = event.target.value.length + 1 + "ch";
    }

    nameInput.current.addEventListener("input", resizeInput);
    titleInput.current.addEventListener("input", resizeInput);
  }, []);

  useEffect(() => {
    descInput.current.style.height = descInput.current.scrollHeight + "px";

    function resizeTextArea() {
      this.style.height = this.scrollHeight + "px";
    }

    function handleBeforePrint() {
      descInput.current.style.display = "none";
      descPrint.current.innerHTML = myObj.summary.value;
    }

    function handleAfterPrint() {
      descInput.current.style.display = "block";
      descPrint.current.innerHTML = "";
    }

    descInput.current.addEventListener("input", resizeTextArea);
    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, [myObj]);

  const nameStyle = {
    color: myObj.name.color,
    fontSize: "30px",
    fontWeight: "500",
    width: myObj.name.value.length + 1 + "ch",
  };

  const titleStyle = {
    color: myObj.title.color,
    fontWeight: "400",
    fontSize: "20px",
    width: myObj.title.value.length + 1 + "ch",
    marginBottom: "8px",
  };

  const descriptionStyle = {
    width: "100%",
    resize: "none",
    border: "none",
    textAlign: "justify",
    outline: "none",
    fontSize: "14px",
  };

  return (
    <div className="header">

      <div className="header-description">
        <div className="header-editable">
          <input
            type={"text"}
            value={myObj.name.value}
            style={nameStyle}
            ref={nameInput}
            onChange={(e) => {
              setMyObj((prevData) => ({
                ...prevData,
                name: {
                  ...prevData.name,
                  value: e.target.value
                },
              }));
            }}
          />

          <div className="no-print">
            <label htmlFor={"name" + myObj.id}>
              <VscColorMode color={colorIconColor} />
            </label>
            <input
              type={"color"}
              id={"name" + myObj.id}
              value={obj.name.color}
              onChange={(e) => {
                setMyObj((prevData) => ({
                  ...prevData,
                  name: {
                    ...prevData.name,
                    color: e.target.value
                  },
                }));
              }}
              className="color-input"
            />
          </div>
        </div>

        <div className="header-editable">
          <input
            type={"text"}
            value={myObj.title.value}
            style={titleStyle}
            ref={titleInput}
            onChange={(e) => {
              setMyObj((prevData) => ({
                ...prevData,
                title: {
                  ...prevData.title,
                  value: e.target.value
                },
              }));
            }}
          />

          <div className="no-print">
            <label htmlFor={"title" + myObj.id}>
              <VscColorMode color={colorIconColor} />
            </label>
            <input
              type={"color"}
              id={"title" + myObj.id}
              value={myObj.title.color}
              onChange={(e) => {
                setMyObj((prevData) => ({
                  ...prevData,
                  title: {
                    ...prevData.title,
                    color: e.target.value
                  },
                }));
              }}
              className="color-input"
            />
          </div>
        </div>

        <div className="header-editable">
          <textarea
            value={myObj.summary.value}
            style={descriptionStyle}
            onChange={(e) => {
              setMyObj((prevData) => ({
                ...prevData,
                summary: {
                  ...prevData.summary,
                  value: e.target.value
                },
              }));
            }}
            ref={descInput}
          />
          <p ref={descPrint}></p>
        </div>
      </div>

      <div className="remove no-print" onClick={() => remove(myObj.id)}>
        <AiOutlineClose />
      </div>
    </div>
  );
};

export default Header;
