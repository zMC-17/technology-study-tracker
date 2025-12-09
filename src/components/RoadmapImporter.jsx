import { useState } from 'react';
import useTechnologiesApi from '../hooks/useTechnologiesApi';

function RoadmapImporter() {
  const { addTechnology } = useTechnologiesApi();
  const [importing, setImporting] = useState(false);
  const [importStatus, setImportStatus] = useState('');

  // Примеры дорожных карт из roadmap.sh
  const exampleRoadmaps = [
    {
      id: 'frontend',
      name: 'Frontend Developer',
      technologies: [
        { name: 'HTML', category: 'frontend', difficulty: 'beginner' },
        { name: 'CSS', category: 'frontend', difficulty: 'beginner' },
        { name: 'JavaScript', category: 'frontend', difficulty: 'intermediate' },
        { name: 'React', category: 'frontend', difficulty: 'intermediate' },
        { name: 'TypeScript', category: 'frontend', difficulty: 'intermediate' }
      ]
    },
    {
      id: 'backend',
      name: 'Backend Developer',
      technologies: [
        { name: 'Node.js', category: 'backend', difficulty: 'intermediate' },
        { name: 'Express.js', category: 'backend', difficulty: 'intermediate' },
        { name: 'MongoDB', category: 'database', difficulty: 'intermediate' },
        { name: 'PostgreSQL', category: 'database', difficulty: 'intermediate' },
        { name: 'Docker', category: 'devops', difficulty: 'advanced' }
      ]
    },
    {
      id: 'devops',
      name: 'DevOps Engineer',
      technologies: [
        { name: 'Docker', category: 'devops', difficulty: 'intermediate' },
        { name: 'Kubernetes', category: 'devops', difficulty: 'advanced' },
        { name: 'AWS', category: 'cloud', difficulty: 'advanced' },
        { name: 'Terraform', category: 'devops', difficulty: 'advanced' },
        { name: 'Git', category: 'tools', difficulty: 'beginner' }
      ]
    }
  ];

  const handleImportRoadmap = async (roadmapId) => {
    try {
      setImporting(true);
      setImportStatus(`Импорт дорожной карты ${roadmapId}...`);

      // Находим выбранную дорожную карту
      const roadmap = exampleRoadmaps.find(r => r.id === roadmapId);

      if (!roadmap) {
        throw new Error('Дорожная карта не найдена');
      }

      let importedCount = 0;

      // Импортируем каждую технологию из дорожной карты
      for (const tech of roadmap.technologies) {
        try {
          await addTechnology({
            title: tech.name,
            name: tech.name,
            description: `Технология из дорожной карты "${roadmap.name}"`,
            category: tech.category,
            difficulty: tech.difficulty,
            resources: [
              `https://roadmap.sh/${roadmapId}`,
              `https://google.com/search?q=${encodeURIComponent(tech.name)} tutorial`
            ]
          });
          importedCount++;
          setImportStatus(`Импортировано: ${importedCount}/${roadmap.technologies.length}`);
        } catch (techError) {
          console.error(`Ошибка импорта ${tech.name}:`, techError);
        }
      }

      setImportStatus(`✅ Успешно импортировано ${importedCount} технологий из "${roadmap.name}"`);

    } catch (err) {
      setImportStatus(`❌ Ошибка импорта: ${err.message}`);
      console.error('Ошибка импорта:', err);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="roadmap-importer">
      <h3>📋 Импорт дорожных карт</h3>
      <p className="importer-description">
        Импортируйте готовые дорожные карты для изучения технологий
      </p>

      <div className="roadmaps-grid">
        {exampleRoadmaps.map(roadmap => (
          <div key={roadmap.id} className="roadmap-card">
            <h4>{roadmap.name}</h4>
            <p className="roadmap-tech-count">
              {roadmap.technologies.length} технологий
            </p>
            <ul className="roadmap-tech-list">
              {roadmap.technologies.slice(0, 3).map((tech, index) => (
                <li key={index}>{tech.name}</li>
              ))}
              {roadmap.technologies.length > 3 && (
                <li>... и ещё {roadmap.technologies.length - 3}</li>
              )}
            </ul>
            <button
              onClick={() => handleImportRoadmap(roadmap.id)}
              disabled={importing}
              className={`import-button ${importing ? 'importing' : ''}`}
            >
              {importing ? 'Импорт...' : 'Импортировать'}
            </button>
          </div>
        ))}
      </div>

      {importStatus && (
        <div className={`import-status ${importStatus.includes('❌') ? 'error' : 'success'}`}>
          {importStatus}
        </div>
      )}

      <div className="import-note">
        <small>
          * Импортированные технологии добавляются в ваш локальный список.
          Данные берутся из открытых дорожных карт roadmap.sh
        </small>
      </div>
    </div>
  );
}

export default RoadmapImporter;