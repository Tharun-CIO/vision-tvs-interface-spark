
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
  User
} from "lucide-react";
import PersonCard from "./PersonCard";
import StatusPanel from "./StatusPanel";
import VitalChart from "./VitalChart";

interface DashboardProps {
  onLogout: () => void;
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

const Dashboard = ({ onLogout }: DashboardProps) => {
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Hostage Monitoring System</h1>
              <p className="text-gray-300">{currentTime.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10"
              onClick={() => setSelectedPerson(null)}
            >
              Dashboard
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Admin
            </Button>
            <Button 
              onClick={onLogout}
              variant="ghost" 
              className="text-white hover:bg-red-500/20 hover:text-red-200"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Person Details View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Person Info */}
          <div className="lg:col-span-1">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={selectedPerson.photo} />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                      <User className="w-8 h-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedPerson.name}</h2>
                    <p className="text-gray-300">{selectedPerson.age} years • {selectedPerson.gender}</p>
                    <Badge 
                      className={`mt-2 ${
                        selectedPerson.status === 'normal' ? 'bg-green-500' :
                        selectedPerson.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                    >
                      {selectedPerson.status.charAt(0).toUpperCase() + selectedPerson.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2 text-gray-300">
                  <p><strong>Location:</strong> {selectedPerson.location}</p>
                  <p><strong>MAC:</strong> {selectedPerson.mac}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vital Signs */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 border-2 border-green-400">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-green-400" />
                      <span className="text-green-400 font-medium">Heart Rate</span>
                    </div>
                    <span className="text-green-400 text-sm font-medium">Normal</span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {selectedPerson.heartRate} <span className="text-lg">bpm</span>
                  </div>
                  <p className="text-gray-400 text-sm">Normal range: 60-100 bpm</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20 border-2 border-green-400">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Thermometer className="w-5 h-5 text-green-400" />
                      <span className="text-green-400 font-medium">Body Temperature</span>
                    </div>
                    <span className="text-green-400 text-sm font-medium">Normal</span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {selectedPerson.temperature} <span className="text-lg">°F</span>
                  </div>
                  <p className="text-gray-400 text-sm">Normal range: 97-99 °F</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <VitalChart
                title="Heart Rate History"
                subtitle="(Last 12 readings)"
                data={selectedPerson.heartRateHistory}
                normalRange="60-100 bpm"
                latest={`${selectedPerson.heartRate} bpm`}
                color="#3b82f6"
                unit="bpm"
              />
              <VitalChart
                title="Body Temperature History"
                subtitle="(Last 12 readings)"
                data={selectedPerson.temperatureHistory}
                normalRange="97-99 °F"
                latest={`${selectedPerson.temperature} °F`}
                color="#ef4444"
                unit="°F"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Hostage Monitoring System</h1>
            <p className="text-gray-300">{currentTime.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-white hover:bg-white/10">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button variant="ghost" className="text-white hover:bg-white/10">
            <Users className="w-4 h-4 mr-2" />
            Admin
          </Button>
          <Button 
            onClick={onLogout}
            variant="ghost" 
            className="text-white hover:bg-red-500/20 hover:text-red-200"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {people.map((person) => (
          <PersonCard 
            key={person.id} 
            person={person} 
            onSelect={() => setSelectedPerson(person)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
