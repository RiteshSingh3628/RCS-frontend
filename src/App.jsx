import React from 'react';
import AppRoutes from './routes/AppRoutes';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { CompanyProvider } from './context/CompanyContext';

export default function App() {
  return (
    <AuthProvider>
      <CompanyProvider>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
      </CompanyProvider>
    </AuthProvider>
  );
}
