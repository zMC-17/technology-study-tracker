// src/components/ProgressHeader.jsx

import './ProgressHeader.css'

function ProgressHeader({ technologies }) {



    const totalAmount = technologies.length;
    const studiedAmount = technologies.filter(tech => tech.status === 'completed').length;

    const studiedPercent = totalAmount > 0 ? Math.round((studiedAmount / totalAmount) * 100) : 0;

    const getProgressBarColor = () => {
        if (studiedPercent < 50) return 'red';
        if (studiedPercent <= 75) return 'yellow';
        return 'green';
    };

    const progressBarValue = getProgressBarColor();



    return (
        <div className="progressHeader">
            <h1>Общий прогресс</h1>
            <p>Всего техноллогий: {totalAmount}</p>
            <p>Кол-во изученных технологий: {studiedAmount}</p>
            <div className="progress-bar-container">
                <div
                    className="progress-bar"
                    data-color={progressBarValue}
                    style={{ width: `${studiedPercent}%` }}
                >
                    <span className="progress-text">{studiedPercent}%</span>
                </div>
            </div>
        </div>


    )
}

export default ProgressHeader;