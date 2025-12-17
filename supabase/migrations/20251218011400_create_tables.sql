CREATE TABLE collections (id BIGSERIAL PRIMARY KEY, name TEXT NOT NULL);

CREATE TABLE tasks (
    id BIGSERIAL PRIMARY KEY, 
    formula TEXT NOT NULL, 
    collection REFERENCES collections(id)
);

CREATE TABLE options (
    id BIGSERIAL PRIMARY KEY,
    formula TEXT NOT NULL,
    is_right BOOLEAN NOT NULL, 
    task REFERENCES tasks(id)
);
