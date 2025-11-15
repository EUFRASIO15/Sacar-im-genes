
import React, { useState, useCallback } from 'react';
import { SearchInput } from './components/SearchInput';
import { ResultDisplay } from './components/ResultDisplay';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchedWord, setSearchedWord] = useState<string>('');
  const [isInitialState, setIsInitialState] = useState<boolean>(true);

  const handleSearch = useCallback(() => {
    if (!searchTerm.trim()) {
      return;
    }

    setIsInitialState(false);
    const wordToSearch = searchTerm.trim();
    setSearchedWord(wordToSearch);

    const encodedWord = encodeURIComponent(wordToSearch);
    const url = `https://fundacioncnse-dilse.org/?buscar=${encodedWord}`;
    
    // Abrir la URL directamente en una nueva pestaña
    window.open(url, '_blank', 'noopener,noreferrer');
    
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 mb-2">
            Asistente de Búsqueda DILSE
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Encuentra la página en lengua de signos para cualquier palabra del diccionario DILSE.
          </p>
        </header>

        <main className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8">
          <SearchInput
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
          />
          <div className="mt-8 min-h-[200px] flex items-center justify-center">
            <ResultDisplay
              isInitialState={isInitialState}
              searchedWord={searchedWord}
            />
          </div>
        </main>

        <footer className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>
            Búsquedas realizadas en{' '}
            <a
              href="https://fundacioncnse-dilse.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              DILSE
            </a>
            . Este es un proyecto independiente.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
