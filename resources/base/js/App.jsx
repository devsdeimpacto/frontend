// React
import React from 'react';
import { createRoot } from 'react-dom/client';

// Routes
import Routes from '@/Routes';

// Theme
import ThemeProvider from '@/views/appearances/themes';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
    <ThemeProvider>
        <Routes />
    </ThemeProvider>
);