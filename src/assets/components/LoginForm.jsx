import React, { useState } from "react";
import { auth } from "../../services/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCred.user);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCred.user);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md mt-10">
      {user ? (
        <div>
          <h2 className="text-green-700 font-bold mb-2">Welcome, {user.email}</h2>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4 text-green-700">Login / Sign Up</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2 w-full mb-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 w-full mb-4 rounded"
          />
          <div className="flex justify-between">
            <button onClick={handleLogin} className="bg-green-600 text-white px-4 py-2 rounded">
              Login
            </button>
            <button onClick={handleSignUp} className="bg-blue-600 text-white px-4 py-2 rounded">
              Sign Up
            </button>
          </div>
          {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
        </div>
      )}
    </div>
  );
}
