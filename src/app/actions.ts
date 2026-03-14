"use server";

export async function sendEmail() {
  try {

    
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: "linkolnkrauskopf@gmail.com",
        subject: "Welcome to Our App",
        html: `<p>Hello linkolnkrauskopf@gmail.com,</p><p>Welcome to our app!</p>`,
      }),
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
}