
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus, FileText, ArrowLeft } from "lucide-react";
import EmployeeEntry from "../components/EmployeeEntry";
import EmployeeRecords from "../components/EmployeeRecords";

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
    <div className="min-h-screen bg-white p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-black">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            className="text-black border-2 border-black hover:bg-gray-100"
            onClick={onBack}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-black">Admin Panel</h1>
            <p className="text-gray-600">Manage employees and records</p>
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
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <UserPlus className="w-6 h-6 mr-3" />
              Employee Data Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white border-2 border-black">
            <DialogHeader>
              <DialogTitle className="text-black text-2xl">Add New Employee</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <EmployeeEntry onBack={() => setIsEntryDialogOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>

        {/* Employee Records Card */}
        <Card 
          className="bg-white border-2 border-black hover:bg-gray-50 transition-all duration-300 cursor-pointer group w-full max-w-md"
          onClick={() => setCurrentView('records')}
        >
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4 group-hover:bg-gray-800 transition-colors">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-black text-xl">Employee Records</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-center">
              View employee records, vital signs history, and download reports
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;
