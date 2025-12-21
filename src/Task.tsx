import { MathJax } from "better-react-mathjax";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import './Task.css';

interface Task {
    formula: string,
    options: {
        formula: string,
        is_right: boolean
    }[]
}

const tasks: { [key: string]: { [key: string]: Task } } = {
    "integrals": {
        "task1": {
            formula: "\\int x dx",
            options: [
                { formula: "\\frac {x^2} 2 + C", is_right: true },
                { formula: "\\frac {x^2} 3 + C", is_right: false },
                { formula: "x^2 + C", is_right: false },
                { formula: "\\frac {x^3} 2 + C", is_right: false },
            ]
        },
        "task2": {
            formula: "\\int \\frac 1 {x(x+1)} dx",
            options: [
                { formula: "\\ln \\frac x {x+1} + C", is_right: true },
                { formula: "\\ln \\frac x {x-1} + C", is_right: false },
                { formula: "\\ln \\frac {x+1} x + C", is_right: false },
                { formula: "\\arctan x + C", is_right: false },
            ]
        }
    }
};

function Task(): React.JSX.Element {
    const [selected, setSelected] = useState<number | null>();

    const location = useLocation();
    useEffect(() => setSelected(null), [location])

    const { collection, task } = useParams();
    if (collection === undefined || task === undefined) {
        throw new Error("Undefined path params");
    }

    const { formula, options } = tasks[collection][task];

    function isSolved(): boolean {
        return selected !== null && selected !== undefined;
    }

    function isRight(): boolean {
        return selected !== null && selected !== undefined && options[selected].is_right;
    }

    return (<div className="task-container">
        <MathJax className="task-formula">\(\displaystyle{formula}\)</MathJax>
        {options.map((option, i) => {
            let style;
            if (isSolved() && option.is_right) {
                style = "option option-green";
            } else if (selected == i) {
                style = "option option-red";
            } else {
                style = "option";
            }

            return <button className={style} onClick={() => setSelected(i)}>
                <MathJax>\(\displaystyle {option.formula}\)</MathJax>
            </button>
        })}
        <Link to={`/solve/${collection}`} className="next-wrapper" replace>
            <button className={isRight() ? "next next-green" : "next"}>
                {isSolved() ? "Далее" : "Пропустить"}</button></Link>
    </div>);
}

export default Task;

function selectRandom<T>(options: T[]): T {
    return options[Math.floor(Math.random() * options.length)];
}

export function RandomTaskRedirect() {
    console.log("redirect");
    const navigate = useNavigate();

    const { collection } = useParams();
    if (collection === undefined) {
        throw new Error("undefined collection id");
    }

    useEffect(() => {
        const taskId = selectRandom(Object.keys(tasks[collection]));
        navigate(`/solve/${collection}/${taskId}`, {replace: true});
    });
    return null;
}
