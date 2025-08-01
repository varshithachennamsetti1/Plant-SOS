import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { Card } from "@/components/UI/card";
import { Badge } from "@/components/UI/badge";
import { Button } from "@/components/UI/button";
import { Droplets, CheckCircle, AlertTriangle } from "lucide-react";
import { mockPlants } from "@/data/mockPlants";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());

  // Mock watering schedule data
  const wateringSchedule = mockPlants.reduce((schedule, plant) => {
    const dates = [];
    const today = new Date();
    
    // Generate watering dates for the next 30 days
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Simple logic based on watering frequency
      const wateringDays = plant.wateringFrequency.toLowerCase().includes('daily') ? 1 :
                           plant.wateringFrequency.toLowerCase().includes('twice') ? 3 :
                           plant.wateringFrequency.toLowerCase().includes('weekly') ? 7 : 
                           plant.wateringFrequency.toLowerCase().includes('bi-weekly') ? 14 : 5;
      
      if (i % wateringDays === 0) {
        const dateKey = date.toDateString();
        if (!schedule[dateKey]) schedule[dateKey] = [];
        schedule[dateKey].push({
          plantId: plant.id,
          plantName: plant.name,
          isOverdue: false,
          isToday: i === 0,
          wateringType: plant.wateringFrequency
        });
      }
    }
    
    return schedule;
  }, {} as Record<string, Array<{plantId: string, plantName: string, isOverdue: boolean, isToday: boolean, wateringType: string}>>);

  const getTileContent = ({ date, view }: { date: Date, view: string }) => {
    if (view !== 'month') return null;
    
    const dateKey = date.toDateString();
    const daySchedule = wateringSchedule[dateKey];
    
    if (!daySchedule || daySchedule.length === 0) return null;
    
    return (
      <div className="flex justify-center items-center mt-1">
        <div className="w-2 h-2 bg-primary rounded-full"></div>
      </div>
    );
  };

  const getTileClassName = ({ date, view }: { date: Date, view: string }) => {
    if (view !== 'month') return '';
    
    const dateKey = date.toDateString();
    const daySchedule = wateringSchedule[dateKey];
    const today = new Date().toDateString();
    
    let className = 'calendar-tile';
    
    if (daySchedule && daySchedule.length > 0) {
      className += ' has-watering';
    }
    
    if (dateKey === today) {
      className += ' is-today';
    }
    
    return className;
  };

  const selectedDateKey = selectedDate instanceof Date ? selectedDate.toDateString() : new Date().toDateString();
  const selectedDateSchedule = wateringSchedule[selectedDateKey] || [];
  const todaySchedule = wateringSchedule[new Date().toDateString()] || [];

  return (
    <div className="min-h-screen gradient-nature">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Watering Calendar</h1>
            <p className="text-xl text-muted-foreground">
              Keep track of your plant watering schedule and never miss a watering day
            </p>
          </div>

          {/* Today's Tasks */}
          {todaySchedule.length > 0 && (
            <Card className="p-6 gradient-card shadow-soft mb-8 border-l-4 border-l-primary">
              <div className="flex items-center mb-4">
                <Droplets className="h-6 w-6 text-primary mr-2" />
                <h2 className="text-xl font-semibold text-foreground">Today's Watering Tasks</h2>
                <Badge className="ml-2 gradient-primary text-primary-foreground">
                  {todaySchedule.length} plants
                </Badge>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {todaySchedule.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                    <div>
                      <h3 className="font-medium text-foreground">{task.plantName}</h3>
                      <p className="text-sm text-muted-foreground">{task.wateringType}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Done
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <Card className="p-6 gradient-card shadow-soft">
                <h2 className="text-xl font-semibold text-foreground mb-4">Watering Schedule</h2>
                <div className="calendar-container">
                  <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    tileContent={getTileContent}
                    tileClassName={getTileClassName}
                    className="custom-calendar"
                  />
                </div>
                
                <div className="mt-6 flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Watering scheduled</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                    <span className="text-muted-foreground">Overdue</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Selected Date Details */}
            <div className="space-y-6">
              <Card className="p-6 gradient-card shadow-soft">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {selectedDate instanceof Date ? selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) : 'Selected Date'}
                </h3>

                {selectedDateSchedule.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDateSchedule.map((task, index) => (
                      <div key={index} className="p-3 bg-accent/20 rounded-lg border border-border/50">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-foreground">{task.plantName}</h4>
                            <p className="text-sm text-muted-foreground">{task.wateringType}</p>
                          </div>
                          <Droplets className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">🌱</div>
                    <p className="text-muted-foreground">No watering scheduled for this day</p>
                  </div>
                )}
              </Card>

              {/* Quick Stats */}
              <Card className="p-6 gradient-card shadow-soft">
                <h3 className="text-lg font-semibold text-foreground mb-4">This Week</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Plants to water</span>
                    <Badge variant="outline">
                      {Object.values(wateringSchedule).flat().length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Overdue tasks</span>
                    <Badge variant="destructive">0</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Completed today</span>
                    <Badge className="gradient-primary text-primary-foreground">0</Badge>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6 gradient-card shadow-soft">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Droplets className="h-4 w-4 mr-2" />
                    Log manual watering
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Report plant issue
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      <style>{`
        .custom-calendar {
          width: 100%;
          background: transparent;
          border: none;
          font-family: inherit;
        }
        
        .custom-calendar .react-calendar__tile {
          background: transparent;
          border: 1px solid hsl(var(--border));
          border-radius: 0.5rem;
          margin: 2px;
          padding: 0.75rem 0.5rem;
          transition: all 0.2s;
        }
        
        .custom-calendar .react-calendar__tile:hover {
          background: hsl(var(--accent));
        }
        
        .custom-calendar .react-calendar__tile--active {
          background: hsl(var(--primary)) !important;
          color: hsl(var(--primary-foreground)) !important;
        }
        
        .custom-calendar .react-calendar__tile.has-watering {
          border-color: hsl(var(--primary));
          background: hsl(var(--primary) / 0.1);
        }
        
        .custom-calendar .react-calendar__tile.is-today {
          border-color: hsl(var(--primary));
          border-width: 2px;
        }
        
        .custom-calendar .react-calendar__navigation button {
          background: transparent;
          border: none;
          color: hsl(var(--foreground));
          font-size: 1rem;
          font-weight: 500;
          padding: 0.5rem;
          border-radius: 0.5rem;
        }
        
        .custom-calendar .react-calendar__navigation button:hover {
          background: hsl(var(--accent));
        }
        
        .custom-calendar .react-calendar__month-view__weekdays {
          color: hsl(var(--muted-foreground));
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default CalendarView;