
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, User, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmployeeEntryProps {
  onBack: () => void;
}

const EmployeeEntry = ({ onBack }: EmployeeEntryProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    location: '',
    mac: '',
    notes: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the employee data
    console.log('Employee data:', formData);
    console.log('Image file:', imageFile);
    
    toast({
      title: "Employee Added",
      description: `${formData.name} has been successfully added to the system.`,
    });

    // Reset form
    setFormData({
      name: '',
      age: '',
      gender: '',
      location: '',
      mac: '',
      notes: ''
    });
    setImageFile(null);
    setImagePreview(null);
    
    // Close the modal
    onBack();
  };

  return (
    <div className="w-full">
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white text-xl flex items-center">
            <User className="w-5 h-5 mr-2" />
            Employee Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Form Fields */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age" className="text-white">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      placeholder="Age"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender" className="text-white">Gender</Label>
                    <select
                      id="gender"
                      value={formData.gender}
                      onChange={(e) => setFormData({...formData, gender: e.target.value})}
                      className="w-full h-10 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="location" className="text-white">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    placeholder="Building A, Room 101"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="mac" className="text-white">MAC Address</Label>
                  <Input
                    id="mac"
                    value={formData.mac}
                    onChange={(e) => setFormData({...formData, mac: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    placeholder="AA:BB:CC:DD:EE:FF"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="notes" className="text-white">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    placeholder="Any additional information..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Right Column - Image Upload */}
              <div className="space-y-4">
                <Label className="text-white">Employee Photo</Label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img
                        src={imagePreview}
                        alt="Employee preview"
                        className="w-48 h-48 object-cover rounded-lg mx-auto"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        className="text-white hover:bg-white/10"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(null);
                        }}
                      >
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                      <div>
                        <p className="text-white mb-2">Upload employee photo</p>
                        <p className="text-gray-400 text-sm">PNG, JPG up to 10MB</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        className="text-white hover:bg-white/10"
                        onClick={() => document.getElementById('image-upload')?.click()}
                      >
                        Choose File
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <Button
                type="button"
                variant="ghost"
                className="text-white hover:bg-white/10"
                onClick={onBack}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Employee
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeEntry;
