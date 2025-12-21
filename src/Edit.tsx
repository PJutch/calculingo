import { MathJax } from "better-react-mathjax";
import React, { useEffect, useState } from "react";
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

interface EditableH1Options {
    children: string,
    className: string,
    onEdit?: () => void
}

function EditableH1({ children, className, onEdit }: EditableH1Options): React.JSX.Element {
    const [isEditing, setEditing] = useState<boolean>(false);
    const [text, setText] = useState<string>(children);

    if (onEdit !== undefined) {
        useEffect(() => {
            if (!isEditing) {
                onEdit();
            }
        }, [isEditing]);
    }

    if (isEditing) {
        return (<input className={className} value={text}
            onChange={e => setText(e.target.value)} onBlur={() => setEditing(false)}
            onKeyDown={e => {
                if (e.key === "Enter" || e.key == "Escape") {
                    setEditing(false);
                }
            }} autoFocus />)
    } else {
        return (<h1 className={className} onClick={() => setEditing(true)}>{text}</h1>)
    }
}

interface EditableMathJaxOptions {
    children: string | string[],
    className: string,
    onEdit?: () => void
}

function EditableMathJax({ children, className, onEdit }: EditableMathJaxOptions): React.JSX.Element {
    if (Array.isArray(children)) {
        children = children.join('');
    }

    const [isEditing, setEditing] = useState<boolean>(false);
    const [text, setText] = useState<string>(children);

    if (onEdit !== undefined) {
        useEffect(() => {
            if (!isEditing) {
                onEdit();
            }
        }, [isEditing]);
    }

    if (isEditing) {
        return (<input className={className} value={text}
            onChange={e => setText(e.target.value)} onBlur={() => setEditing(false)}
            onKeyDown={e => {
                if (e.key === "Enter" || e.key == "Escape") {
                    setEditing(false);
                }
            }} autoFocus />)
    } else {
        return (<MathJax className={className} onClick={() => setEditing(true)}>\(\displaystyle {text}\)</MathJax>)
    }
}

function Edit(): React.JSX.Element {
    const { collection } = useParams();
    if (collection === undefined) {
        throw new Error("Undefined collection id");
    }

    return (<div className="edit-container">
        <EditableH1 className="title">{collections[collection].name}</EditableH1>
        <div className="tasks">
            {Object.entries(collections[collection].tasks).map(([taskId, task]) => <div className="task">
                <EditableMathJax className="formula task-formula">{task.formula}</EditableMathJax>
                {task.options.map(option =>
                    <EditableMathJax className={
                        option.is_right ? "formula option-formula option-right"
                            : "formula option-formula option-wrong"}>{option.formula}</EditableMathJax>)}
            </div>)}
        </div>
    </div>)
}

export default Edit;
