import { useState, useEffect, useCallback } from 'react';

function useTechnologiesApi() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Массив популярных технологий для поиска на GitHub
  const popularTechs = [
    'react', 'vue', 'angular', 'nodejs', 'typescript',
    'docker', 'kubernetes', 'python', 'java', 'mongodb',
    'postgresql', 'graphql', 'nestjs', 'nextjs', 'express',
    'django', 'spring-boot', 'flutter', 'react-native', 'redux'
  ];

  // Функция загрузки технологий с GitHub API
  const fetchTechnologies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Начинаю загрузку технологий с GitHub API...');

      const allTechs = [];

      // Берем только 5 технологий для демонстрации (чтобы не превысить лимит GitHub)
      const techsToFetch = popularTechs.slice(0, 5);

      for (const tech of techsToFetch) {
        try {
          // Ищем репозитории по названию технологии
          const response = await fetch(
            `https://api.github.com/search/repositories?q=${tech}+in:name+language:javascript&sort=stars&per_page=1`,
            {
              headers: {
                'Accept': 'application/vnd.github.v3+json',
                // GitHub API работает без токена до 60 запросов в час
              }
            }
          );

          // Проверяем статус ответа
          if (response.status === 403) {
            // Лимит GitHub API исчерпан, используем fallback данные
            throw new Error('GitHub API limit exceeded');
          }

          if (!response.ok) {
            console.warn(`GitHub API ошибка для "${tech}": ${response.status}`);
            continue;
          }

          const data = await response.json();

          if (data.items && data.items.length > 0) {
            const repo = data.items[0];

            // Определяем категорию технологии
            let category = 'frontend';
            if (tech.includes('node') || tech.includes('express') || tech.includes('nestjs')) {
              category = 'backend';
            } else if (tech.includes('docker') || tech.includes('kubernetes')) {
              category = 'devops';
            } else if (tech.includes('mongodb') || tech.includes('postgresql')) {
              category = 'database';
            }

            // Определяем уровень сложности по звёздам
            let difficulty = 'beginner';
            if (repo.stargazers_count > 10000) {
              difficulty = 'advanced';
            } else if (repo.stargazers_count > 1000) {
              difficulty = 'intermediate';
            }

            const techItem = {
              id: repo.id,
              title: repo.name,
              name: tech.charAt(0).toUpperCase() + tech.slice(1),
              description: repo.description || `Официальный репозиторий ${tech}`,
              category: category,
              language: repo.language || 'JavaScript',
              stars: repo.stargazers_count,
              url: repo.html_url,
              difficulty: difficulty,
              resources: [
                repo.html_url,
                repo.homepage || `https://www.npmjs.com/package/${repo.name}`,
                `https://github.com/${repo.full_name}#readme`
              ].filter(Boolean),
              updatedAt: repo.updated_at || new Date().toISOString()
            };

            allTechs.push(techItem);
            console.log(`Загружено: ${techItem.name} (${repo.stargazers_count} звёзд)`);
          }
        } catch (techError) {
          console.error(`Ошибка при загрузке "${tech}":`, techError.message);
        }
      }

      // Если не загрузили ни одной технологии, используем fallback данные
      if (allTechs.length === 0) {
        console.log('Использую fallback данные...');
        const fallbackTechs = getFallbackTechnologies();
        setTechnologies(fallbackTechs);
      } else {
        // Убираем возможные дубликаты
        const uniqueTechs = Array.from(
          new Map(allTechs.map(tech => [tech.id, tech])).values()
        );
        setTechnologies(uniqueTechs);
      }

    } catch (err) {
      console.error('Критическая ошибка загрузки:', err);
      setError(`Не удалось загрузить технологии: ${err.message}`);

      // Всегда есть fallback
      const fallbackTechs = getFallbackTechnologies();
      setTechnologies(fallbackTechs);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fallback данные на случай проблем с GitHub API
  const getFallbackTechnologies = () => {
    return [
      {
        id: 1,
        title: 'React',
        name: 'React',
        description: 'Библиотека JavaScript для создания пользовательских интерфейсов. Разработана Facebook.',
        category: 'frontend',
        language: 'JavaScript',
        stars: 209000,
        url: 'https://github.com/facebook/react',
        difficulty: 'intermediate',
        resources: [
          'https://react.dev',
          'https://ru.reactjs.org',
          'https://github.com/facebook/react'
        ],
        updatedAt: '2024-01-15T10:30:00Z'
      },
      {
        id: 2,
        title: 'Node.js',
        name: 'Node.js',
        description: 'Среда выполнения JavaScript, построенная на движке V8 Chrome. Позволяет выполнять JS на сервере.',
        category: 'backend',
        language: 'JavaScript',
        stars: 95000,
        url: 'https://github.com/nodejs/node',
        difficulty: 'intermediate',
        resources: [
          'https://nodejs.org',
          'https://nodejs.org/en/docs/',
          'https://github.com/nodejs/node'
        ],
        updatedAt: '2024-01-15T10:30:00Z'
      },
      {
        id: 3,
        title: 'TypeScript',
        name: 'TypeScript',
        description: 'Строго типизированное надмножество JavaScript, которое компилируется в чистый JavaScript.',
        category: 'language',
        language: 'TypeScript',
        stars: 88000,
        url: 'https://github.com/microsoft/TypeScript',
        difficulty: 'intermediate',
        resources: [
          'https://www.typescriptlang.org',
          'https://www.typescriptlang.org/docs/',
          'https://github.com/microsoft/TypeScript'
        ],
        updatedAt: '2024-01-15T10:30:00Z'
      },
      {
        id: 4,
        title: 'Docker',
        name: 'Docker',
        description: 'Платформа для разработки, доставки и запуска приложений в контейнерах.',
        category: 'devops',
        language: 'Go',
        stars: 65000,
        url: 'https://github.com/docker/docker-ce',
        difficulty: 'intermediate',
        resources: [
          'https://www.docker.com',
          'https://docs.docker.com/',
          'https://github.com/docker/docker-ce'
        ],
        updatedAt: '2024-01-15T10:30:00Z'
      },
      {
        id: 5,
        title: 'MongoDB',
        name: 'MongoDB',
        description: 'Документоориентированная система управления базами данных NoSQL.',
        category: 'database',
        language: 'C++',
        stars: 24000,
        url: 'https://github.com/mongodb/mongo',
        difficulty: 'intermediate',
        resources: [
          'https://www.mongodb.com',
          'https://docs.mongodb.com/',
          'https://github.com/mongodb/mongo'
        ],
        updatedAt: '2024-01-15T10:30:00Z'
      }
    ];
  };

  // Функция добавления новой технологии
  const addTechnology = useCallback(async (techData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTech = {
          id: Date.now(),
          ...techData,
          stars: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        setTechnologies(prev => [...prev, newTech]);
        resolve(newTech);
      }, 500);
    });
  }, []);

  // Загружаем технологии при монтировании
  useEffect(() => {
    fetchTechnologies();
  }, [fetchTechnologies]);

  return {
    technologies,
    loading,
    error,
    refetch: fetchTechnologies,
    addTechnology
  };
}

export default useTechnologiesApi;