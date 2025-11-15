
import React from 'react';

interface ResultDisplayProps {
  isInitialState: boolean;
  searchedWord: string;
}

const InitialState: React.FC = () => (
  <div className="text-center text-gray-500 dark:text-gray-400">
    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <h3 className="mt-2 text-lg font-medium">Listo para buscar</h3>
    <p className="mt-1 text-sm">Introduce una palabra y pulsa "Buscar". La página de DILSE se abrirá automáticamente.</p>
  </div>
);

const SearchOpenedState: React.FC<{ searchedWord: string }> = ({ searchedWord }) => (
    <div className="text-center p-6 bg-green-50 dark:bg-gray-700/50 rounded-lg shadow-md w-full max-w-md animate-fade-in">
       <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-green-500 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
       <h3 className="mt-4 text-xl font-bold text-gray-800 dark:text-gray-100">
           Búsqueda Abierta
       </h3>
       <p className="mt-2 text-gray-600 dark:text-gray-300">
           La página de resultados para "<span className="font-semibold text-gray-700 dark:text-gray-200">{searchedWord}</span>" se ha abierto en una nueva pestaña.
       </p>
    </div>
);


export const ResultDisplay: React.FC<ResultDisplayProps> = ({ isInitialState, searchedWord }) => {
  
  if (isInitialState) {
    return <InitialState />;
  }

  return <SearchOpenedState searchedWord={searchedWord} />;
};

// Simple fade-in animation
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fade-in {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  .animate-fade-in {
    animation: fade-in 0.3s ease-out forwards;
  }
`;
document.head.appendChild(style);
