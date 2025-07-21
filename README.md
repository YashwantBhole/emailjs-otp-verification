# 🔐 OTP Verification System using EmailJS

A simple and responsive OTP (One-Time Password) verification app built with **HTML**, **CSS**, and **JavaScript**, and powered by **EmailJS** for sending OTPs via email.

---

## 🚀 Live Demo

🌐 [View Live App](https://verifyurotp.netlify.app/)  

---

## 📦 How to Clone and Run the Project

### 🧾 Prerequisites
- A modern web browser (Chrome, Firefox, Edge, etc.)
- Internet connection (EmailJS requires internet to send OTP)

### 🛠️ Steps

**Clone the Repository**

     ```bash
       git clone https://github.com/your-username/otp-verification-app.git

📧 EmailJS Setup
Go to https://www.emailjs.com and sign up.

Create an Email Service (e.g., Gmail).

Set up a new Email Template with variables like from_name, to_email, and otp.

Get your Public Key, Service ID, and Template ID from your dashboard.

✨ Sample Usage in script.js:
js
Copy
Edit
emailjs.init("YOUR_PUBLIC_KEY");

emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
  from_name: "OTP System",
  to_email: userEmail,
  otp: generatedOTP,
});
🔐 Never expose your real keys in public apps. Use secure storage in production.

✨ Features
Responsive UI

EmailJS-powered OTP delivery

Form validation and OTP check

Custom success/error messages

