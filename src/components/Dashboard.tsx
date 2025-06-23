
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Monitor, 
  LogOut, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Settings,
  Users,
  BarChart3,
  Wifi,
  WifiOff,
  Volume2,
  VolumeX
} from "lucide-react";
import TVCard from "./TVCard";
import StatusPanel from "./StatusPanel";

interface DashboardProps {
  onLogout: () => void;
}

interface TVDevice {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'warning';
  lastSeen: string;
  resolution: string;
  temperature: number;
  volume: number;
  channel: string;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [tvDevices, setTvDevices] = useState<TVDevice[]>([
    {
      id: "TV-001",
      name: "Lobby Main Display",
      location: "Main Lobby",
      status: "online",
      lastSeen: "2 minutes ago",
      resolution: "4K",
      temperature: 42,
      volume: 75,
      channel: "CNN"
    },
    {
      id: "TV-002", 
      name: "Conference Room A",
      location: "Meeting Room A",
      status: "online",
      lastSeen: "1 minute ago",
      resolution: "1080p",
      temperature: 38,
      volume: 0,
      channel: "Presentation Mode"
    },
    {
      id: "TV-003",
      name: "Cafeteria Display",
      location: "Employee Cafeteria", 
      status: "warning",
      lastSeen: "5 minutes ago",
      resolution: "1080p",
      temperature: 55,
      volume: 45,
      channel: "Local News"
    },
    {
      id: "TV-004",
      name: "Reception Area",
      location: "Front Desk",
      status: "offline",
      lastSeen: "2 hours ago",
      resolution: "720p", 
      temperature: 0,
      volume: 0,
      channel: "N/A"
    },
    {
      id: "TV-005",
      name: "Break Room",
      location: "Employee Break Room",
      status: "online",
      lastSeen: "30 seconds ago",
      resolution: "1080p",
      temperature: 40,
      volume: 60,
      channel: "Sports Center"
    },
    {
      id: "TV-006",
      name: "Training Room",
      location: "Training Center",
      status: "online",
      lastSeen: "1 minute ago",
      resolution: "4K",
      temperature: 35,
      volume: 80,
      channel: "Training Content"
    }
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const onlineCount = tvDevices.filter(tv => tv.status === 'online').length;
  const warningCount = tvDevices.filter(tv => tv.status === 'warning').length;
  const offlineCount = tvDevices.filter(tv => tv.status === 'offline').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Monitor className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">TV Monitoring Dashboard</h1>
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
          title="Total Devices"
          value={tvDevices.length.toString()}
          icon={<Monitor className="w-6 h-6" />}
          color="blue"
        />
        <StatusPanel
          title="Online"
          value={onlineCount.toString()}
          icon={<CheckCircle className="w-6 h-6" />}
          color="green"
        />
        <StatusPanel
          title="Warnings"
          value={warningCount.toString()}
          icon={<AlertTriangle className="w-6 h-6" />}
          color="yellow"
        />
        <StatusPanel
          title="Offline"
          value={offlineCount.toString()}
          icon={<Activity className="w-6 h-6" />}
          color="red"
        />
      </div>

      {/* TV Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tvDevices.map((tv) => (
          <TVCard key={tv.id} device={tv} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
