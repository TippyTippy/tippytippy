  const DayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-[60px_1fr] gap-0 min-h-full">
          {/* Time labels */}
          <div className="border-r border-gray-200">
            {hours.map(hour => (
              <div key={hour} className="h-16 border-b border-gray-100 text-xs text-gray-500 p-2">
                {hour === 0 ? '12 AM' : hour <= 12 ? `${hour} AM` : `${hour - 12} PM`}
              </div>
            ))}
          </div>
          
          {/* Day content */}
          <div className="relative">
            {hours.map(hour => (
              <div key={hour} className="h-16 border-b border-gray-100 hover:bg-gray-50 cursor-pointer relative">
                {/* Sample entries */}
                {hour === 9 && (
                  <div className="absolute top-1 left-1 right-1 bg-blue-100 border-l-4 border-blue-500 p-2 rounded text-sm">
                    Morning reflection
                  </div>
                )}
                {hour === 14 && (
                  <div className="absolute top-1 left-1 right-1 bg-green-100 border-l-4 border-green-500 p-2 rounded text-sm">
                    Lunch thoughts
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };


  export default DayView;