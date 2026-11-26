import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://azwcvkckpjocprlekkeq.supabase.co';
const supabaseAnonKey = 'sb_publishable_CxT526kICZOnnqidpVrUuQ_J9k8COc8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
