import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Header from "./components/Header";

function App() {
  const [showSections, setShowSections] = useState(false);
  const sectionsOptions = useRef(null);
  const [children, setChildren] = useState([]);

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
      <Header index={children.length + 1} remove={removeFromChildren} />,
    ]);
  }

  function createContact() {}

  function createDescription() {}

  function createTiles() {}

  function createLanguage() {}

  function removeFromChildren(index) {
    const temp = children;
    temp.slice(index, 1);
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

      <div
        className="create-section no-print"
        onClick={() => setShowSections(true)}
        ref={sectionsOptions}
      >
        <AiOutlinePlus size={30} />

        <div className={`section-options ${showSections && "options-open"}`}>
          {sections.map((section, index) => {
            return (
              <div className="section" key={index} onClick={section.create}>
                <p>{section.name}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="resume">
        {children.map((child, index) => {
          return <div key={index}>{child}</div>;
        })}
      </div>
    </div>
  );
}

export default App;
