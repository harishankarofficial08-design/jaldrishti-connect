// =====================================================
// JalDrishti Connect — Landing Page JavaScript
// =====================================================

// ---- LocalStorage DB Helpers (shared with admin dashboard) ----
const LD = {
    getComplaints:  () => JSON.parse(localStorage.getItem('jd_complaints')  || '[]'),
    saveComplaints: (d) => {
        localStorage.setItem('jd_complaints', JSON.stringify(d));
        if (typeof pushToSupabase === 'function') pushToSupabase('complaints', d);
    },
    getLocations:   () => JSON.parse(localStorage.getItem('jd_locations')   || '[]'),
    getIndustries:  () => JSON.parse(localStorage.getItem('jd_industries')  || '[]'),
    getReports:     () => JSON.parse(localStorage.getItem('jd_reports')     || '[]'),
};

// ---- Default seed (mirrors admin dashboard) ----
const SEED = {
    locations: [
        { id:"loc-jigani-ind",    name:"Jigani Industrial Area (Border Zone)",      lat:12.78330, lng:77.63330, status:"Polluted",  ph:5.4, tds:3100, bod:85,  summary:"Effluent levels exceed regulatory limits. Elevated TDS detected.", verifier:"KSPCB Mobile Lab Team B" },
        { id:"loc-anekal-lake",   name:"Anekal Lake Border (Resident Zone)",         lat:12.70990, lng:77.69890, status:"Safe",     ph:7.2, tds:450,  bod:12,  summary:"Parameters within thresholds. No effluents detected.", verifier:"Anekal Water Testing Lab" },
        { id:"loc-bommasandra",   name:"Bommasandra Border (Industrial Zone)",       lat:12.81670, lng:77.68330, status:"Polluted",  ph:4.8, tds:4200, bod:110, summary:"Severe acidic spike during midnight monitoring. Heavy metals screening recommended.", verifier:"KSPCB Central Lab" },
        { id:"loc-gusti",         name:"Gusti Tool Works Surrounding (Bommasandra)", lat:12.80900, lng:77.68900, status:"Moderate", ph:6.2, tds:1850, bod:42,  summary:"Border runoff turbidity close to compliance thresholds.", verifier:"KSPCB Mobile Lab Team A" }
    ],
    complaints: [
        { id:"JD-90432", user:"Sneha Sundi",               location:"Jigani Industrial Area (Border Zone)", lat:12.78330, lng:77.63330, category:"Illegal Midnight Effluent Discharge", description:"Dark, chemical-smelling runoff observed from a pipeline at 1:30 AM.", photo:"https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&q=80&w=400", dateTime:"2026-07-16T01:30", status:"Investigating", remarks:"KSPCB Dispatcher: Patrol team assigned.", timeline:{ submitted:"2026-07-16T02:00", received:"2026-07-16T09:00", investigating:"2026-07-16T11:30", resolved:null } },
        { id:"JD-88219", user:"Rajesh Gowda",              location:"Bommasandra Border (Industrial Zone)",  lat:12.81670, lng:77.68330, category:"Foaming / Sludge Accumulation",       description:"Large patches of chemical foam on the channel. Severe foul odor.",          photo:"https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=400", dateTime:"2026-07-15T23:15", status:"Submitted",    remarks:"Pending review.", timeline:{ submitted:"2026-07-15T23:45", received:null, investigating:null, resolved:null } },
        { id:"JD-71043", user:"Anekal Farmer Association", location:"Anekal Lake Border (Resident Zone)",   lat:12.70990, lng:77.69890, category:"Borewell Water Contamination",         description:"Borewell water turned yellowish with strong chlorine-like smell.",          photo:"https://images.unsplash.com/photo-1538300342682-be57b6d5f482?auto=format&fit=crop&q=80&w=400", dateTime:"2026-07-12T08:00", status:"Resolved",     remarks:"Upstream pipe leak closed. 2,50,000 INR fine issued.", timeline:{ submitted:"2026-07-12T09:30", received:"2026-07-12T10:15", investigating:"2026-07-13T10:00", resolved:"2026-07-15T16:00" } }
    ],
    industries: [
        { id:"ind-gusti",      name:"Gusti Tool Works",              address:"Phase 1, Bommasandra Industrial Area", status:"Compliant",     ph:7.2, tds:1450, lastReport:"2026-07-14", remarks:"Standard effluents treated via onsite recycling plant." },
        { id:"ind-jigani-dye", name:"Jigani Dyeing & Finishing Works",address:"Border Road, Jigani Industrial Area", status:"Warning",       ph:5.8, tds:2600, lastReport:"2026-07-10", remarks:"Heavy chemical residues. Secondary aeration tank needs maintenance." },
        { id:"ind-anekal-met", name:"Anekal Metal Finishers",         address:"Anekal-Jigani Link Road",             status:"Non-compliant", ph:4.5, tds:4100, lastReport:"2026-07-05", remarks:"Acidity filters failing. Warning letter issued July 12th." }
    ],
    reports: [
        { id:"R-904", location:"Jigani Industrial Checkpoint",    status:"Warning", date:"2026-07-16", summary:"Acidic effluent residues. pH: 5.4, TDS: 3100 mg/L.", by:"KSPCB Mobile Unit B" },
        { id:"R-903", location:"Anekal Lake Inlet Point",         status:"Safe",    date:"2026-07-15", summary:"Stable. pH: 7.2, TDS: 450 mg/L.", by:"Anekal Gram Panchayat Lab" },
        { id:"R-902", location:"Bommasandra Border Borewell #3",  status:"Alert",   date:"2026-07-14", summary:"Extreme chemical load. pH: 4.8, TDS: 4200 mg/L.", by:"KSPCB Central Lab" }
    ]
};

