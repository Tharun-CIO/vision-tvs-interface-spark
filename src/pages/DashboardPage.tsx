import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  LogOut, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Settings,
  Users,
  Heart,
  Thermometer,
  User,
  Shield,
  MapPin,
  Clock,
  Wifi
} from "lucide-react";
import PersonCard from "../components/PersonCard";
import StatusPanel from "../components/StatusPanel";
import VitalChart from "../components/VitalChart";

interface DashboardPageProps {
  onLogout: () => void;
  onShowAdmin: () => void;
}

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
  photo: string;
  heartRateHistory: Array<{ time: string; value: number }>;
  temperatureHistory: Array<{ time: string; value: number }>;
}

const DashboardPage = ({ onLogout, onShowAdmin }: DashboardPageProps) => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [people, setPeople] = useState<Person[]>([
    {
      id: "PERSON-001",
      name: "John Doe",
      age: 35,
      gender: "male",
      location: "Building A, Room 101",
      mac: "AA:BB:CC:DD:EE:01",
      status: "normal",
      heartRate: 72,
      temperature: 98.6,
      photo: "/placeholder.svg",
      heartRateHistory: [
        { time: "15:09", value: 68 },
        { time: "15:14", value: 75 },
        { time: "15:19", value: 71 },
        { time: "15:24", value: 69 },
        { time: "15:29", value: 73 },
        { time: "15:34", value: 76 },
        { time: "15:39", value: 72 },
        { time: "15:44", value: 70 },
        { time: "15:49", value: 74 },
        { time: "15:54", value: 68 },
        { time: "15:59", value: 75 },
        { time: "16:04", value: 72 }
      ],
      temperatureHistory: [
        { time: "15:09", value: 98.2 },
        { time: "15:14", value: 98.4 },
        { time: "15:19", value: 98.3 },
        { time: "15:24", value: 98.5 },
        { time: "15:29", value: 98.7 },
        { time: "15:34", value: 98.6 },
        { time: "15:39", value: 98.4 },
        { time: "15:44", value: 98.8 },
        { time: "15:49", value: 98.5 },
        { time: "15:54", value: 98.3 },
        { time: "15:59", value: 98.7 },
        { time: "16:04", value: 98.6 }
      ]
    },
    {
      id: "PERSON-002",
      name: "Jane Smith",
      age: 28,
      gender: "female",
      location: "Building B, Room 205",
      mac: "BB:CC:DD:EE:FF:02",
      status: "warning",
      heartRate: 95,
      temperature: 99.2,
      photo: "/placeholder.svg",
      heartRateHistory: [
        { time: "15:09", value: 88 },
        { time: "15:14", value: 92 },
        { time: "15:19", value: 89 },
        { time: "15:24", value: 94 },
        { time: "15:29", value: 96 },
        { time: "15:34", value: 93 },
        { time: "15:39", value: 97 },
        { time: "15:44", value: 91 },
        { time: "15:49", value: 95 },
        { time: "15:54", value: 98 },
        { time: "15:59", value: 94 },
        { time: "16:04", value: 95 }
      ],
      temperatureHistory: [
        { time: "15:09", value: 98.8 },
        { time: "15:14", value: 99.0 },
        { time: "15:19", value: 98.9 },
        { time: "15:24", value: 99.1 },
        { time: "15:29", value: 99.3 },
        { time: "15:34", value: 99.2 },
        { time: "15:39", value: 99.0 },
        { time: "15:44", value: 99.4 },
        { time: "15:49", value: 99.1 },
        { time: "15:54", value: 98.9 },
        { time: "15:59", value: 99.3 },
        { time: "16:04", value: 99.2 }
      ]
    }
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Set first person as selected by default
  useEffect(() => {
    if (people.length > 0 && !selectedPerson) {
      setSelectedPerson(people[0]);
    }
  }, [people, selectedPerson]);

  const normalCount = people.filter(person => person.status === 'normal').length;
  const warningCount = people.filter(person => person.status === 'warning').length;
  const criticalCount = people.filter(person => person.status === 'critical').length;

  if (selectedPerson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-full mx-auto p-4 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b-2 border-black bg-white rounded-lg px-6 py-4 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center shadow-md">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-black">Hostage Monitoring System</h1>
                <p className="text-gray-600">{currentTime.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <Button 
                variant="outline" 
                className="text-black border-2 border-black hover:bg-gray-100"
                onClick={() => setSelectedPerson(null)}
              >
                Dashboard
              </Button>
              <Button variant="outline" className="text-black border-2 border-black hover:bg-gray-100">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button 
                className="bg-blue-500 hover:bg-blue-600 text-white"
                onClick={onShowAdmin}
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </Button>
              <Button 
                onClick={onLogout}
                variant="outline"
                className="text-red-600 border-2 border-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Person Details View */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Person Info - Enhanced */}
            <div className="xl:col-span-1 space-y-6">
              {/* Main Profile Card */}
              <Card className="bg-white border-2 border-black shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <Avatar className="w-20 h-20 mx-auto mb-4 ring-4 ring-blue-100">
                      <AvatarImage src={selectedPerson.photo} />
                      <AvatarFallback className="bg-blue-500 text-white text-xl">
                        <User className="w-10 h-10" />
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-2xl font-bold text-black mb-2">{selectedPerson.name}</h2>
                    <p className="text-gray-600">{selectedPerson.age} years • {selectedPerson.gender}</p>
                    <Badge 
                      className={`mt-3 px-3 py-1 text-sm font-semibold ${
                        selectedPerson.status === 'normal' ? 'bg-green-500 hover:bg-green-600' :
                        selectedPerson.status === 'warning' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-red-500 hover:bg-red-600'
                      } text-white rounded-full`}
                    >
                      {selectedPerson.status.charAt(0).toUpperCase() + selectedPerson.status.slice(1)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Details Card */}
              <Card className="bg-white border-2 border-black shadow-lg">
                <CardHeader>
                  <CardTitle className="text-black text-lg flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-500" />
                    Personal Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-600">Location</p>
                      <p className="font-semibold text-black text-sm break-words">{selectedPerson.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Wifi className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-600">MAC Address</p>
                      <p className="font-semibold text-black text-sm font-mono break-all">{selectedPerson.mac}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-600">Last Update</p>
                      <p className="font-semibold text-black text-sm">{currentTime.toLocaleTimeString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Vital Signs */}
            <div className="xl:col-span-3 space-y-6">
              {/* Current Vitals */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <Heart className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className="text-green-700 font-semibold">Heart Rate</span>
                          <p className="text-green-600 text-xs">Normal: 60-100 bpm</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500 text-white px-2 py-1 text-xs">Normal</Badge>
                    </div>
                    <div className="text-3xl font-bold text-green-700 mb-2">
                      {selectedPerson.heartRate} <span className="text-lg">bpm</span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                        style={{width: `${(selectedPerson.heartRate / 100) * 100}%`}}
                      ></div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <Thermometer className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className="text-blue-700 font-semibold">Temperature</span>
                          <p className="text-blue-600 text-xs">Normal: 97-99 °F</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-500 text-white px-2 py-1 text-xs">Normal</Badge>
                    </div>
                    <div className="text-3xl font-bold text-blue-700 mb-2">
                      {selectedPerson.temperature} <span className="text-lg">°F</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                        style={{width: `${((selectedPerson.temperature - 95) / 10) * 100}%`}}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
                <Card className="bg-white border-2 border-black shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-black text-lg flex items-center">
                      <Heart className="w-4 h-4 mr-2 text-red-500" />
                      Heart Rate Trend
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="h-64 w-full">
                      <VitalChart
                        title=""
                        subtitle="(Last 12 readings)"
                        data={selectedPerson.heartRateHistory}
                        normalRange="60-100 bpm"
                        latest={`${selectedPerson.heartRate} bpm`}
                        color="#3b82f6"
                        unit="bpm"
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white border-2 border-black shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-black text-lg flex items-center">
                      <Thermometer className="w-4 h-4 mr-2 text-blue-500" />
                      Temperature Trend
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="h-64 w-full">
                      <VitalChart
                        title=""
                        subtitle="(Last 12 readings)"
                        data={selectedPerson.temperatureHistory}
                        normalRange="97-99 °F"
                        latest={`${selectedPerson.temperature} °F`}
                        color="#ef4444"
                        unit="°F"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-full mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b-2 border-black">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-black">Hostage Monitoring System</h1>
              <p className="text-gray-600">{currentTime.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" className="text-black border-2 border-black hover:bg-gray-100">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button 
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={onShowAdmin}
            >
              <Shield className="w-4 h-4 mr-2" />
              Admin
            </Button>
            <Button 
              onClick={onLogout}
              variant="outline"
              className="text-red-600 border-2 border-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatusPanel
            title="Total People"
            value={people.length.toString()}
            icon={<Users className="w-6 h-6" />}
            color="blue"
          />
          <StatusPanel
            title="Normal"
            value={normalCount.toString()}
            icon={<CheckCircle className="w-6 h-6" />}
            color="green"
          />
          <StatusPanel
            title="Warning"
            value={warningCount.toString()}
            icon={<AlertTriangle className="w-6 h-6" />}
            color="yellow"
          />
          <StatusPanel
            title="Critical"
            value={criticalCount.toString()}
            icon={<Activity className="w-6 h-6" />}
            color="red"
          />
        </div>

        {/* People Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {people.map((person) => (
            <PersonCard 
              key={person.id} 
              person={person} 
              onSelect={() => setSelectedPerson(person)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
