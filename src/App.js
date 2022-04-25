import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Contact from "./components/Contact";
import Header from "./components/Header";
import uuid from "react-uuid";
import Tiles from "./components/Tiles";
import Detailed from "./components/Detailed";
import Language from "./components/Language";

function App() {
  const [showSections, setShowSections] = useState(false);
  const sectionsOptions = useRef(null);
  const [childrenList, setChildrenList] = useState([]);
  const childrenRef = useRef();
  childrenRef.current = childrenList;

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
    const id = uuid();
    setChildrenList([
      ...childrenList,
      <Header key={id} id={id} remove={removeFromChildren} />,
    ]);
  }

  function createContact() {
    const id = uuid();
    setChildrenList([
      ...childrenList,
      <Contact key={id} id={id} remove={removeFromChildren} />,
    ]);
  }

  function createDetailed() {
    const id = uuid();
    setChildrenList([
      ...childrenList,
      <Detailed key={id} id={id} remove={removeFromChildren} />,
    ]);
  }

  function createTiles() {
    const id = uuid();
    setChildrenList([
      ...childrenList,
      <Tiles key={id} id={id} remove={removeFromChildren} />,
    ]);
  }

  function createLanguage() {
    const id = uuid();
    setChildrenList([
      ...childrenList,
      <Language key={id} id={id} remove={removeFromChildren} />,
    ]);
  }

  function removeFromChildren(id) {
    let temp = [...childrenRef.current];
    temp = temp.filter((elem) => elem.props.id !== id);
    setChildrenList(temp);
  }

  return (
    <div className="App">
      <div className="intro no-print">
        <h1>Resume Builder</h1>
        <a
          href="https://novoresume.com/career-blog/software-engineer-resume"
          target={"_blank"}
        >
          Inspiration
        </a>
      </div>

      <div className="create-section no-print" ref={sectionsOptions}>
        <AiOutlinePlus
          size={30}
          onClick={() => setShowSections(true)}
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
        {childrenList.map((child) => {
          return child;
        })}
      </div>
    </div>
  );
}

export default App;
