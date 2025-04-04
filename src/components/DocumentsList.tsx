
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { File, Trash2, Calendar, MapPin } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { format } from 'date-fns';

interface Scan {
  id: string;
  title: string;
  file_url: string;
  summary: string | null;
  created_at: string;
}

const DocumentsList = () => {
  const [documents, setDocuments] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('scans')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setDocuments(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching documents",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();

    // Subscribe to changes in the scans table
    const subscription = supabase
      .channel('table-db-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'scans' }, 
        fetchDocuments
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('scans')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setDocuments(documents.filter(doc => doc.id !== id));
      
      toast({
        title: "Document deleted",
        description: "The document has been removed successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting document",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-travel-blue/50 mb-3"></div>
              <div className="text-travel-blue">Loading documents...</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (documents.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <File className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No documents yet</h3>
            <p className="text-gray-500 max-w-md mb-6">
              Upload your first travel document to get started with your travel management.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {documents.map((doc) => (
            <div 
              key={doc.id} 
              className="flex flex-col md:flex-row p-4 border rounded-lg hover:shadow-md transition"
            >
              <div className="bg-gray-100 rounded-lg p-3 mr-4 mb-3 md:mb-0">
                <File className="h-8 w-8 text-travel-blue" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">{doc.title}</h3>
                {doc.summary && (
                  <p className="text-gray-600 text-sm mb-2">{doc.summary}</p>
                )}
                <div className="flex flex-wrap items-center text-sm text-gray-500 mb-2">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  <span className="mr-3">
                    {format(new Date(doc.created_at), 'MMM dd, yyyy')}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <a 
                    href={doc.file_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-travel-blue hover:text-travel-blue/80 text-sm font-medium"
                  >
                    View Document
                  </a>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => handleDelete(doc.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentsList;
