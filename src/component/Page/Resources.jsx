

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, FileText, Download, Star } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { notes } from "../../data/pdf.js";

const branches = ["CSE", "IT", "ECE", "EE", "ME", "Civil", "AI/ML"];
const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

export default function Resource({ onSelectNote }) {
  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFilter = (value, setter, selected) => {
    setter(value === selected ? "" : value);
  };

  const filteredNotes = notes.filter(
    (note) =>
      (!selectedBranch || note.branch === selectedBranch) &&
      (!selectedSemester || note.semester === selectedSemester) &&
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#0c0f1a] text-gray-200 overflow-hidden">

      {/* Sidebar */}
      <aside className="hidden md:flex md:flex-col w-72 bg-[#11131f]/80 backdrop-blur-md border-r border-gray-800 p-6 rounded-r-3xl space-y-8 shadow-xl">
        <div
          className="cursor-pointer text-2xl font-bold text-[#5865F2] tracking-wide"
          onClick={() => navigate("/")}
        >
          CampusHub
        </div>

        {/* Branch Filter */}
        <div>
          <h3 className="text-xs uppercase text-gray-400 mb-3">Branch</h3>
          <div className="grid grid-cols-2 gap-2">
            {branches.map((b) => (
              <button
                key={b}
                onClick={() => toggleFilter(b, setSelectedBranch, selectedBranch)}
                className={`px-3 py-2 rounded-xl text-sm transition ${
                  selectedBranch === b
                    ? "bg-[#5865F2] text-white shadow-lg shadow-[#5865F2]/30"
                    : "bg-[#1a1d2d] hover:bg-[#22263a]"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Semester Filter */}
        <div>
          <h3 className="text-xs uppercase text-gray-400 mb-3">Semester</h3>
          <div className="grid grid-cols-4 gap-2">
            {semesters.map((s) => (
              <button
                key={s}
                onClick={() =>
                  toggleFilter(s, setSelectedSemester, selectedSemester)
                }
                className={`px-2 py-1 rounded-lg text-sm transition ${
                  selectedSemester === s
                    ? "bg-[#5865F2] text-white shadow-lg shadow-[#5865F2]/30"
                    : "bg-[#1a1d2d] hover:bg-[#22263a]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Mobile Topbar */}
      <div className="md:hidden sticky top-0 z-20 bg-[#0c0f1a]/95 backdrop-blur-md border-b border-gray-800 px-4 py-3 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h1
            onClick={() => navigate("/")}
            className="text-xl font-bold text-[#5865F2] cursor-pointer"
          >
            CampusHub
          </h1>
          <button className="flex items-center gap-2 text-sm bg-[#1a1d2d] px-3 py-1 rounded-lg border border-gray-700">
            <Filter size={14} /> Filters
          </button>
        </div>

        {/* Horizontal Filters */}
        <div className="flex gap-2 overflow-x-auto snap-x pb-2 scrollbar-hide">
          {branches.map((b) => (
            <button
              key={b}
              onClick={() => toggleFilter(b, setSelectedBranch, selectedBranch)}
              className={`whitespace-nowrap px-3 py-1 rounded-full text-sm snap-start transition ${
                selectedBranch === b
                  ? "bg-[#5865F2] text-white"
                  : "bg-[#1a1d2d] hover:bg-[#22263a]"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Search Bar */}
        <div className="sticky top-0 z-10 bg-[#0c0f1a]/95 backdrop-blur-md border-b border-gray-800 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#1a1d2d] border border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#5865F2] focus:outline-none"
            />
          </div>
        </div>

        {/* Notes Grid */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          {filteredNotes.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredNotes.map((note, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  className="bg-[#11131f]/80 backdrop-blur-md border border-gray-800 rounded-2xl p-5 flex flex-col shadow-md hover:shadow-xl hover:border-[#5865F2]/50 transition"
                >
                  <FileText size={24} className="text-[#5865F2] mb-3" />
                  <h4 className="font-semibold text-lg mb-1">{note.title}</h4>
                  <p className="text-xs text-gray-400 mb-3">
                    {note.branch} • Sem {note.semester}
                  </p>
                  <span className="inline-block text-xs px-2 py-1 rounded bg-[#5865F2]/20 text-[#5865F2] mb-4">
                    {note.type}
                  </span>
                  <div className="flex justify-between items-center mt-auto">
                    <Link
                      to={`/resources/noteslist`}
                      onClick={() => onSelectNote(note)}
                      className="text-sm text-[#5865F2] hover:underline"
                    >
                      View
                    </Link>
                    <div className="flex gap-3">
                      <button className="text-gray-400 hover:text-yellow-400">
                        <Star size={18} />
                      </button>
                      <a
                        href={note.file}
                        download
                        className="text-gray-400 hover:text-[#5865F2]"
                      >
                        <Download size={18} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-xl font-semibold text-[#5865F2] mb-3">
                “Knowledge shared is knowledge squared.”
              </p>
              <p className="text-gray-400">
                Select a branch or semester to begin exploring notes 🚀
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