// ---- Global State ----
let uploadedPhotoBase64 = '';
let gpsCoords = null;
let gpsMap = null;
let landingMap = null;
let landingMapMarkers = [];
let statsAnimated = false;
let confettiAnimation = null;

// ====================================================
// INITIALIZATION
// ====================================================
document.addEventListener('DOMContentLoaded', async () => {
    initDB();

    // Pull latest data from Supabase to sync local storage on load
    if (typeof pullFromSupabase === 'function') {
        await pullFromSupabase();
    }
    
    // Subscribe to realtime updates for the timeline tracker
    if (typeof initSupabaseRealtime === 'function') {
        initSupabaseRealtime((newComplaint) => {
            // Update stats or maps if needed
            renderLandingMapMarkers();
        });
    }

    initRippleCanvas();
    initBubbles();
    initScrollNav();
    setDateTime();
    setInterval(setDateTime, 60000);
    initLandingMap();
    // Refresh map markers every 15s to catch admin dashboard changes
    setInterval(renderLandingMapMarkers, 15000);
    populateHeroStats();
    initScrollRevealObserver();
    // Allow Enter key on tracker input
    const trackerInput = document.getElementById('tracker-id-input');
    if (trackerInput) trackerInput.addEventListener('keydown', e => { if (e.key === 'Enter') lookupComplaint(); });
    lucide.createIcons();
});

function initDB() {
    if (!localStorage.getItem('jd_locations'))  localStorage.setItem('jd_locations',  JSON.stringify(SEED.locations));
    if (!localStorage.getItem('jd_complaints')) localStorage.setItem('jd_complaints', JSON.stringify(SEED.complaints));
    if (!localStorage.getItem('jd_industries')) localStorage.setItem('jd_industries', JSON.stringify(SEED.industries));
    if (!localStorage.getItem('jd_reports'))    localStorage.setItem('jd_reports',    JSON.stringify(SEED.reports));
}


// ====================================================
// WATER RIPPLE CANVAS ANIMATION
// ====================================================
function initRippleCanvas() {
    const canvas = document.getElementById('ripple-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;
    const ripples = [];

    function resize() {
        w = canvas.width  = canvas.offsetWidth;
        h = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function spawnRipple() {
        ripples.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: 0,
            maxR: 80 + Math.random() * 120,
            speed: 0.6 + Math.random() * 0.8,
            alpha: 0.6
        });
    }

    setInterval(spawnRipple, 900);

    function draw() {
        ctx.clearRect(0, 0, w, h);
        for (let i = ripples.length - 1; i >= 0; i--) {
            const rp = ripples[i];
            rp.r    += rp.speed;
            rp.alpha = 0.6 * (1 - rp.r / rp.maxR);

            ctx.beginPath();
            ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(14, 165, 233, ${rp.alpha})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            if (rp.r >= rp.maxR) ripples.splice(i, 1);
        }
        requestAnimationFrame(draw);
    }
    draw();
}


// ====================================================
// FLOATING BUBBLES
// ====================================================
function initBubbles() {
    const container = document.getElementById('hero-bubbles');
    if (!container) return;
    const COUNT = 18;
    for (let i = 0; i < COUNT; i++) {
        const b = document.createElement('div');
        b.className = 'bubble';
        const size = 8 + Math.random() * 40;
        b.style.cssText = `
            width:${size}px; height:${size}px;
            left:${Math.random() * 100}%;
            animation-duration:${8 + Math.random() * 14}s;
            animation-delay:${Math.random() * 12}s;
        `;
        container.appendChild(b);
    }
}


