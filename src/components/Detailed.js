import React, { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import uuid from "react-uuid";
import DetailedItem from "./DetailedItem";
import Title from "./Title";
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const Detailed = ({ id, remove }) => {
  const [titleColor, setTitleColor] = useState("#6D6E71");
  const [details, setDetails] = useState([]);
  const detailsRef = useRef();
  detailsRef.current = details;

  const liStyle = css`
    li {
      &::before {
        content: "- ";
        color: ${titleColor};
      }
    }
  `;

  function addDetail() {
    const id = uuid();
    setDetails([
      ...details,
      <DetailedItem key={id} id={id} remove={removeDetail} />,
    ]);
  }

  function removeDetail(id) {
    let temp = [...detailsRef.current];
    temp = temp.filter((elem) => elem.props.id !== id);
    setDetails(temp);
  }

  return (
    <div className="detailed-container">
      <Title id={id} onChange={setTitleColor} />

      <div>
        {details.map((detail, index) => {
          return (
            <div key={index} css={liStyle}>
              {detail}
            </div>
          );
        })}
      </div>

      <div className="remove no-print detail-remove" onClick={() => remove(id)}>
        <AiOutlineClose />
      </div>

      <div className="contact-tools no-print" onClick={addDetail}>
        <p className="contact-add">Add Detail</p>
      </div>
    </div>
  );
};

export default Detailed;
