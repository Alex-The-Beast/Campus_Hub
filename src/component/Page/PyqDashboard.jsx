// // import React, { useState } from "react";
// // import { motion, AnimatePresence } from "framer-motion";

// // // Sample PYQ data
// // const pyqData = [
// //   {
// //     id: 1,
// //     subject: "Calculus",
// //     branch: "Computer Science",
// //     year: "3rd Year",
// //     course: "Mathematics",
// //     pyqYear: 2024,
// //     tags: ["Important", "Solved"],
// //   },
// //   {
// //     id: 2,
// //     subject: "Physics I",
// //     branch: "Electronics",
// //     year: "1st Year",
// //     course: "Physics",
// //     pyqYear: 2023,
// //     tags: ["MCQ"],
// //   },
// //   {
// //     id: 3,
// //     subject: "Chemistry II",
// //     branch: "Mechanical",
// //     year: "2nd Year",
// //     course: "Chemistry",
// //     pyqYear: 2022,
// //     tags: ["Solved", "Subjective"],
// //   },
// //   {
// //     id: 4,
// //     subject: "Linear Algebra",
// //     branch: "Computer Science",
// //     year: "2nd Year",
// //     course: "Mathematics",
// //     pyqYear: 2023,
// //     tags: ["Important", "MCQ"],
// //   },
// //   {
// //     id: 5,
// //     subject: "Digital Circuits",
// //     branch: "Electronics",
// //     year: "2nd Year",
// //     course: "Electronics",
// //     pyqYear: 2024,
// //     tags: ["Solved"],
// //   },
// //   {
// //     id: 6,
// //     subject: "Thermodynamics",
// //     branch: "Mechanical",
// //     year: "3rd Year",
// //     course: "Physics",
// //     pyqYear: 2024,
// //     tags: ["Important", "Subjective"],
// //   },
// // ];

// // const branches = ["Computer Science", "Electronics", "Mechanical"];
// // const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
// // const courses = ["Mathematics", "Physics", "Chemistry", "Electronics"];
// // const tagOptions = ["Important", "Solved", "MCQ", "Subjective"];

// // const PyqDashboard = () => {
// //   const [selectedBranch, setSelectedBranch] = useState("");
// //   const [selectedYear, setSelectedYear] = useState("");
// //   const [selectedCourse, setSelectedCourse] = useState("");
// //   const [selectedTags, setSelectedTags] = useState([]);

// //   const toggleTag = (tag) => {
// //     if (selectedTags.includes(tag)) {
// //       setSelectedTags(selectedTags.filter((t) => t !== tag));
// //     } else {
// //       setSelectedTags([...selectedTags, tag]);
// //     }
// //   };

// //   const filteredPyqs = pyqData.filter((pyq) => {
// //     const branchMatch = selectedBranch ? pyq.branch === selectedBranch : true;
// //     const yearMatch = selectedYear ? pyq.year === selectedYear : true;
// //     const courseMatch = selectedCourse ? pyq.course === selectedCourse : true;
// //     const tagsMatch =
// //       selectedTags.length > 0
// //         ? selectedTags.every((tag) => pyq.tags.includes(tag))
// //         : true;
// //     return branchMatch && yearMatch && courseMatch && tagsMatch;
// //   });

// //   return (
// //     <div className="flex flex-col md:flex-row h-screen bg-gray-950 text-white mt-8 ">
// //       {/* Sidebar */}
// //       <aside className="w-full md:w-64 p-6 bg-black flex-shrink-0">
// //         <h2 className="text-2xl font-bold mb-6">Filters</h2>

