import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  ArrowLeft, 
  Search, 
  Download, 
  Eye, 
  Heart, 
  Thermometer,
  User,
  Calendar,
  UserPlus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import EmployeeEntry from "./EmployeeEntry";

interface EmployeeRecordsProps {
  onBack: () => void;
}

interface Employee {
  id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  status: 'normal' | 'warning' | 'critical';
  photo: string;
  lastReading: string;
  totalReadings: number;
}

const EmployeeRecords = ({ onBack }: EmployeeRecordsProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isEntryDialogOpen, setIsEntryDialogOpen] = useState(false);

  // Sample employee data
  const employees: Employee[] = [
    {
      id: "EMP-001",
      name: "John Doe",
      age: 35,
      gender: "male",
      location: "Building A, Room 101",
      status: "normal",
      photo: "/placeholder.svg",
      lastReading: "2024-01-15 14:30",
      totalReadings: 1247
    },
    {
      id: "EMP-002",
      name: "Jane Smith",
      age: 28,
      gender: "female",
      location: "Building B, Room 205",
      status: "warning",
      photo: "/placeholder.svg",
      lastReading: "2024-01-15 14:25",
      totalReadings: 892
    },
    {
      id: "EMP-003",
      name: "Mike Johnson",
      age: 42,
      gender: "male",
      location: "Building C, Room 301",
      status: "normal",
      photo: "/placeholder.svg",
      lastReading: "2024-01-15 14:20",
      totalReadings: 1563
    }
  ];

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-500 hover:bg-green-600';
      case 'warning': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'critical': return 'bg-red-500 hover:bg-red-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const handleDownloadReport = (employee: Employee) => {
    // Simulate report download
    toast({
      title: "Report Downloaded",
      description: `${employee.name}'s vital signs report has been downloaded.`,
    });
  };

  const handleViewDetails = (employee: Employee) => {
    setSelectedEmployee(employee);
    // In a real app, this would navigate to detailed view
    toast({
      title: "View Details",
      description: `Opening detailed view for ${employee.name}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10"
            onClick={onBack}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">Employee Records</h1>
            <p className="text-gray-300">View and download employee vital signs records</p>
          </div>
        </div>
        
        {/* Employee Entry Details Button */}
        <Dialog open={isEntryDialogOpen} onOpenChange={setIsEntryDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Employee Entry Details
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-white/20">
            <DialogHeader>
              <DialogTitle className="text-white text-2xl">Add New Employee</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <EmployeeEntry onBack={() => setIsEntryDialogOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Search Bar */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name or employee ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
            </div>
          </CardContent>
        </Card>

        {/* Employee List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <Card key={employee.id} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={employee.photo} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                        <User className="w-6 h-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-white font-semibold">{employee.name}</h3>
                      <p className="text-gray-300 text-sm">{employee.id}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(employee.status)}>
                    {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Last Reading: {employee.lastReading}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-red-400" />
                    <span>Total Readings: {employee.totalReadings}</span>
                  </div>
                  <p><strong>Location:</strong> {employee.location}</p>
                  <p><strong>Age:</strong> {employee.age} • <strong>Gender:</strong> {employee.gender}</p>
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="flex-1 text-white hover:bg-white/10"
                    onClick={() => handleViewDetails(employee)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                    onClick={() => handleDownloadReport(employee)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-8 text-center">
              <p className="text-gray-300">No employees found matching your search.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EmployeeRecords;