// ====================================================
// NAVBAR — SCROLL SHRINK + MOBILE TOGGLE
// ====================================================
function initScrollNav() {
    const nav = document.getElementById('landing-nav');
    if (!nav) return;

    const sections = ['hero','how-it-works','complaint-form','live-map','live-stats','tracker','why','emergency'];
    const navLinks = document.querySelectorAll('.nav-links a:not(.nav-dashboard-btn)');

    window.addEventListener('scroll', () => {
        // Scrolled style
        nav.classList.toggle('scrolled', window.scrollY > 60);

        // Active nav link
        let current = '';
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el && window.scrollY >= el.offsetTop - 120) current = id;
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href === '#' + current) link.classList.add('active');
        });
    }, { passive: true });
}

function toggleMobileNav() {
    const links = document.getElementById('nav-links');
    const icon  = document.getElementById('hamburger-icon');
    if (!links) return;
    const isOpen = links.classList.toggle('open');
    if (icon) {
        icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
        lucide.createIcons();
    }
}

function closeMobileNav() {
    const links = document.getElementById('nav-links');
    const icon  = document.getElementById('hamburger-icon');
    if (links) links.classList.remove('open');
    if (icon) { icon.setAttribute('data-lucide', 'menu'); lucide.createIcons(); }
}


// ====================================================
// SCROLL REVEAL (Intersection Observer)
// ====================================================
function initScrollReveal() { /* placeholder — observer added below */ }

function initScrollRevealObserver() {
    const elements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');

                // Animate stats when any stat-card becomes visible
                const id = entry.target.id || '';
                if (id.startsWith('stat-card') && !statsAnimated) {
                    statsAnimated = true;
                    setTimeout(animateStats, 250);
                }

                // Invalidate map size when the map wrapper is revealed
                if (id === 'landing-map-wrapper' && landingMap) {
                    setTimeout(() => landingMap.invalidateSize(), 300);
                }

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
    elements.forEach(el => observer.observe(el));
}


// ====================================================
// DATE & TIME AUTO-FILL
// ====================================================
function setDateTime() {
    const now = new Date();
    const dateEl = document.getElementById('incident-date');
    const timeEl = document.getElementById('incident-time');
    if (dateEl) dateEl.value = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
    if (timeEl) timeEl.value = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}


// ====================================================
// PHOTO UPLOAD HANDLERS
// ====================================================
function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
        showToast('File Too Large', 'Please upload an image under 10 MB.', 'error');
        return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
        uploadedPhotoBase64 = ev.target.result;
        showPhotoPreview(ev.target.result);
    };
    reader.readAsDataURL(file);
}

function showPhotoPreview(src) {
    document.getElementById('drop-default-state').classList.add('hidden');
    document.getElementById('drop-preview-state').classList.remove('hidden');
    document.getElementById('citizen-photo-preview').src = src;
    lucide.createIcons();
}

function clearPhoto() {
    uploadedPhotoBase64 = '';
    document.getElementById('citizen-file-input').value = '';
    document.getElementById('citizen-photo-preview').src = '#';
    document.getElementById('drop-preview-state').classList.add('hidden');
    document.getElementById('drop-default-state').classList.remove('hidden');
}

function handleDragOver(e) {
    e.preventDefault();
    document.getElementById('landing-drop-zone').classList.add('dragover');
}

