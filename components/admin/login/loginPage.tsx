"use client";

import React, { useState } from "react";
import { Shield, User, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/components/admin/auth/authProvider";

const Login = () => {
  const [email, setEmail] = useState("admin@ngo.org");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(email, password);
    if (!result.success) {
      setError(result.message || "Login failed");
    }
    setLoading(false);
  };

  const handleDemoLogin = () => {
    setEmail("admin@ngo.org");
    setPassword("admin123");
    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-white text-blue-600">
            <Shield className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-light text-blue-800 mb-2">
            Admin Portal
          </h1>
          <p className="text-gray-600 font-light">
            Secure access to NGO dashboard
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2 font-light">
              Email Address
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-light"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2 font-light">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-light"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-light"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Signing in...
              </div>
            ) : (
              "Sign In"
            )}
          </button>

          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full border-2 border-gray-300 text-gray-700 py-3 px-4 hover:bg-gray-100 transition-all font-light"
          >
            Demo Login
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="bg-gray-50 p-4">
            <p className="text-xs text-blue-800 mb-2 font-light">
              Demo Credentials:
            </p>
            <p className="text-xs text-blue-700 font-light">
              Email: admin@ngo.org
            </p>
            <p className="text-xs text-blue-700 font-light">
              Password: admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
