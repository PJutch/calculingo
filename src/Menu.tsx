import React from 'react';
import { MathJax } from 'better-react-mathjax';
import './Menu.css';
import { useNavigate } from 'react-router-dom';

interface Collection {
  id: string;
  name: string;
  previewLatex: string;
}

function Menu(): React.JSX.Element {
  const premade_collections: Collection[] = [
    { id: "integrals", name: "Интегралы", previewLatex: "\\displaystyle \\int\\!{x\\,dx}" },
    { id: "ode", name: "ДУ", previewLatex: "\\dot x = x" },
    { id: "limits", name: "Пределы", previewLatex: "\\displaystyle \\lim_{n \\to \\infty}{\\left( 1 + \\frac 1 n \\right)^n}" },
    { id: "tailor", name: "Тейлор", previewLatex: "\\sqrt{2}" },
    { id: "rows", name: "Ряды", previewLatex: "\\sqrt{2}" },
    { id: "placeholder1", name: "Placeholder", previewLatex: "\\sqrt{2}" },
    { id: "placeholder2", name: "Placeholder", previewLatex: "\\sqrt{2}" },
    { id: "placeholder3", name: "Placeholder", previewLatex: "\\sqrt{2}" },
  ];

  const navigate = useNavigate();

  return (
    <div className='menu-wrapper'>
      <h1 className='title'>Calculingo</h1>
      <div className='buttons'>
        {premade_collections.map((collection) =>
          <button className='button' onClick={() => navigate(`/solve/${collection.id}`)}>
            <p className='preview'>
              <MathJax>\({collection.previewLatex}\)</MathJax>
            </p>
            <p className='name'>{collection.name}</p>
          </button>)
        }
      </div>
      <div className='browse-wrapper'>
        <button className='browse' onClick={() => navigate("/browse")}>Искать...</button>
      </div>
    </div>
  );
}

export default Menu;