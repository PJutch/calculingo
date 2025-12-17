import React from 'react';
import { supabase } from '../supabase/client';

const tasks = await supabase.from("tasks").select('*');
console.log(tasks);

function App(): React.JSX.Element {
  return (
    <div>
      <h1>Hello World!</h1>
      <p>Welcome to React with TypeScript!</p>
    </div>
  );
}

export default App;