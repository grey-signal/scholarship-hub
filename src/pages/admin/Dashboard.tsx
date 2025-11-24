import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LogOut, Loader2, GraduationCap } from 'lucide-react';
import { useExamStatus } from '@/hooks/useExamStatus';
import { useAdminActions } from '@/hooks/useAdminActions';
import UploadPDF from '@/components/UploadPDF';
import PhaseChip from '@/components/PhaseChip';
import { toast } from 'sonner';
import { useState } from 'react';

const AdminDashboard = () => {
  const [user, authLoading] = useAuthState(auth);
  const navigate = useNavigate();
  const { examStatus, loading: statusLoading } = useExamStatus();
  const { updateExamStatus } = useAdminActions();

  const [phase, setPhase] = useState(0);
  const [phaseLabel, setPhaseLabel] = useState('');
  const [examDate, setExamDate] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const [resultsURL, setResultsURL] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/admin/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (examStatus) {
      setPhase(examStatus.phase);
      setPhaseLabel(examStatus.phaseLabel || '');
      setExamDate(examStatus.examDate?.split('T')[0] || '');
      setAnnouncement(examStatus.announcement || '');
      setResultsURL(examStatus.resultsURL || '');
    }
  }, [examStatus]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  const handleUpdateStatus = async () => {
    setUpdating(true);
    try {
      await updateExamStatus({
        phase,
        phaseLabel: phaseLabel || undefined,
        examDate: examDate ? new Date(examDate).toISOString() : examStatus?.examDate,
        announcement,
        resultsURL: resultsURL || undefined,
      });
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setUpdating(false);
    }
  };

  if (authLoading || statusLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Current Status */}
          <Card>
            <CardHeader>
              <CardTitle>Current Status</CardTitle>
              <CardDescription>Overview of the current exam phase</CardDescription>
            </CardHeader>
            <CardContent>
              <PhaseChip phase={examStatus?.phase ?? 0} label={examStatus?.phaseLabel} />
            </CardContent>
          </Card>

          {/* Exam Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Exam Configuration</CardTitle>
              <CardDescription>Update exam phase, date, and labels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phase">Exam Phase</Label>
                  <Select value={phase.toString()} onValueChange={(val) => setPhase(parseInt(val))}>
                    <SelectTrigger id="phase" className="min-h-[44px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Not Started</SelectItem>
                      <SelectItem value="1">Registration Open</SelectItem>
                      <SelectItem value="2">Exam Period</SelectItem>
                      <SelectItem value="3">Results Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phaseLabel">Phase Label (Optional)</Label>
                  <Input
                    id="phaseLabel"
                    placeholder="Custom phase description"
                    value={phaseLabel}
                    onChange={(e) => setPhaseLabel(e.target.value)}
                    className="min-h-[44px]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="examDate">Exam Date</Label>
                <Input
                  id="examDate"
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="min-h-[44px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="announcement">Announcement</Label>
                <Textarea
                  id="announcement"
                  placeholder="Enter important announcements for students..."
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resultsURL">Results URL (Optional)</Label>
                <Input
                  id="resultsURL"
                  type="url"
                  placeholder="https://example.com/results.pdf"
                  value={resultsURL}
                  onChange={(e) => setResultsURL(e.target.value)}
                  className="min-h-[44px]"
                />
                <p className="text-sm text-muted-foreground">
                  Add external results link or upload PDF below
                </p>
              </div>

              <Button
                onClick={handleUpdateStatus}
                disabled={updating}
                className="w-full min-h-[44px]"
              >
                {updating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Exam Status'
                )}
              </Button>
            </CardContent>
          </Card>

          {/* PDF Uploads */}
          <div className="grid md:grid-cols-2 gap-6">
            <UploadPDF type="question" currentURL={examStatus?.questionPaperURL} />
            <UploadPDF type="result" currentURL={examStatus?.resultsURL} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
