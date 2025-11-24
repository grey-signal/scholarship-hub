import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from '@/lib/firebase';
import { toast } from 'sonner';

export const useAdminActions = () => {
  const updateExamStatus = async (updates: any) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Not authenticated');
      }

      const docRef = doc(db, 'config', 'exam_status');
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp(),
        updatedBy: user.uid,
      });

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
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Not authenticated');
      }

      const timestamp = Date.now();
      const fileName = `${type}_${timestamp}_${file.name}`;
      const storageRef = ref(storage, `pdfs/${fileName}`);
      
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress?.(progress);
          },
          (error) => {
            console.error('Upload error:', error);
            toast.error('Failed to upload PDF');
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            
            // Update exam status with the new URL
            const fieldName = type === 'question' ? 'questionPaperURL' : 'resultsURL';
            await updateExamStatus({ [fieldName]: downloadURL });
            
            toast.success(`${type === 'question' ? 'Question paper' : 'Results'} uploaded successfully`);
            resolve(downloadURL);
          }
        );
      });
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
