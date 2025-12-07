import { useState, useEffect } from 'react';

function Settings() {
    // Состояния для настроек
    const [theme, setTheme] = useState('light');
    const [notifications, setNotifications] = useState(true);
    const [autoSave, setAutoSave] = useState(true);
    const [techPerPage, setTechPerPage] = useState(10);
    const [defaultStatus, setDefaultStatus] = useState('not-started');

    // Загружаем сохранённые настройки при загрузке
    useEffect(() => {
        const savedSettings = localStorage.getItem('appSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            setTheme(settings.theme || 'light');
            setNotifications(settings.notifications !== false); // по умолчанию true
            setAutoSave(settings.autoSave !== false); // по умолчанию true
            setTechPerPage(settings.techPerPage || 10);
            setDefaultStatus(settings.defaultStatus || 'not-started');
        }
    }, []);

    // Сохраняем настройки
    const saveSettings = () => {
        const settings = {
            theme,
            notifications,
            autoSave,
            techPerPage,
            defaultStatus,
            lastUpdated: new Date().toISOString()
        };

        localStorage.setItem('appSettings', JSON.stringify(settings));
        alert('Настройки сохранены!');

        // Применяем тему сразу
        applyTheme(theme);
    };

    // Применяем выбранную тему
    const applyTheme = (selectedTheme) => {
        document.body.className = selectedTheme + '-theme';
        localStorage.setItem('appTheme', selectedTheme);
    };

    // Сброс всех настроек
    const resetSettings = () => {
        if (window.confirm('Вы уверены? Все настройки вернутся к значениям по умолчанию.')) {
            localStorage.removeItem('appSettings');
            setTheme('light');
            setNotifications(true);
            setAutoSave(true);
            setTechPerPage(10);
            setDefaultStatus('not-started');
            applyTheme('light');
            alert('Настройки сброшены!');
        }
    };

    // Очистка всех данных
    const clearAllData = () => {
        if (window.confirm('ВНИМАНИЕ! Это удалит ВСЕ ваши технологии. Это действие нельзя отменить.')) {
            localStorage.removeItem('technologies');
            alert('Все данные очищены! Приложение будет перезагружено.');
            window.location.reload(); // Перезагружаем страницу
        }
    };

    // Экспорт данных
    const exportData = () => {
        const data = localStorage.getItem('technologies');
        if (!data) {
            alert('Нет данных для экспорта');
            return;
        }

        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `технологии_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert('Данные экспортированы в файл JSON');
    };

    // Импорт данных
    const importData = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                // Проверяем, что это массив технологий
                if (Array.isArray(data) && data.length > 0 && data[0].id !== undefined) {
                    localStorage.setItem('technologies', JSON.stringify(data));
                    alert(`Успешно импортировано ${data.length} технологий! Приложение будет перезагружено.`);
                    window.location.reload();
                } else {
                    alert('Неверный формат файла');
                }
            } catch (error) {
                alert('Ошибка при чтении файла');
            }
        };
        reader.readAsText(file);

        // Сбрасываем значение input, чтобы можно было загрузить тот же файл снова
        event.target.value = '';
    };

    // Скачать резервную копию настроек
    const backupSettings = () => {
        const backup = {
            settings: localStorage.getItem('appSettings'),
            technologies: localStorage.getItem('technologies'),
            backupDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `резервная_копия_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="page">
            <h1>Настройки приложения</h1>

            <div className="settings-container">
                {/* Секция 1: Внешний вид */}
                <div className="settings-section">
                    <h2>📱 Внешний вид</h2>

                    <div className="setting-item">
                        <label>Тема оформления:</label>
                        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                            <option value="light">Светлая</option>
                            <option value="dark">Тёмная</option>
                            <option value="blue">Синяя</option>
                        </select>
                    </div>
                </div>

                {/* Секция 2: Поведение */}
                <div className="settings-section">
                    <h2>⚙️ Поведение</h2>

                    <div className="setting-item checkbox">
                        <label>
                            <input
                                type="checkbox"
                                checked={notifications}
                                onChange={(e) => setNotifications(e.target.checked)}
                            />
                            <span>Показывать уведомления</span>
                        </label>
                    </div>

                    <div className="setting-item checkbox">
                        <label>
                            <input
                                type="checkbox"
                                checked={autoSave}
                                onChange={(e) => setAutoSave(e.target.checked)}
                            />
                            <span>Автосохранение</span>
                        </label>
                    </div>

                    <div className="setting-item">
                        <label>Технологий на странице:</label>
                        <select value={techPerPage} onChange={(e) => setTechPerPage(Number(e.target.value))}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </div>

                    <div className="setting-item">
                        <label>Статус по умолчанию для новых технологий:</label>
                        <select value={defaultStatus} onChange={(e) => setDefaultStatus(e.target.value)}>
                            <option value="not-started">Не начато</option>
                            <option value="in-progress">В процессе</option>
                        </select>
                    </div>
                </div>

                {/* Секция 3: Управление данными */}
                <div className="settings-section">
                    <h2>💾 Данные</h2>

                    <div className="setting-item button-group">
                        <button onClick={exportData} className="btn btn-secondary">
                            📤 Экспорт данных
                        </button>
                        <button onClick={backupSettings} className="btn btn-secondary">
                            💾 Резервная копия
                        </button>
                    </div>

                    <div className="setting-item">
                        <label>Импорт данных (JSON):</label>
                        <input
                            type="file"
                            accept=".json,application/json"
                            onChange={importData}
                            className="file-input"
                        />
                        <small>Выберите файл JSON с технологиями</small>
                    </div>

                    <div className="danger-zone">
                        <h3>⚠️ Опасная зона</h3>

                        <div className="setting-item">
                            <button onClick={clearAllData} className="btn btn-danger">
                                🗑️ Удалить все технологии
                            </button>
                            <small>Полностью очистит список технологий</small>
                        </div>

                        <div className="setting-item">
                            <button onClick={resetSettings} className="btn btn-warning">
                                🔄 Сбросить настройки
                            </button>
                            <small>Вернёт все настройки к значениям по умолчанию</small>
                        </div>
                    </div>
                </div>

                {/* Кнопки действий */}
                <div className="settings-actions">
                    <button onClick={saveSettings} className="btn btn-primary">
                        💾 Сохранить настройки
                    </button>
                </div>

                {/* Информация о приложении */}
                <div className="app-info">
                    <h2>ℹ️ Информация</h2>
                    <p><strong>Версия:</strong> 1.0.0</p>
                    <p><strong>Технологий в базе:</strong> {JSON.parse(localStorage.getItem('technologies') || '[]').length}</p>
                    <p><strong>Последнее изменение настроек:</strong> {
                        localStorage.getItem('appSettings')
                            ? new Date(JSON.parse(localStorage.getItem('appSettings')).lastUpdated).toLocaleString()
                            : 'никогда'
                    }</p>
                </div>
            </div>
        </div>
    );
}

export default Settings;