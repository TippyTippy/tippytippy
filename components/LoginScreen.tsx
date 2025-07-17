import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

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
    <div className="max-w-md mx-auto p-6">
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <h2 className="text-2xl text-gray-600 mb-4 font-medium">
              Welcome back, {firstName}!
            </h2>
           
            <p className="text-gray-500 mb-8">
              Enter your 4-digit PIN to continue
            </p>

            <div className="flex gap-2 justify-center mb-4">
              {pin.map((digit, index) => (
                <Input
                  key={index}
                  id={`login-pin-${index}`}
                  type="password"
                  value={digit}
                  onChange={(e) => handlePinChange(index, e.target.value)}
                  className={`w-12 h-12 text-center text-2xl ${
                    error ? 'border-red-500 border-2' : ''
                  }`}
                  maxLength={1}
                />
              ))}
            </div>

            {error && (
              <p className="text-red-500 text-sm mb-4">
                {error}
              </p>
            )}

            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};