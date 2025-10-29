
import React from "react";

function CouncilDashboard({ reports, onUpdateStatus }) {
  return (
    <div className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">
        Council Dashboard
      </h2>

      {reports.length === 0 ? (
        <p className="text-gray-500 italic text-center">
          No reports available. Keep monitoring for new submissions.
        </p>
      ) : (
        <ul className="space-y-4">
          {reports.map((report) => (
            <li
              key={report.id}
              className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm"
            >
              <h3 className="text-lg font-semibold text-green-700">
                {report.title}
              </h3>
              <p className="text-gray-800 mt-1 mb-2">{report.description}</p>

              <div className="text-sm text-gray-600 mb-2">
                Status:{" "}
                <span
                  className={`font-medium ${
                    report.status === "pending"
                      ? "text-orange-500"
                      : "text-green-600"
                  }`}
                >
                  {report.status}
                </span>{" "}
                | Reported:{" "}
                {new Date(report.timestamp).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>

              <button
                onClick={() =>
                  onUpdateStatus(
                    report.id,
                    report.status === "pending" ? "resolved" : "pending"
                  )
                }
                className={`px-3 py-1 rounded text-white text-sm font-medium ${
                  report.status === "pending"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-500 hover:bg-gray-600"
                }`}
              >
                {report.status === "pending" ? "Mark Resolved" : "Reopen"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CouncilDashboard;
