
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
  Droplets
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-blue-800 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold text-white">Health Monitor Dashboard</h1>
          <p className="text-blue-100">Real-time employee health tracking</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            onClick={onShowAdmin}
            variant="outline" 
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Settings className="w-4 h-4 mr-2" />
            Admin
          </Button>
          <Button 
            onClick={onLogout}
            variant="outline" 
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
        {/* People List */}
        <div className="lg:col-span-1">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 h-full">
            <CardHeader>
              <CardTitle className="text-white">Employees ({people.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4 max-h-[calc(100vh-240px)] overflow-y-auto">
                {people.map((person) => (
                  <PersonCard
                    key={person.id}
                    person={person}
                    onSelect={() => setSelectedPerson(person)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selected Person Details */}
        <div className="lg:col-span-2">
          {selectedPerson ? (
            <div className="grid grid-cols-1 gap-6 h-full">
              {/* Profile Info */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-6 mb-6">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={selectedPerson.photo} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-2xl">
                        <User className="w-10 h-10" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-white mb-2">{selectedPerson.name}</h2>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="text-blue-100">
                          <span className="block text-blue-200">Age</span>
                          <span className="font-semibold">{selectedPerson.age} years</span>
                        </div>
                        <div className="text-blue-100">
                          <span className="block text-blue-200">Gender</span>
                          <span className="font-semibold">{selectedPerson.gender}</span>
                        </div>
                        <div className="text-blue-100">
                          <span className="block text-blue-200">Location</span>
                          <span className="font-semibold">{selectedPerson.location}</span>
                        </div>
                        <div className="text-blue-100">
                          <span className="block text-blue-200">MAC</span>
                          <span className="font-semibold">{selectedPerson.mac}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={
                      selectedPerson.status === 'normal' ? 'bg-green-500' :
                      selectedPerson.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }>
                      {selectedPerson.status.charAt(0).toUpperCase() + selectedPerson.status.slice(1)}
                    </Badge>
                  </div>
                  
                  {/* Physical Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/5 rounded-lg p-4 flex items-center space-x-3">
                      <div className="bg-blue-500/20 p-2 rounded-lg">
                        <Ruler className="w-5 h-5 text-blue-300" />
                      </div>
                      <div>
                        <p className="text-blue-200 text-sm">Height</p>
                        <p className="text-white font-semibold">{selectedPerson.height}</p>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 flex items-center space-x-3">
                      <div className="bg-green-500/20 p-2 rounded-lg">
                        <Weight className="w-5 h-5 text-green-300" />
                      </div>
                      <div>
                        <p className="text-blue-200 text-sm">Weight</p>
                        <p className="text-white font-semibold">{selectedPerson.weight}</p>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 flex items-center space-x-3">
                      <div className="bg-red-500/20 p-2 rounded-lg">
                        <Droplets className="w-5 h-5 text-red-300" />
                      </div>
                      <div>
                        <p className="text-blue-200 text-sm">Blood Group</p>
                        <p className="text-white font-semibold">{selectedPerson.bloodGroup}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Vital Signs Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-lg">Heart Rate</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 h-64">
                    <VitalChart
                      title="Heart Rate"
                      subtitle="Real-time monitoring"
                      data={selectedPerson.heartRateHistory}
                      normalRange="60-100 bpm"
                      latest={`${selectedPerson.heartRate} bpm`}
                      color="#ef4444"
                      unit="bpm"
                    />
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-lg">Temperature</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 h-64">
                    <VitalChart
                      title="Temperature"
                      subtitle="Body temperature"
                      data={selectedPerson.temperatureHistory}
                      normalRange="97-99°F"
                      latest={`${selectedPerson.temperature}°F`}
                      color="#3b82f6"
                      unit="°F"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 h-full flex items-center justify-center">
              <CardContent>
                <div className="text-center text-white">
                  <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">Select an Employee</h3>
                  <p className="text-blue-100">Choose an employee from the list to view their health data</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
