import React, { useState, useEffect } from 'react';
import { Container, Box, Card, CardBody } from '@chakra-ui/react';

export const LoadingScreen: React.FC = () => {
  return (
    <div>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#3182ce',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          animation: 'pulse 2s infinite'
        }}>
          <span style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
            D
          </span>
        </div>
        <h2 style={{ fontSize: '1.5rem', color: '#4a5568', margin: 0 }}>
          Loading Dashboard...
        </h2>
      </div>
    </div>
  );
};