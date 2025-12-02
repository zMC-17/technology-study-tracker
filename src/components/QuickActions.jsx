// src/components/QuickActions.jsx
import './styles/QuickActions.css'


function QuickActions ({makeAllCompleted, resetAllStatuses, choiceRandTech}) {

    const onMakeAllCompleted = () => {
        makeAllCompleted()
    }
    const onResetAllStatuses = () => {
        resetAllStatuses()
    }
    const onChoiceRandTech = () => {
        choiceRandTech()
    }


    return (
        <div className="quickActionsContainer">
            <button className="quickActionButton" type="button" onClick={onMakeAllCompleted} >Отметить все как выполненные</button>
            <button className="quickActionButton" type="button" onClick={onResetAllStatuses}>Сбросить все статусы</button>
            <button className="quickActionButton" type="button" onClick={onChoiceRandTech}>Случайный выбор следующей технологии</button>
        </div>
    )
}

export default QuickActions