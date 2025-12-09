import { useState } from 'react';

function TechnologyCard({ technology }) {
  const [expanded, setExpanded] = useState(false);
  const [resourcesExpanded, setResourcesExpanded] = useState(false);

  // Форматируем число звёзд
  const formatStars = (stars) => {
    if (stars >= 1000) {
      return `${(stars / 1000).toFixed(1)}k`;
    }
    return stars.toString();
  };

  // Получаем цвет для категории
  const getCategoryColor = (category) => {
    const colors = {
      frontend: '#3498db',
      backend: '#2ecc71',
      database: '#e74c3c',
      devops: '#9b59b6',
      language: '#f39c12',
      tools: '#1abc9c',
      cloud: '#e67e22'
    };
    return colors[category] || '#95a5a6';
  };

  // Получаем иконку для категории
  const getCategoryIcon = (category) => {
    const icons = {
      frontend: '🎨',
      backend: '⚙️',
      database: '🗄️',
      devops: '🚀',
      language: '📝',
      tools: '🛠️',
      cloud: '☁️'
    };
    return icons[category] || '🔧';
  };

  // Получаем цвет для уровня сложности
  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: '#2ecc71',
      intermediate: '#f39c12',
      advanced: '#e74c3c'
    };
    return colors[difficulty] || '#95a5a6';
  };

  return (
    <div className={`technology-card ${expanded ? 'expanded' : ''}`}>
      <div
        className="card-header"
        onClick={() => setExpanded(!expanded)}
        style={{ cursor: 'pointer' }}
      >
        <div className="card-title-section">
          <h3 className="tech-title">{technology.title}</h3>
          <span className="tech-name">{technology.name}</span>
        </div>

        <div className="card-badges">
          <span
            className="category-badge"
            style={{
              backgroundColor: getCategoryColor(technology.category),
              color: 'white'
            }}
          >
            {getCategoryIcon(technology.category)} {technology.category}
          </span>

          <span
            className="difficulty-badge"
            style={{
              backgroundColor: getDifficultyColor(technology.difficulty),
              color: 'white'
            }}
          >
            {technology.difficulty === 'beginner' ? '🟢' :
             technology.difficulty === 'intermediate' ? '🟡' : '🔴'}
            {technology.difficulty}
          </span>

          <span className="stars-badge">
            ⭐ {formatStars(technology.stars)}
          </span>
        </div>

        <span className="expand-icon">
          {expanded ? '▲' : '▼'}
        </span>
      </div>

      {expanded && (
        <div className="card-content">
          <div className="tech-description">
            <p>{technology.description}</p>
          </div>

          <div className="tech-details">
            <div className="detail-item">
              <span className="detail-label">Язык:</span>
              <span className="detail-value">{technology.language}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Звёзд на GitHub:</span>
              <span className="detail-value">
                {technology.stars.toLocaleString()} ⭐
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Обновлено:</span>
              <span className="detail-value">
                {new Date(technology.updatedAt).toLocaleDateString('ru-RU')}
              </span>
            </div>
          </div>

          <div className="tech-resources">
            <div
              className="resources-header"
              onClick={() => setResourcesExpanded(!resourcesExpanded)}
              style={{ cursor: 'pointer' }}
            >
              <h4>🔗 Ресурсы для изучения</h4>
              <span className="expand-icon">
                {resourcesExpanded ? '▲' : '▼'}
              </span>
            </div>

            {resourcesExpanded && technology.resources && (
              <ul className="resources-list">
                {technology.resources.map((resource, index) => (
                  <li key={index}>
                    <a
                      href={resource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resource-link"
                    >
                      {resource.length > 50
                        ? `${resource.substring(0, 50)}...`
                        : resource}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="card-actions">
            <a
              href={technology.url}
              target="_blank"
              rel="noopener noreferrer"
              className="github-button"
            >
              <span className="button-icon">🐙</span>
              GitHub репозиторий
            </a>

            <button
              className="save-button"
              onClick={() => alert(`Технология "${technology.name}" добавлена в избранное!`)}
            >
              <span className="button-icon">⭐</span>
              В избранное
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TechnologyCard;