// //         <div className="space-y-4">
// //           <div>
// //             <label className="block text-sm font-medium mb-1">Branch</label>
// //             <select
// //               className="w-full p-2 bg-gray-700 rounded"
// //               value={selectedBranch}
// //               onChange={(e) => setSelectedBranch(e.target.value)}
// //             >
// //               <option value="">All</option>
// //               {branches.map((b) => (
// //                 <option key={b} value={b}>
// //                   {b}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium mb-1">Year</label>
// //             <select
// //               className="w-full p-2 bg-gray-700 rounded"
// //               value={selectedYear}
// //               onChange={(e) => setSelectedYear(e.target.value)}
// //             >
// //               <option value="">All</option>
// //               {years.map((y) => (
// //                 <option key={y} value={y}>
// //                   {y}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium mb-1">Course</label>
// //             <select
// //               className="w-full p-2 bg-gray-700 rounded"
// //               value={selectedCourse}
// //               onChange={(e) => setSelectedCourse(e.target.value)}
// //             >
// //               <option value="">All</option>
// //               {courses.map((c) => (
// //                 <option key={c} value={c}>
// //                   {c}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           {/* Tag Filters */}
// //           <div>
// //             <h3 className="text-sm font-medium mb-2">Tags</h3>
// //             <div className="flex flex-wrap gap-2">
// //               {tagOptions.map((tag) => (
// //                 <button
// //                   key={tag}
// //                   onClick={() => toggleTag(tag)}
// //                   className={`px-3 py-1 rounded text-sm transition ${
// //                     selectedTags.includes(tag)
// //                       ? "bg-purple-600"
// //                       : "bg-gray-700 hover:bg-purple-600"
// //                   }`}
// //                 >
// //                   {tag}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </aside>

// //       {/* Main Content */}
// //       <main className="flex-1 p-6 overflow-y-auto">
// //         <h1 className="text-3xl font-bold mb-6">Previous Year Questions</h1>

// //         {filteredPyqs.length === 0 ? (
// //           <p className="text-gray-400">No PYQs found for selected filters.</p>
// //         ) : (
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //             <AnimatePresence>
// //               {filteredPyqs.map((pyq) => (
// //                 <motion.div
// //                   key={pyq.id}
// //                   initial={{ opacity: 0, y: 20 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   exit={{ opacity: 0, y: -20 }}
// //                   layout
// //                   className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition"
// //                 >
// //                   <h2 className="font-semibold text-lg mb-2">
// //                     {pyq.course} - {pyq.year}
// //                   </h2>
// //                   <p className="text-sm mb-1">Subject: {pyq.subject}</p>
// //                   <p className="text-sm mb-2">Year: {pyq.pyqYear}</p>
// //                   <div className="flex flex-wrap gap-2 mb-3">
// //                     {pyq.tags.map((tag) => (
// //                       <span
// //                         key={tag}
// //                         className="bg-purple-600 px-2 py-1 rounded text-xs"
// //                       >
// //                         {tag}
// //                       </span>
// //                     ))}
// //                   </div>
// //                   <div className="flex gap-2">
// //                     <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-1 rounded text-sm">
// //                       View
// //                     </button>
// //                     <button className="flex-1 bg-gray-700 hover:bg-gray-600 py-1 rounded text-sm">
// //                       Download
// //                     </button>
// //                   </div>
// //                 </motion.div>
// //               ))}
// //             </AnimatePresence>
// //           </div>
// //         )}
// //       </main>
// //     </div>
// //   );
// // };

// // export default PyqDashboard;

// // we will see later
// // import React, { useState } from "react";
// // import { motion, AnimatePresence } from "framer-motion";

