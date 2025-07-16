import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserData } from '@/shared/types';

const DashboardScreen: React.FC<{
  userData: UserData | null;
  onLogout: () => void;
}> = ({ userData, onLogout }) => {
  return (
    <div className="max-w-md mx-auto p-6">
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <h2 className="text-3xl text-gray-600 mb-4 font-medium">
              Dashboard
            </h2>
           
            <p className="text-lg text-gray-500 mb-8">
              Hello, {userData?.firstName} {userData?.lastName}!
            </p>

            <div className="border border-gray-200 rounded-md p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">
                Welcome to your dashboard
              </h3>
              <p className="text-gray-500 text-center leading-relaxed">
                This is where your main dashboard content would go. You can add widgets, charts, and other components here.
              </p>
              {userData?.lastLogin && (
                <p className="text-gray-400 text-sm mt-4">
                  Last login: {userData.lastLogin.toLocaleString()}
                </p>
              )}
            </div>

            <Button
              onClick={onLogout}
              variant="outline"
              className="w-full text-red-600 border-red-600 hover:bg-red-50"
            >
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardScreen;