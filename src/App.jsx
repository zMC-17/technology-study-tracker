import React from 'react';
import useTechnologiesApi from './hooks/useTechnologiesApi';
import TechnologyList from './components/TechnologyList';
import RoadmapImporter from './components/RoadmapImporter';
import './App.css';

function App() {
  const { loading, error, refetch } = useTechnologiesApi();

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🚀 Трекер изучения технологий</h1>
          <p className="header-subtitle">
            Отслеживайте прогресс в изучении современных технологий разработки
          </p>
        </div>

        <div className="header-actions">
          <button onClick={refetch} className="header-button refresh-button">
            🔄 Обновить данные
          </button>
          <button
            className="header-button add-button"
            onClick={() => alert('Форма добавления технологии в разработке!')}
          >
            ➕ Добавить технологию
          </button>
        </div>
      </header>

      {error && !loading && (
        <div className="app-error">
          <div className="error-content">
            <h3>⚠️ Внимание: Ограничения GitHub API</h3>
            <p>
              {error}. Используются локальные данные. GitHub API имеет ограничение
              60 запросов в час для неавторизованных пользователей.
            </p>
            <button onClick={refetch} className="error-retry-button">
              Попробовать снова
            </button>
          </div>
        </div>
      )}

      <main className="app-main">
        <div className="main-container">
          <div className="sidebar">
            <div className="sidebar-section">
              <h3>📊 Статистика</h3>
              <div className="stats-info">
                <p>• Данные загружаются с GitHub API</p>
                <p>• Автоматическое обновление</p>
                <p>• Возможность импорта roadmap'ов</p>
                <p>• Поиск с debounce 500ms</p>
              </div>
            </div>

            <div className="sidebar-section">
              <h3>⚡ Быстрые действия</h3>
              <div className="quick-actions">
                <button className="quick-button" onClick={() => window.scrollTo(0, document.body.scrollHeight)}>
                  📥 Импорт roadmap
                </button>
                <button className="quick-button" onClick={() => alert('Экспорт в разработке!')}>
                  📤 Экспорт данных
                </button>
                <button className="quick-button" onClick={() => window.open('https://roadmap.sh', '_blank')}>
                  🌐 Открыть roadmap.sh
                </button>
              </div>
            </div>

            <div className="sidebar-section">
              <h3>ℹ️ О проекте</h3>
              <div className="about-info">
                <p>
                  Этот трекер использует GitHub API для получения актуальной
                  информации о популярных технологиях разработки.
                </p>
                <p className="api-note">
                  <strong>GitHub API:</strong> 60 запросов/час без токена
                </p>
              </div>
            </div>
          </div>

          <div className="content">
            <section className="content-section">
              <h2>🎯 Мои технологии</h2>
              <TechnologyList />
            </section>

            <section className="content-section">
              <h2>🗺️ Импорт дорожных карт</h2>
              <RoadmapImporter />
            </section>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>
            Трекер технологий • Данные с GitHub API • Практическое задание по фронтенд разработке
          </p>
          <p className="footer-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub API</a> •
            <a href="https://roadmap.sh" target="_blank" rel="noopener noreferrer">Roadmap.sh</a> •
            <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">React</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;