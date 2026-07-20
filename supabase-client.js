// supabase-client.js
const SUPABASE_URL = 'https://gbbkhlqrvvnktslsgkpm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_EzW96WiYDRpQOcxbOE7Z6A_ab2YovlY';

// Initialize the Supabase client
window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Push a record to Supabase
async function pushToSupabase(table, data) {
    try {
        const { error } = await window.supabaseClient.from(table).upsert(data);
        if (error) console.error(`[Supabase] Error pushing to ${table}:`, error);
    } catch (e) {
        console.error(`[Supabase] Exception pushing to ${table}:`, e);
    }
}

// Fetch all data from Supabase and sync to localStorage
async function pullFromSupabase() {
    try {
        const tables = ['locations', 'complaints', 'industries', 'reports'];
        for (const table of tables) {
            const { data, error } = await window.supabaseClient.from(table).select('*');
            if (error) {
                console.error(`[Supabase] Error pulling from ${table}:`, error);
                continue;
            }
            if (data && data.length > 0) {
                localStorage.setItem(`jd_${table}`, JSON.stringify(data));
            }
        }
        console.log("[Supabase] Data successfully pulled and synced to localStorage.");
    } catch (e) {
        console.error("[Supabase] Exception pulling data:", e);
    }
}

// Initialize realtime subscription for complaints
function initSupabaseRealtime(onNewComplaintCallback) {
    window.supabaseClient
        .channel('public:complaints')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'complaints' }, payload => {
            console.log('[Supabase Realtime] New complaint received:', payload.new);
            
            // Update localStorage immediately
            let current = JSON.parse(localStorage.getItem('jd_complaints') || '[]');
            // Prevent duplicates
            if (!current.some(c => c.id === payload.new.id)) {
                current.unshift(payload.new);
                localStorage.setItem('jd_complaints', JSON.stringify(current));
                
                // Trigger callback for UI update
                if (onNewComplaintCallback) onNewComplaintCallback(payload.new);
            }
        })
        .subscribe();
}
