// Jal Drishti Connect - Interactive Application Logic & Mock Database

// --- MOCK DATABASE INITIALIZATION ---
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
    },

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

const DEFAULT_INDUSTRIES = [
    {
        id: "ind-gusti",
        name: "Gusti Tool Works",
        address: "Phase 1, Bommasandra Industrial Area",
        status: "Compliant",
        ph: 7.2,
        tds: 1450,
        lastReport: "2026-07-14",
        remarks: "Standard mechanical tool washing effluents treated via onsite recycling plant."
    },
    {
        id: "ind-jigani-dyeing",
        name: "Jigani Dyeing & Finishing Works",
        address: "Border Road, Jigani Industrial Area",
        status: "Warning",
        ph: 5.8,
        tds: 2600,
        lastReport: "2026-07-10",
        remarks: "Heavy chemical residues in treatment feed. Secondary aeration tank needs maintenance."
    },
    {
        id: "ind-anekal-metal",
        name: "Anekal Metal Finishers",
        address: "Anekal-Jigani Link Road",
        status: "Non-compliant",
        ph: 4.5,
        tds: 4100,
        lastReport: "2026-07-05",
        remarks: "Acidity filters failing. Warning letter issued by KSPCB on July 12th."
    }
];

const DEFAULT_REPORTS = [
    {
        id: "R-904",
        location: "Jigani Industrial Checkpoint",
        status: "Warning",
        date: "2026-07-16",
        summary: "Acidic effluent residues detected. pH: 5.4, TDS: 3100 mg/L.",
        by: "KSPCB Mobile Unit B"
    },
    {
        id: "R-903",
        location: "Anekal Lake Inlet Point",
        status: "Safe",
        date: "2026-07-15",
        summary: "Alkalinity stable. pH: 7.2, TDS: 450 mg/L.",
        by: "Anekal Gram Panchayat Lab"
    },
    {
        id: "R-902",
        location: "Bommasandra Border Borewell #3",
        status: "Alert",
        date: "2026-07-14",
        summary: "Extreme chemical load verified. pH: 4.8, TDS: 4200 mg/L.",
        by: "KSPCB Central Lab"
    }
];

// Load databases or write defaults
function initDatabase() {
    if (!localStorage.getItem("jd_locations_v5")) {
        localStorage.setItem("jd_locations_v5", JSON.stringify(DEFAULT_LOCATIONS));
    }
    // Force overwrite complaints to always show the latest demo pins
    localStorage.setItem("jd_complaints_v5", JSON.stringify(DEFAULT_COMPLAINTS));
    if (!localStorage.getItem("jd_industries")) {
        localStorage.setItem("jd_industries", JSON.stringify(DEFAULT_INDUSTRIES));
    }
    if (!localStorage.getItem("jd_reports")) {
        localStorage.setItem("jd_reports", JSON.stringify(DEFAULT_REPORTS));
    }
}

// Get Database items
const getLocations = () => JSON.parse(localStorage.getItem("jd_locations_v5"));
const getComplaints = () => JSON.parse(localStorage.getItem("jd_complaints_v5"));
const getIndustries = () => JSON.parse(localStorage.getItem("jd_industries"));
const getReports = () => JSON.parse(localStorage.getItem("jd_reports"));

// Update database items
const saveLocations = (data) => {
    localStorage.setItem("jd_locations_v5", JSON.stringify(data));
    pushToSupabase('locations', data);
};
const saveComplaints = (data) => {
    localStorage.setItem("jd_complaints_v5", JSON.stringify(data));
    pushToSupabase('complaints', data);
};
const saveIndustries = (data) => {
    localStorage.setItem("jd_industries", JSON.stringify(data));
    pushToSupabase('industries', data);
};
const saveReports = (data) => {
    localStorage.setItem("jd_reports", JSON.stringify(data));
    pushToSupabase('reports', data);
};


// --- GLOBAL STATE VARIABLES ---
let currentUser = {
    name: "Sneha Sundi",
    role: "resident",
    scope: "Local Resident - Jigani Region"
};
let leafletMap = null;
let mapMarkers = [];
let activeTimelineComplaintId = null;
let charts = {};
let uploadedImageBase64 = "";


// --- ROUTING / VIEW CONTROLLER ---
function switchView(viewId) {
    // Hide all views
    document.querySelectorAll('.content-view').forEach(view => {
        view.classList.add('hidden');
    });

    // Deactivate all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Show selected view
    const selectedView = document.getElementById(`view-${viewId}`);
    if (selectedView) {
        selectedView.classList.remove('hidden');
    }

    // Activate selected nav item
    const navItem = document.getElementById(`nav-${viewId}`);
    if (navItem) {
        navItem.classList.add('active');
    }

    // Set view headers
    const viewTitle = document.getElementById('view-title');
    const viewSubtitle = document.getElementById('view-subtitle');

    switch (viewId) {
        case 'dashboard':
            viewTitle.textContent = "Dashboard & Quality Map";
            viewSubtitle.textContent = "Real-time effluent hotspots and local testing parameters";
            setTimeout(() => {
                if (leafletMap) {
                    leafletMap.invalidateSize(); // Fixes Leaflet rendering issues inside hidden containers
                }
            }, 100);
            renderDashboardFeeds();
            break;
        case 'report':
            viewTitle.textContent = "Report Water Pollution";
            viewSubtitle.textContent = "Submit a formal effluent or chemical discharge report to KSPCB";
            resetReportForm();
            break;
        case 'complaints':
            viewTitle.textContent = "Track Complaints";
            viewSubtitle.textContent = "Review investigation timelines and authority feedback";
            renderTrackingSection();
            break;
        case 'industry-hub':
            viewTitle.textContent = "Industry Compliance Portal";
            viewSubtitle.textContent = "Treatment reports and direct compliance audits for local factories";
            renderIndustrySection();
            break;
        case 'analytics':
            viewTitle.textContent = "KSPCB Analytics Hub";
            viewSubtitle.textContent = "Effluent indicators, pH scales, and automatic warning systems";
            renderAnalyticsSection();
            break;
    }
}


