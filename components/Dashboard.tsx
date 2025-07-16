import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LoadingScreen } from '@/components/LoadingScreen';
import { RegisterDetailsScreen } from '@/components/RegisterDetailsScreen';
import { RegisterPinScreen } from '@/components/RegisterPinScreen';
import { ConfirmPinScreen } from '@/components/ConfirmPinScreen';
import { LoginScreen } from '@/components/LoginScreen';
import DashboardScreen from '@/components/DashboardScreen';
import { DatabaseService } from '@/services/DatabaseService';
import { AuthService } from '@/services/AuthService';
import { UserData, AuthData } from '@/shared/types';

export type Screen = 'loading' | 'register-details' | 'register-pin' | 'confirm-pin' | 'login' | 'dashboard';

const Dashboard: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('loading');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [tempUserData, setTempUserData] = useState<{ firstName: string; lastName: string; pin: string }>({
    firstName: '',
    lastName: '',
    pin: ''
  });

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize database
        await DatabaseService.initialize();
        
        // Check if user exists
        const user = await DatabaseService.getCurrentUser();
        if (user) {
          setUserData(user);
          setCurrentScreen('login');
        } else {
          setCurrentScreen('register-details');
        }
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setCurrentScreen('register-details');
      }
    };

    // Simulate loading delay
    setTimeout(initializeApp, 1500);
  }, []);

  const handleRegisterDetails = (firstName: string, lastName: string) => {
    setTempUserData(prev => ({ ...prev, firstName, lastName }));
    setCurrentScreen('register-pin');
  };

  const handleRegisterPin = (pin: string) => {
    setTempUserData(prev => ({ ...prev, pin }));
    setCurrentScreen('confirm-pin');
  };

  const handleConfirmPin = async (confirmedPin: string) => {
    if (confirmedPin === tempUserData.pin) {
      try {
        const userId = `user_${Date.now()}`;
        const { hash, salt } = await AuthService.hashPin(tempUserData.pin);
        
        const newUser: UserData = {
          id: userId,
          firstName: tempUserData.firstName,
          lastName: tempUserData.lastName,
          createdAt: new Date(),
          lastLogin: new Date()
        };

        const authData: AuthData = {
          userId,
          pinHash: hash,
          salt
        };

        await DatabaseService.saveUser(newUser);
        await DatabaseService.saveAuth(authData);
        
        setUserData(newUser);
        setCurrentScreen('dashboard');
        
        // Clear temp data
        setTempUserData({ firstName: '', lastName: '', pin: '' });
      } catch (error) {
        console.error('Failed to save user:', error);
        throw error;
      }
    } else {
      throw new Error('PINs do not match');
    }
  };

  const handleLogin = async (pin: string) => {
    if (!userData) return;

    try {
      const authData = await DatabaseService.getAuth(userData.id);
      if (!authData) {
        throw new Error('Authentication data not found');
      }

      const isValid = await AuthService.verifyPin(pin, authData.pinHash, authData.salt);
      if (isValid) {
        // Update last login
        const updatedUser = { ...userData, lastLogin: new Date() };
        await DatabaseService.saveUser(updatedUser);
        setUserData(updatedUser);
        setCurrentScreen('dashboard');
      } else {
        throw new Error('Invalid PIN');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await DatabaseService.clearCurrentUser();
      setUserData(null);
      setTempUserData({ firstName: '', lastName: '', pin: '' });
      setCurrentScreen('register-details');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'loading':
        return <LoadingScreen />;
      
      case 'register-details':
        return (
          <RegisterDetailsScreen
            onContinue={handleRegisterDetails}
          />
        );
      
      case 'register-pin':
        return (
          <RegisterPinScreen
            onContinue={handleRegisterPin}
          />
        );
      
      case 'confirm-pin':
        return (
          <ConfirmPinScreen
            onConfirm={handleConfirmPin}
          />
        );
      
      case 'login':
        return (
          <LoginScreen
            firstName={userData?.firstName || ''}
            onLogin={handleLogin}
          />
        );
      
      case 'dashboard':
        return (
          <DashboardScreen
            userData={userData}
            onLogout={handleLogout}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
            {renderScreen()}
      </div>
    </div>
  );
};

export default Dashboard;