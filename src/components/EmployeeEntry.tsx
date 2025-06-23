
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, User, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmployeeEntryProps {
  onBack: () => void;
}

const EmployeeEntry = ({ onBack }: EmployeeEntryProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: 'Male',
    location: '',
    bloodGroup: '',
    contactNumber: '',
    autoGenerateMAC: true
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
    console.log('Employee data:', formData);
    console.log('Image file:', imageFile);
    
    toast({
      title: "Employee Added",
      description: `${formData.firstName} ${formData.lastName} has been successfully added to the system.`,
    });

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      age: '',
      gender: 'Male',
      location: '',
      bloodGroup: '',
      contactNumber: '',
      autoGenerateMAC: true
    });
    setImageFile(null);
    setImagePreview(null);
    
    onBack();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Add New Employee</h2>
          <p className="text-gray-300">Enter the employee details below to create a new monitoring profile.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-white font-medium">First Name</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              className="bg-white border-2 border-blue-500 text-black placeholder-gray-500"
              placeholder="First name"
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-white font-medium">Last Name</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              className="bg-white border border-gray-300 text-black placeholder-gray-500"
              placeholder="Last name"
              required
            />
          </div>
        </div>

        {/* Age and Gender */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="age" className="text-white font-medium">Age</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: e.target.value})}
              className="bg-white border border-gray-300 text-black placeholder-gray-500"
              placeholder="30"
              required
            />
          </div>
          <div>
            <Label htmlFor="gender" className="text-white font-medium">Gender</Label>
            <select
              id="gender"
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
              className="w-full h-10 px-3 py-2 bg-white border border-gray-300 rounded-md text-black"
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Location */}
        <div>
          <Label htmlFor="location" className="text-white font-medium">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            className="bg-white border border-gray-300 text-black placeholder-gray-500"
            placeholder="Chamber location"
            required
          />
        </div>

        {/* Blood Group and Contact Number */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bloodGroup" className="text-white font-medium">Blood Group</Label>
            <Input
              id="bloodGroup"
              value={formData.bloodGroup}
              onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
              className="bg-white border border-gray-300 text-black placeholder-gray-500"
              placeholder="e.g. A+"
              required
            />
          </div>
          <div>
            <Label htmlFor="contactNumber" className="text-white font-medium">Contact Number</Label>
            <Input
              id="contactNumber"
              type="tel"
              value={formData.contactNumber}
              onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
              className="bg-white border border-gray-300 text-black placeholder-gray-500"
              placeholder="Phone number"
              required
            />
          </div>
        </div>

        {/* Auto-generate MAC Address */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="autoGenerateMAC"
            checked={formData.autoGenerateMAC}
            onCheckedChange={(checked) => setFormData({...formData, autoGenerateMAC: checked as boolean})}
            className="border-white data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
          />
          <Label htmlFor="autoGenerateMAC" className="text-white font-medium">
            Auto-generate MAC Address
          </Label>
        </div>

        {/* Photo Upload */}
        <div>
          <Label className="text-white font-medium">Photo</Label>
          <div className="mt-2">
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <Button
                type="button"
                variant="outline"
                className="bg-white text-black border-gray-300 hover:bg-gray-50"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                Choose File
              </Button>
              <span className="text-gray-300 text-sm">
                {imageFile ? imageFile.name : 'No file chosen'}
              </span>
            </div>
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Employee preview"
                  className="w-24 h-24 object-cover rounded-lg border-2 border-gray-300"
                />
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6">
          <Button
            type="button"
            variant="outline"
            className="bg-white text-black border-gray-300 hover:bg-gray-50"
            onClick={onBack}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
          >
            Add Employee
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeEntry;
