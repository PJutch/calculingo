import React from "react";
import './Browse.css';
import { useNavigate } from "react-router-dom";

interface Collection {
    id: string,
    name: string
}

const collections: Collection[] = [
    { id: "test1", name: "Test collection" },
    { id: "test2", name: "Test collection" },
    { id: "long_name", name: "Big overly long collection name just for the sake of testing" },
    { id: "test3", name: "Test collection" },
    { id: "test4", name: "Test collection" },
    { id: "test5", name: "Test collection" },
    { id: "test6", name: "Test collection" },
    { id: "test7", name: "Test collection" },
    { id: "test8", name: "Test collection" },
    { id: "my_ode", name: "Мои ДУ" },
    { id: "test9", name: "Test collection" },
    { id: "test10", name: "Test collection" },
    { id: "long_name2", name: "Big overly long collection name just for the sake of testing" },
    { id: "test11", name: "Test collection" },
    { id: "test12", name: "Test collection" },
    { id: "test13", name: "Test collection" },
    { id: "test14", name: "Test collection" },
    { id: "test15", name: "Test collection" },
    { id: "test16", name: "Test collection" },
    { id: "my_ode2", name: "Мои ДУ" }
];

function Browse(): React.JSX.Element {
    const navigate = useNavigate();

    return (<div className="browse-container">
        <input placeholder="Введите запрос..." className="search-bar" />
        <div className="collections">
            {collections.map((collection) =>
                <button className="collection" onClick={() => navigate(`/solve/${collection.name}`)}>
                    {collection.name}</button>)}
        </div>
    </div>);
}

export default Browse;