// src/App.jsx
import './App.css';
import TechnologyList from './components/TechnologyList';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import WindowResizeTracker from './components/WindowResizeTracker';
import UserProfile from './components/UserProfile';
import ContactForm from './components/ContactForm';
import { useState, useEffect, useRef } from 'react';

function App() {
    // ===== СОСТОЯНИЯ ======
    const [technologies, setTechnologies] = useState([
        {
            id: 1,
            title: 'React Components',
            description: 'Изучение базовых компонентов',
            status: 'not-started',
            notes: ''
        },
        {
            id: 2,
            title: 'JSX Syntax',
            description: 'Освоение синтаксиса JSX',
            status: 'not-started',
            notes: ''
        }
    ]);

    const [filter, setFilter] = useState('all'); // 'all', 'not-started', 'in-progress', 'completed'

    const [searchQuery, setSearchQuery] = useState('');
    // ===== ДОПОЛНИТЕЛЬНЫЕ СОСТОЯНИЯ =====
    const [isInitialLoad, setIsInitialLoad] = useState(true); // Флаг первой загрузки
    const hasLoadedFromStorage = useRef(false); // Ref для отслеживания загрузки

    // ===== Эффекты =====

    useEffect(() => {
        // Не сохраняем при первой загрузке из localStorage
        if (isInitialLoad) {
            console.log('⏸️ Пропускаем сохранение при начальной загрузке');
            return;
        }

        localStorage.setItem('techTrackerData', JSON.stringify(technologies));
    }, [technologies, isInitialLoad]);

    useEffect(() => {
        console.log('🔍 Пытаемся загрузить из localStorage...');
        const saved = localStorage.getItem('techTrackerData');

        if (saved) {
            try {
                const parsedData = JSON.parse(saved);
                console.log('📂 Данные загружены из localStorage:', parsedData);
                setTechnologies(parsedData);
                hasLoadedFromStorage.current = true;
            } catch (error) {
                console.error('❌ Ошибка парсинга данных:', error);
            }
        } else {
            console.log('🆕 Нет сохраненных данных, используем начальные');
        }

        // После загрузки снимаем флаг начальной загрузки
        setIsInitialLoad(false);
    }, []);

    // ===== ФУНКЦИИ =====

    const filteredTechnologies = technologies.filter(tech =>
        tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const updateTechnologyNotes = (techId, newNotes) => {
        setTechnologies(prevTech =>
            prevTech.map(tech =>
                tech.id === techId ? { ...tech, notes: newNotes } : tech
            )
        );
    };

    const changeFilter = (filter) => {
        setFilter(filter);
    };

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
            prev.map(tech => ({ ...tech, status: 'completed' }))
        );
    };

    const resetAllStatuses = () => {
        setTechnologies(prev =>
            prev.map(tech => ({ ...tech, status: 'not-started' }))
        );
    };

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

    // ===== JSX вывод =====
    return (
        <div className="App">

            <ContactForm />
            <UserProfile />
            <WindowResizeTracker />
            <ProgressHeader technologies={technologies} />
            <TechnologyList
                technologies={technologies}
                changeStatus={changeStatus}
                currentFilter={filter}
                changeFilter={changeFilter}
                updateTechnologyNotes={updateTechnologyNotes}
            />

            <div className="search-box">
                <input
                    type="text"
                    placeholder="Поиск технологий..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span>Найдено: {filteredTechnologies.length}</span>
            </div>

            <QuickActions
                makeAllCompleted={makeAllCompleted}
                resetAllStatuses={resetAllStatuses}
                choiceRandTech={choiceRandTech}
            />
        </div>
    );
}

export default App;