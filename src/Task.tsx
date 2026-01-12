import { MathJax } from "better-react-mathjax";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import './Task.css';
import db from './redux/db';
import Loading from "./Loading";

function Task(): React.JSX.Element {
    const [selected, setSelected] = useState<string | null>(null);

    const location = useLocation();
    useEffect(() => setSelected(null), [location])

    const { collection: collectionId, task: taskId } = useParams();
    if (collectionId === undefined || taskId === undefined) {
        throw new Error("Undefined path params");
    }

    const { data: task, error: taskError, isLoading: isTaskLoading } = db.useGetTaskQuery(taskId);
    const { data: options, error: optionError, isLoading: areOptionsLoading } = db.useGetOptionsQuery(taskId);

    if (isTaskLoading || areOptionsLoading) return (<Loading></Loading>);

    if (task === undefined) throw taskError || new Error("failed to load tasks, reason unknown");
    if (options === undefined) throw optionError || new Error("failed to load options, reason unknown");

    const optionsById = Object.fromEntries(options.slice(0, 4).map(option => [option.id, option]));

    const isSolved = selected !== null;
    const isRight = isSolved && optionsById[selected].is_right;

    return (<div className="task-container">
        <MathJax className="task-formula">\(\displaystyle{task.formula}\)</MathJax>
        {options.map((option) => {
            let style;
            if (isSolved && option.is_right) {
                style = "option option-green";
            } else if (selected === option.id) {
                style = "option option-red";
            } else {
                style = "option";
            }

            return <button className={style} onClick={() => setSelected(option.id)}>
                <MathJax>\(\displaystyle {option.formula}\)</MathJax>
            </button>
        })}
        <Link to={`/solve/${collectionId}`} className="next-wrapper" replace>
            <button className={isRight ? "next next-green" : "next"}>
                {isSolved ? "Далее" : "Пропустить"}</button></Link>
    </div>);
}

export default Task;

function selectRandom<T>(options: T[]): T {
    return options[Math.floor(Math.random() * options.length)];
}

export function RandomTaskRedirect() {
    const navigate = useNavigate();

    const { collection } = useParams();
    if (collection === undefined) {
        throw new Error("undefined collection id");
    }

    const { data: tasks, error, isLoading } = db.useGetTasksQuery(collection);

    useEffect(() => {
        if (isLoading) return;
        if (tasks === undefined) throw error || new Error("failed to load tasks, reason unknown");

        const task = selectRandom(tasks);
        navigate(`/solve/${collection}/${task.id}`, { replace: true });
    }, [isLoading]);
    return null;
}