function handleDragLeave(e) {
    document.getElementById('landing-drop-zone').classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    document.getElementById('landing-drop-zone').classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        if (file.size > 10 * 1024 * 1024) {
            showToast('File Too Large', 'Please upload an image under 10 MB.', 'error');
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
            uploadedPhotoBase64 = ev.target.result;
            showPhotoPreview(ev.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        showToast('Invalid File', 'Please drop a JPG or PNG image.', 'error');
    }
}


// ====================================================
// CHARACTER COUNTER
// ====================================================
function updateCharCount(el) {
    const count = document.getElementById('char-count');
    if (count) {
        count.textContent = el.value.length;
        count.style.color = el.value.length >= 280 ? 'var(--warning)' : '';
    }
}


// ====================================================
// LOCATION MODE SWITCHER
// ====================================================
function switchLocationMode(mode) {
    const gpsPanel    = document.getElementById('gps-mode');
    const manualPanel = document.getElementById('manual-mode');
    if (mode === 'gps') {
        gpsPanel.classList.remove('hidden');
        manualPanel.classList.add('hidden');
    } else {
        gpsPanel.classList.add('hidden');
        manualPanel.classList.remove('hidden');
    }
}


// ====================================================
// GPS DETECTION
// ====================================================
function requestGPS() {
    const btn     = document.getElementById('gps-btn');
    const result  = document.getElementById('gps-result');
    const denied  = document.getElementById('gps-denied');

    if (!navigator.geolocation) {
        denied.classList.remove('hidden');
        return;
    }

    btn.classList.add('loading');
    btn.querySelector('span').textContent = 'Detecting...';

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            gpsCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude, acc: pos.coords.accuracy };

            btn.classList.remove('loading');
            btn.querySelector('span').textContent = '✓ Location Detected';
            btn.style.background = 'linear-gradient(135deg, var(--success), #16a34a)';

            document.getElementById('gps-lat').textContent = gpsCoords.lat.toFixed(6);
            document.getElementById('gps-lng').textContent = gpsCoords.lng.toFixed(6);
            document.getElementById('gps-acc').textContent = Math.round(gpsCoords.acc) + ' m';

            // Reverse-geocode with nominatim
            fetch(`https://nominatim.openstreetmap.org/reverse?lat=${gpsCoords.lat}&lon=${gpsCoords.lng}&format=json`)
                .then(r => r.json())
                .then(data => {
                    const addr = data.address || {};
                    const area = addr.suburb || addr.village || addr.town || addr.city || addr.county || 'Detected Area';
                    document.getElementById('gps-area').textContent = area + ', ' + (addr.state || 'Karnataka');
                })
                .catch(() => {
                    document.getElementById('gps-area').textContent = `${gpsCoords.lat.toFixed(4)}, ${gpsCoords.lng.toFixed(4)}`;
                });

            result.classList.remove('hidden');
            denied.classList.add('hidden');

            // Mini Leaflet map
            setTimeout(() => {
                if (gpsMap) { gpsMap.remove(); gpsMap = null; }
                gpsMap = L.map('gps-mini-map', { zoomControl: false, attributionControl: false }).setView([gpsCoords.lat, gpsCoords.lng], 15);
                L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(gpsMap);
                L.circleMarker([gpsCoords.lat, gpsCoords.lng], { radius: 10, fillColor: '#0ea5e9', color: '#fff', weight: 2, fillOpacity: 0.9 }).addTo(gpsMap);
                lucide.createIcons();
            }, 100);
        },
        (err) => {
            btn.classList.remove('loading');
            btn.querySelector('span').textContent = 'Detect My Location';
            denied.classList.remove('hidden');
            result.classList.add('hidden');
            showToast('Location Denied', 'Please enter your address manually.', 'error');
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
}


// ====================================================
// ANONYMOUS TOGGLE
// ====================================================
function toggleAnonymous(checkbox) {
    const fields = document.getElementById('contact-fields');
    const nameInput  = document.getElementById('contact-name');
    const phoneInput = document.getElementById('contact-phone');
    const emailInput = document.getElementById('contact-email');
    if (checkbox.checked) {
        [nameInput, phoneInput, emailInput].forEach(f => {
            f.style.opacity = '0.35';
            f.setAttribute('disabled', true);
            f.setAttribute('placeholder', '— Hidden (Anonymous) —');
        });
    } else {
        [nameInput, phoneInput, emailInput].forEach(f => {
            f.style.opacity = '';
            f.removeAttribute('disabled');
        });
        nameInput.setAttribute('placeholder',  'e.g. Riya Sharma');
        phoneInput.setAttribute('placeholder', '9876543210');
        emailInput.setAttribute('placeholder', 'riya@example.com');
    }
}


// ====================================================
// COMPLAINT ID GENERATOR
// ====================================================
function generateComplaintId() {
    const year = new Date().getFullYear();
    const num  = String(100000 + Math.floor(Math.random() * 900000)).slice(0, 6);
    return `JC-${year}-${num}`;
}


