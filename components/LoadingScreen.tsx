import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="max-w-md mx-auto p-6">
      <Card>
        <CardContent className="pt-6">
          <div className="text-center p-8">
            <div className="w-15 h-15 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-6 animate-pulse">
              <span className="text-white text-2xl font-bold">
                D
              </span>
            </div>
            <h2 className="text-2xl text-gray-600 font-medium">
              Loading Dashboard...
            </h2>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};