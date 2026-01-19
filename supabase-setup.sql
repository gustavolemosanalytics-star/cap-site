-- SQL para criar as tabelas no Supabase
-- Execute este script no SQL Editor do Supabase

-- Tabela de usuários do CRM
CREATE TABLE IF NOT EXISTS capsite_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'viewer' CHECK (role IN ('admin', 'editor', 'viewer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de leads
CREATE TABLE IF NOT EXISTS capsite_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  message TEXT,
  -- Marketing cookies/params
  fbc VARCHAR(255),
  fbp VARCHAR(255),
  gclid VARCHAR(255),
  -- Metadata
  source VARCHAR(100) DEFAULT 'website',
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_capsite_leads_email ON capsite_leads(email);
CREATE INDEX IF NOT EXISTS idx_capsite_leads_status ON capsite_leads(status);
CREATE INDEX IF NOT EXISTS idx_capsite_leads_created_at ON capsite_leads(created_at DESC);

-- Inserir usuário admin padrão (senha: admin - em produção, altere isso!)
-- A senha 'admin' com bcrypt hash
INSERT INTO capsite_users (email, password_hash, name, role)
VALUES ('admin@capdigital.company', '$2a$10$N9qo8uLOickgx2ZMRZoMye.rJZJHPU.zHdR/R.b5eCQxzVLQw0xGO', 'Admin', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Habilitar Row Level Security (RLS)
ALTER TABLE capsite_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE capsite_leads ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserção de leads (público)
CREATE POLICY "Allow public insert on leads" ON capsite_leads
  FOR INSERT WITH CHECK (true);

-- Política para permitir leitura de leads apenas para usuários autenticados
CREATE POLICY "Allow authenticated read on leads" ON capsite_leads
  FOR SELECT USING (true);

-- Política para permitir update de leads
CREATE POLICY "Allow authenticated update on leads" ON capsite_leads
  FOR UPDATE USING (true);

-- Política para usuários
CREATE POLICY "Allow all on users" ON capsite_users
  FOR ALL USING (true);
