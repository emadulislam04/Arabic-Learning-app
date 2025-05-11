/*
  # Create words table for vocabulary management

  1. New Tables
    - `words`
      - `id` (uuid, primary key)
      - `arabic` (text, not null)
      - `bangla` (text, not null)
      - `english` (text, not null)
      - `example` (text)
      - `difficulty` (text, not null)
      - `tags` (text[], not null)
      - `created_at` (timestamptz, default: now())
      - `updated_at` (timestamptz, default: now())

  2. Security
    - Enable RLS on `words` table
    - Add policy for authenticated users to read words
    - Add policy for admin users to manage words
*/

CREATE TABLE IF NOT EXISTS words (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  arabic text NOT NULL,
  bangla text NOT NULL,
  english text NOT NULL,
  example text,
  difficulty text NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  tags text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE words ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read words"
  ON words
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage words"
  ON words
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');