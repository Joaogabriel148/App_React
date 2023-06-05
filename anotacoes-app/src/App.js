import React, { useState } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [showImportantOnly, setShowImportantOnly] = useState(false);
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  const addNote = () => {
    if (currentNote.trim() !== '') {
      setNotes([...notes, { text: currentNote, important: false }]);
      setCurrentNote('');
      setShowSavedMessage(true);
      setTimeout(() => {
        setShowSavedMessage(false);
      }, 2000);
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  const toggleImportance = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].important = !updatedNotes[index].important;
    setNotes(updatedNotes);
  };

  const filterNotes = () => {
    setShowImportantOnly(!showImportantOnly);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Minhas Anotações</h1>
        <div>
          <input
            type="text"
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
          />
          <button onClick={addNote}>Adicionar</button>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={showImportantOnly}
              onChange={filterNotes}
            />
            Filtrar por Importância
          </label>
        </div>
        {showSavedMessage && (
          <div className="saved-message">Anotação salva com sucesso!</div>
        )}
        <ul>
          {notes
            .filter((note) => !showImportantOnly || note.important)
            .map((note, index) => (
              <li key={index}>
                <span className={note.important ? 'important' : ''}>
                  {note.text}
                </span>
                <div>
                  <button onClick={() => deleteNote(index)} className="delete-button">
                    Excluir
                  </button>
                  <button onClick={() => toggleImportance(index)}>
                    {note.important ? 'Importante' : 'Normal'}
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;