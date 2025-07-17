import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export const RegisterPinScreen: React.FC<{
  onContinue: (pin: string) => void;
}> = ({ onContinue }) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePinChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);
      setError('');

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`pin-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleSubmit = async () => {
    const pinValue = pin.join('');
    if (pinValue.length !== 4) {
      setError('PIN must be 4 digits');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsLoading(false);
    onContinue(pinValue);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6 text-center">
        <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
          Set up your 4-digit PIN
        </h2>
        
        <p className="text-muted-foreground mb-8">
          Choose a secure 4-digit PIN for your account
        </p>

        <div className="flex gap-2 justify-center mb-4">
          {pin.map((digit, index) => (
            <Input
              key={index}
              id={`pin-${index}`}
              type="password"
              value={digit}
              onChange={(e) => handlePinChange(index, e.target.value)}
              className={`w-12 h-12 text-center text-xl ${
                error ? 'border-destructive' : ''
              }`}
              maxLength={1}
            />
          ))}
        </div>

        {error && (
          <p className="text-destructive text-sm mb-4">
            {error}
          </p>
        )}

        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={isLoading}
          variant="default"
        >
          {isLoading ? 'Processing...' : 'Continue'}
        </Button>
      </CardContent>
    </Card>
  );
};
