import { useState, useEffect, useRef } from 'react';

function TechnologySearch({ technologies, onSearchResults }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Refs для управления debounce и отменой запросов
  const searchTimeoutRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Функция поиска технологий
  const searchTechnologies = (query) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      setLoading(true);

      // Если поисковый запрос пустой, показываем все технологии
      if (!query.trim()) {
        onSearchResults(technologies);
        setLoading(false);
        return;
      }

      // Имитация поиска с задержкой (в реальном приложении был бы API запрос)
      setTimeout(() => {
        const results = technologies.filter(tech =>
          tech.name.toLowerCase().includes(query.toLowerCase()) ||
          tech.description.toLowerCase().includes(query.toLowerCase()) ||
          tech.category.toLowerCase().includes(query.toLowerCase())
        );

        onSearchResults(results);
        setLoading(false);
      }, 300);

    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Ошибка поиска:', err);
      }
      setLoading(false);
    }
  };

  // Обработчик изменения поискового запроса с debounce
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Очищаем предыдущий таймер
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Устанавливаем новый таймер для debounce
    searchTimeoutRef.current = setTimeout(() => {
      searchTechnologies(value);
    }, 500);
  };

  // Очистка поиска
  const handleClearSearch = () => {
    setSearchTerm('');
    onSearchResults(technologies);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div className="technology-search">
      <div className="search-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Поиск технологий по названию, описанию или категории..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          {loading && (
            <div className="search-loading">
              <div className="mini-spinner"></div>
            </div>
          )}
          {searchTerm && !loading && (
            <button
              onClick={handleClearSearch}
              className="clear-search-button"
              aria-label="Очистить поиск"
            >
              ✕
            </button>
          )}
        </div>

        <div className="search-hints">
          <small>
            🔍 Поиск работает с задержкой 500ms. Можно искать по: React, Node.js, Docker и т.д.
          </small>
        </div>
      </div>

      <div className="search-tips">
        <span className="tip-title">Советы по поиску:</span>
        <button
          type="button"
          onClick={() => setSearchTerm('react')}
          className="search-tag"
        >
          #react
        </button>
        <button
          type="button"
          onClick={() => setSearchTerm('node')}
          className="search-tag"
        >
          #node
        </button>
        <button
          type="button"
          onClick={() => setSearchTerm('database')}
          className="search-tag"
        >
          #database
        </button>
        <button
          type="button"
          onClick={() => setSearchTerm('beginner')}
          className="search-tag"
        >
          #beginner
        </button>
      </div>
    </div>
  );
}

export default TechnologySearch;