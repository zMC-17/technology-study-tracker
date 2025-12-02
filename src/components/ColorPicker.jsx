// src/ColorPicker.jsx
import { useState } from 'react';

// компонент для отображения выбранного цвета
function ColorDisplay({ color }) {
    return (
        <div
            className="color-display"
            style={{
                backgroundColor: color,
                width: '200px',
                height: '100px',
                margin: '10px 0'
            }}
        >
            <p>Выбранный цвет: {color}</p>
        </div>
    );
}

function ColorControls({ color, onColorChange }) {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
    return (
        <div className="color-controls">
            <h3>Выберите цвет:</h3>
            <div className="color-buttons">
                {colors.map((col) => (
                    <button
                        key={col}
                        style={{ backgroundColor: col }}
                        onClick={() => onColorChange(col)}
                        className={color === col ? 'active' : ''}
                    >
                        {col}
                    </button>
                ))}
            </div>
        </div>
    );
}


// родительский компонент - хранит состояние
function ColorPicker() {
    // состояние находится здесь, в родителе
    const [selectedColor, setSelectedColor] = useState('#ff0000');
    return (
        <div className="color-picker">
            <h2>Выбор цвета</h2>
            {/* передаём текущий цвет в ColorDisplay */}
            <ColorDisplay color={selectedColor} />
            {/* передаём и цвет, и функцию для его изменения */}
            <ColorControls
                color={selectedColor}
                onColorChange={setSelectedColor}
            />
        </div>
    );
}

export default ColorPicker;