import React from 'react';
import { supabase } from '../supabase/client';
import './App.css';

const tasks = await supabase.from("tasks").select('*');
console.log(tasks);

function App(): React.JSX.Element {
  const premade_collections = [
    "интегралы",
    "ДУ",
    "пределы",
    "Тейлор",
    "ряды",
    "placeholder",
    "placeholder",
    "placeholder",
  ];

  return (
    <div className='buttons'>
      {premade_collections.map((name, i) =>
        <button className='button' onClick={() => alert(`TODO: implement collection ${i} page`)}>{name}</button>)}
      <button className='browse'onClick={() => alert("TODO: implement browse custom collections page")}>Искать...</button>
    </div>
  );
}

export default App;