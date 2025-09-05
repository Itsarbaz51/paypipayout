import React, { useState } from "react";
import { Shield } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/slices/authSlice";

const Login = ({ onLogin }) => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    setLoading(true);
    const payload = emailOrPhone.includes("@")
      ? { email: emailOrPhone, password }
      : { phone: emailOrPhone, password };
    e.preventDefault();
    dispatch(login(payload));
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg p-8 rounded-xl w-96">
        <div className="text-center mb-6">
          <Shield className="mx-auto h-12 w-12 text-red-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email or Phone
            </label>
            <input
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-black/90 text-white py-2 px-4 rounded-md hover:bg-black transition duration-200 disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-xs text-gray-500 text-center">
          <p>Use your registered Email or Phone to login</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
