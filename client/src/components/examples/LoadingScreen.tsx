import { useState } from 'react';
import LoadingScreen from '../LoadingScreen';

export default function LoadingScreenExample() {
  const [show, setShow] = useState(true);

  if (!show) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
        <button 
          onClick={() => setShow(true)}
          className="px-4 py-2 bg-white text-black rounded-md"
        >
          Restart Loading
        </button>
      </div>
    );
  }

  return <LoadingScreen onComplete={() => setShow(false)} />;
}
