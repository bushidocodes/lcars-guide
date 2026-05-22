import { createHashRouter, RouterProvider, redirect } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppContainer from './components/AppContainer';
import Episodes from './components/Episodes';
import './style/lcars.css';

const queryClient = new QueryClient();

const router = createHashRouter([
  {
    path: '/',
    element: <AppContainer />,
    children: [
      { index: true, loader: () => redirect('/seasons/4') },
      { path: 'seasons/:seasonId', element: <Episodes /> },
    ],
  },
]);

const root = createRoot(document.getElementById('main')!);
root.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
