// src/RegistrationForm.jsx
import { useState } from 'react';

function RegistrationForm() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });


    const [errors, setErrors] = useState({});


    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'email' && value && !value.includes('@')) {
            setErrors(prev => ({ ...prev, email: 'Некорректный email'}));
        } else if (name === 'email') {
            setErrors(prev => ({ ...prev, email: ''}))
        }
    }

    const handleSumbit = (e) => {
        e.preventDefault();
        console.log('Данные формы: ', formData);
        alert(`Добро пожаловать, ${formData.name}!`);
    };

    return (
        <form className="registration-form" onSubmit={handleSumbit}>
            <h2>Регистрация</h2>

            <div className='form-group'>
                <label>Имя:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
                <label>Пароль:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit">Зарегистрироваться</button>
            <button type="reset">Сбросить</button>
        </form >
    );

}

export default RegistrationForm;
