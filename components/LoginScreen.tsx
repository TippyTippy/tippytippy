import React, { useState, useEffect } from 'react';
import { Container, Box, Card, CardBody } from '@chakra-ui/react';

export const LoginScreen: React.FC<{
  firstName: string;
  onLogin: (pin: string) => Promise<void>;
}> = ({ firstName, onLogin }) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePinChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);
      setError('');

      if (value && index < 3) {
        const nextInput = document.getElementById(`login-pin-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleSubmit = async () => {
    const pinValue = pin.join('');
    if (pinValue.length !== 4) {
      setError('Please enter 4-digit PIN');
      return;
    }

    setIsLoading(true);
    try {
      await onLogin(pinValue);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Invalid PIN');
      setPin(['', '', '', '']);
    }
    setIsLoading(false);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '1.5rem', color: '#4a5568', marginBottom: '1rem' }}>
        Welcome back, {firstName}!
      </h2>
      
      <p style={{ color: '#718096', marginBottom: '2rem' }}>
        Enter your 4-digit PIN to continue
      </p>

      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1rem' }}>
        {pin.map((digit, index) => (
          <input
            key={index}
            id={`login-pin-${index}`}
            type="number"
            value={digit}
            onChange={(e) => handlePinChange(index, e.target.value)}
            style={{
              width: '3rem',
              height: '3rem',
              textAlign: 'center',
              fontSize: '1.5rem',
              border: error ? '2px solid #e53e3e' : '1px solid #e2e8f0',
              borderRadius: '0.375rem'
            }}
            maxLength={1}
          />
        ))}
      </div>

      {error && (
        <p style={{ color: '#e53e3e', fontSize: '0.875rem', marginBottom: '1rem' }}>
          {error}
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: isLoading ? '#a0aec0' : '#3182ce',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          fontSize: '1rem',
          cursor: isLoading ? 'not-allowed' : 'pointer'
        }}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
};