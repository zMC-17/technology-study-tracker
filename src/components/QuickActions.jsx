// src/components/QuickActions.jsx
import './QuickActions.css'


function QuickActions ({MakeAllCompleted, ResetAllStatuses, ChoiceRandTech}) {

    const onMakeAllCompleted = () => {
        MakeAllCompleted()
    }
    const onResetAllStatuses = () => {
        ResetAllStatuses()
    }
    const onChoiceRandTech = () => {
        ChoiceRandTech()
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