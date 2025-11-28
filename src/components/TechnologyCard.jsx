// src/components/TechnologyCard.jsx
import './TechnologyCard.css';

function TechnologyCard({title, description, status}) {

    function getStatusText (status) {
        switch (status) {
            case 'completed':
                return 'Завершено'
            case 'in-progress':
                return 'В процессе'
            case 'not-started':
                return 'Не начато'
        }
    };

    function getStatusIcon (status) {
    switch (status) {
      case 'completed':
        return '✓';
      case 'in-progress':
        return '⟳';
      case 'not-started':
        return '!';
      default:
        return '?';
    }
  };

    return (
        <div className='technologyCard' data-status={status}>
            <h1>{title}</h1>
            <p>{description}</p>
            <div className='statusIndicator'>
                <span className="statusIcon">{getStatusIcon(status)}</span>
                {getStatusText(status)}
            </div>
        </div>
    )
}

export default TechnologyCard;