// // // Sample PYQ data with more comprehensive structure
// // const pyqData = [
// //   {
// //     id: 1,
// //     subject: "Calculus",
// //     branch: "Computer Science",
// //     year: "3rd Year",
// //     semester: "Semester 5",
// //     course: "Mathematics",
// //     pyqYear: 2024,
// //     examType: "Major",
// //     tags: ["Important", "Solved"],
// //     views: 1250,
// //     downloads: 890,
// //     difficulty: "Hard",
// //     rating: 4.7,
// //   },
// //   {
// //     id: 2,
// //     subject: "Physics I",
// //     branch: "Electronics",
// //     year: "1st Year",
// //     semester: "Semester 1",
// //     course: "Physics",
// //     pyqYear: 2023,
// //     examType: "Minor",
// //     tags: ["MCQ"],
// //     views: 980,
// //     downloads: 650,
// //     difficulty: "Medium",
// //     rating: 4.2,
// //   },
// //   {
// //     id: 3,
// //     subject: "Chemistry II",
// //     branch: "Mechanical",
// //     year: "2nd Year",
// //     semester: "Semester 4",
// //     course: "Chemistry",
// //     pyqYear: 2022,
// //     examType: "Major",
// //     tags: ["Solved", "Subjective"],
// //     views: 750,
// //     downloads: 420,
// //     difficulty: "Easy",
// //     rating: 3.8,
// //   },
// //   {
// //     id: 4,
// //     subject: "Linear Algebra",
// //     branch: "Computer Science",
// //     year: "2nd Year",
// //     semester: "Semester 3",
// //     course: "Mathematics",
// //     pyqYear: 2023,
// //     examType: "Minor",
// //     tags: ["Important", "MCQ"],
// //     views: 1120,
// //     downloads: 780,
// //     difficulty: "Medium",
// //     rating: 4.5,
// //   },
// //   {
// //     id: 5,
// //     subject: "Digital Circuits",
// //     branch: "Electronics",
// //     year: "2nd Year",
// //     semester: "Semester 4",
// //     course: "Electronics",
// //     pyqYear: 2024,
// //     examType: "Major",
// //     tags: ["Solved"],
// //     views: 890,
// //     downloads: 560,
// //     difficulty: "Hard",
// //     rating: 4.3,
// //   },
// //   {
// //     id: 6,
// //     subject: "Thermodynamics",
// //     branch: "Mechanical",
// //     year: "3rd Year",
// //     semester: "Semester 5",
// //     course: "Physics",
// //     pyqYear: 2024,
// //     examType: "Major",
// //     tags: ["Important", "Subjective"],
// //     views: 1340,
// //     downloads: 920,
// //     difficulty: "Hard",
// //     rating: 4.6,
// //   },
// //   {
// //     id: 7,
// //     subject: "Data Structures",
// //     branch: "Computer Science",
// //     year: "2nd Year",
// //     semester: "Semester 3",
// //     course: "Computer Science",
// //     pyqYear: 2023,
// //     examType: "Minor",
// //     tags: ["Important", "Solved"],
// //     views: 1560,
// //     downloads: 1100,
// //     difficulty: "Medium",
// //     rating: 4.8,
// //   },
// //   {
// //     id: 8,
// //     subject: "Signals & Systems",
// //     branch: "Electronics",
// //     year: "3rd Year",
// //     semester: "Semester 5",
// //     course: "Electronics",
// //     pyqYear: 2024,
// //     examType: "Major",
// //     tags: ["Subjective"],
// //     views: 920,
// //     downloads: 610,
// //     difficulty: "Hard",
// //     rating: 4.1,
// //   },
// // ];

// // const branches = ["Computer Science", "Electronics", "Mechanical", "Civil", "Electrical", "Chemical", "Aerospace"];
// // const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
// // const semesters = ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8"];
// // const courses = ["Mathematics", "Physics", "Chemistry", "Electronics", "Computer Science", "Mechanical", "Civil", "Electrical"];
// // const examTypes = ["Major", "Minor"];
// // const tagOptions = ["Important", "Solved", "MCQ", "Subjective"];
// // const difficultyLevels = ["Easy", "Medium", "Hard"];

// // const PyqDashboard = () => {
// //   const [selectedBranch, setSelectedBranch] = useState("");
// //   const [selectedYear, setSelectedYear] = useState("");
// //   const [selectedSemester, setSelectedSemester] = useState("");
// //   const [selectedCourse, setSelectedCourse] = useState("");
// //   const [selectedExamType, setSelectedExamType] = useState("");
// //   const [selectedDifficulty, setSelectedDifficulty] = useState("");
// //   const [selectedTags, setSelectedTags] = useState([]);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [sortBy, setSortBy] = useState("views");

// //   const toggleTag = (tag) => {
// //     if (selectedTags.includes(tag)) {
// //       setSelectedTags(selectedTags.filter((t) => t !== tag));
// //     } else {
// //       setSelectedTags([...selectedTags, tag]);
// //     }
// //   };

// //   const filteredPyqs = pyqData
// //     .filter((pyq) => {
// //       const branchMatch = selectedBranch ? pyq.branch === selectedBranch : true;
// //       const yearMatch = selectedYear ? pyq.year === selectedYear : true;
// //       const semesterMatch = selectedSemester ? pyq.semester === selectedSemester : true;
// //       const courseMatch = selectedCourse ? pyq.course === selectedCourse : true;
// //       const examTypeMatch = selectedExamType ? pyq.examType === selectedExamType : true;
// //       const difficultyMatch = selectedDifficulty ? pyq.difficulty === selectedDifficulty : true;
// //       const tagsMatch =
// //         selectedTags.length > 0
// //           ? selectedTags.every((tag) => pyq.tags.includes(tag))
// //           : true;
// //       const searchMatch = searchQuery
// //         ? pyq.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //           pyq.course.toLowerCase().includes(searchQuery.toLowerCase())
// //         : true;

