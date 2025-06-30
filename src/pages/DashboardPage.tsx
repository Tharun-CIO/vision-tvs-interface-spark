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
  return <div className="h-screen bg-gray-50 p-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Device Health Overview</h1>
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
        {/* Left Sidebar - Device Profile */}
        <div className="lg:col-span-1 flex flex-col space-y-4">
          <Card className="bg-white rounded-2xl shadow-sm border-0 flex-1">
            <CardContent className="p-6">
              {/* Device Selection Dropdown */}
              <div className="mb-4">
                <Select value={selectedDevice?.id || ""} onValueChange={handleDeviceSelect}>
                  <SelectTrigger className="w-full bg-white border-gray-200">
                    <SelectValue placeholder="Select a device" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                    {devices.map(device => <SelectItem key={device.id} value={device.id} className="cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center space-x-3 w-full">
                          <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                            <Monitor className="w-3 h-3 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-900">{device.deviceName}</span>
                              <div className="flex items-center space-x-2">
                                <Badge className={`text-xs ${device.status === 'normal' ? 'bg-green-100 text-green-800' : device.status === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                  {device.status}
                                </Badge>
                                <div className={`w-1.5 h-1.5 rounded-full ${device.connected ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              {selectedDevice ? <div className="text-center h-full flex flex-col justify-between">
                  <div className="mb-4">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-2xl bg-blue-100 flex items-center justify-center">
                      <Monitor className="w-12 h-12 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{selectedDevice.deviceName}</h3>
                    <p className="text-gray-600 text-sm">Assigned to: {selectedDevice.assignedPerson}</p>
                    <p className="text-gray-500 text-xs mt-1">MAC: {selectedDevice.mac}</p>
                    
                    {/* Connection Status */}
                    <div className="flex items-center justify-center space-x-2 mt-3">
                      <div className={`w-2 h-2 rounded-full ${selectedDevice.connected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                      <span className={`text-xs ${selectedDevice.connected ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedDevice.connected ? 'Connected' : 'Disconnected'}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className="mt-3">
                      <Badge className={`${selectedDevice.status === 'normal' ? 'bg-green-100 text-green-800' : selectedDevice.status === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        Status: {selectedDevice.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Connect Button */}
                  <Button onClick={() => handleConnect(selectedDevice.id)} className={`w-full ${selectedDevice.connected ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}>
                    {selectedDevice.connected ? <>
                        <WifiOff className="w-4 h-4 mr-2" />
                        Disconnect
                      </> : <>
                        <Wifi className="w-4 h-4 mr-2" />
                        Connect
                      </>}
                  </Button>
                </div> : <div className="text-center">
                  <Monitor className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Select a device</p>
                </div>}
            </CardContent>
          </Card>

          {/* Employee Details */}
          <Card className="bg-white rounded-2xl shadow-sm border-0 flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-900 text-lg">Employee Details</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {selectedDevice ? (
                <div className="space-y-4">
                  {/* Employee Selection Dropdown */}
                  <div>
                    <Select value={selectedDevice.id} onValueChange={handleDeviceSelect}>
                      <SelectTrigger className="w-full bg-white border-gray-200">
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                        {devices.map(device => (
                          <SelectItem key={device.id} value={device.id} className="cursor-pointer hover:bg-gray-50">
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4 text-blue-600" />
                              <span>{device.assignedPerson}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Employee Information */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                      <User className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-500">Name</p>
                        <p className="text-sm font-medium text-gray-900">{selectedDevice.assignedPerson}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                      <Ruler className="w-4 h-4 text-green-600" />
                      <div>
                        <p className="text-xs text-gray-500">Height</p>
                        <p className="text-sm font-medium text-gray-900">{selectedDevice.height}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                      <Weight className="w-4 h-4 text-purple-600" />
                      <div>
                        <p className="text-xs text-gray-500">Weight</p>
                        <p className="text-sm font-medium text-gray-900">{selectedDevice.weight}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                      <Droplets className="w-4 h-4 text-red-600" />
                      <div>
                        <p className="text-xs text-gray-500">Blood Group</p>
                        <p className="text-sm font-medium text-gray-900">{selectedDevice.bloodGroup}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                      <Phone className="w-4 h-4 text-orange-600" />
                      <div>
                        <p className="text-xs text-gray-500">Contact Number</p>
                        <p className="text-sm font-medium text-gray-900">{selectedDevice.contactNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Select a device to view employee details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {selectedDevice ? <div className="space-y-4 h-full">
              {/* Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {/* Overall Status Card */}
                <Card className="bg-white rounded-2xl shadow-sm border-0">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Power className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-xs">Blood pressure</h3>
                        <div className="flex items-center space-x-1 mt-1">
                          <span className="text-lg font-bold text-gray-900">{selectedDevice.connected ? '120/80' : '--/--'}</span>
                          <span className="text-xs text-gray-400">mmHg</span>
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
                        <Heart className={`w-4 h-4 text-red-600 ${selectedDevice.connected ? 'animate-heartbeat' : ''}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-xs">Heart Rate</h3>
                        <div className="flex items-baseline space-x-1 mt-1">
                          <span className="text-lg font-bold text-gray-900">{selectedDevice.connected ? selectedDevice.heartRate : '--'}</span>
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
                          <span className="text-lg font-bold text-gray-900">{selectedDevice.connected ? selectedDevice.temperature : '--'}</span>
                          <span className="text-xs text-gray-400">°F</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Respiratory Rate Card */}
                <Card className="bg-white rounded-2xl shadow-sm border-0">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                        <Wind className="w-4 h-4 text-cyan-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-xs">Respiratory rate</h3>
                        <div className="flex items-baseline space-x-1 mt-1">
                          <span className="text-lg font-bold text-gray-900">{selectedDevice.connected ? selectedDevice.respiratoryRate : '--'}</span>
                          <span className="text-xs text-gray-400">bpm</span>
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
                        <h3 className="font-semibold text-gray-900 text-xs">Body motion</h3>
                        <div className="flex items-baseline space-x-1 mt-1">
                          <span className="text-lg font-bold text-gray-900">{selectedDevice.connected ? 'Active' : 'Inactive'}</span>
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
                    <CardTitle className="text-gray-900 text-lg">Live Monitoring - {selectedDevice.deviceName}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${selectedDevice.connected ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                      <span className="text-sm text-gray-500">
                        {selectedDevice.connected ? 'Live' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  {selectedDevice.connected ? <div className="h-60">
                      <VitalChart title="Vital Signs" subtitle="Real-time monitoring" heartRateData={selectedDevice.heartRateHistory} temperatureData={selectedDevice.temperatureHistory} respiratoryRateData={selectedDevice.respiratoryRateHistory} heartRateLatest={`${selectedDevice.heartRate} bpm`} temperatureLatest={`${selectedDevice.temperature}°F`} respiratoryRateLatest={`${selectedDevice.respiratoryRate} bpm`} status={selectedDevice.status} bloodGroup={selectedDevice.bloodGroup} activity={selectedDevice.connected ? 'Active' : 'Inactive'} />
                    </div> : <div className="flex items-center justify-center h-40 text-gray-500">
                      <div className="text-center">
                        <WifiOff className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Device disconnected</p>
                        <p className="text-xs">Connect to view live data</p>
                      </div>
                    </div>}
                </CardContent>
              </Card>
              
              {/* Previous Work Section */}
              {selectedDevice && <Card className="bg-white rounded-2xl shadow-sm border-0">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-gray-900 text-lg">Previous Work - {selectedDevice.assignedPerson}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-3">
                      {selectedDevice.previousWork.map(work => <div key={work.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
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
                          <Button onClick={() => handleDownload(work)} size="sm" variant="outline" className="shrink-0">
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        </div>)}
                      {selectedDevice.previousWork.length === 0 && <div className="text-center py-8 text-gray-500">
                          <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No previous work records found</p>
                        </div>}
                    </div>
                  </CardContent>
                </Card>}
            </div> : <Card className="bg-white rounded-2xl shadow-sm border-0 h-full flex items-center justify-center">
              <CardContent>
                <div className="text-center text-gray-500">
                  <Monitor className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Select a Device</p>
                  <p className="text-sm">Choose a device to view health monitoring status</p>
                </div>
              </CardContent>
            </Card>}
        </div>
      </div>
    </div>;
};
export default DashboardPage;