// --- LOGIN AND ROLE CONTROL ---
function selectRole(role) {
    // Deactivate all role buttons
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Activate selected button
    const activeBtn = document.querySelector(`.role-btn[data-role="${role}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    // Set default names and scopes based on roles
    const nameInput = document.getElementById('username-input');
    const scopeInput = document.getElementById('role-desc-display');

    switch (role) {
        case 'resident':
            nameInput.value = "Sneha Sundi";
            scopeInput.value = "Local Resident - Jigani Region";
            break;
        case 'kspcb':
            nameInput.value = "Inspector Harish Kumar";
            scopeInput.value = "KSPCB Inspector Officer #402";
            break;
        case 'industry':
            nameInput.value = "Rajeev Gowda";
            scopeInput.value = "Facility Manager - Gusti Tool Works";
            break;
        case 'admin':
            nameInput.value = "Admin Portal Control";
            scopeInput.value = "System-wide Site Administrator";
            break;
    }
}

function handlePortalLogin(e) {
    e.preventDefault();

    const nameVal = document.getElementById('username-input').value;
    const roleVal = document.querySelector('.role-btn.active').getAttribute('data-role');
    const scopeVal = document.getElementById('role-desc-display').value;

    currentUser = {
        name: nameVal,
        role: roleVal,
        scope: scopeVal
    };

    // Hide Login Screen and Show Workspace
    document.getElementById('splash-screen').classList.add('hidden');
    document.getElementById('app-workspace').classList.remove('hidden');

    // Update Profile UI elements
    document.getElementById('user-display-name').textContent = currentUser.name;
    document.getElementById('user-avatar-initial').textContent = currentUser.name.charAt(0).toUpperCase();

    // Map role tags for UI
    let roleText = "Citizen";
    if (currentUser.role === 'kspcb') roleText = "KSPCB Officer";
    if (currentUser.role === 'industry') roleText = "Industry Manager";
    if (currentUser.role === 'admin') roleText = "Sys Admin";
    document.getElementById('user-display-role').textContent = roleText;

    // Apply role-based sidebar restrictions
    applySidebarPermissions();

    // Toast notification
    showToast("Access Granted", `Welcome back, ${currentUser.name}!`, "success");

    // Initialize map
    initMap();

    // Route to main view
    switchView('dashboard');
    
    // Show notification badge for any pre-existing JC- citizen reports
    setTimeout(updateNotifBadge, 600);
}

function applySidebarPermissions() {
    // Show all by default
    document.getElementById('nav-dashboard').classList.remove('hidden');
    document.getElementById('nav-report').classList.remove('hidden');
    document.getElementById('nav-complaints').classList.remove('hidden');
    document.getElementById('nav-industry-hub').classList.remove('hidden');
    document.getElementById('nav-analytics').classList.remove('hidden');

    // Filter sidebar navigation panels based on current role
    if (currentUser.role === 'resident') {
        document.getElementById('nav-industry-hub').classList.add('hidden');
        document.getElementById('nav-analytics').classList.add('hidden');
    } else if (currentUser.role === 'kspcb') {
        document.getElementById('nav-report').classList.add('hidden');
    } else if (currentUser.role === 'industry') {
        document.getElementById('nav-report').classList.add('hidden');
        document.getElementById('nav-analytics').classList.add('hidden');
    }
    // Admin role retains full access
}

async function performLogout() {
    await window.supabaseClient.auth.signOut();
    document.getElementById('app-workspace').classList.add('hidden');
    showToast("Session Terminated", "Logged out securely.", "info");
    setTimeout(() => {
        window.location.href = '../landing.html';
    }, 800);
}


// --- MAP INITIALIZATION (LEAFLET.JS) ---
function initMap() {
    if (leafletMap) {
        leafletMap.remove();
        leafletMap = null;
    }

    // Jigani coordinates: 12.7833, 77.6333
    // Centering the map around Jigani-Anekal border region
    leafletMap = L.map('leaflet-map', {
        zoomControl: true,
        attributionControl: false
    }).setView([12.75, 77.66], 12);

    // Dark-themed tiles to complement the glassmorphism aesthetic
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
    }).addTo(leafletMap);

    // Refresh markers from local storage data
    renderMapMarkers();
}

function renderMapMarkers() {
    // Clear old markers
    mapMarkers.forEach(marker => leafletMap.removeLayer(marker));
    mapMarkers = [];

    const locations = getLocations();
    const complaints = getComplaints();

    // 1. Add Location Monitored Checkpoints
    locations.forEach(loc => {
        let color = '#22c55e'; // Safe
        if (loc.status === 'Moderate') color = '#f97316';
        if (loc.status === 'Polluted') color = '#ef4444';

        // Customized SVG Dot Marker
        const customIcon = L.divIcon({
            html: `<div style="
                background: ${color}; 
                width: 14px; 
                height: 14px; 
                border-radius: 50%; 
                border: 2px solid #fff; 
                box-shadow: 0 0 10px ${color};"></div>`,
            className: 'custom-map-pin',
            iconSize: [14, 14],
            iconAnchor: [7, 7]
        });

        const marker = L.marker([loc.lat, loc.lng], { icon: customIcon }).addTo(leafletMap);
        
        // Popup detailing metrics
        marker.bindTooltip(`<strong>${loc.name}</strong><br>Status: ${loc.status}<br>pH: ${loc.ph} | TDS: ${loc.tds} mg/L`, {
            direction: 'top',
            offset: [0, -10]
        });

        // Click event opens a custom side sheet modal
        marker.on('click', () => {
            openLocationModal(loc);
        });

        mapMarkers.push(marker);
    });

    // 2. Add Active User Complaints to Map
    complaints.forEach(comp => {
        if (comp.status === 'Resolved') return; // Hide resolved on map to avoid clutter

        const customIcon = L.divIcon({
            html: `<div style="
                background: #ef4444; 
                width: 16px; 
                height: 16px; 
                clip-path: polygon(50% 0%, 0% 100%, 100% 100%); 
                transform: rotate(180deg);
                box-shadow: 0 0 10px #ef4444;"></div>`,
            className: 'custom-complaint-pin',
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });

        const marker = L.marker([comp.lat, comp.lng], { icon: customIcon }).addTo(leafletMap);
        marker.bindTooltip(`<strong>Complaint Red Flag</strong><br>${comp.category}<br>Status: ${comp.status}`, {
            direction: 'top',
            offset: [0, -10]
        });

        marker.on('click', () => {
            showToast("Report Selected", `Viewing tracking log for ${comp.id}`, "info");
            switchView('complaints');
            selectComplaintToTrack(comp.id);
        });

        mapMarkers.push(marker);
    });
}