// //       return (
// //         branchMatch &&
// //         yearMatch &&
// //         semesterMatch &&
// //         courseMatch &&
// //         examTypeMatch &&
// //         difficultyMatch &&
// //         tagsMatch &&
// //         searchMatch
// //       );
// //     })
// //     .sort((a, b) => {
// //       if (sortBy === "views") return b.views - a.views;
// //       if (sortBy === "downloads") return b.downloads - a.downloads;
// //       if (sortBy === "rating") return b.rating - a.rating;
// //       if (sortBy === "year") return b.pyqYear - a.pyqYear;
// //       return 0;
// //     });

// //   const clearFilters = () => {
// //     setSelectedBranch("");
// //     setSelectedYear("");
// //     setSelectedSemester("");
// //     setSelectedCourse("");
// //     setSelectedExamType("");
// //     setSelectedDifficulty("");
// //     setSelectedTags([]);
// //     setSearchQuery("");
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white p-4 md:p-8">
// //       {/* Header */}
// //       <motion.header
// //         initial={{ opacity: 0, y: -20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         className="mb-8 text-center"
// //       >
// //         <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
// //           Engineering PYQ Repository
// //         </h1>
// //         <p className="text-gray-400 mt-2">Access previous year question papers for better preparation</p>
// //       </motion.header>

// //       <div className="flex flex-col lg:flex-row gap-6">
// //         {/* Sidebar Filters */}
// //         <motion.aside
// //           initial={{ opacity: 0, x: -20 }}
// //         animate={{ opacity: 1, x: 0 }}
// //         transition={{ delay: 0.2 }}
// //         className="w-full lg:w-72 bg-gray-800 p-6 rounded-xl h-fit sticky top-4"
// //         >
// //           <div className="flex justify-between items-center mb-6">
// //             <h2 className="text-xl font-bold">Filters</h2>
// //             <button
// //               onClick={clearFilters}
// //               className="text-sm text-purple-400 hover:text-purple-300"
// //             >
// //               Clear All
// //             </button>
// //           </div>

// //           <div className="space-y-6">
// //             {/* Search */}
// //             <div>
// //               <label className="block text-sm font-medium mb-2">Search</label>
// //               <input
// //                 type="text"
// //                 placeholder="Search by subject or course..."
// //                 className="w-full p-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //               />
// //             </div>

