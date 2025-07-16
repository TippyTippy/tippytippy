  const WeekView = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-[60px_repeat(7,1fr)] gap-0 min-h-full">
          {/* Time labels */}
          <div className="border-r border-gray-200">
            <div className="h-12 border-b border-gray-200"></div>
            {hours.map(hour => (
              <div key={hour} className="h-16 border-b border-gray-100 text-xs text-gray-500 p-2">
                {hour === 0 ? '12 AM' : hour <= 12 ? `${hour} AM` : `${hour - 12} PM`}
              </div>
            ))}
          </div>
          
          {/* Day headers */}
          {days.map((day, index) => (
            <div key={day} className="border-r border-gray-200">
              <div className="h-12 border-b border-gray-200 flex items-center justify-center font-medium text-sm">
                {day}
              </div>
              {hours.map(hour => (
                <div key={hour} className="h-16 border-b border-gray-100 hover:bg-gray-50 cursor-pointer relative">
                  {/* Sample entries */}
                  {index === 1 && hour === 9 && (
                    <div className="absolute top-1 left-1 right-1 bg-blue-100 border-l-4 border-blue-500 p-1 rounded text-xs">
                      Morning note
                    </div>
                  )}
                  {index === 3 && hour === 15 && (
                    <div className="absolute top-1 left-1 right-1 bg-purple-100 border-l-4 border-purple-500 p-1 rounded text-xs">
                      Reflection
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default WeekView;