// --- LOCATION DETAIL MODAL DIALOG ---
function openLocationModal(loc) {
    const modal = document.getElementById('location-detail-modal');
    modal.classList.remove('hidden');

    document.getElementById('modal-location-title').textContent = loc.name;
    document.getElementById('modal-coords').textContent = `${loc.lat.toFixed(5)}, ${loc.lng.toFixed(5)}`;
    
    const statusBadge = document.getElementById('modal-status-badge');
    statusBadge.textContent = loc.status;
    statusBadge.className = 'badge'; // Reset class list
    if (loc.status === 'Safe') statusBadge.classList.add('green-badge');
    if (loc.status === 'Moderate') statusBadge.classList.add('orange-badge');
    if (loc.status === 'Polluted') statusBadge.classList.add('red-badge');

    document.getElementById('modal-ph').textContent = loc.ph.toFixed(1);
    document.getElementById('modal-tds').textContent = `${loc.tds} mg/L`;
    document.getElementById('modal-bod').textContent = `${loc.bod} mg/L`;
    document.getElementById('modal-summary').textContent = loc.summary;
    document.getElementById('modal-verifier').textContent = loc.verifier;

    // Trigger Lucide icons rebuild for the modal
    lucide.createIcons();
}

function closeModal() {
    document.getElementById('location-detail-modal').classList.add('hidden');
}


// --- RENDER FEEDS (DASHBOARD) ---
function renderDashboardFeeds() {
    // 1. Dashboard Complaints Feed
    const complaints = getComplaints();
    const complaintContainer = document.getElementById('dashboard-complaint-list');
    complaintContainer.innerHTML = '';

    const activeList = complaints.filter(c => c.status !== 'Resolved');
    if (activeList.length === 0) {
        complaintContainer.innerHTML = `<div class="hint-text text-center py-4">No active local complaints.</div>`;
    } else {
        activeList.slice(0, 3).forEach(c => {
            const dateStr = new Date(c.dateTime).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
            
            const div = document.createElement('div');
            div.className = 'feed-item';
            div.onclick = () => {
                switchView('complaints');
                selectComplaintToTrack(c.id);
            };

            div.innerHTML = `
                <div class="feed-item-header">
                    <h4>${c.category}</h4>
                    <span class="time">${dateStr}</span>
                </div>
                <p class="desc">${c.description}</p>
                <div class="feed-item-footer">
                    <span class="location-lbl"><i data-lucide="map-pin"></i> ${c.location.split(' ')[0]}</span>
                    <span class="badge ${c.status === 'Submitted' ? 'orange-badge' : 'blue-badge'}" style="font-size: 0.65rem; padding: 3px 8px;">${c.status}</span>
                </div>
            `;
            complaintContainer.appendChild(div);
        });
    }

    // 2. Dashboard Reports Feed
    const reports = getReports();
    const reportsContainer = document.getElementById('dashboard-water-reports');
    reportsContainer.innerHTML = '';

    reports.slice(0, 3).forEach(r => {
        const dateStr = new Date(r.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
        let badgeClass = 'green-badge';
        if (r.status === 'Warning') badgeClass = 'orange-badge';
        if (r.status === 'Alert') badgeClass = 'red-badge';

        const div = document.createElement('div');
        div.className = 'feed-item';
        div.innerHTML = `
            <div class="feed-item-header">
                <h4>${r.location}</h4>
                <span class="time">${dateStr}</span>
            </div>
            <p class="desc">${r.summary}</p>
            <div class="feed-item-footer">
                <span style="color: var(--text-muted);">By: ${r.by}</span>
                <span class="badge ${badgeClass}" style="font-size: 0.65rem; padding: 3px 8px;">${r.status}</span>
            </div>
        `;
        reportsContainer.appendChild(div);
    });

    // Recount stats from database files
    document.getElementById('lbl-total-reports').textContent = reports.length + 11; // Simulated baseline offset
    document.getElementById('lbl-active-complaints').textContent = complaints.filter(c => c.status !== 'Resolved').length;

    // Render icons
    lucide.createIcons();
}


// --- POLLUTION SUBMISSION SCREEN (VIEW 2) ---
function updateCoordsFromSelection() {
    const selector = document.getElementById('report-area');
    const coordsBox = document.getElementById('manual-coords-container');
    const latInp = document.getElementById('report-lat');
    const lngInp = document.getElementById('report-lng');

    if (selector.value === "Manual Coordinates") {
        coordsBox.classList.add('active');
        latInp.value = "12.75000";
        lngInp.value = "77.65000";
    } else {
        coordsBox.classList.remove('active');
        const locations = getLocations();
        const found = locations.find(l => l.name === selector.value);
        if (found) {
            latInp.value = found.lat.toFixed(5);
            lngInp.value = found.lng.toFixed(5);
        } else {
            // Gusti Tool Works coordinates fallback
            latInp.value = "12.80900";
            lngInp.value = "77.68900";
        }
    }
}

// Upload & Dropzone simulation
function triggerFileSelect() {
    document.getElementById('evidence-file').click();
}

function previewImage(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            uploadedImageBase64 = event.target.result;
            document.getElementById('drop-zone-default').classList.add('hidden');
            document.getElementById('drop-zone-preview-container').classList.remove('hidden');
            document.getElementById('image-upload-preview').src = uploadedImageBase64;
        };
        reader.readAsDataURL(file);
    }
}