// //             {/* Branch Filter */}
// //             <div>
// //               <label className="block text-sm font-medium mb-2">Branch</label>
// //               <select
// //                 className="w-full p-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
// //                 value={selectedBranch}
// //                 onChange={(e) => setSelectedBranch(e.target.value)}
// //               >
// //                 <option value="">All Branches</option>
// //                 {branches.map((b) => (
// //                   <option key={b} value={b}>
// //                     {b}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* Year Filter */}
// //             <div>
// //               <label className="block text-sm font-medium mb-2">Year</label>
// //               <select
// //                 className="w-full p-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
// //                 value={selectedYear}
// //                 onChange={(e) => setSelectedYear(e.target.value)}
// //               >
// //                 <option value="">All Years</option>
// //                 {years.map((y) => (
// //                   <option key={y} value={y}>
// //                     {y}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* Semester Filter */}
// //             <div>
// //               <label className="block text-sm font-medium mb-2">Semester</label>
// //               <select
// //                 className="w-full p-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
// //                 value={selectedSemester}
// //                 onChange={(e) => setSelectedSemester(e.target.value)}
// //               >
// //                 <option value="">All Semesters</option>
// //                 {semesters.map((s) => (
// //                   <option key={s} value={s}>
// //                     {s}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* Course Filter */}
// //             <div>
// //               <label className="block text-sm font-medium mb-2">Course</label>
// //               <select
// //                 className="w-full p-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
// //                 value={selectedCourse}
// //                 onChange={(e) => setSelectedCourse(e.target.value)}
// //               >
// //                 <option value="">All Courses</option>
// //                 {courses.map((c) => (
// //                   <option key={c} value={c}>
// //                     {c}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* Exam Type Filter */}
// //             <div>
// //               <label className="block text-sm font-medium mb-2">Exam Type</label>
// //               <select
// //                 className="w-full p-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
// //                 value={selectedExamType}
// //                 onChange={(e) => setSelectedExamType(e.target.value)}
// //               >
// //                 <option value="">All Types</option>
// //                 {examTypes.map((e) => (
// //                   <option key={e} value={e}>
// //                     {e}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* Difficulty Filter */}
// //             <div>
// //               <label className="block text-sm font-medium mb-2">Difficulty</label>
// //               <select
// //                 className="w-full p-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
// //                 value={selectedDifficulty}
// //                 onChange={(e) => setSelectedDifficulty(e.target.value)}
// //               >
// //                 <option value="">All Levels</option>
// //                 {difficultyLevels.map((d) => (
// //                   <option key={d} value={d}>
// //                     {d}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* Tag Filters */}
// //             <div>
// //               <h3 className="text-sm font-medium mb-2">Tags</h3>
// //               <div className="flex flex-wrap gap-2">
// //                 {tagOptions.map((tag) => (
// //                   <button
// //                     key={tag}
// //                     onClick={() => toggleTag(tag)}
// //                     className={`px-3 py-1 rounded-lg text-sm transition ${
// //                       selectedTags.includes(tag)
// //                         ? "bg-purple-600 text-white"
// //                         : "bg-gray-700 text-gray-300 hover:bg-purple-600 hover:text-white"
// //                     }`}
// //                   >
// //                     {tag}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </motion.aside>

// //         {/* Main Content */}
// //         <main className="flex-1">
// //           {/* Results Header */}
// //           <motion.div
// //             initial={{ opacity: 0, y: -10 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.3 }}
// //             className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4"
// //           >
// //             <div>
// //               <h2 className="text-2xl font-bold">Previous Year Questions</h2>
// //               <p className="text-gray-400">
// //                 {filteredPyqs.length} {filteredPyqs.length === 1 ? "result" : "results"} found
// //               </p>
// //             </div>

// //             <div className="flex items-center gap-3">
// //               <span className="text-gray-400 text-sm">Sort by:</span>
// //               <select
// //                 className="p-2 bg-gray-800 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
// //                 value={sortBy}
// //                 onChange={(e) => setSortBy(e.target.value)}
// //               >
// //                 <option value="views">Most Viewed</option>
// //                 <option value="downloads">Most Downloaded</option>
// //                 <option value="rating">Highest Rated</option>
// //                 <option value="year">Newest First</option>
// //               </select>
// //             </div>
// //           </motion.div>

// //           {/* Results Grid */}
// //           {filteredPyqs.length === 0 ? (
// //             <motion.div
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               className="text-center py-12 bg-gray-800 rounded-xl"
// //             >
// //               <i className="fas fa-search text-4xl text-gray-500 mb-4"></i>
// //               <h3 className="text-xl font-semibold text-gray-300">No PYQs found</h3>
// //               <p className="text-gray-500 mt-2">Try adjusting your filters or search query</p>
// //             </motion.div>
// //           ) : (
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //               <AnimatePresence>
// //                 {filteredPyqs.map((pyq) => (
// //                   <motion.div
// //                     key={pyq.id}
// //                     initial={{ opacity: 0, scale: 0.9 }}
// //                     animate={{ opacity: 1, scale: 1 }}
// //                     exit={{ opacity: 0, scale: 0.9 }}
// //                     layout
// //                     className="bg-gray-800 p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 hover:border-purple-500"
// //                   >
// //                     <div className="flex justify-between items-start mb-4">
// //                       <div>
// //                         <h3 className="font-semibold text-lg">{pyq.subject}</h3>
// //                         <p className="text-sm text-gray-400">{pyq.course}</p>
// //                       </div>
// //                       <span className={`px-2 py-1 rounded text-xs ${
// //                         pyq.examType === "Major"
// //                           ? "bg-purple-600"
// //                           : "bg-blue-600"
// //                       }`}>
// //                         {pyq.examType}
// //                       </span>
// //                     </div>

