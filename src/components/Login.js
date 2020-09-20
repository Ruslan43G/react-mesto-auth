import React from 'react';
import { useHistory } from 'react-router-dom';
import Form from './Form';
import auth from '../utils/Auth';

export default function Login (props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory();
    React.useEffect(() => {
        props.setLink({title: 'Регистация', link: false});
    }, [])
    function onSubmit () {
        auth.login({
            password: password,
            email: email
        })
        .then((res) => {
            localStorage.setItem('jwt', res.token);
            props.setloggedIn(true);
            history.push('/')
        })
        .catch((err) => console.log(err))
    }

    return (
        <Form title='Вход' buttonText='Войти' linkText='Ещё не зарегистрированы? Регистрация' setEmail={setEmail} setPassword={setPassword} onSubmit={onSubmit} route='./signup'/>
    )
}