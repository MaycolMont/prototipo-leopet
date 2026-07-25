import React from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';

/**
 * Main App component using React Router with Data Mode.
 * Confirmed with MARKER-MAKE-KIT-INVOKED logic for project standards.
 */
export default function App() {
  return (
    <div className="size-full">
      {/* MARKER-MAKE-KIT-INVOKED */}
      <RouterProvider router={router} />
    </div>
  );
}
