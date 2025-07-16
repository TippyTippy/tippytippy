import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

import DayView from '@/components/calendar/DayView';
import WeekView from '@/components/calendar/WeekView';
import MonthView from '@/components/calendar/MonthView';
import Header from '@/components/partials/Header';

const JournalDashboard = () => {
  const [currentView, setCurrentView] = useState('day');
  const [currentDate, setCurrentDate] = useState(new Date());
  

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatMonthYear = (date : Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const navigateDate = (direction: number) => {
    const newDate = new Date(currentDate);
    
    if (currentView === 'day') {
      newDate.setDate(newDate.getDate() + direction);
    } else if (currentView === 'week') {
      newDate.setDate(newDate.getDate() + (direction * 7));
    } else if (currentView === 'month') {
      newDate.setMonth(newDate.getMonth() + direction);
    }
    
    setCurrentDate(newDate);
  };





 

  const renderCurrentView = () => {
    switch (currentView) {
      case 'day':
        return <DayView />;
      case 'week':
        return <WeekView />;
      case 'month':
        return <MonthView />;
      default:
        return <DayView />;
    }
  };


  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Topbar */}
      <Header />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Calendar controls */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={() => navigateDate(-1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => navigateDate(1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="text-lg font-semibold">
              {currentView === 'month' ? formatMonthYear(currentDate) : formatDate(currentDate)}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={currentView === 'day' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentView('day')}
              >
                Day
              </Button>
              <Button
                variant={currentView === 'week' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentView('week')}
              >
                Week
              </Button>
              <Button
                variant={currentView === 'month' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentView('month')}
              >
                Month
              </Button>
            </div>
            
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Entry
            </Button>
          </div>
        </div>

        {/* Calendar view */}
        <div className="flex-1 overflow-hidden">
          {renderCurrentView()}
        </div>
      </div>
    </div>
  );
};

export default JournalDashboard;