import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Statistics() {
    const [technologies, setTechnologies] = useState([]);
    const [stats, setStats] = useState(null);

    // Загрузка технологий из LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem('technologies');
        if (saved) {
            const data = JSON.parse(saved);
            setTechnologies(data);
            calculateStats(data);
        }
    }, []);

    // Функция для расчёта статистики
    const calculateStats = (techData) => {
        if (!techData || techData.length === 0) {
            setStats({
                total: 0,
                byStatus: { 'not-started': 0, 'in-progress': 0, 'completed': 0 },
                percentages: { 'not-started': 0, 'in-progress': 0, 'completed': 0 },
                byMonth: {},
                averageProgress: 0
            });
            return;
        }

        const total = techData.length;
        const byStatus = {
            'not-started': techData.filter(t => t.status === 'not-started').length,
            'in-progress': techData.filter(t => t.status === 'in-progress').length,
            'completed': techData.filter(t => t.status === 'completed').length
        };

        const percentages = {
            'not-started': Math.round((byStatus['not-started'] / total) * 100),
            'in-progress': Math.round((byStatus['in-progress'] / total) * 100),
            'completed': Math.round((byStatus['completed'] / total) * 100)
        };

        // Рассчитываем "средний прогресс" (условно)
        const progressValues = {
            'not-started': 0,
            'in-progress': 50,
            'completed': 100
        };

        const averageProgress = techData.length > 0
            ? Math.round(techData.reduce((sum, tech) => sum + progressValues[tech.status], 0) / techData.length)
            : 0;

        setStats({
            total,
            byStatus,
            percentages,
            averageProgress
        });
    };

    // Если данных нет
    if (technologies.length === 0) {
        return (
            <div className="page">
                <h1>Статистика изучения технологий</h1>
                <div className="empty-stats">
                    <p>Нет данных для отображения статистики.</p>
                    <p>Добавьте технологии, чтобы увидеть прогресс.</p>
                    <Link to="/add-technology" className="btn btn-primary">
                        Добавить первую технологию
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="page">
            <h1>Статистика изучения технологий</h1>

            {/* Краткая сводка */}
            <div className="stats-summary">
                <div className="stat-card">
                    <h3>Всего технологий</h3>
                    <div className="stat-number">{stats.total}</div>
                </div>
                <div className="stat-card">
                    <h3>Средний прогресс</h3>
                    <div className="stat-number">{stats.averageProgress}%</div>
                </div>
                <div className="stat-card">
                    <h3>Завершено</h3>
                    <div className="stat-number">{stats.byStatus.completed}</div>
                </div>
            </div>

            {/* Круговой график (простая CSS реализация) */}
            <div className="stats-section">
                <h2>Распределение по статусам</h2>
                <div className="chart-container">
                    <div className="pie-chart">
                        <div
                            className="pie-segment completed"
                            style={{ '--percentage': `${stats.percentages.completed}%` }}
                        >
                            <span>Завершено<br/>{stats.percentages.completed}%</span>
                        </div>
                        <div
                            className="pie-segment in-progress"
                            style={{ '--percentage': `${stats.percentages['in-progress']}%` }}
                        >
                            <span>В процессе<br/>{stats.percentages['in-progress']}%</span>
                        </div>
                        <div
                            className="pie-segment not-started"
                            style={{ '--percentage': `${stats.percentages['not-started']}%` }}
                        >
                            <span>Не начато<br/>{stats.percentages['not-started']}%</span>
                        </div>
                    </div>

                    {/* Легенда */}
                    <div className="chart-legend">
                        <div className="legend-item">
                            <span className="legend-color completed"></span>
                            <span>Завершено: {stats.byStatus.completed}</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-color in-progress"></span>
                            <span>В процессе: {stats.byStatus['in-progress']}</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-color not-started"></span>
                            <span>Не начато: {stats.byStatus['not-started']}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Столбчатая диаграмма */}
            <div className="stats-section">
                <h2>Количество по статусам</h2>
                <div className="bar-chart">
                    <div className="bar-container">
                        <div className="bar-label">Завершено</div>
                        <div className="bar-wrapper">
                            <div
                                className="bar completed"
                                style={{ width: `${stats.percentages.completed}%` }}
                            >
                                <span className="bar-value">{stats.byStatus.completed}</span>
                            </div>
                        </div>
                    </div>
                    <div className="bar-container">
                        <div className="bar-label">В процессе</div>
                        <div className="bar-wrapper">
                            <div
                                className="bar in-progress"
                                style={{ width: `${stats.percentages['in-progress']}%` }}
                            >
                                <span className="bar-value">{stats.byStatus['in-progress']}</span>
                            </div>
                        </div>
                    </div>
                    <div className="bar-container">
                        <div className="bar-label">Не начато</div>
                        <div className="bar-wrapper">
                            <div
                                className="bar not-started"
                                style={{ width: `${stats.percentages['not-started']}%` }}
                            >
                                <span className="bar-value">{stats.byStatus['not-started']}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Список технологий с прогрессом */}
            <div className="stats-section">
                <h2>Детальный прогресс по технологиям</h2>
                <div className="technologies-progress">
                    {technologies.map(tech => {
                        const progress = tech.status === 'completed' ? 100 :
                                        tech.status === 'in-progress' ? 50 : 0;

                        return (
                            <div key={tech.id} className="tech-progress-item">
                                <div className="tech-name">{tech.title}</div>
                                <div className="progress-bar-container">
                                    <div
                                        className={`progress-bar ${tech.status}`}
                                        style={{ width: `${progress}%` }}
                                    >
                                        <span className="progress-text">
                                            {tech.status === 'completed' ? '✓ Завершено' :
                                             tech.status === 'in-progress' ? '⟳ В процессе' :
                                             '○ Не начато'}
                                        </span>
                                    </div>
                                </div>
                                <Link to={`/technology/${tech.id}`} className="btn-link">
                                    Подробнее
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Кнопка для обновления статистики */}
            <div className="stats-actions">
                <button
                    onClick={() => calculateStats(technologies)}
                    className="btn btn-secondary"
                >
                    Обновить статистику
                </button>
                <Link to="/technologies" className="btn">
                    ← К списку технологий
                </Link>
            </div>
        </div>
    );
}

export default Statistics;