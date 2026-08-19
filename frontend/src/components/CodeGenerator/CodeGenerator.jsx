import { useState } from "react";
import LanguageComponents from "./languageCodes";
import "./CodeGenerator.css";

function Codegenerator({generatedUrl}) {
    const codeOptions = ["JavaScript", "Java", "Python", "CPP"];

    const [language, setLanguage] = useState("");

    function handleclick(e) {
        setLanguage(e.target.value);
    }

    function showCode(language) {
        if(!language){
            return 
        }
        const Component = LanguageComponents[language];

        return <Component generatedUrl={generatedUrl}/>;
    }

    
       return (
    <section className="code-generator">
        <div className="code-generator-header">
            <h2>Code Generator</h2>
            <p>Generate code to fetch data from this API</p>
        </div>

        <div className="language-tabs">
            {codeOptions.map((option) => {
                return (
                    <button
                        className={language === option ? "active-language" : ""}
                        value={option}
                        key={option}
                        onClick={handleclick}
                    >
                        {option}
                    </button>
                );
            })}
        </div>

        <div className="code-container">
            {showCode(language)}
        </div>
    </section>
);
    
}

export default Codegenerator;