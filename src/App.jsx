import useTechnologies from './components/useTechnologies';
import ProgressBar from './components/ProgressBar';
import TechnologyCard from './components/TechnologyCard';
import QuickActions from './components/QuickActions';
import './App.css';

function App() {
    const { technologies, updateStatus, updateNotes, markAllCompleted, resetAllStatuses, progress } = useTechnologies();

    return (
        <div className="app">
            <header className="app-header">
                <h1>Трекер изучения технологий</h1>
                <ProgressBar
                    progress={progress}
                    label="Общий прогресс"
                    color="#4CAF50"
                    animated={true}
                    height={20}
                />
            </header>
            <main className="app-main">
                <QuickActions
                    onMarkAllCompleted={markAllCompleted}
                    onResetAll={resetAllStatuses}
                    technologies={technologies}
                />
                <div className="technologies-grid">
                    {technologies.map(tech => (
                        <TechnologyCard
                            key={tech.id}
                            technology={tech}
                            updateStatus={updateStatus}
                            onNotesChange={updateNotes}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default App;