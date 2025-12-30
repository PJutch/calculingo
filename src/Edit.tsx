import { MathJax } from "better-react-mathjax";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Edit.css';
import useIcon from "./useIcon";
import { useSelector } from "react-redux";
import { StateType } from "./redux/store";
import { User } from "@supabase/supabase-js";
import db from "./redux/db";

interface EditableH1Options {
    children: string,
    className: string,
    onEdit?: (newValue: string) => void
}

function EditableH1({ children, className, onEdit }: EditableH1Options): React.JSX.Element {
    const [isEditing, setEditing] = useState<boolean>(false);
    const [text, setText] = useState<string>(children);

    if (onEdit !== undefined) {
        useEffect(() => {
            if (!isEditing) {
                onEdit(text);
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
    onEdit?: (newValue: string) => void
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
                onEdit(text);
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
    const { collection: collectionId } = useParams();
    if (collectionId === undefined) {
        throw new Error("Undefined collection id");
    }

    const navigate = useNavigate();

    const { data: collection, error: collectionError, isLoading: isCollectionLoading } = db.useGetCollectionQuery(collectionId);
    const { data: tasks, error: taskError, isLoading: areTasksLoading } = db.useGetTasksQuery(collectionId);
    const { data: options, error: optionError, isLoading: areOptionsLoading } = db.useGetCollectionOptionsQuery(collectionId);

    const [setCollectionName, updateCollectionStatus] = db.useSetCollectionNameMutation();
    const [setTaskFormula, updateTaskStatus] = db.useSetTaskFormulaMutation();
    const [createTask, createTaskStatus] = db.useCreateTaskMutation();
    const [deleteTask, deleteTaskStatus] = db.useDeleteTaskMutation();
    const [setOptionFormula, updateOptionStatus] = db.useSetOptionFormulaMutation();
    const [setOptionIsRight, setOptionIsRightStatus] = db.useSetOptionIsRightMutation();

    const user = useSelector<StateType, User | null>((state) => state.auth.user);

    const checkIcon = useIcon("check.svg");
    const xIcon = useIcon("x.svg");
    const trashIcon = useIcon("trash.svg");

    if (isCollectionLoading || areTasksLoading || areOptionsLoading) {
        return (<p>Loading...</p>)
    }

    if (collection === undefined) throw collectionError || new Error("Fetching collection failed, reason unknown");
    if (tasks === undefined) throw taskError || new Error("Fetching tasks failed, reason unknown");
    if (options === undefined) throw optionError || new Error("Fetching options failed, reason unknown");

    const optionsByTask = Object.groupBy(options, option => option.task);

    return (<div className="edit-container">
        <EditableH1 className="title" onEdit={newName => setCollectionName({ id: collectionId, name: newName })}>
            {collection.name}</EditableH1>
        <div className="tasks">
            {tasks.map((task) => <div className="task" key={task.id}>
                <div className="row-container">
                    <EditableMathJax className="formula task-formula"
                        onEdit={newFormula => setTaskFormula({ id: task.id, formula: newFormula })}>
                        {task.formula}</EditableMathJax>
                    <svg viewBox="0 0 24 24" width="48" className="delete-icon"
                        onClick={() => deleteTask(task.id)}>
                        <use href={trashIcon}></use></svg>
                </div>
                {optionsByTask[task.id]?.map(option =>
                    <div className="row-container" key={option.id}>
                        <svg viewBox="0 0 24 24" width="48"
                            onClick={() => {
                                setOptionIsRight({ id: option.id, is_right: !option.is_right });
                            }}>
                            <use href={option.is_right ? checkIcon : xIcon}></use></svg>
                        <EditableMathJax key={option.id} className={
                            option.is_right ? "formula option-formula option-right"
                                : "formula option-formula option-wrong"}
                            onEdit={newFormula => setOptionFormula({ id: option.id, formula: newFormula })}>
                            {option.formula}</EditableMathJax>
                    </div>)}
            </div>)}
            <button className="add-task-button" onClick={() => {
                if (user) {
                    console.log(user.id);
                    createTask({ collection: collectionId, user_id: user.id });
                } else {
                    navigate("/login");
                }
            }}>+</button>
        </div>
    </div>)
}

export default Edit;