function removeImage(e) {
    e.stopPropagation(); // Avoid triggering drop-zone click event
    document.getElementById('evidence-file').value = "";
    uploadedImageBase64 = "";
    document.getElementById('drop-zone-default').classList.remove('hidden');
    document.getElementById('drop-zone-preview-container').classList.add('hidden');
    document.getElementById('image-upload-preview').src = "#";
}

function resetReportForm() {
    document.getElementById('complaint-submission-form').reset();
    updateCoordsFromSelection();
    uploadedImageBase64 = "";
    document.getElementById('drop-zone-default').classList.remove('hidden');
    document.getElementById('drop-zone-preview-container').classList.add('hidden');
    document.getElementById('image-upload-preview').src = "#";
}

function submitComplaint(e) {
    e.preventDefault();

    const area = document.getElementById('report-area').value;
    const finalArea = area === "Manual Coordinates" ? "Custom Coordinates Area" : area;
    const latVal = parseFloat(document.getElementById('report-lat').value);
    const lngVal = parseFloat(document.getElementById('report-lng').value);
    const category = document.getElementById('pollution-category').value;
    const desc = document.getElementById('report-desc').value;

    const complaints = getComplaints();
    const newId = `JD-${Math.floor(10000 + Math.random() * 90000)}`;
    const nowISO = new Date().toISOString();

    const newComplaint = {
        id: newId,
        user: currentUser.name,
        location: finalArea,
        lat: latVal,
        lng: lngVal,
        category: category,
        description: desc,
        photo: uploadedImageBase64 || "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=400", // Fallback dummy photo
        dateTime: nowISO,
        status: "Submitted",
        remarks: "Report filed successfully. KSPCB dispatcher assigned review queue.",
        timeline: {
            submitted: nowISO,
            received: null,
            investigating: null,
            resolved: null
        }
    };

    complaints.unshift(newComplaint);
    saveComplaints(complaints);

    showToast("Complaint Filed", `Report ${newId} registered with the authority.`, "success");
    resetReportForm();
    
    // Auto navigate to tracking page
    switchView('complaints');
    selectComplaintToTrack(newId);
}


// --- COMPLAINTS TRACKING VIEW (VIEW 3) ---
function renderTrackingSection() {
    const complaints = getComplaints();
    const trackingList = document.getElementById('tracking-complaints-list');
    trackingList.innerHTML = '';

    // Filter complaints to show only current user's unless user is KSPCB/Admin
    let filtered = complaints;
    if (currentUser.role === 'resident') {
        filtered = complaints.filter(c => c.user === currentUser.name);
    }

    if (filtered.length === 0) {
        trackingList.innerHTML = `<div class="hint-text text-center py-4">No logged complaints found.</div>`;
        document.getElementById('timeline-details-placeholder').classList.remove('hidden');
        document.getElementById('timeline-details-content').classList.add('hidden');
        return;
    }

    filtered.forEach(c => {
        const item = document.createElement('div');
        item.className = `complaint-track-item ${c.id === activeTimelineComplaintId ? 'active' : ''}`;
        item.onclick = () => selectComplaintToTrack(c.id);

        let badgeClass = 'orange-badge';
        if (c.status === 'Investigating') badgeClass = 'blue-badge';
        if (c.status === 'Resolved') badgeClass = 'green-badge';

        item.innerHTML = `
            <div class="track-item-title">
                <h4>${c.category}</h4>
                <span class="badge ${badgeClass}" style="font-size: 0.65rem; padding: 2px 6px;">${c.status}</span>
            </div>
            <p class="desc">${c.description}</p>
            <div class="track-item-footer">
                <span class="zone">${c.location.split(' ')[0]}</span>
                <span class="date">${new Date(c.dateTime).toLocaleDateString('en-IN')}</span>
            </div>
        `;
        trackingList.appendChild(item);
    });

    // If an item was already active, preserve detail view, otherwise render placeholder
    if (activeTimelineComplaintId && filtered.some(c => c.id === activeTimelineComplaintId)) {
        selectComplaintToTrack(activeTimelineComplaintId);
    } else {
        document.getElementById('timeline-details-placeholder').classList.remove('hidden');
        document.getElementById('timeline-details-content').classList.add('hidden');
    }
}

