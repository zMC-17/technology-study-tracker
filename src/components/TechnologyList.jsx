// src/components/TechnologyList.jsx
import './TechnologyList.css';

import TechnologyCard from './TechnologyCard';

function TechnologyList({ technologies }) {
    return (
        <div className="technology-list">
            <h2>Дорожная карта изучения технологий</h2>
            <div className="technologies-container">
                {technologies.map(technology => (
                    <TechnologyCard
                        key={technology.id}
                        title={technology.title}
                        description={technology.description}
                        status={technology.status}
                    />
                ))}
            </div>
        </div>
    );
}

export default TechnologyList;