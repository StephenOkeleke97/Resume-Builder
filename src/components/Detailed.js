import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import uuid from "react-uuid";
import DetailedItem from "./DetailedItem";
import Title from "./Title";
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ReactDragListView from "react-drag-listview/lib/index.js";

const Detailed = ({ id, remove, obj, onChange }) => {
  const [titleColor, setTitleColor] = useState("#6D6E71");
  const [details, setDetails] = useState([]);
  const detailsRef = useRef();
  detailsRef.current = details;

  const [myObj, setMyObj] = useState(obj);

  const onDragEnd = (fromIndex, toIndex) => {
    const newObj = { ...myObj };
    const item = newObj.details.splice(fromIndex, 1)[0];
    newObj.details.splice(toIndex, 0, item);
    setMyObj(newObj);
  };

  const dragProps = {
    onDragEnd,
    nodeSelector: ".detail-drag-container",
    handleSelector: ".detail-drag",
  };

  useEffect(() => {
    onChange(myObj);
  }, [myObj]);

  const liStyle = css`
    li {
      &::before {
        content: "- ";
        color: ${titleColor};
      }
    }
  `;

  function addDetail() {
    const detail = {
      id: uuid(),
      title: {
        value: "Detail Title",
        color: "#000",
      },
      subtitle: {
        value: "Detail Subtitle",
        color: "#000",
      },
      timeRange: {
        value: "Detail Time Range",
        color: "#000",
      },
      location: {
        value: "Detail Location",
        color: "#000",
      },
      detailItems: [],
    };
    const newObj = { ...myObj };
    newObj.details.push(detail);
    setMyObj(newObj);
  }

  function removeDetail(id) {
    const newObj = { ...myObj };
    newObj.details = newObj.details.filter((item) => item.id !== id);
    setMyObj(newObj);
  }

  function changeTitle(title) {
    const newObj = { ...myObj };
    newObj["title"] = title;
    setMyObj(newObj);
  }

  function editDetailItem(obj) {
    const newObj = { ...myObj };
    const index = newObj.details.findIndex((item) => item.id === obj.id);
    newObj.details[index] = obj;
    setMyObj(newObj);
  }

  return (
    <div className="detailed-container">
      <Title title={myObj.title} onChange={changeTitle} id={myObj.id} />

      <ReactDragListView {...dragProps}>
        {myObj.details.map((detail) => {
          return (
            <div
              key={detail.id}
              css={liStyle}
              className="detail-drag-container"
            >
              <DetailedItem
                remove={removeDetail}
                obj={detail}
                onChange={editDetailItem}
              />
            </div>
          );
        })}
      </ReactDragListView>

      <div
        className="remove no-print detail-remove"
        onClick={() => remove(myObj.id)}
      >
        <AiOutlineClose />
      </div>

      <div className="contact-tools no-print" onClick={addDetail}>
        <p className="contact-add">Add Detail</p>
      </div>
    </div>
  );
};

export default Detailed;