function selectComplaintToTrack(id) {
    activeTimelineComplaintId = id;
    
    // Highlight list item
    document.querySelectorAll('.complaint-track-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Render timeline logs
    const complaints = getComplaints();
    const complaint = complaints.find(c => c.id === id);
    if (!complaint) return;

    document.getElementById('timeline-details-placeholder').classList.add('hidden');
    const content = document.getElementById('timeline-details-content');
    content.classList.remove('hidden');

    document.getElementById('timeline-title').textContent = complaint.category;
    document.getElementById('timeline-id-lbl').textContent = `Complaint #${complaint.id} | Location: ${complaint.location}`;
    
    const tBadge = document.getElementById('timeline-badge');
    tBadge.textContent = complaint.status;
    tBadge.className = 'badge';
    if (complaint.status === 'Submitted') tBadge.classList.add('orange-badge');
    if (complaint.status === 'Investigating') tBadge.classList.add('blue-badge');
    if (complaint.status === 'Resolved') tBadge.classList.add('green-badge');

    // Populate timeline steps
    const stepSub = document.getElementById('step-submitted');
    const stepRec = document.getElementById('step-received');
    const stepInv = document.getElementById('step-investigating');
    const stepRes = document.getElementById('step-resolved');

    // Reset status classes
    [stepSub, stepRec, stepInv, stepRes].forEach(el => {
        el.className = 'timeline-step';
    });

    const options = { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' };

    // 1. Submitted Step
    stepSub.classList.add('completed');
    document.getElementById('timeline-time-submitted').textContent = new Date(complaint.timeline.submitted).toLocaleDateString('en-IN', options);

    // 2. Received Step
    if (complaint.timeline.received || complaint.status !== 'Submitted') {
        stepRec.classList.add('completed');
        const timeRec = complaint.timeline.received ? new Date(complaint.timeline.received).toLocaleDateString('en-IN', options) : "Auto-Received: Same Day";
        document.getElementById('timeline-time-received').textContent = timeRec;
    } else {
        stepRec.classList.add('active-step');
        document.getElementById('timeline-time-received').textContent = "Awaiting Verification";
    }

    // 3. Investigating Step
    if (complaint.timeline.investigating && complaint.status !== 'Submitted') {
        stepInv.classList.add('completed');
        document.getElementById('timeline-time-investigating').textContent = new Date(complaint.timeline.investigating).toLocaleDateString('en-IN', options);
        document.getElementById('timeline-investigator-notes').textContent = complaint.remarks || "Patrol team investigating chemical discharge parameters.";
    } else if (complaint.status === 'Investigating') {
        stepInv.classList.add('active-step');
        document.getElementById('timeline-time-investigating').textContent = "Active Investigation Dispatched";
        document.getElementById('timeline-investigator-notes').textContent = complaint.remarks || "A field inspector is assigned. Status updates will follow sampling analysis.";
    } else {
        document.getElementById('timeline-time-investigating').textContent = "Pending Investigator Assignment";
        document.getElementById('timeline-investigator-notes').textContent = "Inspector screening queued.";
    }

    // 4. Resolved Step
    if (complaint.status === 'Resolved') {
        stepRes.classList.add('completed');
        const timeRes = complaint.timeline.resolved ? new Date(complaint.timeline.resolved).toLocaleDateString('en-IN', options) : "Resolved";
        document.getElementById('timeline-time-resolved').textContent = timeRes;
        document.getElementById('timeline-action-remarks').textContent = complaint.remarks || "Issue solved. Compliance logs verified.";
    } else if (complaint.status === 'Investigating') {
        stepRes.classList.add('timeline-step'); // Unchecked
        document.getElementById('timeline-time-resolved').textContent = "Awaiting Investigation Outcome";
        document.getElementById('timeline-action-remarks').textContent = "Final actions pending chemical test report verification.";
    } else {
        document.getElementById('timeline-time-resolved').textContent = "Awaiting Screening";
        document.getElementById('timeline-action-remarks').textContent = "Audit report pending.";
    }

    // Trigger high-lighting list item in sidebar
    const listItems = document.querySelectorAll('.complaint-track-item');
    listItems.forEach(item => {
        if (item.querySelector('h4').textContent === complaint.category) {
            item.classList.add('active');
        }
    });

    lucide.createIcons();
}


// --- INDUSTRY COMPLIANCE PORTAL (VIEW 4) ---
function renderIndustrySection() {
    const industries = getIndustries();
    const container = document.getElementById('industry-cards-container');
    container.innerHTML = '';

    industries.forEach(ind => {
        let badgeClass = 'green-badge';
        if (ind.status === 'Warning') badgeClass = 'orange-badge';
        if (ind.status === 'Non-compliant') badgeClass = 'red-badge';

        const item = document.createElement('div');
        item.className = 'industry-card-item';
        item.innerHTML = `
            <div class="ind-details">
                <h3>${ind.name}</h3>
                <p class="addr"><i data-lucide="map-pin"></i> ${ind.address}</p>
                <p class="desc" style="font-size: 0.8rem; color: var(--text-muted); margin-top: 8px;">Remarks: ${ind.remarks}</p>
            </div>
            <div class="ind-meta">
                <span class="badge ${badgeClass}">${ind.status}</span>
                <span class="last-log-time">pH: ${ind.ph} | TDS: ${ind.tds}</span>
                <span class="last-log-time">Audit Log: ${new Date(ind.lastReport).toLocaleDateString('en-IN')}</span>
            </div>
        `;
        container.appendChild(item);
    });

    // Sync options in factory selection form
    const indSelect = document.getElementById('industry-select');
    indSelect.innerHTML = '';
    industries.forEach(ind => {
        const option = document.createElement('option');
        option.value = ind.name;
        option.textContent = ind.name;
        indSelect.appendChild(option);
    });

    lucide.createIcons();
}

function submitIndustryReport(e) {
    e.preventDefault();

    const facilityName = document.getElementById('industry-select').value;
    const ph = parseFloat(document.getElementById('ind-ph').value);
    const tds = parseInt(document.getElementById('ind-tds').value);
    const cod = parseInt(document.getElementById('ind-cod').value);
    const bod = parseInt(document.getElementById('ind-bod').value);
    const remarks = document.getElementById('industry-remarks').value;

    const industries = getIndustries();
    const indIndex = industries.findIndex(i => i.name === facilityName);

    if (indIndex !== -1) {
        // Determine compliance status based on inputs
        // pH Target: 6.5 - 8.5, TDS: < 2100, COD: < 250, BOD: < 30
        let newStatus = "Compliant";
        let violationCount = 0;

        if (ph < 6.5 || ph > 8.5) violationCount++;
        if (tds >= 2100) violationCount++;
        if (cod >= 250) violationCount++;
        if (bod >= 30) violationCount++;

        if (violationCount >= 2) {
            newStatus = "Non-compliant";
        } else if (violationCount === 1) {
            newStatus = "Warning";
        }

        industries[indIndex].status = newStatus;
        industries[indIndex].ph = ph;
        industries[indIndex].tds = tds;
        industries[indIndex].lastReport = new Date().toISOString().split('T')[0];
        industries[indIndex].remarks = remarks || `Effluent metrics updated. pH: ${ph}, TDS: ${tds}. Operational parameters audited.`;

        saveIndustries(industries);
        
        // Show validation notification toast
        if (newStatus === "Compliant") {
            showToast("Report Verified", `${facilityName} status updated: Compliant.`, "success");
        } else if (newStatus === "Warning") {
            showToast("Compliance Warning", `${facilityName} has exceeded one threshold metric. Watch status assigned.`, "warning");
        } else {
            showToast("Critical Outflow Alert", `${facilityName} failed multiple regulatory constraints. Fines pending review.`, "danger");
        }

        document.getElementById('industry-report-form').reset();
        renderIndustrySection();
    }
}


// --- KSPCB / ADMIN SECTION (VIEW 5) ---
function renderAnalyticsSection() {
    renderKspcbComplaintsInbox();
    renderAnalyticsCharts();
}

function renderKspcbComplaintsInbox() {
    const complaints = getComplaints();
    const inbox = document.getElementById('kspcb-complaints-list');
    inbox.innerHTML = '';

    const nonResolved = complaints.filter(c => c.status !== 'Resolved');

    if (nonResolved.length === 0) {
        inbox.innerHTML = `<div class="hint-text text-center py-4">All reports screened and resolved. Good job!</div>`;
        return;
    }

    nonResolved.forEach(c => {
        const item = document.createElement('div');
        item.className = 'kspcb-item';
        
        const dateStr = new Date(c.dateTime).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
        
        let actionsHtml = '';
        if (c.status === 'Submitted') {
            actionsHtml = `
                <button class="btn-action-sm btn-assign" onclick="kspcbAssignInvestigator('${c.id}')"><i data-lucide="user-check"></i> Assign Investigator</button>
            `;
        } else if (c.status === 'Investigating') {
            actionsHtml = `
                <button class="btn-action-sm btn-resolve" onclick="kspcbResolveComplaint('${c.id}')"><i data-lucide="check-circle-2"></i> Resolve & Close</button>
            `;
        }

        item.innerHTML = `
            <div class="kspcb-item-header">
                <h3>${c.category}</h3>
                <span class="badge ${c.status === 'Submitted' ? 'orange-badge' : 'blue-badge'}">${c.status}</span>
            </div>
            <p class="desc">${c.description}</p>
            <div class="evidence-photo-box">
                <img src="${c.photo}" alt="Evidence Picture">
            </div>
            <div class="kspcb-meta-row">
                <span>By: ${c.user}</span>
                <span>Flipped: ${dateStr}</span>
            </div>
            <div class="kspcb-actions-row">
                ${actionsHtml}
            </div>
        `;
        inbox.appendChild(item);
    });

    lucide.createIcons();
}

function kspcbAssignInvestigator(id) {
    const complaints = getComplaints();
    const ind = complaints.findIndex(c => c.id === id);
    if (ind !== -1) {
        complaints[ind].status = "Investigating";
        complaints[ind].remarks = `KSPCB Lead Inspector: Dispatched Mobile Testing Team A. Assigned officer: Inspector Harish Kumar.`;
        complaints[ind].timeline.investigating = new Date().toISOString();
        if (!complaints[ind].timeline.received) {
            complaints[ind].timeline.received = new Date().toISOString();
        }
        
        saveComplaints(complaints);
        showToast("Investigator Assigned", `Patrol team dispatched to check ${id}.`, "info");
        renderAnalyticsSection();
        renderMapMarkers();
    }
}

function kspcbResolveComplaint(id) {
    const complaints = getComplaints();
    const ind = complaints.findIndex(c => c.id === id);
    if (ind !== -1) {
        complaints[ind].status = "Resolved";
        complaints[ind].remarks = `KSPCB Field Audit Completed: Sample tested. Verified compliance correction in regional stormwater bypass channels. Outflow parameters back to normal. Case Closed.`;
        complaints[ind].timeline.resolved = new Date().toISOString();
        
        saveComplaints(complaints);
        showToast("Complaint Resolved", `Case ${id} closed. Compliance records filed.`, "success");
        renderAnalyticsSection();
        renderMapMarkers();
    }
}

function triggerMockAlert() {
    const checkbox = document.getElementById('check-alert');
    if (checkbox.checked) {
        showToast(
            "REGIONAL QUALITY ALARM", 
            "Alert: TDS values exceed warning limits in Anekal Lake border borewells. Residential warnings broadcasted.", 
            "danger"
        );
    }
}

// --- CHARTS CREATION (CHART.JS) ---
function renderAnalyticsCharts() {
    // Destroy previous charts if active to rebuild
    if (charts.effluent) charts.effluent.destroy();
    if (charts.tds) charts.tds.destroy();

    // Chart 1: COD/BOD lines
    const ctxEff = document.getElementById('effluentChart').getContext('2d');
    charts.effluent = new Chart(ctxEff, {
        type: 'line',
        data: {
            labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [
                {
                    label: 'COD (Chemical Oxygen Demand) Target: <250',
                    data: [190, 210, 310, 280, 360, 290],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'BOD (Biological Oxygen Demand) Target: <30',
                    data: [22, 28, 54, 45, 68, 42],
                    borderColor: '#f97316',
                    backgroundColor: 'rgba(249, 115, 22, 0.1)',
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#f8fafc', font: { family: 'Outfit' } }
                }
            },
            scales: {
                x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8', font: { family: 'Outfit' } } },
                y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8', font: { family: 'Outfit' } } }
            }
        }
    });

    // Chart 2: TDS/pH Bars
    const ctxTds = document.getElementById('tdsChart').getContext('2d');
    charts.tds = new Chart(ctxTds, {
        type: 'bar',
        data: {
            labels: ['Jigani Industrial', 'Anekal Lake Border', 'Bommasandra Border', 'Gusti Surrounding'],
            datasets: [
                {
                    label: 'TDS (Total Dissolved Solids) in mg/L',
                    data: [3100, 450, 4200, 1850],
                    backgroundColor: '#0ea5e9',
                    borderRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#f8fafc', font: { family: 'Outfit' } }
                }
            },
            scales: {
                x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8', font: { family: 'Outfit' } } },
                y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8', font: { family: 'Outfit' } } }
            }
        }
    });
}


// --- TOAST NOTIFICATIONS HELPER ---
function showToast(title, message, type = "info") {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconName = "info";
    if (type === "success") iconName = "check-circle";
    if (type === "warning") iconName = "alert-triangle";
    if (type === "danger") iconName = "alert-octagon";

    toast.innerHTML = `
        <i data-lucide="${iconName}"></i>
        <div class="toast-content">
            <h5>${title}</h5>
            <p>${message}</p>
        </div>
    `;

    container.appendChild(toast);
    lucide.createIcons();

    // Automatically remove after 4.5 seconds
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 300);
    }, 4500);
}


