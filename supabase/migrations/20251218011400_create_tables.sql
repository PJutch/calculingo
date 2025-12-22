CREATE TABLE collections (id TEXT PRIMARY KEY, name TEXT NOT NULL);

CREATE TABLE tasks (
    id TEXT PRIMARY KEY, 
    formula TEXT NOT NULL, 
    collection TEXT REFERENCES collections(id)
);

CREATE TABLE options (
    id TEXT PRIMARY KEY,
    formula TEXT NOT NULL,
    is_right BOOLEAN NOT NULL, 
    task TEXT REFERENCES tasks(id)
);
