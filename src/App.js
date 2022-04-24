import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Contact from "./components/Contact";
import Header from "./components/Header";
import uuid from "react-uuid";

function App() {
  const [showSections, setShowSections] = useState(false);
  const sectionsOptions = useRef(null);
  const [children, setChildren] = useState([]);
  const childrenRef = useRef();
  childrenRef.current = children;

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
      name: "Area of Expertise",
      create: createTiles,
    },
    {
      name: "Work Experience",
      create: createDescription,
    },
    {
      name: "Technical Skills",
      create: createTiles,
    },
    {
      name: "Volunteer Experience",
      create: createDescription,
    },
    {
      name: "Personal Projects",
      create: createDescription,
    },
    {
      name: "Education",
      create: createDescription,
    },
    {
      name: "Languages",
      create: createLanguage,
    },
  ];

  function createHeader() {
    setChildren([
      ...children,
      <Header id={uuid()} remove={removeFromChildren} />,
    ]);
  }

  function createContact() {
    setChildren([...children, <Contact />]);
  }

  function createDescription() {}

  function createTiles() {}

  function createLanguage() {}

  function removeFromChildren(id) {
    let temp = [...childrenRef.current];
    temp = temp.filter((elem) => elem.props.id !== id);
    setChildren(temp);
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
        {children.map((child) => {
          return <div key={uuid()}>{child}</div>;
        })}
      </div>
    </div>
  );
}

export default App;
