import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart, Thermometer, User, MapPin, Wifi, LogOut, Settings, Ruler, Weight, Droplets, Search, Bell } from "lucide-react";
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
  heartRateHistory: Array<{
    time: string;
    value: number;
  }>;
  temperatureHistory: Array<{
    time: string;
    value: number;
  }>;
}
interface DashboardPageProps {
  onLogout: () => void;
  onShowAdmin: () => void;
}
const DashboardPage = ({
  onLogout,
  onShowAdmin
}: DashboardPageProps) => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [people] = useState<Person[]>([{
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
    heartRateHistory: [{
      time: "09:00",
      value: 70
    }, {
      time: "10:00",
      value: 72
    }, {
      time: "11:00",
      value: 68
    }, {
      time: "12:00",
      value: 75
    }, {
      time: "13:00",
      value: 73
    }, {
      time: "14:00",
      value: 72
    }],
    temperatureHistory: [{
      time: "09:00",
      value: 98.4
    }, {
      time: "10:00",
      value: 98.6
    }, {
      time: "11:00",
      value: 98.5
    }, {
      time: "12:00",
      value: 98.7
    }, {
      time: "13:00",
      value: 98.6
    }, {
      time: "14:00",
      value: 98.6
    }]
  }, {
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
    heartRateHistory: [{
      time: "09:00",
      value: 78
    }, {
      time: "10:00",
      value: 82
    }, {
      time: "11:00",
      value: 85
    }, {
      time: "12:00",
      value: 88
    }, {
      time: "13:00",
      value: 86
    }, {
      time: "14:00",
      value: 85
    }],
    temperatureHistory: [{
      time: "09:00",
      value: 98.8
    }, {
      time: "10:00",
      value: 99.0
    }, {
      time: "11:00",
      value: 99.1
    }, {
      time: "12:00",
      value: 99.3
    }, {
      time: "13:00",
      value: 99.2
    }, {
      time: "14:00",
      value: 99.2
    }]
  }]);

  // Auto-select first person on load
  useEffect(() => {
    if (people.length > 0 && !selectedPerson) {
      setSelectedPerson(people[0]);
    }
  }, [people, selectedPerson]);
  return <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Health Overview</h1>
          <p className="text-gray-500 text-sm mt-1">August 12, 2021</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100">
            <Bell className="w-5 h-5" />
          </Button>
          <Button onClick={onShowAdmin} variant="ghost" className="text-gray-600 hover:bg-gray-100">
            <Settings className="w-4 h-4 mr-2" />
            Admin
          </Button>
          <Button onClick={onLogout} variant="ghost" className="text-gray-600 hover:bg-gray-100">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Person Profile */}
        <div className="lg:col-span-1">
          <Card className="bg-gray-800 text-white rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              {selectedPerson ? <div className="text-center">
                  <div className="mb-6">
                    <Avatar className="w-32 h-32 mx-auto mb-4 rounded-2xl">
                      <AvatarImage src={selectedPerson.photo} />
                      <AvatarFallback className="bg-gray-700 text-white text-2xl rounded-2xl">
                        <User className="w-16 h-16" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  {/* Physical Stats */}
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="bg-orange-200 bg-opacity-20 rounded-2xl p-4 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Ruler className="w-4 h-4 text-orange-300 mr-1" />
                      </div>
                      
                      <p className="text-white font-semibold">{selectedPerson.height.replace('"', ' cm').replace("'", '').replace('6', '170').replace('5', '165')}</p>
                    </div>
                    <div className="bg-blue-200 bg-opacity-20 rounded-2xl p-4 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Weight className="w-4 h-4 text-blue-300 mr-1" />
                      </div>
                      <p className="text-blue-200 text-xs mb-1">Weight</p>
                      <p className="text-white font-semibold">{selectedPerson.weight.replace('lbs', 'kg').replace('180', '72').replace('140', '58')}</p>
                    </div>
                  </div>
                </div> : <div className="text-center">
                  <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Select an employee</p>
                </div>}
            </CardContent>
          </Card>

          {/* Employee List */}
          <Card className="mt-6 bg-white rounded-2xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-900 text-lg">Employees ({people.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {people.map(person => <div key={person.id} onClick={() => setSelectedPerson(person)} className={`p-3 rounded-xl cursor-pointer transition-all ${selectedPerson?.id === person.id ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 hover:bg-gray-100'}`}>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={person.photo} />
                        <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                          {person.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <Badge className={`text-xs ${person.status === 'normal' ? 'bg-green-100 text-green-800' : person.status === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {person.status}
                      </Badge>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {selectedPerson ? <div className="space-y-6">
              {/* Vital Signs Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Blood Pressure Card */}
                <Card className="bg-white rounded-2xl shadow-sm border-0">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Droplets className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Blood Pressure</h3>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-bold text-gray-900">102</span>
                        <span className="text-lg text-gray-500">/ 72</span>
                        <span className="text-sm text-gray-400">mmHg</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 text-xs mt-2">Normal</Badge>
                    </div>
                    <div className="h-16 bg-blue-50 rounded-xl flex items-end justify-center overflow-hidden">
                      <div className="w-full h-8 bg-gradient-to-r from-blue-200 to-blue-300 rounded-t-lg opacity-60"></div>
                    </div>
                  </CardContent>
                </Card>

                {/* Heart Rate Card */}
                <Card className="bg-white rounded-2xl shadow-sm border-0">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                          <Heart className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Heart Rate</h3>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-bold text-gray-900">{selectedPerson.heartRate}</span>
                        <span className="text-sm text-gray-400">bpm</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 text-xs mt-2">Normal</Badge>
                    </div>
                    <div className="h-16 bg-red-50 rounded-xl flex items-end justify-center overflow-hidden">
                      <div className="w-full h-8 bg-gradient-to-r from-red-200 to-red-300 rounded-t-lg opacity-60"></div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Activity Growth Chart */}
              <Card className="bg-white rounded-2xl shadow-sm border-0">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-gray-900 text-xl">Activity Growth</CardTitle>
                    <select className="text-sm text-gray-500 bg-transparent border-0 focus:ring-0">
                      <option>Jan 2021</option>
                    </select>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Heart Rate Trends</h4>
                      <div className="h-48">
                        <VitalChart title="Heart Rate" subtitle="Real-time monitoring" data={selectedPerson.heartRateHistory} normalRange="60-100 bpm" latest={`${selectedPerson.heartRate} bpm`} color="#ef4444" unit="bpm" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Temperature Trends</h4>
                      <div className="h-48">
                        <VitalChart title="Temperature" subtitle="Body temperature" data={selectedPerson.temperatureHistory} normalRange="97-99°F" latest={`${selectedPerson.temperature}°F`} color="#3b82f6" unit="°F" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Activity Legend */}
                  <div className="flex items-center justify-center space-x-6 mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <span className="text-sm text-gray-600">Aerobics</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      
                      <span className="text-sm text-gray-600">Yoga</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                      <span className="text-sm text-gray-600">Meditation</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div> : <Card className="bg-white rounded-2xl shadow-sm border-0 h-96 flex items-center justify-center">
              <CardContent>
                <div className="text-center text-gray-500">
                  <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  
                  
                </div>
              </CardContent>
            </Card>}
        </div>
      </div>
    </div>;
};
export default DashboardPage;