// //                     <div className="space-y-2 mb-4">
// //                       <div className="flex items-center text-sm text-gray-400">
// //                         <i className="fas fa-graduation-cap mr-2"></i>
// //                         {pyq.branch} • {pyq.year} • {pyq.semester}
// //                       </div>
// //                       <div className="flex items-center text-sm text-gray-400">
// //                         <i className="fas fa-calendar-alt mr-2"></i>
// //                         Year: {pyq.pyqYear}
// //                       </div>
// //                       <div className="flex items-center text-sm">
// //                         <span className="text-gray-400 mr-2">Difficulty:</span>
// //                         <span className={
// //                           pyq.difficulty === "Hard"
// //                             ? "text-red-400"
// //                             : pyq.difficulty === "Medium"
// //                             ? "text-yellow-400"
// //                             : "text-green-400"
// //                         }>
// //                           {pyq.difficulty}
// //                         </span>
// //                       </div>
// //                     </div>

// //                     <div className="flex flex-wrap gap-2 mb-4">
// //                       {pyq.tags.map((tag) => (
// //                         <span
// //                           key={tag}
// //                           className="bg-purple-900 px-2 py-1 rounded text-xs"
// //                         >
// //                           {tag}
// //                         </span>
// //                       ))}
// //                     </div>

// //                     <div className="flex items-center justify-between mb-4">
// //                       <div className="flex items-center">
// //                         <div className="flex text-yellow-400 mr-2">
// //                           {[...Array(5)].map((_, i) => (
// //                             <i
// //                               key={i}
// //                               className={`fas fa-star ${i < Math.floor(pyq.rating) ? "text-yellow-400" : "text-gray-600"}`}
// //                             ></i>
// //                           ))}
// //                         </div>
// //                         <span className="text-sm text-gray-400">{pyq.rating}</span>
// //                       </div>
// //                       <div className="flex items-center space-x-4 text-sm text-gray-400">
// //                         <span>
// //                           <i className="fas fa-eye mr-1"></i> {pyq.views}
// //                         </span>
// //                         <span>
// //                           <i className="fas fa-download mr-1"></i> {pyq.downloads}
// //                         </span>
// //                       </div>
// //                     </div>

// //                     <div className="flex gap-2">
// //                       <button className="flex-1 bg-purple-600 hover:bg-purple-700 py-2 rounded-lg text-sm font-medium transition">
// //                         <i className="fas fa-eye mr-1"></i> View
// //                       </button>
// //                       <button className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded-lg text-sm font-medium transition">
// //                         <i className="fas fa-download mr-1"></i> Download
// //                       </button>
// //                     </div>
// //                   </motion.div>
// //                 ))}
// //               </AnimatePresence>
// //             </div>
// //           )}
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PyqDashboard;

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// // Dummy PYQ data (Extended)
// const pyqData = Array.from({ length: 25 }, (_, i) => ({
//   id: i + 1,
//   subject: [
//     "Calculus",
//     "Physics",
//     "Chemistry",
//     "Data Structures",
//     "Thermodynamics",
//     "Digital Circuits",
//     "Operating Systems",
//   ][i % 7],
//   branch: ["CSE", "ECE", "EEE", "Mechanical", "Civil", "IT", "Biotech"][i % 7],
//   year: ["1st Year", "2nd Year", "3rd Year", "4th Year"][i % 4],
//   semester: ["Semester 1", "Semester 2"][i % 2],
//   examType: ["Major", "Minor"][i % 2],
//   pyqYear: 2021 + (i % 4),
// }));

// const branches = ["CSE", "ECE", "EEE", "Mechanical", "Civil", "IT", "Biotech"];
// const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
// const semesters = ["Semester 1", "Semester 2"];
// const examTypes = ["Major", "Minor"];

// const PyqDashboard = () => {
//   const [selectedBranch, setSelectedBranch] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");
//   const [selectedSemester, setSelectedSemester] = useState("");
//   const [selectedExam, setSelectedExam] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortBy, setSortBy] = useState("year");

