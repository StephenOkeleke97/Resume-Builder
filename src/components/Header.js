import React, { useEffect, useRef, useState } from "react";
import { VscColorMode } from "react-icons/vsc";
import { AiOutlineClose, AiOutlineUpload } from "react-icons/ai";

const Header = ({ remove, id }) => {
  const nameInput = useRef(null);
  const titleInput = useRef(null);
  const descInput = useRef(null);
  const descPrint = useRef(null);
  const imageRef = useRef(null);
  const imageInputRef = useRef(null);

  const [nameColor, setNameColor] = useState("#000");
  const [titleColor, setTitleColor] = useState("#8e8e8e");

  const [name, setName] = useState("Your Name");
  const [title, setTitle] = useState("Your Title");
  const [description, setDescription] = useState("Summary");

  const colorIconColor = "dodgerblue";

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
      descPrint.current.innerHTML = description;
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
  }, [description]);

  useEffect(() => {
    function handleUploadImage(e) {
      const [File] = e.target.files;
      imageRef.current.src = URL.createObjectURL(File);
    }

    imageInputRef.current.addEventListener("change", handleUploadImage);
  }, []);

  const nameStyle = {
    color: nameColor,
    fontSize: "30px",
    fontWeight: "500",
    width: name.length + 1 + "ch",
  };

  const titleStyle = {
    color: titleColor,
    fontWeight: "400",
    fontSize: "20px",
    width: title.length + 1 + "ch",
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
      <div className="header-image">
        <img ref={imageRef} alt="candidate" src="/image/placeholder.png" />

        <div className="add-image no-print">
          <label htmlFor="upload">
            <AiOutlineUpload className="clickable" />
          </label>
        </div>
      </div>

      <div className="header-description">
        <div className="header-editable">
          <input
            type={"text"}
            value={name}
            style={nameStyle}
            ref={nameInput}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <div className="no-print">
            <label htmlFor={"name" + id}>
              <VscColorMode color={colorIconColor} />
            </label>
            <input
              type={"color"}
              id={"name" + id}
              value={nameColor}
              onChange={(e) => {
                setNameColor(e.target.value);
              }}
              className="color-input"
            />
          </div>
        </div>

        <div className="header-editable">
          <input
            type={"text"}
            value={title}
            style={titleStyle}
            ref={titleInput}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <div className="no-print">
            <label htmlFor={"title" + id}>
              <VscColorMode color={colorIconColor} />
            </label>
            <input
              type={"color"}
              id={"title" + id}
              value={titleColor}
              onChange={(e) => {
                setTitleColor(e.target.value);
              }}
              className="color-input"
            />
          </div>
        </div>

        <div className="header-editable">
          <textarea
            value={description}
            style={descriptionStyle}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            ref={descInput}
          />
          <p ref={descPrint}></p>
        </div>
      </div>

      <div className="remove no-print" onClick={() => remove(id)}>
        <AiOutlineClose />
      </div>

      <div className="upload-input no-print">
        <input
          type={"file"}
          id="upload"
          accept="image/png, image/jpeg"
          ref={imageInputRef}
        />
      </div>
    </div>
  );
};

export default Header;
