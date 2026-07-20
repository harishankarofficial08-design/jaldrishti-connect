const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://gbbkhlqrvvnktslsgkpm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_EzW96WiYDRpQOcxbOE7Z6A_ab2YovlY';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const BAD_LOCATIONS = ['loc-bommasandra-ind', 'loc-gusti-surrounding'];
const BAD_COMPLAINTS = ['JD-88219', 'JD-92401', 'JD-92512', 'JD-92633', 'JD-92745', 'JD-92999'];

async function fixDb() {
    console.log("Deleting bad locations...");
    const { data: d1, error: e1 } = await supabase.from('locations').delete().in('id', BAD_LOCATIONS);
    if (e1) console.error("Error deleting locations:", e1);
    else console.log("Deleted bad locations.");

    console.log("Deleting bad complaints...");
    const { data: d2, error: e2 } = await supabase.from('complaints').delete().in('id', BAD_COMPLAINTS);
    if (e2) console.error("Error deleting complaints:", e2);
    else console.log("Deleted bad complaints.");
    
    // Now just to be extremely thorough, let's also fetch what's left in Supabase to log it.
    const { data: leftLoc } = await supabase.from('locations').select('id, name');
    console.log("Remaining locations:", leftLoc);
    
    const { data: leftComp } = await supabase.from('complaints').select('id, location');
    console.log("Remaining complaints:", leftComp);
}
fixDb();
