// src/App.jsx
import './App.css';
import TechnologyList from './components/TechnologyList';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import Filter from './components/Filter';
import { useState } from 'react';

function App() {

    // ===== СОСТОЯНИЯ ======
    const [technologies, setTechnologies] = useState([
        {
            id: 1,
            title: 'React Components',
            description: 'Изучение базовых компонентов',
            status: 'not-started'
        },
        {
            id: 2,
            title: 'JSX Syntax',
            description: 'Освоение синтаксиса JSX',
            status: 'not-started'
        }
    ]);

    const [filter, setFilter] = useState('all') // 'all', 'not-started', 'in-progress', 'completed'


    // ===== ФУНКЦИИ =====
    const changeFilter = (filter) => {
        setFilter(filter)
    }

    const changeStatus = (id) => {
        const statusFlow = {
            'not-started': 'in-progress',
            'in-progress': 'completed',
            'completed': 'not-started'
        };

        setTechnologies(prevTechnologies =>
            prevTechnologies.map(tech =>
                tech.id === id
                    ? { ...tech, status: statusFlow[tech.status] }
                    : tech
            )
        );
    };

    const makeAllCompleted = () => {
        setTechnologies(prev =>
            prev.map(
                tech => ({ ...tech, status: 'completed' })
            ))
    }

    const resetAllStatuses = () => {
        setTechnologies(prev =>
            prev.map(
                tech => ({ ...tech, status: 'not-started' })
            ))
    }

    const choiceRandTech = () => {
        setTechnologies(prev => {
            const notStartedTechs = prev.filter(tech => tech.status === 'not-started');

            if (notStartedTechs.length === 0) {
                alert('🎉 Все задачи уже начаты или завершены!');
                return prev;
            }


            const randomIndex = Math.floor(Math.random() * notStartedTechs.length);
            const selectedTask = notStartedTechs[randomIndex];

            return prev.map(tech =>
                tech.id === selectedTask.id
                    ? { ...tech, status: 'in-progress' }
                    : tech
            );
        });
    };

    return (
        <div className="App">
            <ProgressHeader technologies={technologies} />
            <TechnologyList technologies={technologies} changeStatus={changeStatus} currentFilter={filter} changeFilter={changeFilter}/>

            <QuickActions makeAllCompleted={makeAllCompleted} resetAllStatuses={resetAllStatuses} choiceRandTech={choiceRandTech} />
        </div>
    );
}

export default App;