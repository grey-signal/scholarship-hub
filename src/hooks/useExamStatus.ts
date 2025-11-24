import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface ExamStatus {
  phase: number; // 0: Not Started, 1: Registration Open, 2: Exam Day, 3: Results Published
  phaseLabel?: string;
  examDate: string;
  questionPaperURL?: string;
  resultsURL?: string;
  announcement: string;
  updatedAt?: any;
  updatedBy?: string;
}

export const useExamStatus = () => {
  const [examStatus, setExamStatus] = useState<ExamStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const docRef = doc(db, 'config', 'exam_status');
    
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setExamStatus(snapshot.data() as ExamStatus);
        } else {
          // Default exam status if document doesn't exist
          setExamStatus({
            phase: 0,
            phaseLabel: 'Not Started',
            examDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
            announcement: 'Welcome! Exam details will be announced soon.',
          });
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching exam status:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { examStatus, loading, error };
};
