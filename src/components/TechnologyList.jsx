import { useState } from 'react';
import useTechnologiesApi from '../hooks/useTechnologiesApi';
import TechnologyCard from './TechnologyCard';
import TechnologySearch from './TechnologySearch';

function TechnologyList() {
  const { technologies, loading, error, refetch } = useTechnologiesApi();
  const [filteredTech, setFilteredTech] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Получаем уникальные категории для фильтра
  const categories = ['all', ...new Set(technologies.map(tech => tech.category))];

  // Фильтруем технологии по категории
  const filterByCategory = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredTech(technologies);
    } else {
      setFilteredTech(technologies.filter(tech => tech.category === category));
    }
  };

  // Обновляем отфильтрованный список при изменении technologies
  useState(() => {
    setFilteredTech(technologies);
  }, [technologies]);

  if (loading) {
    return (
      <div className="technology-list loading">
        <div className="spinner"></div>
        <p>Загрузка технологий из GitHub API...</p>
        <small>Если загрузка долгая, проверьте подключение к интернету</small>
      </div>
    );
  }

  if (error) {
    return (
      <div className="technology-list error">
        <h3>⚠️ Ошибка загрузки</h3>
        <p>{error}</p>
        <p className="error-note">
          Используются локальные данные. GitHub API может иметь ограничения по запросам.
        </p>
        <button onClick={refetch} className="retry-button">
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className="technology-list">
      <div className="list-header">
        <div className="header-left">
          <h2>📚 Список технологий</h2>
          <span className="tech-count">
            {filteredTech.length} из {technologies.length} технологий
          </span>
        </div>

        <div className="header-right">
          <button onClick={refetch} className="refresh-button">
            🔄 Обновить
          </button>
        </div>
      </div>

      <div className="list-controls">
        <div className="category-filters">
          <span>Фильтр по категории:</span>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => filterByCategory(category)}
              className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            >
              {category === 'all' ? 'Все' : category}
            </button>
          ))}
        </div>

        <div className="search-control">
          <TechnologySearch
            technologies={technologies}
            onSearchResults={setFilteredTech}
          />
        </div>
      </div>

      <div className="technologies-stats">
        <div className="stat-card">
          <span className="stat-value">{technologies.length}</span>
          <span className="stat-label">Всего технологий</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">
            {Math.round(technologies.reduce((sum, tech) => sum + tech.stars, 0) / 1000)}k
          </span>
          <span className="stat-label">Всего звёзд на GitHub</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">
            {new Set(technologies.map(tech => tech.category)).size}
          </span>
          <span className="stat-label">Категорий</span>
        </div>
      </div>

      {filteredTech.length === 0 ? (
        <div className="no-results">
          <p>🚫 Технологии не найдены</p>
          <p>Попробуйте изменить фильтры или поисковый запрос</p>
        </div>
      ) : (
        <div className="technologies-grid">
          {filteredTech.map(tech => (
            <TechnologyCard key={tech.id} technology={tech} />
          ))}
        </div>
      )}

      <div className="list-footer">
        <p className="api-note">
          ℹ️ Данные загружаются с GitHub API. Обновляется при каждом перезапуске приложения.
          Максимальное количество запросов: 60 в час.
        </p>
      </div>
    </div>
  );
}

export default TechnologyList;