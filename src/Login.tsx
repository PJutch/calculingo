import React, { useState } from 'react';
import styles from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { store } from './redux/store';
import { signIn } from './redux/auth';

export default function Login(): React.JSX.Element {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return <div>
        <h1 className={styles.header}>Войти</h1>
        <form className={styles.form} onSubmit={async (e) => {
            e.preventDefault();
            const result = await store.dispatch(signIn({ email, password }));
            navigate(-1);
        }}>
            <label className={styles.label}>
                Почта<br />
                <input type="email" className={styles.field} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className={styles.label}>
                Пароль<br />
                <input type="password" className={styles.field} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <Link to="/register" className={styles.register}>Зарегистрироваться</Link>
            <button type="submit" className={styles.button}>Войти</button>
        </form>
    </div>;
}
