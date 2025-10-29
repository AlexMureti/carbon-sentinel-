import React, { useState, useEffect } from "react";
import Navbar from "./assets/components/Navbar";
import MapView from "./assets/components/MapView";
import ReportForm from "./assets/components/ReportForm";
import ReportList from "./assets/components/ReportList";
import CouncilDashboard from "./assets/components/CouncilDashboard";
import "./App.css";

// Firebase imports
import {
  auth,
  googleProvider,
  githubProvider,
} from "./services/firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [reports, setReports] = useState([]);
  const [currentView, setCurrentView] = useState("citizen");
  const [user, setUser] = useState(null);

  // Track Firebase login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // === AUTH HANDLERS ===
  const handleSignInEmail = async () => {
    const email = prompt("Enter your email:");
    const password = prompt("Enter your password:");
    if (!email || !password) return;

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCred.user);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        const newUser = await createUserWithEmailAndPassword(auth, email, password);
        setUser(newUser.user);
      } else {
        alert(error.message);
      }
    }
  };

  const handleSignInGoogle = async () => {
    try {
      const userCred = await signInWithPopup(auth, googleProvider);
      setUser(userCred.user);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignInGitHub = async () => {
    try {
      const userCred = await signInWithPopup(auth, githubProvider);
      setUser(userCred.user);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // === REPORT HANDLER ===
  const handleAddReport = (newReport) => {
    setReports([newReport, ...reports]);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: newStatus } : r
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar */}
      <Navbar
        currentView={currentView}
        onChangeView={setCurrentView}
        user={user}
        onLogout={handleLogout}
        onSignInGoogle={handleSignInGoogle}
        onSignInGitHub={handleSignInGitHub}
        onSignInEmail={handleSignInEmail}
      />

      <main className="p-4 md:p-6 space-y-8">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center text-green-700">
          Carbon Sentinel: Kenya’s Community Air Monitor
        </h1>

        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          Track live air quality and report waste sites. Together, we can reverse pollution — one map pin at a time.
        </p>

        {/* === Conditional Rendering === */}
        {currentView === "citizen" ? (
          <>
            {/* Map Section */}
            <section className="rounded-xl overflow-hidden shadow-lg">
              <MapView />
            </section>

            {/* Citizen report form */}
            <section>
              <ReportForm onAddReport={handleAddReport} />
              <ReportList reports={reports} />
            </section>
          </>
        ) : (
          <section>
            <CouncilDashboard
              reports={reports}
              onUpdateStatus={handleUpdateStatus}
            />
          </section>
        )}
      </main>

      <footer className="text-center text-gray-500 text-sm py-4">
        © {new Date().getFullYear()} Carbon Sentinel by Alex
      </footer>
    </div>
  );
}

export default App;
