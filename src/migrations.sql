-- Initialize your new Supabase schema for a contest application

-- Table for user profiles
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
    username TEXT UNIQUE,
    avatar_url TEXT,
    bio TEXT,
    points INTEGER DEFAULT 0,
    subscription_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ,
    UNIQUE (username)
);

-- Table for contests
CREATE TABLE IF NOT EXISTS contests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    price INTEGER,
    start_time TIMESTAMPTZ,
    end_time TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table for videos submitted by users
CREATE TABLE IF NOT EXISTS videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contest_id UUID REFERENCES contests(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(user_id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    votes INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table for submissions which users have made to contests
CREATE TABLE IF NOT EXISTS submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contest_id UUID REFERENCES contests(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(user_id) ON DELETE SET NULL,
    video_id UUID REFERENCES videos(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) on each table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contests ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY select_profiles_policy ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY insert_profiles_policy ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY update_profiles_policy ON profiles FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for contests table
-- Assuming only admins can insert or update contests
CREATE POLICY select_contests_policy ON contests FOR SELECT USING (TRUE); -- Everyone can view contests
CREATE POLICY insert_contests_policy ON contests FOR INSERT USING (auth.role() = 'admin');
CREATE POLICY update_contests_policy ON contests FOR UPDATE USING (auth.role() = 'admin');

-- Create policies for videos table
CREATE POLICY select_videos_policy ON videos FOR SELECT USING (TRUE); -- Everyone can view videos
CREATE POLICY insert_videos_policy ON videos FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY update_videos_policy ON videos FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for submissions table
CREATE POLICY select_submissions_policy ON submissions FOR SELECT USING (TRUE); -- Everyone can view submissions
CREATE POLICY insert_submissions_policy ON submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY update_submissions_policy ON submissions FOR UPDATE USING (auth.uid() = user_id);

-- Optional: Set up indexes for commonly queried columns for performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_contests_id ON contests(id);
CREATE INDEX IF NOT EXISTS idx_videos_contest_id ON videos(contest_id);
CREATE INDEX IF NOT EXISTS idx_submissions_contest_id ON submissions(contest_id);
