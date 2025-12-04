import './styles/TechnologyCard.css';
import TechnologyNotes from './TechnologyNotes';

function TechnologyCard({ technology, updateStatus, onNotesChange }) {
  const { id, title, description, status, notes } = technology;

  function getStatusText(status) {
    switch (status) {
      case 'completed':
        return 'Завершено';
      case 'in-progress':
        return 'В процессе';
      case 'not-started':
        return 'Не начато';
      default:
        return 'Неизвестно';
    }
  }

  function getStatusIcon(status) {
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
  }

  const handleStatusChange = () => {
    let newStatus;
    switch (status) {
      case 'not-started':
        newStatus = 'in-progress';
        break;
      case 'in-progress':
        newStatus = 'completed';
        break;
      case 'completed':
        newStatus = 'not-started';
        break;
      default:
        newStatus = 'not-started';
    }

    updateStatus(id, newStatus);
  }

  return (
    <div className='technologyCard' data-status={status}>
      <h1>{title}</h1>
      <p>{description}</p>
      <div className='statusIndicator' onClick={handleStatusChange}>
        <span className="statusIcon">{getStatusIcon(status)}</span>
        {getStatusText(status)}
      </div>
      <TechnologyNotes notes={notes} onNotesChange={onNotesChange} techId={id} />
    </div>
  );
}

export default TechnologyCard;