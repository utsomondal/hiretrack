import { useState } from "react";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import Background from "../components/LandingPage/Background";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white flex items-center justify-center relative overflow-hidden font-body">
      <Background />

      <div className="w-full max-w-6xl mx-auto px-6 py-12 relative z-10 grid lg:grid-cols-2 items-center gap-16">
        {/* LEFT */}
        <div className="max-w-lg space-y-10">
          <div className="space-y-5">
            <h1 className="text-5xl md:text-6xl font-display leading-tight tracking-tight">
              Stop losing track
              <br />
              <span className="text-accent">of your job applications.</span>
            </h1>

            <p className="text-gray-300 leading-relaxed max-w-lg">
              Keep everything in one place — applications, notes, interviews,
              and progress. No more messy spreadsheets or forgotten follow-ups.
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-accent" />
              <p className="text-gray-400 text-sm">
                Never miss an interview or deadline again
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-accent" />
              <p className="text-gray-400 text-sm">
                Track every application from applied → offer
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-accent" />
              <p className="text-gray-400 text-sm">
                Stay focused with a clean, distraction-free workspace
              </p>
            </div>
          </div>

          {/* subtle trust line */}
          <p className="text-xs text-gray-500 pt-4">
            Built for students, developers, and job seekers worldwide.
          </p>
        </div>

        {/* RIGHT */}
        <div className="w-full flex justify-center lg:justify-end">
          <div className="w-full max-w-md bg-dark-800/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-display">Create your account</h2>
              <p className="text-gray-400 text-sm mt-1">
                It takes less than a minute.
              </p>
            </div>

            <form className="space-y-5">
              {/* Name */}
              <div>
                <label className="text-xs text-gray-400 ml-1">Full Name</label>
                <div className="relative mt-1.5">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    onChange={handleChange}
                    className="w-full bg-dark-700/60 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 
                    focus:ring-2 focus:ring-accent/40 focus:border-accent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-xs text-gray-400 ml-1">Email</label>
                <div className="relative mt-1.5">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    onChange={handleChange}
                    className="w-full bg-dark-700/60 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 
                    focus:ring-2 focus:ring-accent/40 focus:border-accent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-xs text-gray-400 ml-1">Password</label>
                <div className="relative mt-1.5">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    onChange={handleChange}
                    className="w-full bg-dark-700/60 border border-white/10 rounded-xl py-3.5 pl-11 pr-12 
                    focus:ring-2 focus:ring-accent/40 focus:border-accent outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-1.5 ml-1">
                  At least 8 characters
                </p>
              </div>

              {/* CTA */}
              <button
                className="w-full bg-accent hover:bg-accent/90 text-dark-900 font-semibold py-3.5 rounded-xl 
              shadow-[0_10px_25px_rgba(91,159,236,0.25)] transition-all hover:-translate-y-0.5 active:scale-[0.98] mt-2"
              >
                Create Account
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-2">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs text-gray-500">OR</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Login */}
              <p className="text-center text-gray-500 text-sm">
                Already have an account?{" "}
                <a href="/login" className="text-accent hover:underline">
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
