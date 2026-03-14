import React from "react";

const stats = [
  { title: "Total Users", value: 245, color: "bg-blue-100 text-blue-700" },
  { title: "Total Helpers", value: 86, color: "bg-green-100 text-green-700" },
  { title: "Reported Issues", value: 173, color: "bg-yellow-100 text-yellow-700" },
  { title: "Completed Bookings", value: 129, color: "bg-purple-100 text-purple-700" },
];

const recentIssues = [
  {
    id: 1,
    user: "Ravi Patel",
    category: "Electricity",
    area: "Rampura",
    status: "Pending",
  },
  {
    id: 2,
    user: "Meena Devi",
    category: "Plumbing",
    area: "Lakshmipura",
    status: "Assigned",
  },
  {
    id: 3,
    user: "Arjun Kumar",
    category: "Cleaning",
    area: "Navapura",
    status: "Completed",
  },
];

const helpers = [
  {
    id: 1,
    name: "Ramesh Electrician",
    category: "Electrician",
    village: "Rampura",
    status: "Active",
  },
  {
    id: 2,
    name: "Suresh Plumber",
    category: "Plumber",
    village: "Lakshmipura",
    status: "Active",
  },
  {
    id: 3,
    name: "Kishan Cleaner",
    category: "Cleaner",
    village: "Ambali",
    status: "Inactive",
  },
];

const users = [
  { id: 1, name: "Ravi Patel", phone: "9876543210", village: "Rampura" },
  { id: 2, name: "Meena Devi", phone: "9898989898", village: "Lakshmipura" },
  { id: 3, name: "Arjun Kumar", phone: "9812345678", village: "Navapura" },
];

const Dashboard = () => {
  return (
    <section className="min-h-screen bg-slate-100 px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-slate-300">
            Manage users, helpers, issues, and platform activity
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((item, index) => (
            <div key={index} className="bg-white rounded-3xl p-5 shadow-sm">
              <p className="text-sm text-slate-500">{item.title}</p>
              <div
                className={`mt-3 inline-block px-4 py-2 rounded-2xl text-2xl font-bold ${item.color}`}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Recent Issues</h2>
            <div className="mt-5 space-y-4">
              {recentIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="border border-slate-200 rounded-2xl p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {issue.user}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {issue.category} • {issue.area}
                      </p>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                      {issue.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Helpers</h2>
            <div className="mt-5 space-y-4">
              {helpers.map((helper) => (
                <div
                  key={helper.id}
                  className="border border-slate-200 rounded-2xl p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {helper.name}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {helper.category} • {helper.village}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        helper.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {helper.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-3xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Users</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 text-sm font-semibold text-slate-700">
                    Name
                  </th>
                  <th className="py-3 text-sm font-semibold text-slate-700">
                    Phone
                  </th>
                  <th className="py-3 text-sm font-semibold text-slate-700">
                    Village
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-slate-100">
                    <td className="py-4 text-slate-800">{user.name}</td>
                    <td className="py-4 text-slate-600">{user.phone}</td>
                    <td className="py-4 text-slate-600">{user.village}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="rounded-2xl bg-blue-600 text-white py-4 text-lg font-semibold">
            Manage Users
          </button>
          <button className="rounded-2xl bg-green-600 text-white py-4 text-lg font-semibold">
            Manage Helpers
          </button>
          <button className="rounded-2xl bg-yellow-500 text-white py-4 text-lg font-semibold">
            Monitor Issues
          </button>
          <button className="rounded-2xl bg-slate-900 text-white py-4 text-lg font-semibold">
            View Statistics
          </button>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;