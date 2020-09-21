import React from 'react';
import FormAuth from './FormAuth';

export default function Register (props) {
    
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    React.useEffect(() => {
        props.setLink({title: 'Войти', link: true});
    }, [])

    function onSubmit () {
        props.onSubmit({
            password: password,
            email: email
        })   
    }

    return (
        <FormAuth title='Регистрация' buttonText='Зарегистрироваться' linkText='Уже зарегистрированы? Войти' setEmail={setEmail} setPassword={setPassword} onSubmit={onSubmit} route='/signin'/>
    )
}