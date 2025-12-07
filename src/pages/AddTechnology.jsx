import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddTechnology() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [notes, setNotes] = useState('');
    const [status, setStatus] = useState('not-started');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Создаём новую технологию
        const newTech = {
            id: Date.now(), // Простой способ получить уникальный ID
            title,
            description,
            notes,
            status
        };

        // Получаем существующие технологии из localStorage
        const existing = localStorage.getItem('technologies');
        const technologies = existing ? JSON.parse(existing) : [];

        // Добавляем новую технологию
        technologies.push(newTech);

        // Сохраняем обратно
        localStorage.setItem('technologies', JSON.stringify(technologies));

        // Перенаправляем на список технологий
        navigate('/technologies');
    };

    return (
        <div className="page">
            <div className="page-header">
                <h1>Добавить технологию</h1>
            </div>

            <form onSubmit={handleSubmit} className="add-tech-form">
                <div className="form-group">
                    <label>Название технологии:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="Например: React, TypeScript, Node.js"
                    />
                </div>

                <div className="form-group">
                    <label>Описание:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        placeholder="Краткое описание технологии..."
                    />
                </div>

                <div className="form-group">
                    <label>Статус изучения:</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="not-started">Не начато</option>
                        <option value="in-progress">В процессе</option>
                        <option value="completed">Завершено</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Заметки (опционально):</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows="3"
                        placeholder="Ваши заметки, ссылки, ресурсы..."
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                        Сохранить технологию
                    </button>
                    <button
                        type="button"
                        className="btn"
                        onClick={() => navigate('/technologies')}
                    >
                        Отмена
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddTechnology;