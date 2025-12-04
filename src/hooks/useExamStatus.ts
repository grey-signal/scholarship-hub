import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface ExamStatus {
  id?: string;
  phase: number; // 0: Not Started, 1: Registration Open, 2: Exam Day, 3: Results Published
  phase_label?: string;
  exam_date: string;
  question_paper_url?: string;
  results_url?: string;
  announcement: string;
  updated_at?: string;
  updated_by?: string;
}

export const useExamStatus = () => {
  const [examStatus, setExamStatus] = useState<ExamStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExamStatus = async () => {
      try {
        const { data, error } = await supabase
          .from('exam_status')
          .select('*')
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            // No data found, use default
            setExamStatus({
              phase: 0,
              phase_label: 'Not Started',
              exam_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
              announcement: 'Welcome! Exam details will be announced soon.',
            });
          } else {
            throw error;
          }
        } else {
          setExamStatus(data);
        }
      } catch (err: any) {
        console.error('Error fetching exam status:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExamStatus();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('exam_status_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'exam_status' },
        (payload) => {
          if (payload.new) {
            setExamStatus(payload.new as ExamStatus);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { examStatus, loading, error };
};
