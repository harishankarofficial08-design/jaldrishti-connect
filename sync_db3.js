const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://gbbkhlqrvvnktslsgkpm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_EzW96WiYDRpQOcxbOE7Z6A_ab2YovlY';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const DEFAULT_LOCATIONS = [
    {
        id: "loc-jigani-ind",
        name: "Jigani Industrial Area (Border Zone)",
        lat: 12.78330,
        lng: 77.63330,
        status: "Polluted",
        ph: 5.4,
        tds: 3100,
        bod: 85,
        summary: "Effluent levels exceed regulatory limits due to suspected illegal chemical disposal in storm drains. Elevated TDS detected.",
        verifier: "KSPCB Mobile Lab Team B"
    },
    {
        id: "loc-anekal-lake",
        name: "Anekal Lake Border (Resident Zone)",
        lat: 12.70990,
        lng: 77.69890,
        status: "Safe",
        ph: 7.2,
        tds: 450,
        bod: 12,
        summary: "Water parameters lie within standard residential thresholds. No chemical effluents detected in recent weekly testing cycles.",
        verifier: "Anekal Water Testing Lab"
    }
];

const DEFAULT_COMPLAINTS = [
    {
        id: "JD-90432",
        user: "Sneha Sundi",
        location: "Jigani Industrial Area (Border Zone)",
        lat: 12.78330,
        lng: 77.63330,
        category: "Illegal Midnight Effluent Discharge",
        description: "Dark, chemical-smelling runoff observed flowing from a pipeline behind the main industrial estate road towards Anekal border at 1:30 AM.",
        photo: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&q=80&w=400",
        dateTime: "2026-07-16T01:30",
        status: "Investigating",
        remarks: "KSPCB Dispatcher: Patrol team assigned. Mobile laboratory deployed to retrieve sample vials.",
        timeline: {
            submitted: "2026-07-16T02:00",
            received: "2026-07-16T09:00",
            investigating: "2026-07-16T11:30",
            resolved: null
        }
    },
    {
        id: "JD-71043",
        user: "Anekal Farmer Association",
        location: "Anekal Lake Border (Resident Zone)",
        lat: 12.70990,
        lng: 77.69890,
        category: "Borewell Water Contamination",
        description: "Borewell water drawn for agricultural fields has turned yellowish with a strong chlorine-like smell. Crops show signs of distress.",
        photo: "https://images.unsplash.com/photo-1538300342682-be57b6d5f482?auto=format&fit=crop&q=80&w=400",
        dateTime: "2026-07-12T08:00",
        status: "Resolved",
        remarks: "KSPCB Inspector: Located upstream pipe leak at metal coating factory. Closed the leakage and imposed 2,50,000 INR environmental fine. Water quality flushed and recovered.",
        timeline: {
            submitted: "2026-07-12T09:30",
            received: "2026-07-12T10:15",
            investigating: "2026-07-13T10:00",
            resolved: "2026-07-15T16:00"
        }
    },
    {
        id: "JD-91255",
        user: "Local Volunteer Group",
        location: "Jigani APC Circle (Urban Zone)",
        lat: 12.78500,
        lng: 77.63500,
        category: "Garbage Dumping in Water Body",
        description: "Large amounts of solid waste and plastic bags are being dumped into the secondary stormwater drain connected to the main lake.",
        photo: "https://images.unsplash.com/photo-1585223368297-7c87c71a3843?auto=format&fit=crop&q=80&w=400",
        dateTime: "2026-07-18T14:20",
        status: "Investigating",
        remarks: "KSPCB Dispatcher: Case forwarded to solid waste management division for immediate clearing.",
        timeline: {
            submitted: "2026-07-18T14:45",
            received: "2026-07-19T09:10",
            investigating: "2026-07-19T10:30",
            resolved: null
        }
    },
    {
        id: "JD-91880",
        user: "Muralidhar R.",
        location: "Jigani Industrial Layout Phase 2",
        lat: 12.78000,
        lng: 77.63000,
        category: "Chemical Foam Overflow",
        description: "Toxic foam overflowing from the industrial drains onto the main road near Phase 2 blocks. Very strong chemical smell causing breathing issues.",
        photo: "https://images.unsplash.com/photo-1542385151-5120a164b123?auto=format&fit=crop&q=80&w=400",
        dateTime: "2026-07-20T06:15",
        status: "Submitted",
        remarks: "Pending initial review by authorities.",
        timeline: {
            submitted: "2026-07-20T06:30",
            received: null,
            investigating: null,
            resolved: null
        }
    },
    {
        id: "JD-92101",
        user: "Anekal Town Resident",
        location: "Anekal Town Centre",
        lat: 12.71200,
        lng: 77.70100,
        category: "Drinking Water Discoloration",
        description: "Municipal tap water has been coming out with a brownish tint for the last 48 hours. Many households in the vicinity are reporting the same issue.",
        photo: "https://images.unsplash.com/photo-1574044557997-f0c2dfcb17ed?auto=format&fit=crop&q=80&w=400",
        dateTime: "2026-07-19T08:30",
        status: "Investigating",
        remarks: "KSPCB Water Quality Wing alerted. Water supply board temporarily halting distribution in the zone.",
        timeline: {
            submitted: "2026-07-19T09:00",
            received: "2026-07-19T10:15",
            investigating: "2026-07-19T11:00",
            resolved: null
        }
    },
    {
        id: "JD-92334",
        user: "Ramesh K.",
        location: "Anekal Lake South Bank",
        lat: 12.70500,
        lng: 77.69500,
        category: "Mass Fish Death",
        description: "Hundreds of dead fish have washed up on the southern banks of the lake this morning. Suspected oxygen depletion from sudden chemical influx.",
        photo: "https://images.unsplash.com/photo-1516246843873-9d12356b6fab?auto=format&fit=crop&q=80&w=400",
        dateTime: "2026-07-20T06:45",
        status: "Submitted",
        remarks: "High priority flag raised due to ecological impact.",
        timeline: {
            submitted: "2026-07-20T07:10",
            received: null,
            investigating: null,
            resolved: null
        }
    },
    {
        id: "JD-92850",
        user: "Jigani Tech Park Assoc",
        location: "Jigani Internal Road 4",
        lat: 12.79000,
        lng: 77.62500,
        category: "Suspicious Tanker Discharge",
        description: "An unmarked tanker was seen dumping liquid waste into the open storm drain near the tech park boundary.",
        photo: "https://images.unsplash.com/photo-1574044557997-f0c2dfcb17ed?auto=format&fit=crop&q=80&w=400",
        dateTime: "2026-07-19T23:45",
        status: "Investigating",
        remarks: "CCTV footage requested from nearby facilities.",
        timeline: { submitted: "2026-07-20T00:15", received: "2026-07-20T07:00", investigating: "2026-07-20T08:30", resolved: null }
    }
];

async function seed() {
    console.log("Seeding locations...");
    const { data: d1, error: e1 } = await supabase.from('locations').upsert(DEFAULT_LOCATIONS);
    if (e1) console.error("Error:", e1);
    else console.log("Locations seeded.");

    console.log("Seeding complaints...");
    const { data: d2, error: e2 } = await supabase.from('complaints').upsert(DEFAULT_COMPLAINTS);
    if (e2) console.error("Error:", e2);
    else console.log("Complaints seeded.");
}
seed();
