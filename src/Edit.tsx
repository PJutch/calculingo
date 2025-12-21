import { MathJax } from "better-react-mathjax";
import React from "react";
import { useParams } from "react-router-dom";
import './Edit.css';

interface Collection {
    name: string,
    tasks: { [key: string]: Task }
}

interface Task {
    formula: string
    options: {
        formula: string
        is_right: boolean
    }[]
}

const collections: { [key: string]: Collection } = {
    "test1": {
        name: "Test collection",
        tasks: {
            "task1": {
                formula: "\\sqrt x",
                options: [
                    { formula: "\\sqrt x", is_right: true },
                    { formula: "\\sqrt y", is_right: false },
                    { formula: "\\sqrt y", is_right: false },
                    { formula: "\\sqrt y", is_right: false },
                ]
            },
            "task2": {
                formula: "\\ln x",
                options: [
                    { formula: "\\ln x", is_right: true },
                    { formula: "\\ln y", is_right: false },
                    { formula: "\\ln y", is_right: false },
                    { formula: "\\ln y", is_right: false },
                ]
            },
            "task3": {
                formula: "\\frac 1 2",
                options: [
                    { formula: "\\frac 1 2", is_right: true },
                    { formula: "\\frac 2 3", is_right: false },
                    { formula: "\\frac 3 4", is_right: false },
                    { formula: "\\frac 5 {10}", is_right: true },
                ]
            }
        }
    }
};

function Edit(): React.JSX.Element {
    const { collection } = useParams();
    if (collection === undefined) {
        throw new Error("Undefined collection id");
    }

    return (<div className="edit-container">
        <h1 className="title">{collections[collection].name}</h1>
        <div className="tasks">
            {Object.entries(collections[collection].tasks).map(([taskId, task]) => <div className="task">
                <MathJax className="formula task-formula">\(\displaystyle {task.formula}\)</MathJax>
                {task.options.map(option =>
                    <MathJax className={
                        option.is_right ? "formula option-formula option-right"
                            : "formula option-formula option-wrong"}>
                        \(\displaystyle {option.formula}\)</MathJax>)}
            </div>)}
        </div>
    </div>)
}

export default Edit;