// ====================================================
// FORM SUBMISSION
// ====================================================
function submitCitizenComplaint(e) {
    e.preventDefault();

    // Validate consent
    if (!document.getElementById('consent-check').checked) {
        showToast('Consent Required', 'Please confirm that your information is accurate.', 'error');
        return;
    }

    // Validate pollution type
    const pollutionType = document.getElementById('citizen-pollution-type').value;
    if (!pollutionType) {
        showToast('Pollution Type Required', 'Please select the type of pollution.', 'error');
        return;
    }

    // Validate description
    const description = document.getElementById('citizen-description').value.trim();
    if (!description) {
        showToast('Description Required', 'Please describe what you observed.', 'error');
        return;
    }

    // Get location
    const locType = document.querySelector('input[name="location-type"]:checked').value;
    let locationName, lat, lng;

    if (locType === 'gps' && gpsCoords) {
        lat = gpsCoords.lat;
        lng = gpsCoords.lng;
        locationName = document.getElementById('gps-area').textContent || 'GPS Location';
    } else if (locType === 'manual') {
        const area     = document.getElementById('addr-area').value.trim();
        const city     = document.getElementById('addr-city').value.trim();
        const district = document.getElementById('addr-district').value.trim();
        locationName = [area, city, district].filter(Boolean).join(', ') || 'Manual Address Provided';
        // Use Jigani-Anekal center as fallback for map placement
        lat = 12.78 + (Math.random() - 0.5) * 0.08;
        lng = 77.66 + (Math.random() - 0.5) * 0.08;
    } else if (locType === 'gps' && !gpsCoords) {
        showToast('Location Required', 'Please detect your GPS location or switch to manual entry.', 'error');
        return;
    } else {
        // Fallback
        lat = 12.7800; lng = 77.6500;
        locationName = 'Jigani-Anekal Region';
    }

    // Contact info
    const isAnon = document.getElementById('anonymous-check').checked;
    const contactName  = isAnon ? 'Anonymous'         : (document.getElementById('contact-name').value.trim()  || 'Citizen Reporter');
    const contactPhone = isAnon ? ''                  : document.getElementById('contact-phone').value.trim();
    const contactEmail = isAnon ? ''                  : document.getElementById('contact-email').value.trim();

    // Photo — use uploaded or a contextual fallback
    const FALLBACK_PHOTOS = {
        'Illegal Industrial Effluent':   'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&q=80&w=400',
        'Foamy Water / Chemical Foam':   'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=400',
        'Oil Spill':                     'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=400',
        'Borewell Water Contamination':  'https://images.unsplash.com/photo-1538300342682-be57b6d5f482?auto=format&fit=crop&q=80&w=400',
    };
    const photo = uploadedPhotoBase64 || FALLBACK_PHOTOS[pollutionType] || FALLBACK_PHOTOS['Illegal Industrial Effluent'];

    // Build complaint object
    const nowISO = new Date().toISOString();
    const id     = generateComplaintId();

    const newComplaint = {
        id,
        user:        contactName,
        phone:       contactPhone,
        email:       contactEmail,
        anonymous:   isAnon,
        location:    locationName,
        lat,
        lng,
        category:    pollutionType,
        description,
        photo,
        dateTime:    nowISO,
        status:      'Submitted',
        remarks:     'Complaint filed via JalDrishti citizen portal. Pending KSPCB dispatcher review.',
        timeline: {
            submitted:    nowISO,
            received:     null,
            investigating: null,
            resolved:     null
        }
    };

    // Show loading state
    const btn = document.getElementById('submit-complaint-btn');
    btn.disabled = true;
    document.getElementById('submit-idle-state').classList.add('hidden');
    document.getElementById('submit-loading-state').classList.remove('hidden');

    // Simulate network delay then save
    setTimeout(() => {
        const complaints = LD.getComplaints();
        complaints.unshift(newComplaint);
        LD.saveComplaints(complaints);

        // Show success overlay
        document.getElementById('success-complaint-id').textContent = id;
        document.getElementById('success-overlay').classList.remove('hidden');
        lucide.createIcons();

        // Run confetti
        launchConfetti();

        // Refresh map markers
        renderLandingMapMarkers();

        // Update stats
        populateHeroStats();
        animateStats();

        // Reset button state
        btn.disabled = false;
        document.getElementById('submit-idle-state').classList.remove('hidden');
        document.getElementById('submit-loading-state').classList.add('hidden');

        showToast('Complaint Submitted!', `ID: ${id} — Sent to KSPCB.`, 'success');
    }, 1800);
}


// ====================================================
// RESET FORM
// ====================================================
function resetComplaintForm() {
    document.getElementById('citizen-complaint-form').reset();
    document.getElementById('success-overlay').classList.add('hidden');
    clearPhoto();
    gpsCoords = null;
    document.getElementById('gps-result').classList.add('hidden');
    document.getElementById('gps-denied').classList.add('hidden');
    const btn = document.getElementById('gps-btn');
    if (btn) {
        btn.style.background = '';
        btn.querySelector('span').textContent = 'Detect My Location';
        btn.classList.remove('loading');
    }
    document.getElementById('char-count').textContent = '0';
    switchLocationMode('gps');
    document.getElementById('loc-gps').checked = true;
    setDateTime();
    // Restore contact fields if anonymous was checked
    const anonCheck = document.getElementById('anonymous-check');
    if (anonCheck.checked) {
        anonCheck.checked = false;
        toggleAnonymous(anonCheck);
    }
    if (confettiAnimation) { cancelAnimationFrame(confettiAnimation); confettiAnimation = null; }
    lucide.createIcons();
}


