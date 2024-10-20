import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);


export const sendTwoFactorTokenMail = async ( email : string , token : string ) => {
    await resend.emails.send({
        from : "onboarding@resend.dev" ,
        to : email ,
        subject : "Two-Factor Authentication Token" ,
        html : `<p>Your 2FA Code : ${token}</p>`
    })
}

export const sendPasswordResetEmail = async (
    email : string,
    token : string,
) => {
    
    const resetLink = `http://localhost:3000/new-password?token=${token}`

    await resend.emails.send({
        from : "onboarding@resend.dev" ,
        to : email ,
        subject : "Reset your Password",
        html : `<p>Click <a href="${resetLink}"> here </a> to Reset Password.</p>`
    });
};

export const sendverificationEmail = async (
    email : string,
    token : string,
) => {
    const confirmLink = `http://localhost:3000/new-verification?token=${token}`;

    await resend.emails.send({
        from : "onboarding@resend.dev" ,
        to : email ,
        subject : "Confirm your Email",
        html : `<p>Click <a href="${confirmLink}"> here </a> to Confirm Email.</p>`
    });
};
