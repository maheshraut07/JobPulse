import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // e.g., smtp.gmail.com for Gmail
    port: 587, // Port for secure SMTP
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or application-specific password
    },
});

export const sendApplicationEmail = async (toEmail, jobTitle) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: 'Job Application Confirmation',
        text: `You have successfully applied for the job: ${jobTitle}. Thank you for your application!`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