// ====================================================
// GO TO TRACKER (scroll + pre-fill ID)
// ====================================================
function goToTracker() {
    const id = document.getElementById('success-complaint-id').textContent;
    document.getElementById('tracker-id-input').value = id;
    document.getElementById('tracker').scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => lookupComplaint(), 600);
}


// ====================================================
// CONFETTI ANIMATION
// ====================================================
function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    const COLORS = ['#0ea5e9', '#22c55e', '#f97316', '#a78bfa', '#22d3ee', '#fbbf24'];
    const particles = Array.from({ length: 120 }, () => ({
        x:    Math.random() * W,
        y:    Math.random() * H * 0.4 - H * 0.2,
        vx:   (Math.random() - 0.5) * 4,
        vy:   1.5 + Math.random() * 3,
        size: 6 + Math.random() * 8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 8,
        shape: Math.random() > 0.5 ? 'rect' : 'circle'
    }));

    let frame = 0;
    function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            p.x  += p.vx;
            p.y  += p.vy;
            p.vy += 0.07;
            p.vx *= 0.99;
            p.rotation += p.rotSpeed;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0, 1 - frame / 200);

            if (p.shape === 'rect') {
                ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
            } else {
                ctx.beginPath();
                ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        });

        frame++;
        if (frame < 220) {
            confettiAnimation = requestAnimationFrame(draw);
        } else {
            ctx.clearRect(0, 0, W, H);
        }
    }
    draw();
}


// ====================================================
// LANDING LEAFLET MAP
// ====================================================
function initLandingMap() {
    if (landingMap) { landingMap.remove(); landingMap = null; }
    landingMap = L.map('landing-leaflet-map', {
        zoomControl: true,
        attributionControl: false,
        scrollWheelZoom: false
    }).setView([12.76, 77.66], 12);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(landingMap);
    renderLandingMapMarkers();
}

function renderLandingMapMarkers() {
    if (!landingMap) return;
    landingMapMarkers.forEach(m => landingMap.removeLayer(m));
    landingMapMarkers = [];

    const locations  = LD.getLocations();
    const complaints = LD.getComplaints();

    // Location checkpoints
    locations.forEach(loc => {
        const color = loc.status === 'Safe' ? '#22c55e' : loc.status === 'Moderate' ? '#f97316' : '#ef4444';
        const icon  = L.divIcon({
            html: `<div style="width:16px;height:16px;border-radius:50%;background:${color};border:2.5px solid #fff;box-shadow:0 0 10px ${color},0 0 20px ${color}44;"></div>`,
            className: '', iconSize: [16, 16], iconAnchor: [8, 8]
        });
        const m = L.marker([loc.lat, loc.lng], { icon }).addTo(landingMap);
        m.bindPopup(`
            <div style="font-family:'Outfit',sans-serif;min-width:200px;padding:4px;">
                <strong style="font-size:0.9rem;">${loc.name}</strong><br>
                <span style="color:${color};font-weight:600;font-size:0.8rem;">● ${loc.status}</span><br>
                <small style="color:#94a3b8;">pH: ${loc.ph} | TDS: ${loc.tds} mg/L | BOD: ${loc.bod} mg/L</small><br>
                <p style="margin:6px 0 0;font-size:0.78rem;color:#94a3b8;line-height:1.4;">${loc.summary}</p>
                <small style="color:#64748b;">Verified by: ${loc.verifier}</small>
            </div>
        `, { maxWidth: 280 });
        landingMapMarkers.push(m);
    });

    // Active complaints
    complaints.forEach(c => {
        if (c.status === 'Resolved') return;
        const statusColor = c.status === 'Investigating' ? '#f97316' : '#ef4444';
        const icon = L.divIcon({
            html: `<div style="width:14px;height:14px;clip-path:polygon(50% 0%,100% 100%,0% 100%);background:${statusColor};box-shadow:0 0 12px ${statusColor};animation:none;"></div>`,
            className: '', iconSize: [14, 14], iconAnchor: [7, 7]
        });
        const m = L.marker([c.lat, c.lng], { icon }).addTo(landingMap);
        const dateStr = new Date(c.dateTime).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
        m.bindPopup(`
            <div style="font-family:'Outfit',sans-serif;min-width:220px;padding:4px;">
                ${c.photo ? `<img src="${c.photo}" style="width:100%;height:100px;object-fit:cover;border-radius:6px;margin-bottom:8px;" onerror="this.style.display='none'">` : ''}
                <strong style="font-size:0.88rem;">${c.category}</strong><br>
                <small style="color:#94a3b8;font-family:monospace;">ID: ${c.id}</small><br>
                <span style="color:${statusColor};font-size:0.78rem;font-weight:600;">● ${c.status}</span><br>
                <p style="margin:6px 0 0;font-size:0.78rem;color:#94a3b8;line-height:1.4;">${c.description.substring(0, 100)}${c.description.length > 100 ? '...' : ''}</p>
                <small style="color:#64748b;">📅 ${dateStr}</small>
            </div>
        `, { maxWidth: 280 });
        landingMapMarkers.push(m);
    });
}


