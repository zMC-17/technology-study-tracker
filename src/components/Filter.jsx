// .src/components/Filter.jsx

import './Filter.css'

function Filter ({currentFilter, changeFilter}) {

    const onFilterChange = (filter) => {
        changeFilter(filter)
    }

    const getNameFromFilter = (currentFilter) => {
        switch (currentFilter) {
            case 'all':
                return 'Все'
            case 'completed':
                return 'Завершённые'
            case 'in-progress':
                return 'В процессе'
            case 'not-started':
                return 'Не начатые'
        }
    }

    const filterName = getNameFromFilter(currentFilter)

    return (
        <div className='FilterContainer'>
            <h3>Фильтрация</h3>
            <p>Текущий фильтр: {filterName}</p>
            <button className="filterButton" onClick={() => onFilterChange('all')}>Все</button>
            <button className="filterButton" onClick={() => onFilterChange('completed')}>Завершены</button>
            <button className="filterButton" onClick={() => onFilterChange('in-progress')}>В процессе</button>
            <button className="filterButton" onClick={() => onFilterChange('not-started')}>Не начаты</button>
        </div>
    )
}

export default Filter