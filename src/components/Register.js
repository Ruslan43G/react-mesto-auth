import React from 'react';
import Form from './Form';
import auth from '../utils/Auth';

export default function Register (props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    React.useEffect(() => {
        props.setLink({title: 'Войти', link: true});
    }, [])

    function onSubmit () {
        auth.register({
            password: password,
            email: email
        })
        .then((res) => {
            console.log(res);
            props.infoTool({
                isOpen: true,
                title: 'Вы успешно зарегистрировались!',
                success: true
            });
        })
        .catch((err) => {
            console.log(err);
            props.infoTool({
                isOpen: true,
                title: 'Что-то пошло не так! Попробуйте ещё раз.',
                success: false
            });
        })
    }

    return (
        <Form title='Регистрация' buttonText='Зарегистрироваться' linkText='Уже зарегистрированы? Войти' setEmail={setEmail} setPassword={setPassword} onSubmit={onSubmit} route='/signin'/>
    )
}