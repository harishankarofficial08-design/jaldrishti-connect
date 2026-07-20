const SUPABASE_URL = 'https://gbbkhlqrvvnktslsgkpm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_EzW96WiYDRpQOcxbOE7Z6A_ab2YovlY';

const reviews = [
    {
        name: "Manjunath Gowda - Anekal",
        rating: 5,
        comment: "JalDrishti Connect made it very easy to report a polluted lake near our area. I simply uploaded a photo, shared my location, and submitted the complaint in less than two minutes. The website is simple, fast, and useful for every citizen."
    },
    {
        name: "Lakshmi Hegde - Jigani",
        rating: 5,
        comment: "I really liked how the website automatically detected my location. The complaint process was smooth, and I received confirmation immediately. This platform is a great initiative to protect our water bodies."
    },
    {
        name: "Basavaraj Patil - Bommasandra",
        rating: 5,
        comment: "This is an excellent platform for public participation. Earlier, I didn't know where to report polluted water. Now I can upload a photo directly from my phone and raise awareness. The interface is clean and very user-friendly."
    },
    {
        name: "Kavya Shetty - Electronic City",
        rating: 5,
        comment: "JalDrishti Connect empowers local residents to take action. The website is easy to navigate, and the photo upload with GPS location makes reporting accurate. I hope more people start using this service."
    },
    {
        name: "Srinivas Murthy - Anekal",
        rating: 5,
        comment: "A very thoughtful initiative for clean water and environmental protection. The complaint submission process is quick, and I appreciate that the information reaches the concerned authorities through the admin dashboard. Highly recommended!"
    }
];

async function seed() {
    for (const review of reviews) {
        try {
            const res = await fetch(`${SUPABASE_URL}/rest/v1/reviews`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify(review)
            });
            if (!res.ok) {
                const err = await res.text();
                console.error(`Failed to insert review for ${review.name}:`, err);
            } else {
                console.log(`Successfully inserted review for ${review.name}`);
            }
        } catch (e) {
            console.error(`Error inserting review for ${review.name}:`, e);
        }
    }
}

seed();
