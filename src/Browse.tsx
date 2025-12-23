import React, { useState } from "react";
import './Browse.css';
import { useNavigate } from "react-router-dom";
import { useCreateCollectionMutation, useGetCollectionsQuery } from "./redux/collections";

function Browse(): React.JSX.Element {
    const navigate = useNavigate();

    const [query, setQuery] = useState<string>();

    const { data: collections, error, isLoading } = useGetCollectionsQuery();

    const [createCollection, createCollectionStatus] = useCreateCollectionMutation();

    if (isLoading) return (<p>Loading...</p>);
    if (collections === undefined) throw error || new Error("failed to load collections, reason unknown");

    return (<div className="browse-container">
        <input placeholder="Введите запрос..." className="search-bar" onChange={e => setQuery(e.target.value)} />
        <div className="collections">
            {collections.filter(collection => query == undefined || query === "" || collection.name.includes(query))
                .map(collection =>
                    <div className="collection-container">
                        <button className="collection" onClick={() => navigate(`/solve/${collection.id}`)}>
                            {collection.name}</button>
                        <svg viewBox="0 0 24 24" width="48" className="edit-icon"
                            onClick={() => navigate(`/edit/${collection.id}`)}>
                            <use href="/icons/edit.svg"></use></svg>
                    </div>)}
        </div>
        <button className="add-collection-button" onClick={() => createCollection()}>+</button>
    </div>);
}

export default Browse;