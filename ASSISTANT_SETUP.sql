-- Schema for GAIA assistant knowledge base and user history
-- GAIA: Guía de Asesoramiento Inteligente Automotriz
-- Assistant for automotive electronics, diagnostics, and repair procedures

CREATE TABLE IF NOT EXISTS assistant_kb (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  keywords TEXT[] NOT NULL DEFAULT '{}',
  answer TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS assistant_kb_active_idx ON assistant_kb(active);

CREATE TABLE IF NOT EXISTS assistant_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS assistant_logs_user_idx ON assistant_logs(user_id);
CREATE INDEX IF NOT EXISTS assistant_logs_created_idx ON assistant_logs(created_at);

CREATE TABLE IF NOT EXISTS unanswered_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  count INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS unanswered_questions_created_idx ON unanswered_questions(created_at);
CREATE UNIQUE INDEX IF NOT EXISTS unanswered_questions_question_idx ON unanswered_questions(question);
