
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Heart, 
  Thermometer, 
  User,
  MapPin,
  Wifi,
  LogOut,
  Settings,
  Ruler,
  Weight,
  Droplets,
  Search,
  Bell,
  Activity,
  Calendar,
  Clock
} from "lucide-react";
import PersonCard from "../components/PersonCard";
import VitalChart from "../components/VitalChart";

interface Person {
  id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  mac: string;
  status: 'normal' | 'warning' | 'critical';
  heartRate: number;
  temperature: number;
  height: string;
  weight: string;
  bloodGroup: string;
  photo: string;
  heartRateHistory: Array<{ time: string; value: number }>;
  temperatureHistory: Array<{ time: string; value: number }>;
}

interface DashboardPageProps {
  onLogout: () => void;
  onShowAdmin: () => void;
}

const DashboardPage = ({ onLogout, onShowAdmin }: DashboardPageProps) => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [people] = useState<Person[]>([
    {
      id: "1",
      name: "John Doe",
      age: 32,
      gender: "Male",
      location: "Building A, Floor 2",
      mac: "AA:BB:CC:DD:EE:FF",
      status: "normal",
      heartRate: 72,
      temperature: 98.6,
      height: "6'0\"",
      weight: "180 lbs",
      bloodGroup: "O+",
      photo: "/api/placeholder/150/150",
      heartRateHistory: [
        { time: "09:00", value: 70 },
        { time: "10:00", value: 72 },
        { time: "11:00", value: 68 },
        { time: "12:00", value: 75 },
        { time: "13:00", value: 73 },
        { time: "14:00", value: 72 },
      ],
      temperatureHistory: [
        { time: "09:00", value: 98.4 },
        { time: "10:00", value: 98.6 },
        { time: "11:00", value: 98.5 },
        { time: "12:00", value: 98.7 },
        { time: "13:00", value: 98.6 },
        { time: "14:00", value: 98.6 },
      ],
    },
    {
      id: "2",
      name: "Sarah Smith",
      age: 28,
      gender: "Female",
      location: "Building B, Floor 1",
      mac: "11:22:33:44:55:66",
      status: "warning",
      heartRate: 85,
      temperature: 99.2,
      height: "5'6\"",
      weight: "140 lbs",
      bloodGroup: "A-",
      photo: "/api/placeholder/150/150",
      heartRateHistory: [
        { time: "09:00", value: 78 },
        { time: "10:00", value: 82 },
        { time: "11:00", value: 85 },
        { time: "12:00", value: 88 },
        { time: "13:00", value: 86 },
        { time: "14:00", value: 85 },
      ],
      temperatureHistory: [
        { time: "09:00", value: 98.8 },
        { time: "10:00", value: 99.0 },
        { time: "11:00", value: 99.1 },
        { time: "12:00", value: 99.3 },
        { time: "13:00", value: 99.2 },
        { time: "14:00", value: 99.2 },
      ],
    }
  ]);

  // Auto-select first person on load
  useEffect(() => {
    if (people.length > 0 && !selectedPerson) {
      setSelectedPerson(people[0]);
    }
  }, [people, selectedPerson]);

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white animate-slide-in-right flex-shrink-0">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Health Overview</h1>
          <p className="text-gray-500 text-sm mt-1 flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            August 12, 2021
          </p>
        </div>
        <div className="flex items-center space-x-2 lg:space-x-4">
          <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100 hover:scale-105 transition-all duration-200">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100 hover:scale-105 transition-all duration-200">
            <Bell className="w-5 h-5" />
          </Button>
          <Button 
            onClick={onShowAdmin}
            variant="ghost" 
            className="text-gray-600 hover:bg-gray-100 hover:scale-105 transition-all duration-200 text-sm"
          >
            <Settings className="w-4 h-4 mr-1 lg:mr-2" />
            <span className="hidden sm:inline">Admin</span>
          </Button>
          <Button 
            onClick={onLogout}
            variant="ghost" 
            className="text-gray-600 hover:bg-gray-100 hover:scale-105 transition-all duration-200 text-sm"
          >
            <LogOut className="w-4 h-4 mr-1 lg:mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>

      {/* Main Content - Flex 1 to fill remaining space */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 overflow-hidden">
        {/* Left Sidebar - Person Profile */}
        <div className="lg:col-span-1 flex flex-col space-y-4 overflow-hidden">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in flex-shrink-0">
            <CardContent className="p-6">
              {selectedPerson ? (
                <div className="text-center">
                  <div className="mb-4">
                    <Avatar className="w-20 h-20 lg:w-24 lg:h-24 mx-auto mb-4 rounded-2xl hover:scale-105 transition-transform duration-300">
                      <AvatarImage src={selectedPerson.photo} />
                      <AvatarFallback className="bg-gray-700 text-white text-lg lg:text-xl rounded-2xl">
                        <User className="w-10 h-10 lg:w-12 lg:h-12" />
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-lg lg:text-xl font-bold mb-1">{selectedPerson.name}</h2>
                    <p className="text-gray-300 text-sm">{selectedPerson.age} years • {selectedPerson.gender}</p>
                    <div className="flex items-center justify-center mt-2 text-gray-400 text-xs">
                      <MapPin className="w-3 h-3 mr-1" />
                      {selectedPerson.location}
                    </div>
                  </div>
                  
                  {/* Physical Stats */}
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="bg-orange-500/20 rounded-xl p-2 text-center hover:bg-orange-500/30 transition-colors duration-200">
                      <div className="flex items-center justify-center mb-1">
                        <Ruler className="w-3 h-3 text-orange-300" />
                      </div>
                      <p className="text-orange-200 text-xs mb-1">Height</p>
                      <p className="text-white font-semibold text-xs">{selectedPerson.height}</p>
                    </div>
                    <div className="bg-blue-500/20 rounded-xl p-2 text-center hover:bg-blue-500/30 transition-colors duration-200">
                      <div className="flex items-center justify-center mb-1">
                        <Weight className="w-3 h-3 text-blue-300" />
                      </div>
                      <p className="text-blue-200 text-xs mb-1">Weight</p>
                      <p className="text-white font-semibold text-xs">{selectedPerson.weight}</p>
                    </div>
                  </div>

                  {/* Blood Group */}
                  <div className="mt-3 p-2 bg-red-500/20 rounded-xl hover:bg-red-500/30 transition-colors duration-200">
                    <div className="flex items-center justify-center mb-1">
                      <Droplets className="w-3 h-3 text-red-300" />
                    </div>
                    <p className="text-red-200 text-xs mb-1">Blood Group</p>
                    <p className="text-white font-semibold text-sm">{selectedPerson.bloodGroup}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Select an employee</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Employee List */}
          <Card className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 flex-1 overflow-hidden">
            <CardHeader className="pb-3 flex-shrink-0">
              <CardTitle className="text-gray-900 text-base lg:text-lg flex items-center">
                <User className="w-4 h-4 mr-2" />
                Employees ({people.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 overflow-y-auto">
              <div className="space-y-2">
                {people.map((person, index) => (
                  <div
                    key={person.id}
                    onClick={() => setSelectedPerson(person)}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                      selectedPerson?.id === person.id
                        ? 'bg-blue-50 border border-blue-200 shadow-sm'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={person.photo} />
                        <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                          {person.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{person.name}</p>
                        <p className="text-xs text-gray-500 truncate">{person.location}</p>
                      </div>
                      <Badge className={`text-xs px-2 py-1 ${
                        person.status === 'normal' ? 'bg-green-100 text-green-800' :
                        person.status === 'warning' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {person.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 flex flex-col overflow-hidden">
          {selectedPerson ? (
            <div className="flex flex-col space-y-4 h-full overflow-hidden">
              {/* Person Status Panel with Heart Beat Animation */}
              <Card className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 flex-shrink-0">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
                          <AvatarImage src={selectedPerson.photo} />
                          <AvatarFallback className="bg-gray-200 text-gray-600">
                            <User className="w-8 h-8" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{selectedPerson.name}</h2>
                        <p className="text-gray-600">{selectedPerson.age} years • {selectedPerson.gender}</p>
                        <div className="flex items-center mt-1 text-gray-500 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          {selectedPerson.location}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={`text-sm px-3 py-1 ${
                        selectedPerson.status === 'normal' ? 'bg-green-100 text-green-800' :
                        selectedPerson.status === 'warning' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {selectedPerson.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  {/* Heart Beat Status */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-red-50 rounded-2xl p-4 text-center hover:bg-red-100 transition-colors duration-200">
                      <div className="flex items-center justify-center mb-3">
                        <div className="relative">
                          <Heart className="w-10 h-10 text-red-500 animate-pulse" style={{
                            animation: 'heartbeat 1.5s ease-in-out infinite'
                          }} />
                          <div className="absolute inset-0 w-10 h-10 border-2 border-red-300 rounded-full animate-ping opacity-30"></div>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Heart Rate</h3>
                      <div className="flex items-baseline justify-center space-x-1">
                        <span className="text-2xl font-bold text-red-600">{selectedPerson.heartRate}</span>
                        <span className="text-sm text-gray-500">BPM</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Normal Range: 60-100</p>
                    </div>

                    <div className="bg-blue-50 rounded-2xl p-4 text-center hover:bg-blue-100 transition-colors duration-200">
                      <div className="flex items-center justify-center mb-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <Thermometer className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Temperature</h3>
                      <div className="flex items-baseline justify-center space-x-1">
                        <span className="text-2xl font-bold text-blue-600">{selectedPerson.temperature}</span>
                        <span className="text-sm text-gray-500">°F</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Normal Range: 97-99°F</p>
                    </div>

                    <div className="bg-purple-50 rounded-2xl p-4 text-center hover:bg-purple-100 transition-colors duration-200">
                      <div className="flex items-center justify-center mb-3">
                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                          <Activity className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Status</h3>
                      <div className="text-xl font-bold text-purple-600 capitalize mb-1">
                        {selectedPerson.status}
                      </div>
                      <p className="text-xs text-gray-500">Real-time monitoring</p>
                    </div>
                  </div>

                  {/* Live Status Indicator */}
                  <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Live monitoring active</span>
                    <Clock className="w-4 h-4 ml-2" />
                    <span>{new Date().toLocaleTimeString()}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Growth Chart */}
              <Card className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 flex-1 overflow-hidden">
                <CardHeader className="pb-4 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-gray-900 text-lg lg:text-xl flex items-center">
                      <Activity className="w-5 h-5 mr-2" />
                      Vital Signs Monitoring
                    </CardTitle>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>Real-time</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 lg:p-6 pt-0 flex-1 overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                    <div className="flex flex-col">
                      <h4 className="font-semibold text-gray-900 mb-4 text-sm lg:text-base">Heart Rate Trends</h4>
                      <div className="flex-1 min-h-0">
                        <VitalChart
                          title="Heart Rate"
                          subtitle="Real-time monitoring"
                          data={selectedPerson.heartRateHistory}
                          normalRange="60-100 bpm"
                          latest={`${selectedPerson.heartRate} bpm`}
                          color="#ef4444"
                          unit="bpm"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-semibold text-gray-900 mb-4 text-sm lg:text-base">Temperature Trends</h4>
                      <div className="flex-1 min-h-0">
                        <VitalChart
                          title="Temperature"
                          subtitle="Body temperature"
                          data={selectedPerson.temperatureHistory}
                          normalRange="97-99°F"
                          latest={`${selectedPerson.temperature}°F`}
                          color="#3b82f6"
                          unit="°F"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="bg-white rounded-xl shadow-sm border flex-1 flex items-center justify-center">
              <CardContent>
                <div className="text-center text-gray-500">
                  <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">Select an Employee</h3>
                  <p className="text-gray-400">Choose an employee from the list to view their health data</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Bottom Information Panel - Fixed height, no scroll */}
      <div className="bg-white border-t shadow-lg p-4 animate-slide-in-right flex-shrink-0">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div className="hover:scale-105 transition-transform duration-200">
              <div className="flex items-center justify-center mb-1">
                <User className="w-4 h-4 text-blue-600 mr-1" />
                <span className="text-xs font-semibold text-gray-900">Total Employees</span>
              </div>
              <p className="text-lg font-bold text-blue-600">{people.length}</p>
            </div>
            <div className="hover:scale-105 transition-transform duration-200">
              <div className="flex items-center justify-center mb-1">
                <Heart className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-xs font-semibold text-gray-900">Healthy</span>
              </div>
              <p className="text-lg font-bold text-green-600">{people.filter(p => p.status === 'normal').length}</p>
            </div>
            <div className="hover:scale-105 transition-transform duration-200">
              <div className="flex items-center justify-center mb-1">
                <Activity className="w-4 h-4 text-yellow-600 mr-1" />
                <span className="text-xs font-semibold text-gray-900">Monitoring</span>
              </div>
              <p className="text-lg font-bold text-yellow-600">{people.filter(p => p.status === 'warning').length}</p>
            </div>
            <div className="hover:scale-105 transition-transform duration-200">
              <div className="flex items-center justify-center mb-1">
                <Wifi className="w-4 h-4 text-gray-600 mr-1" />
                <span className="text-xs font-semibold text-gray-900">Connected</span>
              </div>
              <p className="text-lg font-bold text-gray-600">{people.length}</p>
            </div>
          </div>
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center">
              <Clock className="w-3 h-3 mr-1" />
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
