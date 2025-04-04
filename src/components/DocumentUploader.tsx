
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, X, FileText } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface DocumentUploaderProps {
  onUploadComplete: () => void;
  onCancel: () => void;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({ onUploadComplete, onCancel }) => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Create preview for images
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setFilePreview(event.target?.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setFilePreview(null);
      }
    }
  };

  const uploadDocument = async () => {
    if (!file || !title.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a title and select a file.",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploading(true);

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Upload file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('travel_documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL for the file
      const { data: urlData } = await supabase.storage
        .from('travel_documents')
        .createSignedUrl(filePath, 60 * 60 * 24 * 365); // 1 year expiry

      if (!urlData?.signedUrl) throw new Error('Could not get file URL');

      // Create record in scans table
      const { error: insertError } = await supabase
        .from('scans')
        .insert({
          title: title,
          file_url: urlData.signedUrl,
          user_id: user.id,
        });

      if (insertError) throw insertError;

      toast({
        title: "Upload successful",
        description: "Your document has been uploaded successfully.",
      });
      
      onUploadComplete();
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-4 top-4"
          onClick={onCancel}
        >
          <X className="h-4 w-4" />
        </Button>
        <CardTitle>Upload Travel Document</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Document Title</Label>
          <Input
            id="title"
            placeholder="e.g., Flight Ticket JFK to LAX"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="document">Document File</Label>
          
          {filePreview ? (
            <div className="relative mt-2 rounded-lg overflow-hidden border border-gray-200">
              <img 
                src={filePreview} 
                alt="Document preview" 
                className="max-h-64 mx-auto"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6 rounded-full"
                onClick={() => {
                  setFile(null);
                  setFilePreview(null);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : file ? (
            <div className="relative flex items-center p-4 mt-2 rounded-lg border border-gray-200 bg-gray-50">
              <FileText className="h-8 w-8 text-travel-blue mr-3" />
              <div className="flex-1 truncate">
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setFile(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer">
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-gray-600 text-sm text-center mb-1">Drag and drop your file here or click to browse</p>
              <p className="text-gray-400 text-xs text-center">PDF, JPG, PNG, or HEIC files</p>
              <input
                id="document"
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".pdf,.jpg,.jpeg,.png,.heic"
                onChange={handleFileChange}
              />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-end space-x-2">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button 
            onClick={uploadDocument} 
            disabled={uploading || !file || !title.trim()}
            className="bg-travel-blue hover:bg-travel-blue/90"
          >
            {uploading ? 'Uploading...' : 'Upload Document'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DocumentUploader;
