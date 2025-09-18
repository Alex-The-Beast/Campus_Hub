import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { useGetFilteredpdfRequest } from "../../hooks/api/useGetFilteredpdfRequest";

const branches = ["CSE", "ECE", "EEE", "Mechanical", "Civil", "IT", "Biotech"];
const years = ["2020", "2021", "2022", "2023"];
const semesters = ["Semester 1", "Semester 2"];
const examTypes = ["Major", "Mid"];

const PyqDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("year");

  // Filters from URL params
  const selectedBranch = searchParams.get("branch") || "";
  const selectedYear = searchParams.get("year") || "";
  const selectedSemester = searchParams.get("semester") || "";
  const selectedExam = searchParams.get("examType") || "";
  const searchQuery = searchParams.get("subject") || "";

  const filters = useMemo(() => {
    const f = {};
    if (selectedBranch) f.branch = selectedBranch;
    if (selectedYear) f.year = selectedYear;
    if (selectedSemester) f.semester = selectedSemester;
    if (selectedExam) f.examType = selectedExam;
    if (searchQuery) f.subject = searchQuery;
    return f;
  }, [selectedBranch, selectedYear, selectedSemester, selectedExam, searchQuery]);

  const { data: pyqData = [], isFetching, isError } = useGetFilteredpdfRequest(filters);

  const sortedPyqs = useMemo(() => {
    return [...pyqData].sort((a, b) => {
      if (sortBy === "year") return b.pyqYear - a.pyqYear;
      if (sortBy === "subject") return a.subject.localeCompare(b.subject);
      return 0;
    });
  }, [pyqData, sortBy]);

  const handleFilterChange = (key, value) => {
    const params = Object.fromEntries([...searchParams]);
    if (value) params[key] = value;
    else delete params[key];
    setSearchParams(params);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-black via-gray-950 to-[#0a1a2f] text-gray-300 mt-12">
      {/* Sidebar Filters - hidden on mobile */}
      <aside className="hidden md:block w-72 p-6 bg-black/70 backdrop-blur-lg border-r border-white/10 overflow-y-hidden">
        <h2 className="text-2xl font-bold mb-6">Filters</h2>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Branch</label>
            <select
              className="w-full p-2 bg-gray-900 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={selectedBranch}
              onChange={(e) => handleFilterChange("branch", e.target.value)}
            >
              <option value="">All</option>
              {branches.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Year</label>
            <select
              className="w-full p-2 bg-gray-900 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={selectedYear}
              onChange={(e) => handleFilterChange("year", e.target.value)}
            >
              <option value="">All</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Semester</label>
            <select
              className="w-full p-2 bg-gray-900 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={selectedSemester}
              onChange={(e) => handleFilterChange("semester", e.target.value)}
            >
              <option value="">All</option>
              {semesters.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Exam Type</label>
            <select
              className="w-full p-2 bg-gray-900 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={selectedExam}
              onChange={(e) => handleFilterChange("examType", e.target.value)}
            >
              <option value="">All</option>
              {examTypes.map((ex) => (
                <option key={ex} value={ex}>{ex}</option>
              ))}
            </select>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            Previous Year Question Papers
          </h1>

          {/* Search & Sort */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search subject..."
              value={searchQuery}
              onChange={(e) => handleFilterChange("subject", e.target.value)}
              className="px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
            >
              <option value="year">Sort by Year</option>
              <option value="subject">Sort by Subject</option>
            </select>
          </div>
        </div>

        {isFetching ? (
          <p>Loading PYQs...</p>
        ) : isError ? (
          <p className="text-red-500">Error fetching PYQs.</p>
        ) : sortedPyqs.length === 0 ? (
          <p className="text-gray-400">No PYQs found for selected filters.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-white/10 rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-gray-900 to-[#0f1e35] text-gray-300 text-sm uppercase">
                <tr>
                  <th className="px-4 py-3 border border-white/10 text-left w-3/5 md:w-1/4">Subject</th>
                  {/* Only show these columns on desktop */}
                  <th className="px-4 py-3 border border-white/10 text-left hidden md:table-cell">Branch</th>
                  <th className="px-4 py-3 border border-white/10 text-left hidden md:table-cell">Year</th>
                  <th className="px-4 py-3 border border-white/10 text-left hidden md:table-cell">Semester</th>
                  <th className="px-4 py-3 border border-white/10 text-left hidden md:table-cell">Exam</th>
                  {/* Removed PYQ Year on large screen */}
                  <th className="px-4 py-3 border border-white/10 text-center">Actions</th>
                </tr>
              </thead>

              <AnimatePresence component="tbody">
                {sortedPyqs.map((pyq) => (
                  <motion.tr
                    key={pyq._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="hover:bg-blue-900/30 transition border-b border-white/10"
                  >
                    <td className="px-4 py-3">{pyq.subject}</td>
                    <td className="px-4 py-3 hidden md:table-cell">{pyq.branch}</td>
                    <td className="px-4 py-3 hidden md:table-cell">{pyq.year}</td>
                    <td className="px-4 py-3 hidden md:table-cell">{pyq.semester}</td>
                    <td className="px-4 py-3 hidden md:table-cell">{pyq.examType}</td>
                    <td className="px-4 py-3 flex gap-2 justify-center">
                      <button
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                        onClick={() => window.open(pyq.pdfUrl, "_blank")}
                      >
                        View
                      </button>
                      <a
                        href={pyq.pdfUrl}
                        download={`${pyq.subject}_${pyq.branch}_${pyq.year}.pdf`}
                        className="inline-block bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm text-white text-center"
                      >
                        Download
                      </a>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default PyqDashboard;
