
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart, Thermometer, User, MapPin, Wifi, LogOut, Settings, Ruler, Weight, Droplets, Search, Bell, WifiOff, Power, Download, FileText, UserPlus, Activity, Zap } from "lucide-react";
import PersonCard from "../components/PersonCard";
import VitalChart from "../components/VitalChart";
import EmployeeEntry from "../components/EmployeeEntry";

interface WorkEntry {
  id: string;
  date: string;
  title: string;
  description: string;
  type: string;
  downloadUrl: string;
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
  height: string;
  weight: string;
  bloodGroup: string;
  photo: string;
  connected: boolean;
  heartRateHistory: Array<{
    time: string;
    value: number;
  }>;
  temperatureHistory: Array<{
    time: string;
    value: number;
  }>;
  previousWork: WorkEntry[];
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
  const [isEmployeeEntryOpen, setIsEmployeeEntryOpen] = useState(false);
  const [people, setPeople] = useState<Person[]>([{
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
    connected: true,
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
    }],
    previousWork: [
      {
        id: "w1",
        date: "2024-06-20",
        title: "Safety Inspection Report",
        description: "Building A safety compliance check",
        type: "PDF",
        downloadUrl: "/reports/safety-inspection-john.pdf"
      },
      {
        id: "w2",
        date: "2024-06-18",
        title: "Equipment Maintenance Log",
        description: "HVAC system maintenance documentation",
        type: "XLSX",
        downloadUrl: "/reports/maintenance-log-john.xlsx"
      },
      {
        id: "w3",
        date: "2024-06-15",
        title: "Training Completion Certificate",
        description: "Fire safety training completion",
        type: "PDF",
        downloadUrl: "/reports/training-cert-john.pdf"
      }
    ]
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
    connected: false,
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
    }],
    previousWork: [
      {
        id: "w4",
        date: "2024-06-22",
        title: "Quality Control Report",
        description: "Product quality assessment for line B",
        type: "PDF",
        downloadUrl: "/reports/quality-control-sarah.pdf"
      },
      {
        id: "w5",
        date: "2024-06-19",
        title: "Inventory Count Sheet",
        description: "Weekly inventory verification",
        type: "XLSX",
        downloadUrl: "/reports/inventory-sarah.xlsx"
      }
    ]
  }]);

  // Auto-select first person on load
  useEffect(() => {
    if (people.length > 0 && !selectedPerson) {
      setSelectedPerson(people[0]);
    }
  }, [people, selectedPerson]);

  const handleConnect = (personId: string) => {
    setPeople(prev => prev.map(person => 
      person.id === personId 
        ? { ...person, connected: !person.connected }
        : person
    ));
    
    if (selectedPerson?.id === personId) {
      setSelectedPerson(prev => prev ? { ...prev, connected: !prev.connected } : null);
    }
  };

  const getConnectionStatus = () => {
    const connected = people.filter(p => p.connected).length;
    const total = people.length;
    return { connected, total };
  };

  const handlePersonSelect = (personId: string) => {
    const person = people.find(p => p.id === personId);
    if (person) {
      setSelectedPerson(person);
    }
  };

  const handleDownload = (workEntry: WorkEntry) => {
    // Simulate download - in real app this would trigger actual file download
    console.log(`Downloading ${workEntry.title} for ${selectedPerson?.name}`);
    // window.open(workEntry.downloadUrl, '_blank');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="h-screen bg-gray-50 p-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Health Overview</h1>
            <div className="flex items-center space-x-4 mt-1">
              <p className="text-gray-500 text-sm">August 12, 2021</p>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">
                    {getConnectionStatus().connected}/{getConnectionStatus().total} Connected
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Person Selector Dropdown */}
          <div className="min-w-[250px]">
            <Select value={selectedPerson?.id || ""} onValueChange={handlePersonSelect}>
              <SelectTrigger className="w-full bg-white border-gray-200">
                <SelectValue placeholder="Select a person" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                {people.map((person) => (
                  <SelectItem key={person.id} value={person.id} className="cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center space-x-3 w-full">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={person.photo} />
                        <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                          {person.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">{person.name}</span>
                          <div className="flex items-center space-x-2">
                            <Badge className={`text-xs ${person.status === 'normal' ? 'bg-green-100 text-green-800' : person.status === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                              {person.status}
                            </Badge>
                            <div className={`w-1.5 h-1.5 rounded-full ${person.connected ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100">
            <Search className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100">
            <Bell className="w-4 h-4" />
          </Button>
          
          {/* Employee Entry Dialog */}
          <Dialog open={isEmployeeEntryOpen} onOpenChange={setIsEmployeeEntryOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" className="text-gray-600 hover:bg-gray-100">
                <UserPlus className="w-3 h-3 mr-1" />
                Employee Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-800">
              <DialogHeader>
                <DialogTitle className="text-white">Employee Entry</DialogTitle>
              </DialogHeader>
              <EmployeeEntry onBack={() => setIsEmployeeEntryOpen(false)} />
            </DialogContent>
          </Dialog>
          
          <Button onClick={onLogout} variant="ghost" className="text-gray-600 hover:bg-gray-100">
            <LogOut className="w-3 h-3 mr-1" />
            Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[calc(100vh-7rem)]">
        {/* Left Sidebar - Person Profile */}
        <div className="lg:col-span-1 flex flex-col space-y-4">
          <Card className="bg-gray-800 text-white rounded-2xl overflow-hidden flex-1">
            <CardContent className="p-6">
              {selectedPerson ? <div className="text-center h-full flex flex-col justify-between">
                  <div className="mb-4">
                    <Avatar className="w-24 h-24 mx-auto mb-3 rounded-2xl">
                      <AvatarImage src={selectedPerson.photo} />
                      <AvatarFallback className="bg-gray-700 text-white text-xl rounded-2xl">
                        <User className="w-12 h-12" />
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold text-white mb-1">{selectedPerson.name}</h3>
                    <p className="text-gray-300 text-sm">{selectedPerson.age} years • {selectedPerson.gender}</p>
                    
                    {/* Connection Status */}
                    <div className="flex items-center justify-center space-x-2 mt-3">
                      <div className={`w-2 h-2 rounded-full ${selectedPerson.connected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                      <span className={`text-xs ${selectedPerson.connected ? 'text-green-300' : 'text-red-300'}`}>
                        {selectedPerson.connected ? 'Connected' : 'Disconnected'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Physical Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-orange-200 bg-opacity-20 rounded-xl p-3 text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Ruler className="w-3 h-3 text-orange-300 mr-1" />
                      </div>
                      <p className="text-orange-200 text-xs mb-1">Height</p>
                      <p className="text-white font-semibold text-sm">{selectedPerson.height.replace('"', ' cm').replace("'", '').replace('6', '170').replace('5', '165')}</p>
                    </div>
                    <div className="bg-blue-200 bg-opacity-20 rounded-xl p-3 text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Weight className="w-3 h-3 text-blue-300 mr-1" />
                      </div>
                      <p className="text-blue-200 text-xs mb-1">Weight</p>
                      <p className="text-white font-semibold text-sm">{selectedPerson.weight.replace('lbs', 'kg').replace('180', '72').replace('140', '58')}</p>
                    </div>
                  </div>

                  {/* Connect Button */}
                  <Button 
                    onClick={() => handleConnect(selectedPerson.id)}
                    className={`w-full ${selectedPerson.connected 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-green-500 hover:bg-green-600'
                    } text-white`}
                  >
                    {selectedPerson.connected ? (
                      <>
                        <WifiOff className="w-4 h-4 mr-2" />
                        Disconnect
                      </>
                    ) : (
                      <>
                        <Wifi className="w-4 h-4 mr-2" />
                        Connect
                      </>
                    )}
                  </Button>
                </div> : <div className="text-center">
                  <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Select an employee</p>
                </div>}
            </CardContent>
          </Card>

          {/* Employee List */}
          <Card className="bg-white rounded-2xl shadow-sm flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-900 text-lg">Employees ({people.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                {people.map(person => <div key={person.id} onClick={() => setSelectedPerson(person)} className={`p-3 rounded-xl cursor-pointer transition-all ${selectedPerson?.id === person.id ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 hover:bg-gray-100'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={person.photo} />
                          <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                            {person.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{person.name}</p>
                          <div className="flex items-center space-x-2">
                            <Badge className={`text-xs ${person.status === 'normal' ? 'bg-green-100 text-green-800' : person.status === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                              {person.status}
                            </Badge>
                            <div className={`w-1.5 h-1.5 rounded-full ${person.connected ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                          </div>
                        </div>
                      </div>
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConnect(person.id);
                        }}
                        size="sm"
                        variant={person.connected ? "destructive" : "default"}
                        className="text-xs px-2 py-1 h-6"
                      >
                        {person.connected ? <WifiOff className="w-3 h-3" /> : <Wifi className="w-3 h-3" />}
                      </Button>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {selectedPerson ? (
            <div className="space-y-4 h-full">
              {/* Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {/* Overall Status Card */}
                <Card className="bg-white rounded-2xl shadow-sm border-0">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Power className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-xs">Status</h3>
                        <div className="flex items-center space-x-1 mt-1">
                          <Badge className={`text-xs ${selectedPerson.status === 'normal' ? 'bg-green-100 text-green-800' : selectedPerson.status === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                            {selectedPerson.status}
                          </Badge>
                          <div className={`w-1.5 h-1.5 rounded-full ${selectedPerson.connected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Heart Rate Card */}
                <Card className="bg-white rounded-2xl shadow-sm border-0">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <Heart className={`w-4 h-4 text-red-600 ${selectedPerson.connected ? 'animate-heartbeat' : ''}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-xs">Heart Rate</h3>
                        <div className="flex items-baseline space-x-1 mt-1">
                          <span className="text-lg font-bold text-gray-900">{selectedPerson.connected ? selectedPerson.heartRate : '--'}</span>
                          <span className="text-xs text-gray-400">bpm</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Temperature Card */}
                <Card className="bg-white rounded-2xl shadow-sm border-0">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Thermometer className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-xs">Temperature</h3>
                        <div className="flex items-baseline space-x-1 mt-1">
                          <span className="text-lg font-bold text-gray-900">{selectedPerson.connected ? selectedPerson.temperature : '--'}</span>
                          <span className="text-xs text-gray-400">°F</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Blood Group Card */}
                <Card className="bg-white rounded-2xl shadow-sm border-0">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <Droplets className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-xs">Blood Group</h3>
                        <div className="flex items-baseline space-x-1 mt-1">
                          <span className="text-lg font-bold text-gray-900">{selectedPerson.bloodGroup}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Activity Card */}
                <Card className="bg-white rounded-2xl shadow-sm border-0">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Activity className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-xs">Activity</h3>
                        <div className="flex items-baseline space-x-1 mt-1">
                          <span className="text-lg font-bold text-gray-900">{selectedPerson.connected ? 'Active' : 'Inactive'}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Activity Growth Chart */}
              <Card className="bg-white rounded-2xl shadow-sm border-0 flex-1">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-gray-900 text-lg">Live Monitoring</CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${selectedPerson.connected ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                      <span className="text-sm text-gray-500">
                        {selectedPerson.connected ? 'Live' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  {selectedPerson.connected ? (
                    <div className="h-60">
                      <VitalChart 
                        title="Vital Signs" 
                        subtitle="Real-time monitoring" 
                        heartRateData={selectedPerson.heartRateHistory}
                        temperatureData={selectedPerson.temperatureHistory}
                        heartRateLatest={`${selectedPerson.heartRate} bpm`}
                        temperatureLatest={`${selectedPerson.temperature}°F`}
                        status={selectedPerson.status}
                        bloodGroup={selectedPerson.bloodGroup}
                        activity={selectedPerson.connected ? 'Active' : 'Inactive'}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-40 text-gray-500">
                      <div className="text-center">
                        <WifiOff className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Device disconnected</p>
                        <p className="text-xs">Connect to view live data</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Previous Work Section */}
              {selectedPerson && (
                <Card className="bg-white rounded-2xl shadow-sm border-0">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-gray-900 text-lg">Previous Work - {selectedPerson.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-3">
                      {selectedPerson.previousWork.map((work) => (
                        <div key={work.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <FileText className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-sm">{work.title}</p>
                              <p className="text-xs text-gray-500">{work.description}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs text-gray-400">{formatDate(work.date)}</span>
                                <span className="text-xs text-gray-400">•</span>
                                <Badge variant="outline" className="text-xs">
                                  {work.type}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <Button
                            onClick={() => handleDownload(work)}
                            size="sm"
                            variant="outline"
                            className="shrink-0"
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      ))}
                      {selectedPerson.previousWork.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No previous work records found</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card className="bg-white rounded-2xl shadow-sm border-0 h-full flex items-center justify-center">
              <CardContent>
                <div className="text-center text-gray-500">
                  <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Select an Employee</p>
                  <p className="text-sm">Choose a person to view their health status</p>
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
