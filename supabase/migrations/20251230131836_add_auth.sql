ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE options ENABLE ROW LEVEL SECURITY;

ALTER TABLE collections ADD COLUMN user_id UUID;
ALTER TABLE tasks ADD COLUMN user_id UUID;
ALTER TABLE options ADD COLUMN user_id UUID;

CREATE POLICY "no auth to select collections" ON collections FOR SELECT USING (true);
CREATE POLICY "auth to insert collections" ON collections FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "auth to update collections" ON collections FOR UPDATE 
    USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "auth to delete collections" ON collections FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "no auth to select tasks" ON tasks FOR SELECT USING (true);
CREATE POLICY "auth to insert tasks" ON tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "auth to update tasks" ON tasks FOR UPDATE 
    USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "auth to delete tasks" ON tasks FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "no auth to select options" ON options FOR SELECT USING (true);
CREATE POLICY "auth to insert options" ON options FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "auth to update options" ON options FOR UPDATE 
    USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "auth to delete options" ON options FOR DELETE USING (auth.uid() = user_id);
