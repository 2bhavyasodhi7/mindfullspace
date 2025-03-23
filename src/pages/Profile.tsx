
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState('Jane Doe');
  const [email, setEmail] = useState('jane.doe@example.com');
  const [bio, setBio] = useState('Mindfulness practitioner and nature lover.');
  
  // In a real app, you would fetch these details from your auth system
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleLogout = () => {
    // In a real app, this would clear the authentication state
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    navigate('/');
  };

  return (
    <div className="container-custom mindful-section">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Profile Photo */}
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-32 w-32 border-2 border-mindful">
              <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=300" alt={name} />
              <AvatarFallback className="text-3xl bg-mindful text-white">{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <Button variant="outline" className="border-mindful text-mindful hover:bg-mindful/10">
              Change Photo
            </Button>
          </div>

          {/* Profile Information */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-6 text-center md:text-left">Your Profile</h1>
            
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Your email"
                  />
                </div>
                
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Input 
                    id="bio" 
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)} 
                    placeholder="A short bio about yourself"
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button type="submit" className="flex-1 bg-mindful hover:bg-mindful-dark">
                  Save Changes
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 border-mindful text-mindful hover:bg-mindful/10"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Mindfulness Stats */}
        <div className="mt-12 pt-8 border-t dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-6">Your Mindfulness Journey</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-mindful/10 p-6 rounded-xl text-center">
              <div className="text-4xl font-bold text-mindful mb-2">7</div>
              <div className="text-gray-600 dark:text-gray-300">Days Streak</div>
            </div>
            <div className="bg-mindful/10 p-6 rounded-xl text-center">
              <div className="text-4xl font-bold text-mindful mb-2">12</div>
              <div className="text-gray-600 dark:text-gray-300">Meditations</div>
            </div>
            <div className="bg-mindful/10 p-6 rounded-xl text-center">
              <div className="text-4xl font-bold text-mindful mb-2">3</div>
              <div className="text-gray-600 dark:text-gray-300">Hours Practiced</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
