import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Contact from "./components/Contact";
import Header from "./components/Header";
import uuid from "react-uuid";
import Tiles from "./components/Tiles";
import Detailed from "./components/Detailed";
import Language from "./components/Language";
import OuterDraggable from "./components/OuterDraggable";
import ReactDragListView from "react-drag-listview/lib/index.js";

function App() {
  const CACHE_KEY = "MY_RESUME";
  const [showSections, setShowSections] = useState(false);
  const sectionsOptions = useRef(null);
  const [jsonList, setJsonList] = useState([]);

  useEffect(() => {
    try {
      const serializedData = localStorage.getItem(CACHE_KEY);
      if (serializedData) {
        const data = JSON.parse(serializedData);
        setJsonList(data);
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      saveToCache();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [jsonList]);

  const onDragEnd = (fromIndex, toIndex) => {
    const newSection = [...jsonList];
    const item = newSection.splice(fromIndex, 1)[0];
    newSection.splice(toIndex, 0, item);
    setJsonList(newSection);
  };

  const dragProps = {
    onDragEnd,
    nodeSelector: ".drag-selector",
    handleSelector: ".outer-draggable",
  };

  const getComponent = (obj) => {
    if (obj.type === "Header") {
      return (
        <Header remove={removeFromChildren} obj={obj} onChange={editSection} />
      );
    } else if (obj.type === "Contact") {
      return (
        <Contact remove={removeFromChildren} obj={obj} onChange={editSection} />
      );
    } else if (obj.type === "Tile") {
      return (
        <Tiles remove={removeFromChildren} obj={obj} onChange={editSection} />
      );
    } else if (obj.type === "Detail") {
      return (
        <Detailed
          remove={removeFromChildren}
          obj={obj}
          onChange={editSection}
        />
      );
    } else if (obj.type === "Bar") {
      return (
        <Language
          remove={removeFromChildren}
          obj={obj}
          onChange={editSection}
        />
      );
    } else {
      return null;
    }
  };

  const editSection = (obj) => {
    const index = jsonList.findIndex((item) => item.id === obj.id);
    const updatedItems = [...jsonList];
    updatedItems[index] = obj;
    setJsonList(updatedItems);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        sectionsOptions.current &&
        !sectionsOptions.current.contains(e.target)
      ) {
        setShowSections(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const sections = [
    {
      name: "Header",
      create: createHeader,
    },
    {
      name: "Contact",
      create: createContact,
    },
    {
      name: "Tile Section",
      create: createTiles,
    },
    {
      name: "Detailed Section",
      create: createDetailed,
    },
    {
      name: "Language Section",
      create: createLanguage,
    },
  ];

  function createHeader() {
    const header = {
      type: "Header",
      id: uuid(),
      name: {
        value: "Name",
        color: "#000",
      },
      title: {
        value: "Title",
        color: "#000",
      },
      summary: {
        value: "Summary",
        color: "#000",
      },
    };
    const newList = [...jsonList];
    newList.push(header);
    setJsonList(newList);
  }

  function createContact() {
    const contact = {
      type: "Contact",
      id: uuid(),
      contacts: [],
      color: "#000",
    };
    const newList = [...jsonList];
    newList.push(contact);
    setJsonList(newList);
  }

  function createDetailed() {
    const detail = {
      type: "Detail",
      id: uuid(),
      title: {
        value: "TITLE",
        color: "#000",
      },
      details: [],
    };
    const newList = [...jsonList];
    newList.push(detail);
    setJsonList(newList);
  }

  function createTiles() {
    const tile = {
      type: "Tile",
      id: uuid(),
      title: {
        value: "TITLE",
        color: "#000",
      },
      tiles: [],
      color: "#E6E7E8",
    };
    const newList = [...jsonList];
    newList.push(tile);
    setJsonList(newList);
  }

  function createLanguage() {
    const bar = {
      type: "Bar",
      id: uuid(),
      title: {
        value: "TITLE",
        color: "#000",
      },
      color: "#BCBEC0",
      bars: [],
    };
    const newList = [...jsonList];
    newList.push(bar);
    setJsonList(newList);
  }

  function removeFromChildren(id) {
    let newList = [...jsonList];
    newList = newList.filter((item) => item.id !== id);
    setJsonList(newList);
  }

  function handleExportJson() {
    if (jsonList && jsonList.length > 0) {
      const jsonBlob = new Blob([JSON.stringify(jsonList)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(jsonBlob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "exported_data.json";
      a.click();

      URL.revokeObjectURL(url);
    } else {
      alert("Nothing to save");
    }
  }

  function handleImportJson(event) {
    const fileReader = new FileReader();
    const file = event.target.files[0];

    if (file) {
      fileReader.onload = (e) => {
        try {
          const parsedJson = JSON.parse(e.target.result);
          setJsonList(parsedJson ? parsedJson : []);
        } catch (error) {
          alert("Error parsing  data. Please check the file.");
        }
      };

      fileReader.readAsText(file);
    }
  }

  function clearData() {
    try {
      localStorage.removeItem(CACHE_KEY);
      setJsonList([]);
    } catch (error) {
      alert("Error clearing data");
    }
  }

  function saveToCache() {
    console.log("saving:", jsonList);
    if (jsonList) {
      try {
        const serializedData = JSON.stringify(jsonList);
        localStorage.setItem(CACHE_KEY, serializedData);
      } catch (error) {
        console.error("Error saving data to localStorage:", error);
      }
    }
  }

  return (
    <div className="App">
      <div className="intro no-print">
        <h1>Resume Builder</h1>
        <p>
          Important: Your Information is <b>NOT</b> stored anywhere.
        </p>

        <p>Click the plus sign to begin.</p>

        <div className="intro-button">
          <label htmlFor="files" className="file-input">
            Import
          </label>
          <input
            id="files"
            type="file"
            accept=".json"
            onChange={handleImportJson}
            style={{ display: "none" }}
          />
          <button onClick={handleExportJson}>Export</button>
          <button>Download PDF</button>
          <button onClick={clearData}>Clear</button>
        </div>
      </div>

      <div className="create-section no-print" ref={sectionsOptions}>
        <AiOutlinePlus
          size={30}
          onClick={() => setShowSections(true)}
          // onClick={() => {
          //   alert(JSON.stringify(jsonList));
          // }}
          className={"clickable"}
        />

        <div className={`section-options ${showSections && "options-open"}`}>
          {sections.map((section, index) => {
            return (
              <div
                className="section"
                key={index}
                onClick={() => {
                  section.create();
                  setShowSections(false);
                }}
              >
                <p>{section.name}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="resume">
        <ReactDragListView {...dragProps}>
          {jsonList.map((obj) => {
            return (
              <div key={obj.id} className="drag-selector">
                <OuterDraggable />
                {getComponent(obj)}
              </div>
            );
          })}
        </ReactDragListView>
      </div>
    </div>
  );
}

export default App;