// ====================================================
// HERO STATS
// ====================================================
function populateHeroStats() {
    const complaints = LD.getComplaints();
    const locations  = LD.getLocations();
    const el1 = document.getElementById('hero-count-reports');
    const el2 = document.getElementById('hero-count-areas');
    if (el1) el1.textContent = complaints.length + 11;
    if (el2) el2.textContent = locations.length;
}


// ====================================================
// STATS COUNTER ANIMATION
// ====================================================
function animateStats() {
    const complaints  = LD.getComplaints();
    const locations   = LD.getLocations();
    const industries  = LD.getIndustries();
    const reports     = LD.getReports();

    const targets = {
        'stat-reports':       complaints.length + 11,
        'stat-verified':      reports.length + 8,
        'stat-water-bodies':  locations.length + 2,
        'stat-authorities':   3,
        'stat-industries':    industries.filter(i => i.status !== 'Compliant').length
    };

    Object.entries(targets).forEach(([id, target]) => {
        const el = document.getElementById(id);
        if (!el) return;
        let current = 0;
        const step  = Math.ceil(target / 40);
        const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = current;
            if (current >= target) clearInterval(timer);
        }, 35);
    });
}


// ====================================================
// COMPLAINT STATUS TRACKER
// ====================================================
function lookupComplaint() {
    const input   = document.getElementById('tracker-id-input');
    const result  = document.getElementById('tracker-result');
    const notFound= document.getElementById('tracker-not-found');
    const query   = (input.value || '').trim().toUpperCase();

    if (!query) {
        showToast('Enter an ID', 'Please type a Complaint ID first.', 'error');
        return;
    }

    result.classList.add('hidden');
    notFound.classList.add('hidden');

    const complaints = LD.getComplaints();
    const c = complaints.find(x => x.id.toUpperCase() === query);

    if (!c) {
        notFound.classList.remove('hidden');
        lucide.createIcons();
        return;
    }

    // Populate header
    document.getElementById('tracker-category').textContent    = c.category;
    document.getElementById('tracker-location-lbl').textContent = c.location;

    const badge = document.getElementById('tracker-status-badge');
    badge.textContent = c.status;
    badge.className   = 'badge';
    if (c.status === 'Submitted')    badge.classList.add('orange-badge');
    if (c.status === 'Investigating') badge.classList.add('blue-badge');
    if (c.status === 'Resolved')     badge.classList.add('green-badge');

    // Build timeline
    const statusOrder = ['Submitted', 'Investigating', 'Resolved'];
    const currentIdx  = statusOrder.indexOf(c.status);

    const STEPS = [
        { label: 'Complaint Submitted',       icon: 'send',              key: 'submitted',     desc: 'Citizen filed report with photo and location coordinates.' },
        { label: 'Under Review (KSPCB)',       icon: 'file-search-2',     key: 'received',      desc: 'Complaint registered in KSPCB regulatory portal and queued.' },
        { label: 'Inspection Scheduled',       icon: 'calendar-check-2',  key: null,            desc: 'On-site inspection scheduled by the local KSPCB inspector.' },
        { label: 'Sample Collection',          icon: 'test-tube-2',        key: null,            desc: 'Water samples collected for certified laboratory analysis.' },
        { label: 'Investigation in Progress',  icon: 'search',             key: 'investigating', desc: 'Inspector assigned. Chemical markers and effluent data under review.' },
        { label: 'Resolved / Action Taken',    icon: 'clipboard-check',    key: 'resolved',      desc: c.remarks || 'Regulatory action taken. Case closed.' }
    ];

    const tl   = document.getElementById('tracker-timeline');
    tl.innerHTML = '';

    const fmtDate = (iso) => {
        if (!iso) return null;
        return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    // Map status → how many steps are fully done
    const statusToStepIdx = {
        'Submitted':     1,
        'Investigating': 4,
        'Resolved':      6  // all steps done
    };
    const doneUpTo = statusToStepIdx[c.status] ?? 0;

    STEPS.forEach((step, i) => {
        const isDone     = i < doneUpTo;
        const isActive   = (i === doneUpTo) && (doneUpTo < STEPS.length);
        const isResolved = c.status === 'Resolved'; // all steps green when resolved

        let cls;
        if (isResolved)      cls = 'resolved-step';
        else if (isDone)     cls = 'done';
        else if (isActive)   cls = 'active-now';
        else                 cls = 'pending';
        const timeVal = step.key ? fmtDate(c.timeline[step.key]) : null;

        const div = document.createElement('div');
        div.className = `timeline-step-landing ${cls}`;
        div.innerHTML = `
            <div class="tl-icon"><i data-lucide="${step.icon}"></i></div>
            <div class="tl-content">
                <h4>${step.label}</h4>
                <p>${step.desc}</p>
                ${timeVal ? `<div class="tl-time">${timeVal}</div>` : ''}
            </div>
        `;
        tl.appendChild(div);
    });

    result.classList.remove('hidden');
    lucide.createIcons();
}


// ====================================================
// TOAST NOTIFICATIONS
// ====================================================
function showToast(title, msg, type = 'info') {
    const icons = { success: 'check-circle-2', error: 'alert-circle', info: 'info' };
    const colors = { success: 'var(--success)', error: 'var(--danger)', info: 'var(--primary)' };

    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.innerHTML = `
        <div class="toast-icon" style="color:${colors[type]}"><i data-lucide="${icons[type]}"></i></div>
        <div>
            <div class="toast-title">${title}</div>
            <div class="toast-msg">${msg}</div>
        </div>
    `;
    const container = document.getElementById('toast-container');
    if (container) {
        container.appendChild(t);
        lucide.createIcons();
        setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity 0.4s'; setTimeout(() => t.remove(), 400); }, 4000);
    }
}

/* =====================================================
   SECTION 10 — REVIEWS
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Star Rating Hover and Click Logic
    const stars = document.querySelectorAll('.star-rating i');
    const ratingInput = document.getElementById('review-rating');

    stars.forEach(star => {
        star.addEventListener('mouseenter', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            stars.forEach(s => {
                if (parseInt(s.getAttribute('data-rating')) <= rating) s.classList.add('hovered');
                else s.classList.remove('hovered');
            });
        });

        star.addEventListener('mouseleave', () => {
            stars.forEach(s => s.classList.remove('hovered'));
        });

        star.addEventListener('click', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            ratingInput.value = rating;
            stars.forEach(s => {
                if (parseInt(s.getAttribute('data-rating')) <= rating) s.classList.add('active');
                else s.classList.remove('active');
            });
        });
    });

    // Handle Form Submit
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('reviewer-name').value;
            const rating = parseInt(ratingInput.value);
            const comment = document.getElementById('review-comment').value;

            if (rating === 0) {
                showToast('Validation Error', 'Please select a star rating.', 'error');
                return;
            }

            const btn = document.getElementById('submit-review-btn');
            btn.disabled = true;
            btn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Submitting...';
            lucide.createIcons();

            try {
                // Submit to Supabase
                const { error } = await window.supabaseClient.from('reviews').insert([{ name, rating, comment }]);
                if (error) throw error;

                showToast('Review Submitted', 'Thank you for your feedback!', 'success');
                reviewForm.reset();
                ratingInput.value = "0";
                stars.forEach(s => s.classList.remove('active'));
                
                // Refresh reviews
                fetchReviews();
            } catch (err) {
                console.error("Error submitting review:", err);
                showToast('Error', 'Failed to submit review. Try again later.', 'error');
            } finally {
                btn.disabled = false;
                btn.innerHTML = '<i data-lucide="send"></i> <span>Submit Review</span>';
                lucide.createIcons();
            }
        });
    }

    // Fetch Initial Reviews
    if (typeof window.supabaseClient !== 'undefined') {
        fetchReviews();
    }
});

async function fetchReviews() {
    const grid = document.getElementById('reviews-grid');
    if (!grid) return;

    try {
        const { data, error } = await window.supabaseClient
            .from('reviews')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(6);

        if (error) throw error;

        grid.innerHTML = '';
        if (data.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No reviews yet. Be the first to leave one!</div>';
            return;
        }

        data.forEach(review => {
            const date = new Date(review.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            let starsHtml = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= review.rating) {
                    starsHtml += '<i data-lucide="star" style="fill: #f59e0b; color: #f59e0b;"></i>';
                } else {
                    starsHtml += '<i data-lucide="star" style="color: var(--border-glass);"></i>';
                }
            }

            const card = document.createElement('div');
            card.className = 'review-card glass-card';
            card.innerHTML = `
                <div class="review-card-header">
                    <div class="reviewer-name">${review.name}</div>
                    <div class="review-date">${date}</div>
                </div>
                <div class="review-stars">
                    ${starsHtml}
                </div>
                <div class="review-text">"${review.comment}"</div>
            `;
            grid.appendChild(card);
        });

        lucide.createIcons();
    } catch (err) {
        console.error("Error fetching reviews:", err);
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">Failed to load reviews.</div>';
    }
}
