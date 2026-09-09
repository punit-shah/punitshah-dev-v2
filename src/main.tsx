import { initBotId } from 'botid/client/core';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

initBotId({
  protect: [{ path: '/api/contact', method: 'POST' }],
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
