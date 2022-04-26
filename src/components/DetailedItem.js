import React, { useState } from "react";
import Title from "./Title";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal/lib/components/Modal";

const DetailedItem = ({ id, remove }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      boxShadow: "2px 2px 10px #939598",
      overflow: "visible",
    },
  };

  const detailSubTitleStyle = {
    fontWeight: "500",
    fontSize: "17px",
  };

  const detailTimeRangeStyle = {
    fontWeight: "400",
    fontSize: "13px",
    fontStyle: "italic",
  };

  const [modalOpen, setOpenModal] = useState(false);
  const [detailList, setDetailList] = useState([]);
  const [detailItem, setDetailItem] = useState("");

  function addItem() {
    if (!detailItem.trim()) {
      return alert("Item cannot be blank");
    }
    const temp = [...detailList];
    temp.push(detailItem);
    setDetailList(temp);
    closeModal();
  }

  function removeItem(ind) {
    const temp = detailList.filter((detail, index) => index !== ind);
    setDetailList(temp);
  }

  function closeModal() {
    setDetailItem("");
    setOpenModal(false);
  }

  return (
    <div className="detailed-item-container">
      <div className="detailed-item-title">
        <Title
          id={id + "detailtitle"}
          defaultColor="#000"
          defaultText={"Detail Title"}
        />
      </div>
      <div className="detailed-item-subtitle">
        <Title
          id={id + "detailsubtitle"}
          defaultColor="#000"
          defaultText={"Detail Subtitle"}
          style={detailSubTitleStyle}
        />
      </div>

      <div className="detailed-item-timerange">
        <Title
          id={id + "detailtime"}
          defaultColor="grey"
          defaultText={"time range"}
          style={detailTimeRangeStyle}
        />

        <Title
          id={id + "detaillocation"}
          defaultColor="grey"
          defaultText={"location"}
          style={detailTimeRangeStyle}
        />
      </div>

      <div className="detail-list">
        <ul>
          {detailList.map((detail, index) => {
            return (
              <div key={index} className="detail-list-item">
                <li>{detail}</li>
                <div
                  className="remove-detailitem clickable no-print"
                  onClick={() => removeItem(index)}
                >
                  <AiOutlineClose />
                </div>
              </div>
            );
          })}
        </ul>
      </div>

      <div className="contact-tools no-print">
        <p className="contact-add" onClick={() => setOpenModal(true)}>
          +
        </p>
      </div>

      <Modal isOpen={modalOpen} style={customStyles} ariaHideApp={false}>
        <div className="contact-modal">
          <h1>DETAIL ITEM</h1>
          <div className="contact-input">
            <input
              value={detailItem}
              placeholder="Add item"
              onChange={(e) => setDetailItem(e.target.value)}
            />
          </div>

          <button className="contact-add-button clickable" onClick={addItem}>
            Add
          </button>

          <div className="close-modal" onClick={closeModal}>
            <AiOutlineClose />
          </div>
        </div>
      </Modal>

      <div
        className="remove-detail no-print clickable"
        onClick={() => remove(id)}
      >
        <p>Remove</p>
      </div>
    </div>
  );
};

export default DetailedItem;
