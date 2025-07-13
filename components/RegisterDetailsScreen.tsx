import React, { useState, useEffect } from 'react';
import { Container, Box, Card, CardBody } from '@chakra-ui/react';

export const RegisterDetailsScreen: React.FC<{
  onContinue: (firstName: string, lastName: string) => void;
}> = ({ onContinue }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsLoading(false);
      onContinue(firstName, lastName);
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', textAlign: 'center', color: '#4a5568', marginBottom: '1.5rem' }}>
        Welcome! Let's get you started
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            First Name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: errors.firstName ? '2px solid #e53e3e' : '1px solid #e2e8f0',
              borderRadius: '0.375rem',
              fontSize: '1rem'
            }}
          />
          {errors.firstName && (
            <span style={{ color: '#e53e3e', fontSize: '0.875rem' }}>
              {errors.firstName}
            </span>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Last Name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: errors.lastName ? '2px solid #e53e3e' : '1px solid #e2e8f0',
              borderRadius: '0.375rem',
              fontSize: '1rem'
            }}
          />
          {errors.lastName && (
            <span style={{ color: '#e53e3e', fontSize: '0.875rem' }}>
              {errors.lastName}
            </span>
          )}
        </div>

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
            cursor: isLoading ? 'not-allowed' : 'pointer',
            marginTop: '1rem'
          }}
        >
          {isLoading ? 'Processing...' : 'Continue'}
        </button>
      </div>
    </div>
  );
};