// --- RUN INITIALIZATION ON LOAD ---
window.addEventListener('DOMContentLoaded', async () => {
    initDatabase();
    
    // Pull latest data from Supabase to sync local storage on load
    // await pullFromSupabase(); // DISABLED: RLS blocks writes, causing cloud to overwrite local changes
    
    // Re-render UI now that data is fetched
    if (document.getElementById('app-workspace') && !document.getElementById('app-workspace').classList.contains('hidden')) {
        renderDashboardFeeds();
        if (typeof renderMapMarkers === 'function') renderMapMarkers();
    }
    
    // Default: Setup Lucide icons globally
    lucide.createIcons();

    // Select Resident role default values for login
    selectRole('resident');

    // Instead of relying purely on window 'storage' event across tabs,
    // we use Supabase Realtime to catch new complaints from any device
    initSupabaseRealtime((newComplaint) => {
        // Update dashboard feeds + map markers if logged in
        if (document.getElementById('app-workspace') && !document.getElementById('app-workspace').classList.contains('hidden')) {
            renderDashboardFeeds();
            if (typeof renderMapMarkers === 'function') renderMapMarkers();
        }

        // Show toast for new complaint
        showToast(
            `🚨 New Citizen Report`,
            `${newComplaint.category} — ${newComplaint.location.split('(')[0].trim()} (ID: ${newComplaint.id})`,
            'warning'
        );

        // Update notification badge
        updateNotifBadge(1);
    });

    // We can keep the fallback interval just in case
    let lastComplaintCount = 0;
    setInterval(() => {
        const complaints = getComplaints();
        const citizenComplaints = complaints.filter(c => c.id && c.id.startsWith('JC-'));
        if (citizenComplaints.length > lastComplaintCount && lastComplaintCount > 0) {
            const newCount = citizenComplaints.length - lastComplaintCount;
            updateNotifBadge(newCount);
            if (!document.getElementById('app-workspace').classList.contains('hidden')) {
                renderDashboardFeeds();
            }
        }
        lastComplaintCount = citizenComplaints.length;
    }, 12000);
});


