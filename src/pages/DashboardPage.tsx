import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart, Thermometer, User, MapPin, Wifi, LogOut, Settings, Ruler, Weight, Droplets, WifiOff, Power, Download, FileText, UserPlus, Activity, Zap, Wind, Monitor, Phone } from "lucide-react";
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
    deviceName: "CCMD-01",
    assignedPerson: "Dhanush R",
    age: 32,
    gender: "Male",
    location: "Building A, Floor 2",
    mac: "AA:BB:CC:DD:EE:FF",
    status: "normal",
    heartRate: 72,
    temperature: 98.6,
    respiratoryRate: 16,
    height: "6'0\"",
    weight: "70 kg",
    bloodGroup: "O+",
    contactNumber: "+91 98877 66554",
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
    deviceName: "CCMD-02",
    assignedPerson: "Silambarasan KA",
    age: 28,
    gender: "Male",
    location: "Building B, Floor 1",
    mac: "11:22:33:44:55:66",
    status: "warning",
    heartRate: 85,
    temperature: 99.2,
    respiratoryRate: 22,
    height: "5'8\"",
    weight: "55 kg",
    bloodGroup: "A-",
    contactNumber: "+91 69814 22374",
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
      value: 99.2
    }, {
      time: "12:00",
      value: 99.4
    }, {
      time: "13:00",
      value: 99.1
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
      value: 21
    }, {
      time: "14:00",
      value: 22
    }],
    previousWork: [{
      id: "w4",
      date: "2024-06-19",
      title: "Health Assessment Report",
      description: "Annual health checkup results",
      type: "PDF",
      downloadUrl: "/reports/health-assessment-sarah.pdf"
    }, {
      id: "w5",
      date: "2024-06-16",
      title: "Training Records",
      description: "Safety training completion records",
      type: "XLSX",
      downloadUrl: "/reports/training-records-sarah.xlsx"
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
  return <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-2 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 lg:mb-6 space-y-3 lg:space-y-0 animate-fade-in">
        <div className="flex flex-col space-y-2">
          <h1 className="text-lg lg:text-xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
            Cold Chamber Monitoring Device
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <p className="text-gray-600 text-xs font-medium">{getCurrentDate()}</p>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 font-medium">System Online</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          {/* Employee Entry Dialog */}
          <Dialog open={isEmployeeEntryOpen} onOpenChange={setIsEmployeeEntryOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="text-gray-700 hover:text-gray-900 hover:bg-blue-50 border-gray-300 hover:border-blue-300 transition-all duration-300 ease-in-out transform hover:scale-105 w-full sm:w-auto text-xs px-2 py-1"
              >
                <UserPlus className="w-3 h-3 mr-1" />
                Employee Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <EmployeeEntry onBack={() => setIsEmployeeEntryOpen(false)} />
            </DialogContent>
          </Dialog>
          
          <Button 
            onClick={onLogout} 
            variant="outline" 
            className="text-gray-700 hover:text-red-600 hover:bg-red-50 border-gray-300 hover:border-red-300 transition-all duration-300 ease-in-out transform hover:scale-105 w-full sm:w-auto text-xs px-2 py-1"
          >
            <LogOut className="w-3 h-3 mr-1" />
            Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-3 h-[calc(100vh-8rem)]">
        {/* Left Sidebar - Device Profile */}
        <div className="px-2 xl:col-span-1 flex flex-col space-y-3 mb-4 xl:mb-0 h-full">
          <Card className="bg-white rounded-3xl shadow-lg border-0 flex-1 transform transition-all duration-300 hover:shadow-xl p-2">
              <CardContent className="p-2 m-auto">
                              {/* Device Selection Dropdown */}
                <div className="mb-3 text-center">
                <Select value={selectedDevice?.id || ""} onValueChange={handleDeviceSelect}>
                  <SelectTrigger className="w-full bg-white border-2 border-gray-200 hover:border-blue-300 transition-colors duration-300 rounded-xl">
                    <SelectValue placeholder="Select a device" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-xl z-50 rounded-xl">
                    {devices.map(device => (
                      <SelectItem key={device.id} value={device.id} className="cursor-pointer hover:bg-blue-50 transition-colors duration-200">
                                                  <div className="flex items-center space-x-2 w-full">
                            <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center">
                              <Monitor className="w-3 h-3 text-blue-600" />
                            </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between space-x-1">
                              <span className="font-medium text-gray-900 text-s">{device.deviceName}</span>
                              <div className="flex items-center space-x-2">
                                <Badge className={`text-[8px] px-1 py-0.5 ${device.status === 'normal' ? 'bg-green-100 text-green-800' : device.status === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                  {device.status}
                                </Badge>
                                <div className={`w-2 h-2 rounded-full ${device.connected ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedDevice ? (
                <div className="text-center h-full flex flex-col justify-between animate-fade-in">
                  <div className="mb-4">
                    <div className="w-16 h-16 mx-auto mb-2 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110">
                      <Monitor className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-[16px] font-bold text-gray-900 mb-1">{selectedDevice.deviceName}</h3>
                    <p className="text-gray-600 text-[10px] mb-1">Assigned to: {selectedDevice.assignedPerson}</p>
                    <p className="text-gray-500 text-[10px] mb-1">MAC: {selectedDevice.mac}</p>
                    
                    {/* Connection Status */}
                    <div className="flex items-center justify-center space-x-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${selectedDevice.connected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                      <span className={`text-[10px] font-medium ${selectedDevice.connected ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedDevice.connected ? 'Connected' : 'Disconnected'}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className="mb-2">
                      <Badge className={`text-[10px] px-2 py-0.5 ${selectedDevice.status === 'normal' ? 'bg-green-100 text-green-800' : selectedDevice.status === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        Status: {selectedDevice.status.charAt(0).toUpperCase() + selectedDevice.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Connect Button */}
                  <Button 
                    onClick={() => handleConnect(selectedDevice.id)} 
                    className={`w-full py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-xs ${
                      selectedDevice.connected 
                        ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' 
                        : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                    } text-white shadow-lg hover:shadow-xl`}
                  >
                    {selectedDevice.connected ? (
                      <>
                        <WifiOff className="w-3 h-3 mr-1" />
                        Disconnect
                      </>
                    ) : (
                      <>
                        <Wifi className="w-3 h-3 mr-1" />
                        Connect
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="text-center py-6 animate-fade-in">
                  <Monitor className="w-16 h-16 mx-auto mb-3 opacity-50" />
                  <p className="text-gray-500 font-medium text-xs">Select a device</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Employee Details */}
          <Card className="bg-white rounded-3xl shadow-lg border-0 flex-1 transform transition-all duration-300 hover:shadow-xl">
            <CardHeader className="pb-2 px-3 pt-3">
              <CardTitle className="text-gray-900 text-[16px] font-semibold">Employee Details</CardTitle>
            </CardHeader>
                          <CardContent className="p-3 pt-0">
                <div className="space-y-2 animate-fade-in">
                  {/* Employee Selection Dropdown */}
                  <div className="mb-2">
                  <Select value={selectedDevice?.id || ""} onValueChange={handleDeviceSelect}>
                    <SelectTrigger className="w-full bg-white border-2 border-gray-200 hover:border-blue-300 transition-colors duration-300 rounded-lg text-[8px] h-6">
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-xl z-50 rounded-xl">
                      {devices.map(device => (
                        <SelectItem key={device.id} value={device.id} className="cursor-pointer hover:bg-blue-50 transition-colors duration-200">
                          <div className="flex items-center space-x-2">
                            <User className="w-3 h-3 text-blue-600" />
                            <span className="text-[11px] font-medium text-gray-900">{device.assignedPerson}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                                  {/* Employee Information - Only show if employee is selected */}
                  {selectedDevice && (
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1 p-1 bg-gradient-to-r from-gray-50 to-blue-50 rounded-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
                        <User className="w-3 h-3 text-blue-600 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[8px] text-gray-500 mb-0.5 font-medium">Name</p>
                          <p className="text-[12px] font-semibold text-gray-900 truncate">{selectedDevice.assignedPerson}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                        <div className="flex items-center space-x-1 p-1 bg-gradient-to-r from-gray-50 to-green-50 rounded-md border border-gray-100 hover:border-green-200 transition-all duration-300">
                          <Ruler className="w-3 h-3 text-green-600 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-[8px] text-gray-500 mb-0.5 font-medium">Height</p>
                            <p className="text-xs font-semibold text-gray-900">{selectedDevice.height}</p>
                        </div>
                      </div>
                         <div className="flex items-center space-x-1 p-1 bg-gradient-to-r from-gray-50 to-purple-50 rounded-md border border-gray-100 hover:border-purple-200 transition-all duration-300">
                          <Weight className="w-3 h-3 text-purple-600 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-[8px] text-gray-500 mb-0.5 font-medium">Weight</p>
                            <p className="text-xs font-semibold text-gray-900">{selectedDevice.weight}</p>
                        </div>
                      </div>
                    </div>
                      <div className="flex items-center space-x-1 p-1 bg-gradient-to-r from-gray-50 to-red-50 rounded-md border border-gray-100 hover:border-red-200 transition-all duration-300">
                        <Droplets className="w-3 h-3 text-red-600 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[8px] text-gray-500 mb-0.5 font-medium">Blood Group</p>
                          <p className="text-xs font-semibold text-gray-900">{selectedDevice.bloodGroup}</p>
                      </div>
                    </div>
                      <div className="flex items-center space-x-1 p-1 bg-gradient-to-r from-gray-50 to-orange-50 rounded-md border border-gray-100 hover:border-orange-200 transition-all duration-300">
                        <Phone className="w-3 h-3 text-orange-600 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[8px] text-gray-500 mb-0.5 font-medium">Contact</p>
                          <p className="text-xs font-semibold text-gray-900">{selectedDevice.contactNumber}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="xl:col-span-3 h-full">
          {selectedDevice ? (
            <div className="space-y-2 h-full animate-fade-in overflow-y-auto">
              {/* Status Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
                {/* Heart Rate Card */}
                <Card className="bg-white rounded-2xl shadow-lg border-spacing-2 transform transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <CardContent className="p-2">
                    <div className="flex items-center space-x-1">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-100 to-red-200 rounded-md flex items-center justify-center">
                        <Heart className={`w-5 h-5 text-red-600 ${selectedDevice.connected ? 'animate-heartbeat' : ''}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-[12px]">Heart Rate</h3>
                        <div className="flex items-baseline space-x-1 mt-0.5">
                          <span className="text-sm font-bold text-gray-900">{selectedDevice.connected ? selectedDevice.heartRate : '--'}</span>
                          <span className="text-[8px] text-gray-400">bpm</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Temperature Card */}
                <Card className="bg-white rounded-2xl shadow-lg border-0 transform transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <CardContent className="p-2">
                    <div className="flex items-center space-x-1">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-md flex items-center justify-center">
                        <Thermometer className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-[12px]">Temperature</h3>
                        <div className="flex items-center space-x-1 mt-0.5">
                          <span className="text-sm font-bold text-gray-900">{selectedDevice.connected ? selectedDevice.temperature : '--'}</span>
                          <span className="text-[8px] text-gray-400">°F</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Respiratory Rate Card */}
                <Card className="bg-white rounded-2xl shadow-lg border-0 transform transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <CardContent className="p-2">
                    <div className="flex items-center space-x-1">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-md flex items-center justify-center">
                        <Wind className="w-5 h-5 text-cyan-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-[12px]">Respiratory Rate</h3>
                        <div className="flex items-baseline space-x-1 mt-0.5">
                          <span className="text-sm font-bold text-gray-900">{selectedDevice.connected ? selectedDevice.respiratoryRate : '--'}</span>
                          <span className="text-[8px] text-gray-400">bpm</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Blood Pressure Card */}
                <Card className="bg-white rounded-2xl shadow-lg border-0 transform transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <CardContent className="p-2">
                    <div className="flex items-center space-x-1">
                      <div className="w-8 h-8 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-md flex items-center justify-center">
                        <Power className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-[12px]">Blood Pressure</h3>
                        <div className="flex items-baseline space-x-1 mt-0.5">
                          <span className="text-sm font-bold text-gray-900">{selectedDevice.connected ? '120/80' : '--/--'}</span>
                          <span className="text-[8px] text-gray-400">mmHg</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Body Activity Card */}
                <Card className="bg-white rounded-2xl shadow-lg border-0 transform transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <CardContent className="p-2">
                    <div className="flex items-center space-x-1">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-green-200 rounded-md flex items-center justify-center">
                        <Activity className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-[12px]">Body Activity</h3>
                        <div className="flex items-baseline space-x-1 mt-0.5">
                          <span className="text-sm font-bold text-gray-900">{selectedDevice.connected ? 'Active' : 'Inactive'}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Activity Growth Chart */}
              <Card className="bg-white py-4 px-2 shadow-lg border-0 flex-1 transform transition-all duration-300 hover:shadow-xl">
                <CardHeader className="pb-2 px-3 pt-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
                    <CardTitle className="text-gray-900 text-sm font-bold">Live Monitoring - {selectedDevice.deviceName}</CardTitle>
                    <div className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${selectedDevice.connected ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                      <span className="text-xs text-gray-600 font-medium">
                        {selectedDevice.connected ? 'Live' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  {selectedDevice.connected ? (
                    <div className="h-48 min-h-[200px]">
                      <VitalChart 
                        title="Vital Signs" 
                        subtitle="Real-time monitoring" 
                        heartRateData={selectedDevice.heartRateHistory} 
                        temperatureData={selectedDevice.temperatureHistory} 
                        respiratoryRateData={selectedDevice.respiratoryRateHistory} 
                        heartRateLatest={`${selectedDevice.heartRate} bpm`} 
                        temperatureLatest={`${selectedDevice.temperature}°F`} 
                        respiratoryRateLatest={`${selectedDevice.respiratoryRate} bpm`} 
                        bloodPressureLatest="120/80 mmHg"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-44 text-gray-500">
                      <div className="text-center">
                        <WifiOff className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm font-medium">Device Disconnected</p>
                        <p className="text-xs text-gray-400">Connect to view live data</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Previous Work Section */}
              {selectedDevice && (
                <Card className="bg-white rounded-3xl shadow-lg border-0 transform transition-all duration-300 hover:shadow-xl">
                                  <CardHeader className="pb-2 px-3 pt-3">
                  <CardTitle className="text-gray-900 text-sm font-bold">Device Work History - {selectedDevice.deviceName}</CardTitle>
                  <p className="text-xs text-gray-600">{getCurrentDate()}</p>
                </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <div className="space-y-2">
                      {selectedDevice.previousWork.map(work => (
                        <div key={work.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-all duration-300 transform hover:scale-[1.02]">
                          <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                              <FileText className="w-4 h-4 text-blue-600" />
                            </div>
                              <div>
                                <p className="font-semibold text-gray-900 text-xs">{work.title}</p>
                                
                                <div className="flex flex-col sm:flex-row sm:items-center space-y-0.5 sm:space-y-0 sm:space-x-1 mt-0.5">
                                  <span className="text-[8px] text-gray-500">{formatDate(work.date)}</span>
                                  <span className="hidden sm:inline text-[8px] text-gray-400">•</span>
                                  <Badge variant="outline" className="text-[8px] px-1 py-0.5 w-fit">
                                    {work.type}
                                  </Badge>
                                  <span className="hidden sm:inline text-[8px] text-gray-400">•</span>
                                  <span className="text-[8px] text-blue-600">Assigned: {selectedDevice.assignedPerson}</span>
                                </div>
                              </div>
                          </div>
                          <Button 
                            onClick={() => handleDownload(work)} 
                            size="sm" 
                            variant="outline" 
                            className="shrink-0 bg-white hover:bg-blue-50 border-gray-300 hover:border-blue-300 transition-all duration-300 transform hover:scale-105 text-[8px] px-2 py-1"
                          >
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                      {selectedDevice.previousWork.length === 0 && (
                        <div className="text-center py-6 text-gray-500">
                          <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p className="text-sm font-medium">No work history found for device {selectedDevice.deviceName}</p>
                          <p className="text-xs text-gray-400">Device: {selectedDevice.deviceName}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card className="bg-white rounded-3xl shadow-lg border-0 h-full flex items-center justify-center transform transition-all duration-300 hover:shadow-xl">
              <CardContent>
                <div className="text-center text-gray-500 animate-fade-in">
                  <Monitor className="w-20 h-20 mx-auto mb-4 opacity-50" />
                  <p className="text-xl font-bold">Select a Device</p>
                  <p className="text-sm text-gray-400">Choose a device to view health monitoring status</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>;
};
export default DashboardPage;