//   // Filtering
//   const filteredPyqs = pyqData
//     .filter((pyq) => {
//       const branchMatch = selectedBranch ? pyq.branch === selectedBranch : true;
//       const yearMatch = selectedYear ? pyq.year === selectedYear : true;
//       const semMatch = selectedSemester ? pyq.semester === selectedSemester : true;
//       const examMatch = selectedExam ? pyq.examType === selectedExam : true;
//       const searchMatch = searchQuery
//         ? pyq.subject.toLowerCase().includes(searchQuery.toLowerCase())
//         : true;

//       return branchMatch && yearMatch && semMatch && examMatch && searchMatch;
//     })
//     .sort((a, b) => {
//       if (sortBy === "year") return b.pyqYear - a.pyqYear;
//       if (sortBy === "subject") return a.subject.localeCompare(b.subject);
//       return 0;
//     });

//   return (
//     <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-black via-gray-950 to-[#0a1a2f] text-gray-300 mt-12">
//       {/* Sidebar Filters */}
//       <aside className="w-full md:w-72 p-6 bg-black/70 backdrop-blur-lg border-r border-white/10 overflow-y-hidden">
//         <h2 className="text-2xl font-bold mb-6">Filters</h2>

//         <div className="space-y-5">
//           {/* Branch */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Branch</label>
//             <select
//               className="w-full p-2 bg-gray-900 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
//               value={selectedBranch}
//               onChange={(e) => setSelectedBranch(e.target.value)}
//             >
//               <option value="">All</option>
//               {branches.map((b) => (
//                 <option key={b} value={b}>
//                   {b}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Year */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Year</label>
//             <select
//               className="w-full p-2 bg-gray-900 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
//               value={selectedYear}
//               onChange={(e) => setSelectedYear(e.target.value)}
//             >
//               <option value="">All</option>
//               {years.map((y) => (
//                 <option key={y} value={y}>
//                   {y}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Semester */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Semester</label>
//             <select
//               className="w-full p-2 bg-gray-900 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
//               value={selectedSemester}
//               onChange={(e) => setSelectedSemester(e.target.value)}
//             >
//               <option value="">All</option>
//               {semesters.map((s) => (
//                 <option key={s} value={s}>
//                   {s}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Exam Type */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Exam Type</label>
//             <select
//               className="w-full p-2 bg-gray-900 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
//               value={selectedExam}
//               onChange={(e) => setSelectedExam(e.target.value)}
//             >
//               <option value="">All</option>
//               {examTypes.map((ex) => (
//                 <option key={ex} value={ex}>
//                   {ex}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8 overflow-y-auto">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
//             Previous Year Question Papers
//           </h1>

//           {/* Search & Sort */}
//           <div className="flex gap-4">
//             <input
//               type="text"
//               placeholder="Search subject..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
//             />
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
//             >
//               <option value="year">Sort by Year</option>
//               <option value="subject">Sort by Subject</option>
//             </select>
//           </div>
//         </div>

//         {filteredPyqs.length === 0 ? (
//           <p className="text-gray-400">No PYQs found for selected filters.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full border-collapse border border-white/10 rounded-lg overflow-hidden">
//               <thead className="bg-gradient-to-r from-gray-900 to-[#0f1e35] text-gray-300 text-sm uppercase">
//                 <tr>
//                   <th className="px-4 py-3 border border-white/10 text-left">Subject</th>
//                   <th className="px-4 py-3 border border-white/10 text-left">Branch</th>
//                   <th className="px-4 py-3 border border-white/10 text-left">Year</th>
//                   <th className="px-4 py-3 border border-white/10 text-left">Semester</th>
//                   <th className="px-4 py-3 border border-white/10 text-left">Exam</th>
//                   <th className="px-4 py-3 border border-white/10 text-left">PYQ Year</th>
//                   <th className="px-4 py-3 border border-white/10 text-center">Actions</th>
//                 </tr>
//               </thead>

