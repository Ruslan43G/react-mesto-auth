import React from 'react';
import FormAuth from './FormAuth';

export default function Login (props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    React.useEffect(() => {
        props.setLink({title: 'Регистация', link: false});
    }, [])
    
    function onSubmit () {
        props.onSubmit({
            password: password,
            email: email
        }) 
    }

    return (
        <FormAuth title='Вход' buttonText='Войти' linkText='Ещё не зарегистрированы? Регистрация' setEmail={setEmail} setPassword={setPassword} onSubmit={onSubmit} route='./signup'/>
    )
}