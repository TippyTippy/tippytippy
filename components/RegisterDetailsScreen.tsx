import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

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
    <div className="max-w-md mx-auto p-6">
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-2xl text-center text-gray-600 mb-6 font-medium">
            Welcome! Let's get you started
          </h2>
         
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium">
                First Name
              </Label>
              <Input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                className={errors.firstName ? 'border-red-500 border-2' : ''}
              />
              {errors.firstName && (
                <span className="text-red-500 text-sm">
                  {errors.firstName}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium">
                Last Name
              </Label>
              <Input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                className={errors.lastName ? 'border-red-500 border-2' : ''}
              />
              {errors.lastName && (
                <span className="text-red-500 text-sm">
                  {errors.lastName}
                </span>
              )}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full mt-6"
              size="lg"
            >
              {isLoading ? 'Processing...' : 'Continue'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};