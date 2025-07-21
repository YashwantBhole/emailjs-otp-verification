import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";

const App = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [mainForm, setMainForm] = useState(true);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [timer, setTimer] = useState(120); // 2 minutes
  const [isTimerExpired, setIsTimerExpired] = useState(false);

  // Timer countdown effect
  useEffect(() => {
    let interval;
    if (showOtp && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerExpired(true);
    }
    return () => clearInterval(interval);
  }, [showOtp, timer]);

  const sendOtp = () => {
    const { name, email } = formData;
    if (!name || !email) {
      alert("Please enter name and email.");
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setTimer(120); // reset timer
    setIsTimerExpired(false);

    emailjs.init(import.meta.env.VITE_user_id);

    const templateParams = {
      from_name : name,
      from_email: email,
      message: otp,
    };

    emailjs
      .send(
        import.meta.env.VITE_service_id,
        import.meta.env.VITE_template_id,
        templateParams
      )
      .then(
        () => {
          alert("OTP sent successfully!");
          setShowOtp(true);
          setMainForm(false);
        },
        (error) => {
          console.error("Error sending OTP:", error);
          alert("Failed to send OTP. Try again.");
        }
      );
  };

  const verifyOtp = () => {
    if (isTimerExpired) {
      alert("OTP expired. Please request again.");
      return;
    }

    if (userOtp === generatedOtp) {
      alert("OTP verified successfully!");
      window.location.href = "https://zzz.zoomquilt.org/"; 
    } else {
      alert("Invalid OTP. Try again.");
    }
  };

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200 to-blue-100 px-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">OTP Verification</h1>

      {mainForm && (
        <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm mb-6">
          <input
            type="text"
            placeholder="Enter name"
            name="name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <button
            type="button"
            onClick={sendOtp}
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 cursor-pointer"
          >
            Send OTP
          </button>
        </form>
      )}

      {showOtp && (
        <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
          <input
            type="text"
            placeholder="Enter OTP"
            name="user_otp"
            value={userOtp}
            onChange={(e) => setUserOtp(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <p className="text-sm text-gray-600 mb-2">
            OTP valid for: <span className="font-bold">{formatTime()}</span>
          </p>
          <button
            type="button"
            onClick={verifyOtp}
            className={`w-full cursor-pointer ${
              isTimerExpired
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white p-2 rounded`}
            disabled={isTimerExpired}
          >
            Verify OTP
          </button>
        </form>
      )}
    </div>
  );
};

export default App;
