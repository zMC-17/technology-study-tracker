// src/components/TechnologyCard.jsx
import './TechnologyCard.css';

function TechnologyCard({id, title, description, status, changeStatus}) {

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

  const handleStatusChange = () => {
    changeStatus(id);
  }

    return (
        <div className='technologyCard' data-status={status}>
            <h1>{title}</h1>
            <p>{description}</p>
            <div className='statusIndicator' onClick={handleStatusChange}>
                <span className="statusIcon">{getStatusIcon(status)}</span>
                {getStatusText(status)}
            </div>
        </div>
    )
}

export default TechnologyCard;