
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus, FileText, ArrowLeft, Plus } from "lucide-react";
import EmployeeEntry from "./EmployeeEntry";
import EmployeeRecords from "./EmployeeRecords";

interface AdminPageProps {
  onBack: () => void;
}

type AdminView = 'main' | 'records';

const AdminPage = ({ onBack }: AdminPageProps) => {
  const [currentView, setCurrentView] = useState<AdminView>('main');
  const [isEntryDialogOpen, setIsEntryDialogOpen] = useState(false);

  if (currentView === 'records') {
    return <EmployeeRecords onBack={() => setCurrentView('main')} />;
  }

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
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
            <p className="text-gray-300">Manage employees and records</p>
          </div>
        </div>
      </div>

      {/* Admin Options */}
      <div className="flex flex-col items-center space-y-8 max-w-4xl mx-auto">
        {/* Employee Entry Button */}
        <Dialog open={isEntryDialogOpen} onOpenChange={setIsEntryDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <UserPlus className="w-6 h-6 mr-3" />
              Employee Data Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-white/20">
            <DialogHeader>
              <DialogTitle className="text-white text-2xl">Add New Employee</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <EmployeeEntry onBack={() => setIsEntryDialogOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>

        {/* Employee Records Card */}
        <Card 
          className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group w-full max-w-md"
          onClick={() => setCurrentView('records')}
        >
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-white text-xl">Employee Records</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 text-center">
              View employee records, vital signs history, and download reports
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;
