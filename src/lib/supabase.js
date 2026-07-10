import { createClient } from '@supabase/supabase-js';

// המשתנים מגיעים מ-Vercel (Production/Preview) או מ-.env.local בפיתוח מקומי.
// אם הם חסרים — supabase יהיה null, והאתר ימשיך לעבוד עם localStorage בלבד.
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = url && key ? createClient(url, key) : null;
