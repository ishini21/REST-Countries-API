import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      toast.success("Signup successful!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (err) {
      toast.error(err.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg w-96 text-green-500 border border-white shadow-lg">
        <h2 className="text-3xl mb-6 font-bold text-center ">
          Create Your Account
        </h2>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-medium text-black">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block mb-2 font-medium text-black"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            className="w-full p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block mb-2 font-medium text-black"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            className="w-full p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <button
          id="signup-button"
          onClick={handleSignup}
          className="w-full bg-green-500 text-white py-3 rounded font-bold hover:bg-green-600 transition duration-300 ease-in-out"
        >
          Sign Up
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className=" font-medium hover:underline text-green-900"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
