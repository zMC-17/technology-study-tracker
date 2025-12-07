import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import Navigation from './components/Navigation';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import './App.css';

function App() {
    // У вас нет авторизации, поэтому убираем все связанные с ней состояния

    return (
        <Router>
            <div className="app">
                {/* Используем ваш Navigation компонент вместо кастомной навигации */}
                <Navigation />

                <main className="main-content">
                    <Routes>
                        {/* Основные маршруты */}
                        <Route path="/" element={<Home />} />
                        <Route path="/technologies" element={<TechnologyList />} />
                        <Route path="/technology/:techId" element={<TechnologyDetail />} />
                        <Route path="/add-technology" element={<AddTechnology />} />
                        <Route path="/statistics" element={<Statistics />} />
                        <Route path='/settings' element={<Settings />} />
                        <Route path="*" element={
                            <div className="page">
                                <h1>Страница не найдена</h1>
                                <p>Запрошенная страница не существует.</p>
                            </div>
                        } />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;