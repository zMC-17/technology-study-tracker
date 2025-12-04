import useLocalStorage from './useLocalStorage';
// Начальные данные для технологий
const initialTechnologies = [
    {
        id: 1,
        title: 'React Components',
        description: 'Изучение базовых компонентов',
        status: 'not-started',
        notes: '',
        category: 'frontend'
    },
    {
        id: 2,
        title: 'Node.js Basics',
        description: 'Основы серверного JavaScript',
        status: 'not-started',
        notes: '',
        category: 'backend'
    },
    {
        id: 3,
        title: 'React hooks',
        description: 'Основные хуки для работы с React',
        status: 'in-progress',
        notes: '',
        category: 'backend'
    }
];


function useTechnologies() {
    const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies)

    const updateStatus = (techId, newStatus) => {
        setTechnologies(prev =>
            prev.map(tech =>
                tech.id === techId ? { ...tech, status: newStatus } : tech
            )
        )
    }

    const updateNotes = (techId, newNotes) => {
        setTechnologies(prev =>
            prev.map(tech =>
                tech.id === techId ? { ...tech, notes: newNotes } : tech
            )
        );
    };

    const markAllCompleted = () => {
        setTechnologies(prev =>
            prev.map(tech => ({ ...tech, status: 'completed' }))
        );
    };

    const resetAllStatuses = () => {
        setTechnologies(prev =>
            prev.map(tech => ({ ...tech, status: 'not-started' }))
        );
    };

    // Функция для расчета общего прогресса
    const calculateProgress = () => {
        if (technologies.length === 0) return 0;
        const completed = technologies.filter(tech => tech.status ===
            'completed').length;
        return Math.round((completed / technologies.length) * 100);
    };

    return {
        technologies,
        updateStatus,
        updateNotes,
        markAllCompleted,
        resetAllStatuses,
        progress: calculateProgress()
    };

}

export default useTechnologies