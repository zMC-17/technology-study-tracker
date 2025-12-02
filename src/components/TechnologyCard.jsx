// src/components/TechnologyCard.jsx
import './styles/TechnologyCard.css';
import TechnologyNotes from './TechnologyNotes';

function TechnologyCard({id, title, description, status, changeStatus, notes, onNotesChange}) {

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
            <TechnologyNotes notes={notes} onNotesChange={onNotesChange} techId={id}/>
        </div>
    )
}

export default TechnologyCard;