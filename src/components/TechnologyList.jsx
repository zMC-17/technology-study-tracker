// src/components/TechnologyList.jsx
import './TechnologyList.css';
import Filter from './Filter';

import TechnologyCard from './TechnologyCard';


function TechnologyList({ technologies, changeStatus, currentFilter, changeFilter}) {

    const filtredTechs = currentFilter === 'all'
    ? technologies
    : technologies.filter(tech => tech.status === currentFilter);

    return (



        <div className="technology-list">
            <h2>Дорожная карта изучения технологий</h2>
            <Filter currentFilter={currentFilter} changeFilter={changeFilter} />
            <div className="technologies-container">
                {filtredTechs.map(technology => (
                    <TechnologyCard
                        key={technology.id}
                        id = {technology.id}
                        title={technology.title}
                        description={technology.description}
                        status={technology.status}
                        changeStatus={changeStatus}
                    />
                ))}
            </div>
        </div>
    );
}

export default TechnologyList;