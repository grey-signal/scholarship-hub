# Supabase Setup Guide

This guide will help you set up your Supabase project for the Scholarship Exam Site.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/log in
2. Click "New Project"
3. Fill in project details and create

## 2. Get Your API Keys

1. Go to Project Settings > API
2. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public key** → `VITE_SUPABASE_ANON_KEY`

## 3. Create Database Tables

Run this SQL in the SQL Editor:

```sql
-- Create exam_status table
CREATE TABLE public.exam_status (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phase INTEGER DEFAULT 0 NOT NULL,
  phase_label TEXT,
  exam_date TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '90 days'),
  question_paper_url TEXT,
  results_url TEXT,
  announcement TEXT DEFAULT 'Welcome! Exam details will be announced soon.',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.exam_status ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read" ON public.exam_status
  FOR SELECT USING (true);

-- Allow authenticated users to insert/update (you can restrict to admins later)
CREATE POLICY "Allow authenticated users to insert" ON public.exam_status
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update" ON public.exam_status
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.exam_status;

-- Insert default record
INSERT INTO public.exam_status (phase, phase_label, announcement)
VALUES (0, 'Not Started', 'Welcome! Exam details will be announced soon.');
```

## 4. Create Storage Bucket

1. Go to Storage in Supabase dashboard
2. Create a new bucket named `exam-files`
3. Make it public
4. Add these RLS policies:

```sql
-- Allow public read access
CREATE POLICY "Public read access" ON storage.objects
  FOR SELECT USING (bucket_id = 'exam-files');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'exam-files');
```

## 5. Create Admin User

1. Go to Authentication > Users
2. Click "Add User" > "Create new user"
3. Enter admin email and password
4. Use these credentials to log in at `/admin/login`

## 6. Environment Variables

Create a `.env` file with:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## 7. Optional: Restrict Admin Access

To limit admin access to specific users, you can create a user_roles table:

```sql
-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Function to check role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Update exam_status policies to use roles
DROP POLICY "Allow authenticated users to insert" ON public.exam_status;
DROP POLICY "Allow authenticated users to update" ON public.exam_status;

CREATE POLICY "Admins can insert" ON public.exam_status
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update" ON public.exam_status
  FOR UPDATE TO authenticated 
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Add admin role to a user (replace USER_ID)
INSERT INTO public.user_roles (user_id, role)
VALUES ('USER_ID_HERE', 'admin');
```

## Troubleshooting

- **Can't see data**: Check RLS policies are enabled correctly
- **Upload fails**: Verify storage bucket exists and policies are set
- **Login fails**: Ensure email confirmation is disabled in Auth settings (for testing)
