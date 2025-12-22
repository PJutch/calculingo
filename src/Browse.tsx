import React, { useState } from "react";
import './Browse.css';
import { useNavigate } from "react-router-dom";
import { useGetCollectionsQuery } from "./tasks";

function Browse(): React.JSX.Element {
    const navigate = useNavigate();

    const [query, setQuery] = useState<string>();

    const {data: collections, error, isLoading} = useGetCollectionsQuery();
    if (isLoading) return (<p>Loading...</p>);
    if (collections === undefined) throw error || new Error("failed to load collections, reason unknown");

    return (<div className="browse-container">
        <input placeholder="Введите запрос..." className="search-bar" onChange={e => setQuery(e.target.value)} />
        <div className="collections">
            {collections.filter(collection => query == undefined || query === "" || collection.name.includes(query))
                .map(collection =>
                    <button className="collection" onClick={() => navigate(`/solve/${collection.id}`)}>
                        {collection.name}</button>)}
        </div>
    </div>);
}

export default Browse;