//               <AnimatePresence component="tbody">
//                 {filteredPyqs.map((pyq) => (
//                   <motion.tr
//                     key={pyq.id}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="hover:bg-blue-900/30 transition border-b border-white/10"
//                   >
//                     <td className="px-4 py-3">{pyq.subject}</td>
//                     <td className="px-4 py-3">{pyq.branch}</td>
//                     <td className="px-4 py-3">{pyq.year}</td>
//                     <td className="px-4 py-3">{pyq.semester}</td>
//                     <td className="px-4 py-3">{pyq.examType}</td>
//                     <td className="px-4 py-3">{pyq.pyqYear}</td>
//                     <td className="px-4 py-3 flex gap-2 justify-center">
//                       <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm">
//                         View
//                       </button>
//                       <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm">
//                         Download
//                       </button>
//                     </td>
//                   </motion.tr>
//                 ))}
//               </AnimatePresence>
//             </table>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default PyqDashboard;

// comes from db
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

  // Build memoized filters object for API
  const filters = useMemo(() => {
    const f = {};
    if (selectedBranch) f.branch = selectedBranch;
    if (selectedYear) f.year = selectedYear;
    if (selectedSemester) f.semester = selectedSemester;
    if (selectedExam) f.examType = selectedExam;
    if (searchQuery) f.subject = searchQuery;
    return f;
  }, [
    selectedBranch,
    selectedYear,
    selectedSemester,
    selectedExam,
    searchQuery,
  ]);

  // Fetch filtered data from backend
  const {
    data: pyqData = [],
    isFetching,
    isError,
  } = useGetFilteredpdfRequest(filters);

  // Sort data
  const sortedPyqs = useMemo(() => {
    return [...pyqData].sort((a, b) => {
      if (sortBy === "year") return b.pyqYear - a.pyqYear;
      if (sortBy === "subject") return a.subject.localeCompare(b.subject);
      return 0;
    });
  }, [pyqData, sortBy]);

  // Update URL when filter changes
  const handleFilterChange = (key, value) => {
    const params = Object.fromEntries([...searchParams]);
    if (value) params[key] = value;
    else delete params[key];
    setSearchParams(params);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-black via-gray-950 to-[#0a1a2f] text-gray-300 mt-12">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-72 p-6 bg-black/70 backdrop-blur-lg border-r border-white/10 overflow-y-hidden">
        <h2 className="text-2xl font-bold mb-6">Filters</h2>
        <div className="space-y-5">
          {/* Branch */}
          <div>
            <label className="block text-sm font-medium mb-1">Branch</label>
            <select
              className="w-full p-2 bg-gray-900 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={selectedBranch}
              onChange={(e) => handleFilterChange("branch", e.target.value)}
            >
              <option value="">All</option>
              {branches.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-medium mb-1">Year</label>
            <select
              className="w-full p-2 bg-gray-900 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={selectedYear}
              onChange={(e) => handleFilterChange("year", e.target.value)}
            >
              <option value="">All</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Semester */}
          <div>
            <label className="block text-sm font-medium mb-1">Semester</label>
            <select
              className="w-full p-2 bg-gray-900 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={selectedSemester}
              onChange={(e) => handleFilterChange("semester", e.target.value)}
            >
              <option value="">All</option>
              {semesters.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Exam Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Exam Type</label>
            <select
              className="w-full p-2 bg-gray-900 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={selectedExam}
              onChange={(e) => handleFilterChange("examType", e.target.value)}
            >
              <option value="">All</option>
              {examTypes.map((ex) => (
                <option key={ex} value={ex}>
                  {ex}
                </option>
              ))}
            </select>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
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
                  <th className="px-4 py-3 border border-white/10 text-left">
                    Subject
                  </th>
                  <th className="px-4 py-3 border border-white/10 text-left">
                    Branch
                  </th>
                  <th className="px-4 py-3 border border-white/10 text-left">
                    Year
                  </th>
                  <th className="px-4 py-3 border border-white/10 text-left">
                    Semester
                  </th>
                  <th className="px-4 py-3 border border-white/10 text-left">
                    Exam
                  </th>
                  <th className="px-4 py-3 border border-white/10 text-left">
                    PYQ Year
                  </th>
                  <th className="px-4 py-3 border border-white/10 text-center">
                    Actions
                  </th>
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
                    <td className="px-4 py-3">{pyq.branch}</td>
                    <td className="px-4 py-3">{pyq.year}</td>
                    <td className="px-4 py-3">{pyq.semester}</td>
                    <td className="px-4 py-3">{pyq.examType}</td>
                    <td className="px-4 py-3">{pyq.pyqYear}</td>
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
