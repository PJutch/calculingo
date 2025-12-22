import { MathJax } from "better-react-mathjax";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Edit.css';
import {
    useGetCollectionQuery, useGetTasksQuery, useSetOptionFormulaMutation,
    useGetCollectionOptionsQuery, useSetCollectionNameMutation, useSetTaskFormulaMutation,
    useSetOptionIsRightMutation, useCreateOptionMutation, useCreateTaskMutation
} from "./tasks";

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

    const { data: collection, error: collectionError, isLoading: isCollectionLoading } = useGetCollectionQuery(collectionId);
    const { data: tasks, error: taskError, isLoading: areTasksLoading } = useGetTasksQuery(collectionId);
    const { data: options, error: optionError, isLoading: areOptionsLoading } = useGetCollectionOptionsQuery(collectionId);

    const [setCollectionName, updateCollectionStatus] = useSetCollectionNameMutation();
    const [setTaskFormula, updateTaskStatus] = useSetTaskFormulaMutation();
    const [createTask, createTaskStatus] = useCreateTaskMutation();
    const [setOptionFormula, updateOptionStatus] = useSetOptionFormulaMutation();
    const [setOptionIsRight, setOptionIsRightStatus] = useSetOptionIsRightMutation();
    const [createOption, createOptionStatus] = useCreateOptionMutation();

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
                        onClick={() => { }}>
                        <use href="/icons/trash.svg"></use></svg>
                </div>
                {optionsByTask[task.id]?.map(option =>
                    <div className="row-container">
                        <svg viewBox="0 0 24 24" width="48"
                            onClick={() => {
                                setOptionIsRight({ id: option.id, is_right: !option.is_right });
                            }}>
                            <use href={option.is_right ? "/icons/check.svg" : "/icons/x.svg"}></use></svg>
                        <EditableMathJax key={option.id} className={
                            option.is_right ? "formula option-formula option-right"
                                : "formula option-formula option-wrong"}
                            onEdit={newFormula => setOptionFormula({ id: option.id, formula: newFormula })}>
                            {option.formula}</EditableMathJax>
                        <svg viewBox="0 0 24 24" width="48" className="delete-icon"
                            onClick={() => { }}>
                            <use href="/icons/trash.svg"></use></svg>
                    </div>)}
                <button className="add-option-button" onClick={() => createOption()}>+</button>
            </div>)}
            <button className="add-task-button" onClick={() => createTask()}>+</button>
        </div>
    </div>)
}

export default Edit;
