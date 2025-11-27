// src/UserCard.jsx

function UserCard({ name, role, avatarUrl, isOnline }) {
    return (
        <div className="user-card">

            {/* Секция с аватаром */}
            <div className="avatar-section">
                <img src={avatarUrl} alt={`Аватар ${name}`} />
                <p>Статус: {isOnline ? 'online' : 'ofline'}</p>
            </div>

            {/* Секция с информацией о пользователе */}
            <div className="user-info">
                <h3>{name}</h3>
                <p>{role}</p>
            </div>

        </div>
    );
}
export default UserCard;