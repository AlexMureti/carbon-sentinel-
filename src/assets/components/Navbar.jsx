import React from "react";

function Navbar({
  currentView,
  onChangeView,
  user,
  onLogout,
  onSignInGoogle,
  onSignInGitHub,
  onSignInEmail,
}) {
  const styles = {
    nav: {
      backgroundColor: "#047857", // green-600
      color: "#ffffff",
      padding: "12px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    title: {
      fontSize: "18px",
      fontWeight: "600",
      letterSpacing: "0.5px",
    },
    buttonGroup: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    button: (active) => ({
      padding: "8px 14px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "500",
      backgroundColor: active ? "#ffffff" : "transparent",
      color: active ? "#047857" : "#ffffff",
      transition: "all 0.2s ease",
    }),
    loginButton: (color) => ({
      padding: "8px 14px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      color: "#ffffff",
      fontWeight: "500",
      backgroundColor: color,
      transition: "background 0.2s",
    }),
    logoutButton: {
      padding: "8px 14px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      color: "#ffffff",
      fontWeight: "500",
      backgroundColor: "#dc2626", // red-500
      transition: "background 0.2s",
    },
  };

  return (
    <nav style={styles.nav}>
      <h1 style={styles.title}>Carbon Sentinel</h1>

      <div style={styles.buttonGroup}>
        {/* Citizen View */}
        <button
          style={styles.button(currentView === "citizen")}
          onClick={() => onChangeView("citizen")}
        >
          Citizen View
        </button>

        {/* Council View */}
        <button
          style={styles.button(currentView === "council")}
          onClick={() => onChangeView("council")}
        >
          Council View
        </button>

        {/* Authentication Buttons */}
        {user ? (
          <button style={styles.logoutButton} onClick={onLogout}>
            Logout ({user.email})
          </button>
        ) : (
          <div style={styles.buttonGroup}>
            <button
              style={styles.loginButton("#16a34a")} // green-500
              onClick={onSignInEmail}
            >
              Email
            </button>
            <button
              style={styles.loginButton("#2563eb")} // blue-500
              onClick={onSignInGoogle}
            >
              Google
            </button>
            <button
              style={styles.loginButton("#111827")} // gray-800
              onClick={onSignInGitHub}
            >
              GitHub
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
