CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE collections (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    name TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE tasks (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT, 
    formula TEXT NOT NULL DEFAULT '', 
    collection TEXT REFERENCES collections(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE options (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    formula TEXT NOT NULL DEFAULT '',
    is_right BOOLEAN NOT NULL DEFAULT FALSE, 
    task TEXT REFERENCES tasks(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
