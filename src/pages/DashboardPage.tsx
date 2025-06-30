import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart, Thermometer, User, MapPin, Wifi, LogOut, Settings, Ruler, Weight, Droplets, Search, Bell, WifiOff, Power, Download, FileText, UserPlus, Activity, Zap, Wind, Monitor, Phone } from "lucide-react";
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
interface Device {
  id: string;
  deviceName: string;
  assignedPerson: string;
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
  contactNumber: string;
  respiratoryRate: number;
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
  respiratoryRateHistory: Array<{
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
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [isEmployeeEntryOpen, setIsEmployeeEntryOpen] = useState(false);
  const [devices, setDevices] = useState<Device[]>([{
    id: "1",
    deviceName: "HMD-01",
    assignedPerson: "John Doe",
    age: 32,
    gender: "Male",
    location: "Building A, Floor 2",
    mac: "AA:BB:CC:DD:EE:FF",
    status: "normal",
    heartRate: 72,
    temperature: 98.6,
    respiratoryRate: 16,
    height: "6'0\"",
    weight: "180 lbs",
    bloodGroup: "O+",
    contactNumber: "+1-555-0123",
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
    respiratoryRateHistory: [{
      time: "09:00",
      value: 14
    }, {
      time: "10:00",
      value: 16
    }, {
      time: "11:00",
      value: 15
    }, {
      time: "12:00",
      value: 17
    }, {
      time: "13:00",
      value: 16
    }, {
      time: "14:00",
      value: 16
    }],
    previousWork: [{
      id: "w1",
      date: "2024-06-20",
      title: "Safety Inspection Report",
      description: "Building A safety compliance check",
      type: "PDF",
      downloadUrl: "/reports/safety-inspection-john.pdf"
    }, {
      id: "w2",
      date: "2024-06-18",
      title: "Equipment Maintenance Log",
      description: "HVAC system maintenance documentation",
      type: "XLSX",
      downloadUrl: "/reports/maintenance-log-john.xlsx"
    }, {
      id: "w3",
      date: "2024-06-15",
      title: "Training Completion Certificate",
      description: "Fire safety training completion",
      type: "PDF",
      downloadUrl: "/reports/training-cert-john.pdf"
    }]
  }, {
    id: "2",
    deviceName: "HMD-02",
    assignedPerson: "Sarah Smith",
    age: 28,
    gender: "Female",
    location: "Building B, Floor 1",
    mac: "11:22:33:44:55:66",
    status: "warning",
    heartRate: 85,
    temperature: 99.2,
    respiratoryRate: 22,
    height: "5'6\"",
    weight: "140 lbs",
    bloodGroup: "A-",
    contactNumber: "+1-555-0456",
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
    respiratoryRateHistory: [{
      time: "09:00",
      value: 18
    }, {
      time: "10:00",
      value: 20
    }, {
      time: "11:00",
      value: 22
    }, {
      time: "12:00",
      value: 24
    }, {
      time: "13:00",
      value: 23
    }, {
      time: "14:00",
      value: 22
    }],
    previousWork: [{
      id: "w4",
      date: "2024-06-22",
      title: "Quality Control Report",
      description: "Product quality assessment for line B",
      type: "PDF",
      downloadUrl: "/reports/quality-control-sarah.pdf"
    }, {
      id: "w5",
      date: "2024-06-19",
      title: "Inventory Count Sheet",
      description: "Weekly inventory verification",
      type: "XLSX",
      downloadUrl: "/reports/inventory-sarah.xlsx"
    }]
  }]);

  // Auto-select first device on load
  useEffect(() => {
    if (devices.length > 0 && !selectedDevice) {
      setSelectedDevice(devices[0]);
    }
  }, [devices, selectedDevice]);
  const handleConnect = (deviceId: string) => {
    setDevices(prev => prev.map(device => device.id === deviceId ? {
      ...device,
      connected: !device.connected
    } : device));
    if (selectedDevice?.id === deviceId) {
      setSelectedDevice(prev => prev ? {
        ...prev,
        connected: !prev.connected
      } : null);
    }
  };
  const getConnectionStatus = () => {
    const connected = devices.filter(d => d.connected).length;
    const total = devices.length;
    return {
      connected,
      total
    };
  };
  const handleDeviceSelect = (deviceId: string) => {
    const device = devices.find(d => d.id === deviceId);
    if (device) {
      setSelectedDevice(device);
    }
  };
  const handleDownload = (workEntry: WorkEntry) => {
    // Simulate download - in real app this would trigger actual file download
    console.log(`Downloading ${workEntry.title} for ${selectedDevice?.assignedPerson}`);
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

  const getDisplayName = () => {
    if (!selectedDevice) return "";
    return selectedDevice.assignedPerson || selectedDevice.deviceName;
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getWorkEntryDisplayName = () => {
    if (!selectedDevice) return "";
    if (selectedDevice.assignedPerson) {
      return selectedDevice.assignedPerson;
    }
    return `${selectedDevice.deviceName} - ${getCurrentDate()}`;
  };

  return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 animate-fade-in">
        <div className="flex items-center space-x-8">
          <div className="transform transition-all duration-300 hover:scale-105">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Device Health Overview</h1>
            <div className="flex items-center space-x-6 mt-2">
              <p className="text-gray-500 text-sm font-medium">{getCurrentDate()}</p>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-600">Live Monitoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-white hover:shadow-md transition-all duration-200 rounded-xl">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-white hover:shadow-md transition-all duration-200 rounded-xl relative">
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </Button>
          
          {/* Employee Entry Dialog */}
          <Dialog open={isEmployeeEntryOpen} onOpenChange={setIsEmployeeEntryOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" className="text-gray-600 hover:bg-white hover:shadow-md transition-all duration-200 rounded-xl px-4 py-2">
                <UserPlus className="w-4 h-4 mr-2" />
                Employee Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-0 rounded-3xl shadow-2xl animate-scale-in">
              <DialogHeader className="pb-6 border-b border-gray-100">
                <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <UserPlus className="w-5 h-5 text-white" />
                  </div>
                  <span>Employee Entry</span>
                </DialogTitle>
              </DialogHeader>
              <div className="pt-6">
                <EmployeeEntry onBack={() => setIsEmployeeEntryOpen(false)} />
              </div>
            </DialogContent>
          </Dialog>
          
          <Button onClick={onLogout} variant="ghost" className="text-gray-600 hover:bg-white hover:shadow-md hover:text-red-600 transition-all duration-200 rounded-xl px-4 py-2">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 h-[calc(100vh-10rem)]">
        {/* Left Sidebar - Device Profile */}
        <div className="lg:col-span-1 flex flex-col space-y-6 animate-fade-in">
          <Card className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-0 flex-1 hover:shadow-2xl transition-all duration-300 hover:bg-white">
            <CardContent className="p-8">
              {/* Device Selection Dropdown */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Device</label>
                <Select value={selectedDevice?.id || ""} onValueChange={handleDeviceSelect}>
                  <SelectTrigger className="w-full bg-white/70 backdrop-blur-sm border-gray-200/50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 h-12">
                    <SelectValue placeholder="Choose a device" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-md border border-gray-200 shadow-2xl z-50 rounded-2xl">
                    {devices.map(device => <SelectItem key={device.id} value={device.id} className="cursor-pointer hover:bg-gray-50/80 rounded-xl m-1 transition-all duration-200">
                        <div className="flex items-center space-x-4 w-full py-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                            <Monitor className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-900">{device.deviceName}</span>
                              <div className="flex items-center space-x-3">
                                <Badge className={`text-xs px-3 py-1 rounded-full font-medium ${device.status === 'normal' ? 'bg-green-100 text-green-700 border-green-200' : device.status === 'warning' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                                  {device.status}
                                </Badge>
                                <div className={`w-2 h-2 rounded-full ${device.connected ? 'bg-green-400 animate-pulse shadow-lg shadow-green-400/50' : 'bg-gray-400'}`}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              {selectedDevice ? <div className="text-center h-full flex flex-col justify-between animate-fade-in">
                  <div className="mb-6">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-xl transform hover:scale-110 transition-all duration-300">
                      <Monitor className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedDevice.deviceName}</h3>
                    <p className="text-gray-600 text-sm font-medium">Assigned to: {selectedDevice.assignedPerson}</p>
                    <p className="text-gray-500 text-xs mt-1 font-mono bg-gray-50 px-3 py-1 rounded-full inline-block">MAC: {selectedDevice.mac}</p>
                    
                    {/* Connection Status */}
                    <div className="flex items-center justify-center space-x-3 mt-4 bg-gray-50/50 rounded-2xl py-3">
                      <div className={`w-3 h-3 rounded-full ${selectedDevice.connected ? 'bg-green-400 animate-pulse shadow-lg shadow-green-400/50' : 'bg-red-400 shadow-lg shadow-red-400/50'}`}></div>
                      <span className={`text-sm font-semibold ${selectedDevice.connected ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedDevice.connected ? 'Connected' : 'Disconnected'}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className="mt-4">
                      <Badge className={`px-4 py-2 rounded-2xl font-semibold ${selectedDevice.status === 'normal' ? 'bg-green-100 text-green-800 border-green-200' : selectedDevice.status === 'warning' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                        Status: {selectedDevice.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Connect Button */}
                  <Button 
                    onClick={() => handleConnect(selectedDevice.id)} 
                    className={`w-full h-12 rounded-2xl font-semibold text-white shadow-lg transform hover:scale-105 transition-all duration-300 ${selectedDevice.connected ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-red-500/30' : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-green-500/30'}`}
                  >
                    {selectedDevice.connected ? <>
                        <WifiOff className="w-5 h-5 mr-3" />
                        Disconnect Device
                      </> : <>
                        <Wifi className="w-5 h-5 mr-3" />
                        Connect Device
                      </>}
                  </Button>
                </div> : <div className="text-center py-12 animate-fade-in">
                  <Monitor className="w-20 h-20 mx-auto mb-6 opacity-30" />
                  <p className="text-gray-500 font-medium">Select a device to begin</p>
                </div>}
            </CardContent>
          </Card>

          {/* Employee Details */}
          <Card className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-0 flex-1 hover:shadow-2xl transition-all duration-300 hover:bg-white">
            <CardHeader className="pb-4 px-8 pt-8">
              <CardTitle className="text-gray-900 text-lg font-bold">Employee Details</CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              {selectedDevice ? <div className="space-y-4 animate-fade-in">
                  {/* Employee Selection Dropdown */}
                  <div className="mb-4">
                    <Select value={selectedDevice.id} onValueChange={handleDeviceSelect}>
                      <SelectTrigger className="w-full bg-white/70 backdrop-blur-sm border-gray-200/50 rounded-2xl h-11 shadow-sm hover:shadow-md transition-all duration-200">
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-md border border-gray-200 shadow-2xl z-50 rounded-2xl">
                        {devices.map(device => <SelectItem key={device.id} value={device.id} className="cursor-pointer hover:bg-gray-50/80 rounded-xl m-1 transition-all duration-200">
                            <div className="flex items-center space-x-3 py-1">
                              <User className="w-5 h-5 text-blue-600" />
                              <span className="font-medium">{device.assignedPerson}</span>
                            </div>
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Employee Information */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl transform hover:scale-105 transition-all duration-200">
                      <User className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wide">Name</p>
                        <p className="text-sm font-bold text-gray-900 truncate">{selectedDevice.assignedPerson}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl transform hover:scale-105 transition-all duration-200">
                        <Ruler className="w-6 h-6 text-green-600 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wide">Height</p>
                          <p className="text-sm font-bold text-gray-900">{selectedDevice.height}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl transform hover:scale-105 transition-all duration-200">
                        <Weight className="w-6 h-6 text-purple-600 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wide">Weight</p>
                          <p className="text-sm font-bold text-gray-900">{selectedDevice.weight}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-2xl transform hover:scale-105 transition-all duration-200">
                      <Droplets className="w-6 h-6 text-red-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wide">Blood Group</p>
                        <p className="text-sm font-bold text-gray-900">{selectedDevice.bloodGroup}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl transform hover:scale-105 transition-all duration-200">
                      <Phone className="w-6 h-6 text-orange-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wide">Contact</p>
                        <p className="text-sm font-bold text-gray-900">{selectedDevice.contactNumber}</p>
                      </div>
                    </div>
                  </div>
                </div> : <div className="text-center py-12 text-gray-500 animate-fade-in">
                  <User className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="text-sm font-medium">Select a device to view employee details</p>
                </div>}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-4">
          {selectedDevice ? <div className="space-y-6 h-full animate-fade-in">
              {/* Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* Blood Pressure Card */}
                <Card className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border-0 hover:shadow-xl hover:bg-white transform hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Power className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wide">Blood Pressure</h3>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-2xl font-bold text-gray-900">{selectedDevice.connected ? '120/80' : '--/--'}</span>
                          <span className="text-xs text-gray-500 font-medium">mmHg</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Heart Rate Card */}
                <Card className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border-0 hover:shadow-xl hover:bg-white transform hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Heart className={`w-6 h-6 text-white ${selectedDevice.connected ? 'animate-pulse' : ''}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wide">Heart Rate</h3>
                        <div className="flex items-baseline space-x-2 mt-2">
                          <span className="text-2xl font-bold text-gray-900">{selectedDevice.connected ? selectedDevice.heartRate : '--'}</span>
                          <span className="text-xs text-gray-500 font-medium">bpm</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Temperature Card */}
                <Card className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border-0 hover:shadow-xl hover:bg-white transform hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Thermometer className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wide">Temperature</h3>
                        <div className="flex items-baseline space-x-2 mt-2">
                          <span className="text-2xl font-bold text-gray-900">{selectedDevice.connected ? selectedDevice.temperature : '--'}</span>
                          <span className="text-xs text-gray-500 font-medium">°F</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Respiratory Rate Card */}
                <Card className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border-0 hover:shadow-xl hover:bg-white transform hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Wind className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wide">Respiratory Rate</h3>
                        <div className="flex items-baseline space-x-2 mt-2">
                          <span className="text-2xl font-bold text-gray-900">{selectedDevice.connected ? selectedDevice.respiratoryRate : '--'}</span>
                          <span className="text-xs text-gray-500 font-medium">bpm</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Activity Card */}
                <Card className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border-0 hover:shadow-xl hover:bg-white transform hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Activity className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wide">Body Motion</h3>
                        <div className="flex items-baseline space-x-2 mt-2">
                          <span className="text-2xl font-bold text-gray-900">{selectedDevice.connected ? 'Active' : 'Inactive'}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Activity Growth Chart */}
              <Card className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-0 flex-1 hover:shadow-2xl hover:bg-white transition-all duration-300">
                <CardHeader className="pb-4 px-8 pt-8">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-gray-900 text-xl font-bold">Live Monitoring - {selectedDevice.deviceName}</CardTitle>
                    <div className="flex items-center space-x-3 bg-gray-50/50 px-4 py-2 rounded-2xl">
                      <div className={`w-3 h-3 rounded-full ${selectedDevice.connected ? 'bg-green-400 animate-pulse shadow-lg shadow-green-400/50' : 'bg-gray-400'}`}></div>
                      <span className="text-sm font-semibold text-gray-700">
                        {selectedDevice.connected ? 'Live' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  {selectedDevice.connected ? <div className="h-72 animate-fade-in">
                      <VitalChart title="Vital Signs" subtitle="Real-time monitoring" heartRateData={selectedDevice.heartRateHistory} temperatureData={selectedDevice.temperatureHistory} respiratoryRateData={selectedDevice.respiratoryRateHistory} heartRateLatest={`${selectedDevice.heartRate} bpm`} temperatureLatest={`${selectedDevice.temperature}°F`} respiratoryRateLatest={`${selectedDevice.respiratoryRate} bpm`} status={selectedDevice.status} bloodGroup={selectedDevice.bloodGroup} activity={selectedDevice.connected ? 'Active' : 'Inactive'} />
                    </div> : <div className="flex items-center justify-center h-48 text-gray-500 animate-fade-in">
                      <div className="text-center">
                        <WifiOff className="w-16 h-16 mx-auto mb-4 opacity-30" />
                        <p className="text-lg font-semibold">Device Disconnected</p>
                        <p className="text-sm">Connect to view live data</p>
                      </div>
                    </div>}
                </CardContent>
              </Card>
              
              {/* Previous Work Section */}
              {selectedDevice && <Card className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-0 hover:shadow-2xl hover:bg-white transition-all duration-300">
                  <CardHeader className="pb-4 px-8 pt-8">
                    <CardTitle className="text-gray-900 text-xl font-bold">Previous Work Documents</CardTitle>
                    <p className="text-sm text-gray-600 font-medium">Employee: {selectedDevice.assignedPerson || 'Unassigned'} | Device: {selectedDevice.deviceName}</p>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    <div className="space-y-4">
                      {selectedDevice.previousWork.map((work, index) => <div key={work.id} className={`flex items-center justify-between p-6 bg-white border border-gray-200/50 rounded-3xl hover:border-gray-300 hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 animate-fade-in`} style={{animationDelay: `${index * 100}ms`}}>
                          <div className="flex items-start space-x-6 flex-1">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-lg">
                              <FileText className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="font-bold text-gray-900 text-lg mb-2">{work.title}</h4>
                                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{work.description}</p>
                                  
                                  {/* Person/Device Name and Date */}
                                  <div className="space-y-2">
                                    <div className="flex items-center space-x-3 bg-gray-50/50 px-4 py-2 rounded-2xl inline-flex">
                                      <User className="w-4 h-4 text-gray-500" />
                                      <span className="text-sm font-bold text-gray-800">
                                        {selectedDevice.assignedPerson || selectedDevice.deviceName}
                                      </span>
                                    </div>
                                    <div className="text-sm text-gray-500 font-medium ml-2">
                                      {formatDate(work.date)}
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center space-x-3 mt-4">
                                    <Badge variant="outline" className="text-xs bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 font-semibold px-3 py-1 rounded-2xl">
                                      {work.type}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Button 
                            onClick={() => handleDownload(work)} 
                            size="sm" 
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-2xl ml-6 flex-shrink-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>)}
                      {selectedDevice.previousWork.length === 0 && <div className="text-center py-16 text-gray-500 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl animate-fade-in">
                          <FileText className="w-20 h-20 mx-auto mb-6 opacity-30" />
                          <h3 className="text-xl font-bold text-gray-700 mb-2">No Work Documents</h3>
                          <p className="text-sm font-medium">No previous work records found for {selectedDevice.assignedPerson || selectedDevice.deviceName}</p>
                          <p className="text-xs text-gray-400 mt-1">Device: {selectedDevice.deviceName}</p>
                        </div>}
                    </div>
                  </CardContent>
                </Card>}
            </div> : <Card className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-0 h-full flex items-center justify-center hover:shadow-2xl hover:bg-white transition-all duration-300">
              <CardContent>
                <div className="text-center text-gray-500 animate-fade-in">
                  <Monitor className="w-24 h-24 mx-auto mb-6 opacity-30" />
                  <p className="text-2xl font-bold text-gray-700 mb-2">Select a Device</p>
                  <p className="text-sm font-medium">Choose a device to view health monitoring status</p>
                </div>
              </CardContent>
            </Card>}
        </div>
      </div>
    </div>;
};
export default DashboardPage;
