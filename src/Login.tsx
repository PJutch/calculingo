import React, { useState } from 'react';
import styles from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { store } from './redux/store';
import { signIn, signUp } from './redux/auth';

export default function Login({ register }: { register?: boolean }): React.JSX.Element {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    return <div>
        <h1 className={styles.header}>{!register ? "Войти" : "Регистрация"}</h1>
        <form className={styles.form} onSubmit={async (e) => {
            e.preventDefault();
            try {
                let result;
                if (!register) {
                    result = await store.dispatch(signIn({ email, password })).unwrap();
                } else {
                    result = await store.dispatch(signUp({ email, password })).unwrap();
                }

                if (window.history.length > 2) {
                    navigate(-1, {replace: true});
                } else {
                    navigate("/", {replace: true});
                }
            } catch (error: any) {
                setError(error.message);
            }
        }}>
            <label className={styles.label}>
                Почта<br />
                <input type="email" className={styles.field} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className={styles.label}>
                Пароль<br />
                <input type="password" className={styles.field} onChange={(e) => setPassword(e.target.value)} />
            </label>
            { error ? <p className={styles.error}>{error}</p> : "" }
            {
                !register ?
                    <Link to="/register" className={styles.link} replace>Зарегистрироваться</Link> :
                    <Link to="/login" className={styles.link} replace>Войти</Link>
            }
            <button type="submit" className={styles.button}>{!register ? "Войти" : "Зарегистрироваться"}</button>
        </form>
    </div>;
}
