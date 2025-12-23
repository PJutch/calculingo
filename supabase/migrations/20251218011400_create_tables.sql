CREATE TABLE collections (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    name TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE tasks (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT, 
    formula TEXT NOT NULL DEFAULT '', 
    collection TEXT REFERENCES collections(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE options (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    formula TEXT NOT NULL DEFAULT '',
    is_right BOOLEAN NOT NULL DEFAULT FALSE, 
    task TEXT REFERENCES tasks(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
