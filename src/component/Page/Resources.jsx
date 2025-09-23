// // Resources.jsx
// import React, { useState, useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Search, 
//   Filter, 
//   BookOpen, 
//   Download, 
//   Star, 
//   Clock,
//   Users,
//   ChevronDown,
//   ExternalLink
// } from 'lucide-react';

// // Mock data for BTech resources
// const resourcesData = [
//   // Semester 1
//   {
//     id: 1,
//     title: "Engineering Mathematics-I",
//     semester: 1,
//     subject: "Mathematics",
//     type: "Notes",
//     rating: 4.5,
//     downloads: 1200,
//     author: "Dr. Sharma",
//     lastUpdated: "2024-01-15",
//     difficulty: "Medium",
//     fileType: "PDF",
//     fileSize: "2.4 MB",
//     tags: ["calculus", "differential-equations", "first-year"],
//     description: "Complete notes covering limits, derivatives, and integration",
//     url: "#",
//     previewImage: "/math1-preview.jpg"
//   },
//   {
//     id: 2,
//     title: "Basic Electrical Engineering",
//     semester: 1,
//     subject: "Electrical",
//     type: "Question Bank",
//     rating: 4.2,
//     downloads: 890,
//     author: "Prof. Kumar",
//     lastUpdated: "2024-01-10",
//     difficulty: "Easy",
//     fileType: "PDF",
//     fileSize: "1.8 MB",
//     tags: ["circuits", "dc-machines", "fundamentals"],
//     description: "Important questions for end-semester exams",
//     url: "#",
//     previewImage: "/bee-preview.jpg"
//   },
//   {
//     id: 3,
//     title: "Programming in C - Complete Guide",
//     semester: 1,
//     subject: "Computer Science",
//     type: "Tutorial",
//     rating: 4.8,
//     downloads: 2100,
//     author: "CodeWithHarry",
//     lastUpdated: "2024-01-20",
//     difficulty: "Beginner",
//     fileType: "Video",
//     fileSize: "150 MB",
//     tags: ["c-programming", "beginners", "coding"],
//     description: "Step-by-step video tutorials for C programming",
//     url: "#",
//     previewImage: "/c-programming-preview.jpg"
//   },

//   // Semester 2
//   {
//     id: 4,
//     title: "Engineering Physics-II",
//     semester: 2,
//     subject: "Physics",
//     type: "Lab Manual",
//     rating: 4.3,
//     downloads: 670,
//     author: "Dr. Patel",
//     lastUpdated: "2024-02-01",
//     difficulty: "Medium",
//     fileType: "PDF",
//     fileSize: "3.1 MB",
//     tags: ["optics", "waves", "modern-physics"],
//     description: "Complete lab experiments with procedures",
//     url: "#",
//     previewImage: "/physics2-preview.jpg"
//   },
//   {
//     id: 5,
//     title: "Data Structures Algorithms",
//     semester: 3,
//     subject: "Computer Science",
//     type: "Notes",
//     rating: 4.7,
//     downloads: 1800,
//     author: "Prof. Gupta",
//     lastUpdated: "2024-02-15",
//     difficulty: "Hard",
//     fileType: "PDF",
//     fileSize: "4.2 MB",
//     tags: ["algorithms", "data-structures", "coding"],
//     description: "Comprehensive DSA notes with examples",
//     url: "#",
//     previewImage: "/dsa-preview.jpg"
//   },
//   {
//     id: 6,
//     title: "Database Management Systems",
//     semester: 4,
//     subject: "Computer Science",
//     type: "Project",
//     rating: 4.6,
//     downloads: 950,
//     author: "Student Projects",
//     lastUpdated: "2024-03-01",
//     difficulty: "Medium",
//     fileType: "ZIP",
//     fileSize: "8.5 MB",
//     tags: ["sql", "database", "projects"],
//     description: "Library management system project",
//     url: "#",
//     previewImage: "/dbms-preview.jpg"
//   },
//   {
//     id: 7,
//     title: "Operating Systems",
//     semester: 5,
//     subject: "Computer Science",
//     type: "Slide Deck",
//     rating: 4.4,
//     downloads: 1100,
//     author: "Dr. Verma",
//     lastUpdated: "2024-03-10",
//     difficulty: "Hard",
//     fileType: "PPT",
//     fileSize: "5.7 MB",
//     tags: ["os", "process-management", "memory"],
//     description: "Complete presentation slides",
//     url: "#",
//     previewImage: "/os-preview.jpg"
//   },
//   {
//     id: 8,
//     title: "Computer Networks",
//     semester: 6,
//     subject: "Computer Science",
//     type: "Reference Book",
//     rating: 4.9,
//     downloads: 1300,
//     author: "Andrew S. Tanenbaum",
//     lastUpdated: "2024-03-15",
//     difficulty: "Medium",
//     fileType: "PDF",
//     fileSize: "12.3 MB",
//     tags: ["networking", "protocols", "tcp-ip"],
//     description: "Computer Networks 5th Edition",
//     url: "#",
//     previewImage: "/cn-preview.jpg"
//   }
// ];