// --- NOTIFICATION PANEL LOGIC ---
let readReportIds = JSON.parse(localStorage.getItem('jd_read_reports') || '[]');

function updateNotifBadge(delta) {
    const bell  = document.getElementById('notif-bell');
    const count = document.getElementById('notif-count');
    const badge = document.getElementById('portal-new-badge');

    // Count unread JC- complaints
    const complaints = getComplaints();
    const citizenComplaints = complaints.filter(c => c.id && c.id.startsWith('JC-'));
    const unread = citizenComplaints.filter(c => !readReportIds.includes(c.id));

    if (unread.length > 0) {
        count.textContent = unread.length > 99 ? '99+' : unread.length;
        count.classList.remove('hidden');
        bell.classList.add('has-notif');
        if (badge) badge.classList.remove('hidden');
    } else {
        count.classList.add('hidden');
        bell.classList.remove('has-notif');
        if (badge) badge.classList.add('hidden');
    }
}

function showNewReportsPanel() {
    const panel   = document.getElementById('notif-panel');
    const overlay = document.getElementById('notif-panel-overlay');
    const body    = document.getElementById('notif-panel-body');
    const subtitle= document.getElementById('notif-panel-subtitle');

    if (!panel) return;

    // Gather all JC- (citizen portal) complaints
    const complaints = getComplaints();
    const citizenComplaints = complaints.filter(c => c.id && c.id.startsWith('JC-'));

    body.innerHTML = '';

    if (citizenComplaints.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'notif-empty';
        empty.innerHTML = `
            <i data-lucide="inbox"></i>
            <p>No citizen reports yet. Share the Citizen Portal link so residents can report pollution.</p>
        `;
        body.appendChild(empty);
        subtitle.textContent = '0 reports from the JalDrishti Citizen Portal';
    } else {
        subtitle.textContent = `${citizenComplaints.length} report${citizenComplaints.length !== 1 ? 's' : ''} submitted via the Citizen Portal`;

        citizenComplaints.forEach(c => {
            const isRead = readReportIds.includes(c.id);
            const dateStr = new Date(c.dateTime).toLocaleString('en-IN', {
                day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
            });
            const div = document.createElement('div');
            div.className = `notif-item ${isRead ? 'read-report' : 'new-report'}`;
            div.onclick = () => {
                // Mark as read
                if (!readReportIds.includes(c.id)) {
                    readReportIds.push(c.id);
                    localStorage.setItem('jd_read_reports', JSON.stringify(readReportIds));
                    div.classList.remove('new-report');
                    div.classList.add('read-report');
                    updateNotifBadge(0);
                }
                // Navigate to complaint tracker
                closeNewReportsPanel();
                switchView('complaints');
                setTimeout(() => selectComplaintToTrack(c.id), 300);
            };
            div.innerHTML = `
                <div class="notif-item-header">
                    <h4>${c.category}</h4>
                    <span class="notif-item-time">${dateStr}</span>
                </div>
                <div class="notif-item-loc">📍 ${c.location}</div>
                <div style="font-size:0.78rem;color:var(--text-muted);line-height:1.4;">${c.description.substring(0, 100)}${c.description.length > 100 ? '...' : ''}</div>
                ${c.photo && !c.photo.startsWith('http') ? `` : (c.photo ? `<img src="${c.photo}" class="notif-item-img" onerror="this.style.display='none'">` : '')}
                <span class="notif-item-id">${c.id} ${!isRead ? '• NEW' : ''}</span>
            `;
            body.appendChild(div);
        });
    }

    overlay.classList.remove('hidden');
    panel.classList.remove('hidden');
    // Small delay so CSS transition fires
    requestAnimationFrame(() => requestAnimationFrame(() => panel.classList.add('open')));
    lucide.createIcons();
}

function closeNewReportsPanel() {
    const panel   = document.getElementById('notif-panel');
    const overlay = document.getElementById('notif-panel-overlay');
    if (!panel) return;
    panel.classList.remove('open');
    setTimeout(() => {
        panel.classList.add('hidden');
        overlay.classList.add('hidden');
    }, 380);
}

function markAllReportsRead() {
    const complaints = getComplaints();
    complaints.filter(c => c.id && c.id.startsWith('JC-')).forEach(c => {
        if (!readReportIds.includes(c.id)) readReportIds.push(c.id);
    });
    localStorage.setItem('jd_read_reports', JSON.stringify(readReportIds));
    updateNotifBadge(0);
    showNewReportsPanel(); // re-render panel
    showToast('All Read', 'All citizen reports marked as read.', 'info');
}

