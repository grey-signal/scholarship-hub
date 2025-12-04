import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const useAdminActions = () => {
  const updateExamStatus = async (updates: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Not authenticated');
      }

      // Check if exam_status exists
      const { data: existing } = await supabase
        .from('exam_status')
        .select('id')
        .single();

      if (existing) {
        // Update existing record
        const { error } = await supabase
          .from('exam_status')
          .update({
            ...updates,
            updated_at: new Date().toISOString(),
            updated_by: user.id,
          })
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        // Insert new record
        const { error } = await supabase
          .from('exam_status')
          .insert({
            ...updates,
            updated_at: new Date().toISOString(),
            updated_by: user.id,
          });

        if (error) throw error;
      }

      toast.success('Exam status updated successfully');
    } catch (error: any) {
      console.error('Error updating exam status:', error);
      toast.error(error.message || 'Failed to update exam status');
      throw error;
    }
  };

  const uploadPDF = async (
    file: File,
    type: 'question' | 'result',
    onProgress?: (progress: number) => void
  ): Promise<string> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Not authenticated');
      }

      const timestamp = Date.now();
      const fileName = `${type}_${timestamp}_${file.name}`;
      const filePath = `pdfs/${fileName}`;

      // Simulate progress since Supabase doesn't provide native progress
      onProgress?.(10);

      const { error: uploadError } = await supabase.storage
        .from('exam-files')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      onProgress?.(70);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('exam-files')
        .getPublicUrl(filePath);

      onProgress?.(90);

      // Update exam status with the new URL
      const fieldName = type === 'question' ? 'question_paper_url' : 'results_url';
      await updateExamStatus({ [fieldName]: publicUrl });

      onProgress?.(100);
      toast.success(`${type === 'question' ? 'Question paper' : 'Results'} uploaded successfully`);
      return publicUrl;
    } catch (error: any) {
      console.error('Error uploading PDF:', error);
      toast.error(error.message || 'Failed to upload PDF');
      throw error;
    }
  };

  return {
    updateExamStatus,
    uploadPDF,
  };
};
