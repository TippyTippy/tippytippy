import React, { useState, useEffect } from 'react';
import { Container, Box, Card, CardBody } from '@chakra-ui/react';
import { UserData } from '@/shared/types';

export const DashboardScreen: React.FC<{
  userData: UserData | null;
  onLogout: () => void;
}> = ({ userData, onLogout }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '1.75rem', color: '#4a5568', marginBottom: '1rem' }}>
        Dashboard
      </h2>
      
      <p style={{ fontSize: '1.125rem', color: '#718096', marginBottom: '2rem' }}>
        Hello, {userData?.firstName} {userData?.lastName}!
      </p>

      <div style={{
        border: '1px solid #e2e8f0',
        borderRadius: '0.375rem',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
          Welcome to your dashboard
        </h3>
        <p style={{ color: '#718096', textAlign: 'center', lineHeight: '1.5' }}>
          This is where your main dashboard content would go. You can add widgets, charts, and other components here.
        </p>
        {userData?.lastLogin && (
          <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '1rem' }}>
            Last login: {userData.lastLogin.toLocaleString()}
          </p>
        )}
      </div>

      <button
        onClick={onLogout}
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: 'transparent',
          color: '#e53e3e',
          border: '1px solid #e53e3e',
          borderRadius: '0.375rem',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>
    </div>
  );
};