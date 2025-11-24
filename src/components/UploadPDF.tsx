import { useState } from 'react';
import { Upload, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAdminActions } from '@/hooks/useAdminActions';

interface UploadPDFProps {
  type: 'question' | 'result';
  currentURL?: string;
}

const UploadPDF = ({ type, currentURL }: UploadPDFProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { uploadPDF } = useAdminActions();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      await uploadPDF(file, type, setProgress);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
      setProgress(0);
      e.target.value = '';
    }
  };

  const label = type === 'question' ? 'Question Paper' : 'Results';

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-lg mb-4">Upload {label}</h3>
      
      {currentURL && (
        <div className="mb-4 p-3 bg-secondary rounded-lg flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <a
            href={currentURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline flex-1 truncate"
          >
            Current {label} PDF
          </a>
        </div>
      )}

      <div className="space-y-4">
        <label className="block">
          <Button
            variant="outline"
            className="w-full min-h-[100px] border-dashed cursor-pointer hover:border-primary hover:bg-secondary/50"
            disabled={uploading}
            asChild
          >
            <div>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                disabled={uploading}
              />
              {uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="text-sm">Uploading... {Math.round(progress)}%</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Click to upload {label} PDF (max 10MB)
                  </span>
                </div>
              )}
            </div>
          </Button>
        </label>

        {uploading && (
          <Progress value={progress} className="w-full" />
        )}
      </div>
    </Card>
  );
};

export default UploadPDF;
