import React, { useState } from "react";
import './Browse.css';
import { useNavigate } from "react-router-dom";
import useIcon from "./useIcon";
import { useSelector } from "react-redux";
import { StateType } from "./redux/store";
import { User } from "@supabase/supabase-js";
import db from './redux/db';
import Loading from "./Loading";

function Browse(): React.JSX.Element {
    const navigate = useNavigate();

    const [query, setQuery] = useState<string>();

    const { data: collections, error, isLoading } = db.useGetCollectionsQuery();

    const [createCollection, createCollectionStatus] = db.useCreateCollectionMutation();
    const [deleteCollection, deleteCollectionStatus] = db.useDeleteCollectionMutation();

    const user = useSelector<StateType, User | null>((state) => state.auth.user);

    const trashIcon = useIcon('trash.svg');
    const editIcon = useIcon('edit.svg');

    if (isLoading) return (<Loading></Loading>);
    if (collections === undefined) throw error || new Error("failed to load collections, reason unknown");

    const hasHover = window.matchMedia('(hover: hover)').matches;

    return (<div className="browse-container">
        <input placeholder="Введите запрос..." className="search-bar" onChange={e => setQuery(e.target.value)} />
        <div className="collections">
            {collections.filter(collection => query == undefined || query === "" || collection.name.includes(query))
                .map(collection =>
                    <div className="collection-container" key={collection.id}>
                        <button className="collection" onClick={() => navigate(`/solve/${collection.id}`)}>
                            {collection.name}</button>
                        {
                            hasHover && !user || user && user.id == collection.user_id ?
                                <><svg viewBox="0 0 24 24" width="48"
                                    className={hasHover
                                        ? "collection-delete-icon hidden-icon"
                                        : "collection-delete-icon"}
                                    onClick={() => {
                                        if (user) {
                                            deleteCollection(collection.id)
                                        } else {
                                            navigate("/login");
                                        }
                                    }}>
                                    <use href={trashIcon}></use></svg>
                                    <svg viewBox="0 0 24 24" width="48"
                                        className={hasHover
                                            ? "collection-edit-icon hidden-icon"
                                            : "collection-edit-icon"}
                                        onClick={() => navigate(
                                            user ? `/edit/${collection.id}` : "/login")}>
                                        <use href={editIcon}></use></svg></>
                                : ""
                        }
                    </div>)}
        </div>
        <button className="add-collection-button" onClick={() => {
            if (user) {
                createCollection(user.id);
            } else {
                navigate("/login");
            }
        }}>{hasHover ? "+" : "Войти"}</button>
    </div>);
}

export default Browse;