// const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
// const subjects = ["Mathematics", "Physics", "Chemistry", "Computer Science", "Electrical", "Mechanical", "Civil", "Electronics"];
// const resourceTypes = ["Notes", "Question Bank", "Tutorial", "Lab Manual", "Project", "Slide Deck", "Reference Book"];
// const difficulties = ["Easy", "Medium", "Hard"];

// const Resources = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedSemesters, setSelectedSemesters] = useState([]);
//   const [selectedSubjects, setSelectedSubjects] = useState([]);
//   const [selectedTypes, setSelectedTypes] = useState([]);
//   const [selectedDifficulty, setSelectedDifficulty] = useState('');
//   const [sortBy, setSortBy] = useState('rating');
//   const [showFilters, setShowFilters] = useState(false);

//   // Filter resources based on selections
//   const filteredResources = useMemo(() => {
//     return resourcesData.filter(resource => {
//       const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                            resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                            resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
//       const matchesSemester = selectedSemesters.length === 0 || selectedSemesters.includes(resource.semester);
//       const matchesSubject = selectedSubjects.length === 0 || selectedSubjects.includes(resource.subject);
//       const matchesType = selectedTypes.length === 0 || selectedTypes.includes(resource.type);
//       const matchesDifficulty = !selectedDifficulty || resource.difficulty === selectedDifficulty;

//       return matchesSearch && matchesSemester && matchesSubject && matchesType && matchesDifficulty;
//     });
//   }, [searchTerm, selectedSemesters, selectedSubjects, selectedTypes, selectedDifficulty]);

//   // Sort resources
//   const sortedResources = useMemo(() => {
//     return [...filteredResources].sort((a, b) => {
//       switch (sortBy) {
//         case 'rating':
//           return b.rating - a.rating;
//         case 'downloads':
//           return b.downloads - a.downloads;
//         case 'recent':
//           return new Date(b.lastUpdated) - new Date(a.lastUpdated);
//         case 'title':
//           return a.title.localeCompare(b.title);
//         default:
//           return 0;
//       }
//     });
//   }, [filteredResources, sortBy]);

//   const toggleFilter = (filterArray, value, setFilterArray) => {
//     if (filterArray.includes(value)) {
//       setFilterArray(filterArray.filter(item => item !== value));
//     } else {
//       setFilterArray([...filterArray, value]);
//     }
//   };

//   const clearFilters = () => {
//     setSelectedSemesters([]);
//     setSelectedSubjects([]);
//     setSelectedTypes([]);
//     setSelectedDifficulty('');
//     setSearchTerm('');
//   };

//   const getDifficultyColor = (difficulty) => {
//     switch (difficulty) {
//       case 'Easy': return 'bg-green-100 text-green-800';
//       case 'Medium': return 'bg-yellow-100 text-yellow-800';
//       case 'Hard': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getTypeIcon = (type) => {
//     switch (type) {
//       case 'Notes': return <BookOpen className="w-4 h-4" />;
//       case 'Question Bank': return <Users className="w-4 h-4" />;
//       case 'Tutorial': return <Clock className="w-4 h-4" />;
//       default: return <BookOpen className="w-4 h-4" />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-8"
//         >
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">
//             BTech Learning Resources
//           </h1>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//             Access comprehensive study materials, notes, question banks, and projects for all semesters of your BTech journey.
//           </p>
//         </motion.div>

//         {/* Search and Filter Bar */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6"
//         >
//           <div className="flex flex-col lg:flex-row gap-4">
//             {/* Search Input */}
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search resources by title, description, or tags..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>

//             {/* Filter Toggle for Mobile */}
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//             >
//               <Filter className="w-5 h-5" />
//               Filters
//               <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
//             </button>

//             {/* Sort Dropdown */}
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="rating">Sort by Rating</option>
//               <option value="downloads">Sort by Downloads</option>
//               <option value="recent">Sort by Recent</option>
//               <option value="title">Sort by Title</option>
//             </select>
//           </div>

