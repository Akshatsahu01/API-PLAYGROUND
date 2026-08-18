import { useState } from "react";
import LanguageComponents from "./languageCodes";

function Codegenerator({generatedUrl}) {
    const codeOptions = ["JavaScript", "Java", "Python", "CPP"];

    const [language, setLanguage] = useState("JavaScript");

    function handleclick(e) {
        setLanguage(e.target.value);
    }

    function showCode(language) {
        const Component = LanguageComponents[language];

        return <Component generatedUrl={generatedUrl}/>;
    }

    return (
        <>
            {codeOptions.map((option) => {
                return (
                    <button
                        value={option}
                        key={option}
                        onClick={handleclick}
                    >
                        {option}
                    </button>
                );
            })}

            {showCode(language)}
        </>
    );
}

export default Codegenerator;