import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      toast.success("Login successful!");
      setTimeout(() => {
        window.location.href = "/home";
      }, 1000);

      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", email);
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg w-96 text-white border border-white shadow-lg">
        <h2 className="text-3xl mb-6 font-bold text-center text-green-500">
          Login
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 font-medium text-black"
            >
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

          <div className="mb-6">
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
              placeholder="Enter your password"
              className="w-full p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <button
            id="login-button"
            type="submit"
            className="w-full bg-green-500 text-danger focus:outline-none py-3 rounded font-bold hover:bg-green-600 transition duration-300 ease-in-out"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-start">
          <a href="#" className="text-green-500 hover:underline text-sm">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
