
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
    <div className="min-h-screen bg-gray-50 p-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 animate-slide-in-right">
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 pb-20">
        {/* Left Sidebar - Person Profile */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in">
            <CardContent className="p-6">
              {selectedPerson ? (
                <div className="text-center">
                  <div className="mb-4">
                    <Avatar className="w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-4 rounded-2xl hover:scale-105 transition-transform duration-300">
                      <AvatarImage src={selectedPerson.photo} />
                      <AvatarFallback className="bg-gray-700 text-white text-xl lg:text-2xl rounded-2xl">
                        <User className="w-12 h-12 lg:w-16 lg:h-16" />
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
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <div className="bg-orange-500/20 rounded-xl p-3 text-center hover:bg-orange-500/30 transition-colors duration-200">
                      <div className="flex items-center justify-center mb-2">
                        <Ruler className="w-4 h-4 text-orange-300" />
                      </div>
                      <p className="text-orange-200 text-xs mb-1">Height</p>
                      <p className="text-white font-semibold text-sm">{selectedPerson.height}</p>
                    </div>
                    <div className="bg-blue-500/20 rounded-xl p-3 text-center hover:bg-blue-500/30 transition-colors duration-200">
                      <div className="flex items-center justify-center mb-2">
                        <Weight className="w-4 h-4 text-blue-300" />
                      </div>
                      <p className="text-blue-200 text-xs mb-1">Weight</p>
                      <p className="text-white font-semibold text-sm">{selectedPerson.weight}</p>
                    </div>
                  </div>

                  {/* Blood Group */}
                  <div className="mt-4 p-3 bg-red-500/20 rounded-xl hover:bg-red-500/30 transition-colors duration-200">
                    <div className="flex items-center justify-center mb-2">
                      <Droplets className="w-4 h-4 text-red-300" />
                    </div>
                    <p className="text-red-200 text-xs mb-1">Blood Group</p>
                    <p className="text-white font-semibold">{selectedPerson.bloodGroup}</p>
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
          <Card className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-900 text-base lg:text-lg flex items-center">
                <User className="w-4 h-4 mr-2" />
                Employees ({people.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
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
        <div className="lg:col-span-3">
          {selectedPerson ? (
            <div className="space-y-4 lg:space-y-6">
              {/* Vital Signs Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Heart Rate Card */}
                <Card className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-red-100 rounded-lg flex items-center justify-center">
                          <Heart className="w-5 h-5 lg:w-6 lg:h-6 text-red-600 animate-pulse" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm lg:text-base">Heart Rate</h3>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl lg:text-3xl font-bold text-gray-900">{selectedPerson.heartRate}</span>
                        <span className="text-sm text-gray-400">bpm</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 text-xs mt-2">Normal</Badge>
                    </div>
                    <div className="h-12 lg:h-16 bg-red-50 rounded-lg flex items-end justify-center overflow-hidden">
                      <div className="w-full h-6 lg:h-8 bg-gradient-to-r from-red-200 to-red-300 rounded-t-lg opacity-60 animate-pulse"></div>
                    </div>
                  </CardContent>
                </Card>

                {/* Temperature Card */}
                <Card className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Thermometer className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm lg:text-base">Temperature</h3>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl lg:text-3xl font-bold text-gray-900">{selectedPerson.temperature}</span>
                        <span className="text-sm text-gray-400">°F</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 text-xs mt-2">Normal</Badge>
                    </div>
                    <div className="h-12 lg:h-16 bg-blue-50 rounded-lg flex items-end justify-center overflow-hidden">
                      <div className="w-full h-6 lg:h-8 bg-gradient-to-r from-blue-200 to-blue-300 rounded-t-lg opacity-60"></div>
                    </div>
                  </CardContent>
                </Card>

                {/* Blood Pressure Card */}
                <Card className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 hover:scale-[1.02] sm:col-span-2 lg:col-span-1">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Activity className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm lg:text-base">Blood Pressure</h3>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl lg:text-3xl font-bold text-gray-900">120</span>
                        <span className="text-lg text-gray-500">/ 80</span>
                        <span className="text-sm text-gray-400">mmHg</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 text-xs mt-2">Normal</Badge>
                    </div>
                    <div className="h-12 lg:h-16 bg-purple-50 rounded-lg flex items-end justify-center overflow-hidden">
                      <div className="w-full h-6 lg:h-8 bg-gradient-to-r from-purple-200 to-purple-300 rounded-t-lg opacity-60"></div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Activity Growth Chart */}
              <Card className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-4">
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
                <CardContent className="p-4 lg:p-6 pt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 text-sm lg:text-base">Heart Rate Trends</h4>
                      <div className="h-48 lg:h-64">
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
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 text-sm lg:text-base">Temperature Trends</h4>
                      <div className="h-48 lg:h-64">
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
            <Card className="bg-white rounded-xl shadow-sm border h-96 flex items-center justify-center">
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

      {/* Bottom Information Panel */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 animate-slide-in-right">
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
