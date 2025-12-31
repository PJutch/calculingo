import React, { useEffect } from 'react';
import { MathJax } from 'better-react-mathjax';
import styles from './Menu.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

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
    { id: "multiple_integrals", name: "Кратные интегралы", previewLatex: "\\iint\\limits_D dx\\,dy" },
    { id: "diff", name: "Производные", previewLatex: "\\frac{d}{dx}x^2" },
    { id: "complex", name: "Комплексные числа", previewLatex: "e^{i\\pi}" },
  ];

  const navigate = useNavigate();

  return (
    <div className={styles["menu-wrapper"]}>
      <h1 className={styles.title}>Calculingo</h1>
      <div className={styles.buttons}>
        {premade_collections.map((collection) =>
          <button className={styles.button} onClick={() => navigate(`/solve/${collection.id}`)}>
            <p className={styles.preview}>
              <MathJax>\({collection.previewLatex}\)</MathJax>
            </p>
            <p className={styles.name}>{collection.name}</p>
          </button>)
        }
      </div>
      <div className={styles['browse-wrapper']}>
        <button className={styles.browse} onClick={() => navigate("/browse")}>Искать...</button>
      </div>
    </div>
  );
}

export default Menu;