import { useEffect, useRef, useState } from "react";
import LanguageComponents from "./languageCodes";
import "./CodeGenerator.css";

function Codegenerator({ generatedUrl, selectedApi, selectedMethod, requestBody }) {
    const codeOptions = ["JavaScript", "Java", "Python", "CPP"];

    const [language, setLanguage] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const generationTimer = useRef(null);

    function handleclick(e) {
        const requestedLanguage = e.currentTarget.value;
        clearTimeout(generationTimer.current);
        setLanguage(requestedLanguage);
        setIsGenerating(true);
        generationTimer.current = setTimeout(() => {
            setIsGenerating(false);
        }, 500);
    }

    function showCode(language) {
        if(!language){
            return 
        }
        const Component = LanguageComponents[language];
        const method = selectedMethod.toUpperCase();
        let parsedBody;

        if (method === "PUT" || method === "PATCH") {
            try {
                parsedBody = JSON.parse(requestBody);
            } catch {
                return <p className="code-generator-message">Enter valid JSON in the request body above to generate {method} code.</p>;
            }

            if (!parsedBody || Array.isArray(parsedBody) || typeof parsedBody !== "object") {
                return <p className="code-generator-message">The request body must be a JSON object to generate {method} code.</p>;
            }
        }

        return <Component generatedUrl={generatedUrl} method={method} requestBody={parsedBody}/>;
    }
    useEffect(() => {
        clearTimeout(generationTimer.current);
        setLanguage("");
        setIsGenerating(false);
    }, [selectedApi, selectedMethod]);

    useEffect(() => () => clearTimeout(generationTimer.current), []);

    
       return (
    <section className="code-generator">
        <div className="code-generator-header">
            <h2>Code Generator</h2>
            <p>
                Choose a language to generate code for the selected method and URL.
                {selectedMethod === "delete" &&
                    " DELETE uses the selected URL filters, needs no body, and does not change database records."}
                {(selectedMethod === "put" || selectedMethod === "patch") &&
                    " PUT and PATCH validate the request body and do not change database records."}
            </p>
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

        <div className="code-container" aria-busy={isGenerating}>
            {isGenerating
                ? <p className="code-generator-message" role="status">Generating code...</p>
                : showCode(language)}
        </div>
    </section>
);
    
}

export default Codegenerator;
