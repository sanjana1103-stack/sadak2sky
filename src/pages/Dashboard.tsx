
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Plus, Upload, FileText, LogOut } from 'lucide-react';
import DocumentUploader from '@/components/DocumentUploader';
import DocumentsList from '@/components/DocumentsList';
import TravelSuggestions from '@/components/TravelSuggestions';
import { toast } from '@/components/ui/use-toast';
import type { Session } from '@supabase/supabase-js';

const Dashboard = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [showUploader, setShowUploader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      
      if (!session) {
        navigate('/auth');
      }
    });

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (!session) {
          navigate('/auth');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-10 rounded-full bg-travel-blue/50 mb-3"></div>
          <div className="text-travel-blue">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Your Travel Documents</h1>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              className="flex items-center gap-2"
              onClick={handleSignOut}
            >
              <LogOut size={16} />
              <span>Sign out</span>
            </Button>
            <Button 
              onClick={() => setShowUploader(true)} 
              className="bg-travel-blue hover:bg-travel-blue/90 text-white"
            >
              <Upload className="mr-2 h-4 w-4" /> Upload Document
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {showUploader ? (
          <DocumentUploader 
            onUploadComplete={() => setShowUploader(false)} 
            onCancel={() => setShowUploader(false)}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <DocumentsList />
            </div>
            <div className="lg:col-span-1">
              <TravelSuggestions />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
