const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cors()); // Allow cross-origin requests from the frontend

// Configure Nodemailer with your provided credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'harishankarofficial08@gmail.com',
        pass: 'scka hfdu metr gheg'
    }
});

app.post('/webhook/complaint-received', async (req, res) => {
    const data = req.body;
    console.log(`Received new complaint: ${data.id}`);

    try {
        // 1. Send Email to Admin (You)
        await transporter.sendMail({
            from: 'JalDrishti Alerts <harishankarofficial08@gmail.com>',
            to: 'harishankarofficial08@gmail.com',
            subject: `URGENT: New Pollution Report - ${data.category}`,
            text: `A new pollution report has been submitted.\n\nLocation: ${data.location}\nType: ${data.category}\nDescription: ${data.description}\nReporter: ${data.user}\n\nSystem Log ID: ${data.id}`
        });
        console.log('✅ Admin email sent.');

        // 2. Send Email to Reporter (if they provided an email)
        if (data.email) {
            await transporter.sendMail({
                from: 'JalDrishti Team <harishankarofficial08@gmail.com>',
                to: data.email,
                subject: `Complaint Received: ${data.id}`,
                text: `Dear ${data.user},\n\nThank you for taking the time to report water pollution in your area. Your report has been successfully logged on JalDrishti Connect and forwarded to the KSPCB authorities.\n\nComplaint Details:\nLocation: ${data.location}\nType: ${data.category}\n\nYou can track the status of your complaint on our website using the ID: ${data.id}.\n\nThank you for protecting our waters,\nJalDrishti Team`
            });
            console.log(`✅ Reporter email sent to ${data.email}.`);
        } else {
            console.log('⚠️ Reporter did not provide an email address.');
        }

        res.status(200).send('Emails sent successfully');
    } catch (error) {
        console.error('❌ Error sending emails:', error);
        res.status(500).send('Error sending emails');
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`========================================================`);
    console.log(`JalDrishti Email Automation Server is RUNNING on port ${PORT}`);
    console.log(`========================================================`);
    console.log(`Listening for incoming complaints...`);
});
