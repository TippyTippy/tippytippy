import React, { useState } from 'react'; 
 
 const MonthView = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const today = new Date();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return (
      <div className="flex-1 p-4">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-medium text-sm text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            const isCurrentMonth = day.getMonth() === currentDate.getMonth();
            const isToday = day.toDateString() === today.toDateString();
            
            return (
              <div
                key={index}
                className={`
                  min-h-24 p-2 border rounded-lg cursor-pointer hover:bg-gray-50
                  ${isCurrentMonth ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100 text-gray-400'}
                  ${isToday ? 'ring-2 ring-blue-500' : ''}
                `}
              >
                <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : ''}`}>
                  {day.getDate()}
                </div>
                
                {/* Sample entries */}
                {day.getDate() === 15 && isCurrentMonth && (
                  <div className="mt-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Morning thoughts
                  </div>
                )}
                {day.getDate() === 23 && isCurrentMonth && (
                  <div className="mt-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Gratitude list
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  export default MonthView;