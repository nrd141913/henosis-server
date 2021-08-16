import { config } from 'dotenv';
import nodemailer from 'nodemailer';

config();

export interface IMailData {
    name: string;
    email: string;
    toEmail: string;
    workspaceName: string;
    id: string;
}

const sendMail = async ({
    name,
    email,
    toEmail,
    workspaceName,
    id,
}: IMailData): Promise<string> => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const info = await transporter.sendMail({
        from: `Henosis <${process.env.AUTH_EMAIL}>`,
        to: toEmail,
        subject: 'Send Join Request',
        text: 'Henosis',
        html: `
            <b>${name} Send an Join Request For ${workspaceName} workspace</b>
            <br/>
            <br/>
            <b>Sender Details</b>
            <ul>
                <li>name: ${name}</li>
                <li>email: ${email}</li>
            </ul>
            <br/>
            <br/>
            <b>For Accept The Request Go The Bellow Link</b>
            <br />
            <br />
            <b>http://localhost:3000/workspaces/${id}/acceptRequest?email=${email}</b>
            `,
    });
    return info.messageId;
};

export default sendMail;