//           {/* Filters Panel */}
//           <AnimatePresence>
//             {showFilters && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="lg:block mt-6"
//               >
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                   {/* Semester Filter */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
//                     <div className="flex flex-wrap gap-2">
//                       {semesters.map(sem => (
//                         <button
//                           key={sem}
//                           onClick={() => toggleFilter(selectedSemesters, sem, setSelectedSemesters)}
//                           className={`px-3 py-1 rounded-full text-sm transition-colors ${
//                             selectedSemesters.includes(sem)
//                               ? 'bg-blue-500 text-white'
//                               : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                           }`}
//                         >
//                           Sem {sem}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Subject Filter */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
//                     <div className="flex flex-wrap gap-2">
//                       {subjects.map(subject => (
//                         <button
//                           key={subject}
//                           onClick={() => toggleFilter(selectedSubjects, subject, setSelectedSubjects)}
//                           className={`px-3 py-1 rounded-full text-sm transition-colors ${
//                             selectedSubjects.includes(subject)
//                               ? 'bg-blue-500 text-white'
//                               : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                           }`}
//                         >
//                           {subject}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Type Filter */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Resource Type</label>
//                     <div className="flex flex-wrap gap-2">
//                       {resourceTypes.map(type => (
//                         <button
//                           key={type}
//                           onClick={() => toggleFilter(selectedTypes, type, setSelectedTypes)}
//                           className={`px-3 py-1 rounded-full text-sm transition-colors ${
//                             selectedTypes.includes(type)
//                               ? 'bg-blue-500 text-white'
//                               : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                           }`}
//                         >
//                           {type}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Difficulty Filter */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
//                     <div className="flex flex-wrap gap-2">
//                       {difficulties.map(diff => (
//                         <button
//                           key={diff}
//                           onClick={() => setSelectedDifficulty(selectedDifficulty === diff ? '' : diff)}
//                           className={`px-3 py-1 rounded-full text-sm transition-colors ${
//                             selectedDifficulty === diff
//                               ? 'bg-blue-500 text-white'
//                               : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                           }`}
//                         >
//                           {diff}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Clear Filters */}
//                 <div className="mt-4 flex justify-end">
//                   <button
//                     onClick={clearFilters}
//                     className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
//                   >
//                     Clear all filters
//                   </button>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>

//         {/* Results Summary */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="flex justify-between items-center mb-6"
//         >
//           <p className="text-gray-600">
//             Showing <span className="font-semibold">{sortedResources.length}</span> resources
//             {searchTerm && ` for "${searchTerm}"`}
//           </p>
//         </motion.div>

//         {/* Resources Grid */}
//         <motion.div
//           layout
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//         >
//           <AnimatePresence>
//             {sortedResources.map((resource, index) => (
//               <motion.div
//                 key={resource.id}
//                 layout
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 transition={{ duration: 0.3, delay: index * 0.1 }}
//                 className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
//               >
//                 {/* Resource Header */}
//                 <div className="p-6 border-b border-gray-100">
//                   <div className="flex items-start justify-between mb-3">
//                     <div className="flex items-center gap-2">
//                       {getTypeIcon(resource.type)}
//                       <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
//                         {resource.type}
//                       </span>
//                     </div>
//                     <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
//                       Sem {resource.semester}
//                     </span>
//                   </div>
                  
//                   <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
//                     {resource.title}
//                   </h3>
                  
//                   <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                     {resource.description}
//                   </p>
                  
//                   <div className="flex items-center gap-4 text-xs text-gray-500">
//                     <span>By {resource.author}</span>
//                     <span>•</span>
//                     <span>Updated {new Date(resource.lastUpdated).toLocaleDateString()}</span>
//                   </div>
//                 </div>

//                 {/* Resource Details */}
//                 <div className="p-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center gap-2">
//                       <Star className="w-4 h-4 text-yellow-400 fill-current" />
//                       <span className="text-sm font-medium text-gray-700">
//                         {resource.rating}
//                       </span>
//                     </div>
                    
//                     <div className="flex items-center gap-2">
//                       <Download className="w-4 h-4 text-gray-400" />
//                       <span className="text-sm text-gray-600">
//                         {resource.downloads.toLocaleString()}
//                       </span>
//                     </div>
                    
//                     <span className={`text-xs font-medium px-2 py-1 rounded ${getDifficultyColor(resource.difficulty)}`}>
//                       {resource.difficulty}
//                     </span>
//                   </div>

//                   {/* Tags */}
//                   <div className="flex flex-wrap gap-1 mb-4">
//                     {resource.tags.map(tag => (
//                       <span
//                         key={tag}
//                         className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
//                       >
//                         #{tag}
//                       </span>
//                     ))}
//                   </div>

//                   {/* File Info and Action */}
//                   <div className="flex items-center justify-between">
//                     <div className="text-xs text-gray-500">
//                       {resource.fileType} • {resource.fileSize}
//                     </div>
//                     <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
//                       <Download className="w-4 h-4" />
//                       Download
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>

//         {/* Empty State */}
//         {sortedResources.length === 0 && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center py-12"
//           >
//             <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
//             <p className="text-gray-600 mb-4">
//               Try adjusting your search or filters to find what you're looking for.
//             </p>
//             <button
//               onClick={clearFilters}
//               className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//             >
//               Clear all filters
//             </button>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Resources;


// Resources.jsx
// Resources.jsx
// Resources.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Dummy thumbnails (replace with your own preview images for notes)
const noteThumbnail = "/images/note-thumbnail.png"; // fallback thumbnail

const branches = {
  "Computer Science": [
    { title: "Algorithms", file: "/pdfs/Algorithms!.pdf", img: noteThumbnail },
    { title: "Compiler Design", file: "/pdfs/Compiler Design!.pdf", img: noteThumbnail },
    { title: "Operating System", file: "/pdfs/Operating System!.pdf", img: noteThumbnail },
    { title: "DBMS", file: "/pdfs/DBMS!.pdf", img: noteThumbnail },
    { title: "Computer Networks", file: "/pdfs/Computer Networks!.pdf", img: noteThumbnail },
    { title: "Theory of Computation", file: "/pdfs/Theory of Computation!.pdf", img: noteThumbnail },
    { title: "Data Structures", file: "/pdfs/Data Structures!.pdf", img: noteThumbnail },
  ],
  "Mathematics": [
    { title: "Discrete Mathematics", file: "/pdfs/Discrete Mathematics!!.pdf", img: noteThumbnail },
    { title: "Engineering Mathematics", file: "/pdfs/Engineering Mathematics!.pdf", img: noteThumbnail },
  ],
};

const branchIcons = {
  "Computer Science": "💻",
  Mathematics: "📊",
  
};

export default function Resources() {
  const [selectedBranch, setSelectedBranch] = useState("Computer Science");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row mt-12 bg-black bg-gradient-to-b from-black  via-balck to-[#010203] text-white">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 z-40 w-64 h-full bg-[#0a0f1a] border-r border-gray-800 p-6 transition-transform duration-300 md:relative md:translate-x-0`}
      >
        <h2 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-2">
          📂 Branches
        </h2>
        <ul className="space-y-2">
          {Object.keys(branches).map((branch) => (
            <li key={branch}>
              <button
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  selectedBranch === branch
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-gray-800 text-gray-300"
                }`}
                onClick={() => {
                  setSelectedBranch(branch);
                  setSelectedSubject(null);
                  setSidebarOpen(false);
                }}
              >
                <span>{branchIcons[branch]}</span>
                <span className="truncate">{branch}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile sidebar toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-lg shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "✖" : "☰"}
      </button>

      {/* Subject Grid */}
      <motion.div
        className={`flex-1 p-4 md:p-6 transition-all duration-500 ${
          selectedSubject
            ? "md:w-1/3"
            : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        }`}
      >
        <AnimatePresence>
          {!selectedSubject &&
            branches[selectedBranch].map((res, i) => (
              <motion.div
                key={i}
                className="bg-[#111827] rounded-xl border border-gray-800 hover:border-indigo-500 overflow-hidden shadow-md cursor-pointer group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedSubject(res)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="h-28 w-full bg-black overflow-hidden flex items-center justify-center">
                  <img
                    src={res.img}
                    alt={res.title}
                    className="h-full w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm sm:text-base truncate">
                    {res.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1">View Notes</p>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>

      {/* PDF Viewer */}
      <AnimatePresence>
        {selectedSubject && (
          <motion.div
            key="pdf-viewer"
            className="w-full md:w-2/3 bg-[#0f172a] p-4 md:p-6 border-t md:border-t-0 md:border-l border-gray-800 flex flex-col"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 70 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
                {selectedSubject.title}
              </h2>
              <button
                onClick={() => setSelectedSubject(null)}
                className="text-gray-400 hover:text-red-400 text-lg"
              >
                ✖
              </button>
            </div>
            <div className="flex-1 bg-black rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={selectedSubject.file}
                title={selectedSubject.title}
                className="w-full h-full min-h-[60vh]"
              />
            </div>
            <a
              href={selectedSubject.file}
              download
              className="mt-4 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition text-center shadow-md"
            >
              ⬇ Download PDF
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
