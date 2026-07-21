const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'harishankarofficial08@gmail.com',
        pass: 'scka hfdu metr gheg'
    }
});

export default async function handler(req, res) {
    // Enable CORS for Vercel functions (if needed)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const data = req.body;
    console.log(`Received new complaint: ${data.id}`);

    try {
        // Send emails concurrently to avoid Vercel timeouts
        const emailPromises = [];

        // 1. Send Email to Admin
        const voiceText = data.voiceScript ? `\n\n--- Voice Recording Script ---\n${data.voiceScript}\n------------------------------` : '';
        emailPromises.push(
            transporter.sendMail({
                from: '"JalDrishti Alerts" <harishankarofficial08@gmail.com>',
                to: 'harishankarofficial08@gmail.com',
                subject: `URGENT: New Pollution Report - ${data.category}`,
                text: `A new pollution report has been submitted.\n\nLocation: ${data.location}\nType: ${data.category}\nDescription: ${data.description}${voiceText}\n\nReporter: ${data.user}\nReporter Email: ${data.email || 'N/A'}\n\nSystem Log ID: ${data.id}`
            }).then(() => console.log('✅ Admin email sent.'))
        );

        // 2. Send Email to Reporter (if they provided an email)
        if (data.email) {
            emailPromises.push(
                transporter.sendMail({
                    from: '"JalDrishti Team" <harishankarofficial08@gmail.com>',
                    to: data.email,
                    subject: `Complaint Received: ${data.id}`,
                    text: `Dear ${data.user},\n\nThank you for taking the time to report water pollution in your area. Your report has been successfully logged on JalDrishti Connect and forwarded to the KSPCB authorities.\n\nComplaint Details:\nLocation: ${data.location}\nType: ${data.category}\n\nYou can track the status of your complaint on our website using the ID: ${data.id}.\n\nThank you for protecting our waters,\nJalDrishti Team`
                }).then(() => console.log(`✅ Reporter email sent to ${data.email}.`))
            );
        }

        await Promise.all(emailPromises);

        return res.status(200).json({ message: 'Emails sent successfully' });
    } catch (error) {
        console.error('❌ Error sending emails:', error);
        return res.status(500).json({ message: 'Error sending emails', error: error.message });
    }
}
