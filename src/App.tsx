import React from 'react';
import { supabase } from '../supabase/client';
import { MathJax } from 'better-react-mathjax';
import './App.css';

const tasks = await supabase.from("tasks").select('*');
console.log(tasks);

interface Collection {
  name: string;
  previewLatex: string;
}

function App(): React.JSX.Element {
  const premade_collections: Collection[] = [
    { name: "интегралы", previewLatex: "\\int\\!{x\\,dx}" },
    { name: "ДУ", previewLatex: "\\dot x = x" },
    { name: "пределы", previewLatex: "\\displaystyle \\lim_{n \\to \\infty}{\\left( 1 + \\frac 1 n \\right)^n}" },
    { name: "Тейлор", previewLatex: "\\sqrt{2}" },
    { name: "ряды", previewLatex: "\\sqrt{2}" },
    { name: "placeholder", previewLatex: "\\sqrt{2}" },
    { name: "placeholder", previewLatex: "\\sqrt{2}" },
    { name: "placeholder", previewLatex: "\\sqrt{2}" },
  ];

  return (
    <div className='buttons'>
      {premade_collections.map((collection, i) =>
        <button className='button' onClick={() => alert(`TODO: implement collection ${i} page`)}>
          <p className='preview'>
            <MathJax>\({collection.previewLatex}\)</MathJax>
          </p>
          <p className='name'>{collection.name}</p>
        </button>)
      }
      <button className='browse' onClick={() => alert("TODO: implement browse custom collections page")}>Искать...</button>
    </div >
  );
}

export default App;