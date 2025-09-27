// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import {
//   Menu,
//   X,
//   Search,
//   FileText,
//   Folder,
//   ChevronRight,
//   Download,
//   ExternalLink,
//   ZoomIn,
//   ZoomOut,
//   RotateCcw,
//   Heart,
//   Star,
//   Clock,
//   Upload,
//   MessageSquare,
//   MoreHorizontal,
// } from "lucide-react";

// /**
//  * Resource.jsx
//  * Dark-themed, responsive resources page with file-tree, inline PDF viewer,
//  * AI assistant, upload, favorites, recent, tags, zoom/rotate toolbar, mobile drawers.
//  *
//  * NOTE: This uses an <iframe> viewer for quick testing. For page-level control
//  * (real page navigation/search/highlighting) integrate react-pdf or PDF.js.
//  */

// /* ---------------------------
//    Mock data (replace with API)
//    --------------------------- */
// const initialBranches = {
//   "Computer Science": {
//     "Semester 5": [
//       {
//         id: "cs-algo",
//         title: "Algorithms - Notes",
//         file: "uploads/Height-&-Distance.pdfuploads",
//         tags: ["algorithms", "theory"],
//         favorite: false,
//         uploadedAt: "2024-09-01",
//         size: "1.2MB",
//         desc: "Comprehensive algorithm notes with proofs & examples.",
//       },
//       {
//         id: "cs-os",
//         title: "Operating Systems - Lecture Notes",
//         file: "/pdfs/os.pdf",
//         tags: ["os", "systems"],
//         favorite: true,
//         uploadedAt: "2024-09-10",
//         size: "2.1MB",
//         desc: "Process scheduling, memory management, and concurrency.",
//       },
//     ],
//     "Semester 6": [
//       {
//         id: "cs-dbms",
//         title: "DBMS - Past Notes",
//         file: "/pdfs/dbms.pdf",
//         tags: ["databases"],
//         favorite: false,
//         uploadedAt: "2024-08-22",
//         size: "900KB",
//         desc: "ER models, normalization, SQL queries, transactions.",
//       },
//     ],
//   },
//   Mechanical: {
//     "Semester 5": [
//       {
//         id: "mech-thermo",
//         title: "Thermodynamics - Quick Guide",
//         file: "/pdfs/thermo.pdf",
//         tags: ["thermo"],
//         favorite: false,
//         uploadedAt: "2024-07-02",
//         size: "1.6MB",
//         desc: "Main concepts, laws, and solved examples.",
//       },
//     ],
//   },
// };

// /* ---------------------------
//    Helper utilities
//    --------------------------- */
// const flattenNotes = (branches) => {
//   const arr = [];
//   for (const branch of Object.keys(branches)) {
//     for (const sem of Object.keys(branches[branch])) {
//       for (const note of branches[branch][sem]) {
//         arr.push({
//           ...note,
//           branch,
//           semester: sem,
//         });
//       }
//     }
//   }
//   return arr;
// };

// /* ---------------------------
//    Main Component
//    --------------------------- */
// export default function NotesList() {
//   const [branches, setBranches] = useState(initialBranches);
//   const [expanded, setExpanded] = useState({}); // keys: `${branch}-${sem}`
//   const [selected, setSelected] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(false); // mobile
//   const [aiOpen, setAiOpen] = useState(false); // mobile
//   const [zoom, setZoom] = useState(1);
//   const [rotate, setRotate] = useState(0);
//   const [messages, setMessages] = useState([
//     { sender: "ai", text: "Hi, I'm BrightBot — ask me anything about the open document." },
//   ]);
//   const [input, setInput] = useState("");
//   const [query, setQuery] = useState(""); // for sidebar search
//   const [filterTag, setFilterTag] = useState("");
//   const [sortBy, setSortBy] = useState("relevance"); // popularity, newest
//   const [recent, setRecent] = useState([]);
//   const fileInputRef = useRef(null);
//   const viewerRef = useRef(null);

//   useEffect(() => {
//     // Ensure dark theme root if you want: (optional)
//     // document.documentElement.classList.add("dark");
//   }, []);

//   const allNotes = flattenNotes(branches).filter((n) =>
//     (n.title + " " + (n.desc || "") + " " + n.tags.join(" ")).toLowerCase().includes(query.toLowerCase())
//   ).filter((n) => (filterTag ? n.tags.includes(filterTag) : true));

//   const toggleExpand = (branch, sem) => {
//     const key = `${branch}-${sem}`;
//     setExpanded((p) => ({ ...p, [key]: !p[key] }));
//   };

//   const selectNote = (note) => {
//     setSelected(note);
//     setSidebarOpen(false); // close mobile sidebar
//     setAiOpen(true); // open AI by default for convenience
//     setZoom(1);
//     setRotate(0);
//     // update recent (unique, top)
//     setRecent((prev) => {
//       const filtered = prev.filter((r) => r.id !== note.id);
//       return [note, ...filtered].slice(0, 6);
//     });
//   };

//   const toggleFavorite = (note) => {
//     setBranches((prev) => {
//       const copy = JSON.parse(JSON.stringify(prev));
//       for (const b of Object.keys(copy)) {
//         for (const s of Object.keys(copy[b])) {
//           copy[b][s] = copy[b][s].map((it) => (it.id === note.id ? { ...it, favorite: !it.favorite } : it));
//         }
//       }
//       return copy;
//     });
//   };

//   const handleUploadClick = () => fileInputRef.current?.click();
//   const handleFileUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const url = URL.createObjectURL(file);
//     // create a new note entry in "Uploads" branch/semester
//     setBranches((prev) => {
//       const copy = JSON.parse(JSON.stringify(prev));
//       const branch = "Uploads";
//       const sem = "My Files";
//       if (!copy[branch]) copy[branch] = {};
//       if (!copy[branch][sem]) copy[branch][sem] = [];
//       const id = `upload-${Date.now()}`;
//       copy[branch][sem].unshift({
//         id,
//         title: file.name,
//         file: url,
//         tags: ["uploaded"],
//         favorite: false,
//         uploadedAt: new Date().toISOString().slice(0, 10),
//         size: `${(file.size / (1024 * 1024)).toFixed(2)}MB`,
//         desc: "Uploaded from device",
//       });
//       return copy;
//     });
//     e.target.value = "";
//   };

//   const sendMessage = (text) => {
//     if (!text?.trim()) return;
//     const userMsg = { sender: "user", text };
//     setMessages((m) => [...m, userMsg]);
//     setInput("");
//     // Mock AI response: include doc-context if selected
//     setTimeout(() => {
//       const docHint = selected ? ` (based on: ${selected.title})` : "";
//       const aiText = mockAiReply(text, selected);
//       setMessages((m) => [...m, userMsg, { sender: "ai", text: aiText + docHint }]);
//     }, 700);
//   };

//   // Simple mock AI logic — replace with real API request
//   const mockAiReply = (text, doc) => {
//     const q = text.toLowerCase();
//     if (q.includes("summar") || q.includes("tl;dr")) {
//       return doc ? `Summary: This document covers ${doc.tags.join(", ")} and core topics like ...` : "Please open a document so I can summarize it.";
//     }
//     if (q.includes("keywords") || q.includes("key points")) {
//       return doc ? `Key points: 1) ... 2) ... 3) ...` : "Open a doc and I'll list the key points.";
//     }
//     if (q.includes("examples") || q.includes("exercise")) {
//       return "Try: 'Show me 3 exercise problems from this doc' — (mock reply).";
//     }
//     return "I'm a mock assistant — plug an actual AI backend to get real answers. Try 'Summarize' or 'Key points'.";
//   };

//   const suggestedPrompts = [
//     "Summarize this document",
//     "List 5 key points",
//     "Extract definitions",
//     "Find formulas or equations",
//     "Create a 5-question quiz",
//   ];

//   /* toolbar functions */
//   const zoomIn = () => setZoom((z) => Math.min(2.2, +(z + 0.1).toFixed(2)));
//   const zoomOut = () => setZoom((z) => Math.max(0.5, +(z - 0.1).toFixed(2)));
//   const rotateCW = () => setRotate((r) => (r + 90) % 360);
//   const openFull = () => {
//     if (!selected) return;
//     window.open(selected.file, "_blank");
//   };

//   /* responsive toggles */
//   const leftPanel = (
//     <motion.aside
//       initial={{ opacity: 0, x: -8 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.18 }}
//       className="w-80 bg-gray-850 text-gray-100 border-r border-gray-800 flex flex-col p-4"
//     >
//       <div className="flex items-center justify-between mb-3">
//         <div className="flex items-center gap-2">
//           <Folder size={18} className="text-green-400" />
//           <h3 className="text-lg font-semibold">Resources</h3>
//         </div>

//         <div className="flex items-center gap-2">
//           <button
//             onClick={handleUploadClick}
//             className="flex items-center gap-2 px-2 py-1 rounded bg-green-600 hover:bg-green-500 text-sm"
//             title="Upload PDF"
//           >
//             <Upload size={14} /> Upload
//           </button>
//         </div>
//       </div>

//       <input
//         ref={fileInputRef}
//         type="file"
//         accept="application/pdf"
//         onChange={handleFileUpload}
//         className="hidden"
//       />

//       <div className="mb-3">
//         <div className="relative">
//           <Search className="absolute left-3 top-3 text-gray-400" size={16} />
//           <input
//             type="text"
//             placeholder="Search notes, tags..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="w-full pl-9 pr-3 py-2 rounded bg-gray-800 border border-gray-700 text-sm focus:outline-none"
//           />
//         </div>
//         <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
//           <span>Filter:</span>
//           <button
//             onClick={() => setFilterTag("")}
//             className={`px-2 py-0.5 rounded ${filterTag === "" ? "bg-green-600 text-white" : "bg-gray-800"}`}
//           >
//             All
//           </button>
//           <button
//             onClick={() => setFilterTag("algorithms")}
//             className={`px-2 py-0.5 rounded ${filterTag === "algorithms" ? "bg-green-600 text-white" : "bg-gray-800"}`}
//           >
//             Algorithms
//           </button>
//           <button
//             onClick={() => setFilterTag("systems")}
//             className={`px-2 py-0.5 rounded ${filterTag === "systems" ? "bg-green-600 text-white" : "bg-gray-800"}`}
//           >
//             Systems
//           </button>
//         </div>
//       </div>

//       <div className="flex-1 overflow-y-auto pr-2">
//         {/* Quick lists */}
//         <div className="mb-3">
//           <h4 className="text-xs text-gray-400 uppercase mb-2">Recently Viewed</h4>
//           <div className="space-y-1">
//             {recent.length === 0 && <div className="text-sm text-gray-500">No recent documents</div>}
//             {recent.map((r) => (
//               <button
//                 key={r.id}
//                 onClick={() => selectNote(r)}
//                 className="flex items-center justify-between w-full p-2 rounded group hover:bg-gray-800"
//               >
//                 <div className="flex items-center gap-2 text-sm">
//                   <FileText size={14} className="text-green-400" />
//                   <div className="text-left">
//                     <div className="truncate w-44">{r.title}</div>
//                     <div className="text-xs text-gray-400">{r.branch} • {r.semester}</div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button onClick={(e) => { e.stopPropagation(); toggleFavorite(r); }}>
//                     <Heart size={14} className={`${r.favorite ? "text-pink-400" : "text-gray-500"} group-hover:opacity-90`} />
//                   </button>
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* File tree */}
//         {Object.keys(branches).map((branch) => (
//           <div key={branch} className="mb-4">
//             <h4 className="text-sm font-semibold mb-2">{branch}</h4>
//             <div className="space-y-2">
//               {Object.keys(branches[branch]).map((sem) => {
//                 const open = !!expanded[`${branch}-${sem}`];
//                 return (
//                   <div key={sem}>
//                     <button
//                       onClick={() => toggleExpand(branch, sem)}
//                       className="flex items-center gap-2 w-full text-left text-sm text-gray-200 hover:text-white"
//                     >
//                       <ChevronRight size={14} className={`transform transition ${open ? 'rotate-90' : ''}`} />
//                       <span>{sem}</span>
//                       <span className="ml-auto text-xs text-gray-400">{branches[branch][sem].length}</span>
//                     </button>

//                     {open && (
//                       <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="ml-5 mt-2 space-y-1">
//                         {branches[branch][sem].map((note) => (
//                           <div key={note.id} className={`flex items-center justify-between p-1 rounded hover:bg-gray-800 ${selected?.id === note.id ? "bg-gray-800" : ""}`}>
//                             <button onClick={() => selectNote({ ...note, branch, semester: sem })} className="flex items-center gap-2 text-left w-full">
//                               <FileText size={14} className="text-green-400" />
//                               <div className="truncate w-48 text-sm">
//                                 <div className="truncate">{note.title}</div>
//                                 <div className="text-xs text-gray-400">{note.size} • {note.uploadedAt}</div>
//                               </div>
//                             </button>

//                             <div className="flex items-center gap-2">
//                               <button onClick={() => toggleFavorite(note)} title="Toggle favorite">
//                                 <Heart size={14} className={`${note.favorite ? "text-pink-400" : "text-gray-500"}`} />
//                               </button>
//                               <a href={note.file} download={note.title} title="Download" onClick={(e)=>e.stopPropagation()}>
//                                 <Download size={14} className="text-gray-400" />
//                               </a>
//                             </div>
//                           </div>
//                         ))}
//                       </motion.div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-3 text-xs text-gray-400">
//         <div className="flex items-center justify-between">
//           <div>Sort</div>
//           <select className="bg-gray-800 px-2 py-1 rounded text-sm" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//             <option value="relevance">Relevance</option>
//             <option value="newest">Newest</option>
//             <option value="popular">Popular</option>
//           </select>
//         </div>
//       </div>
//     </motion.aside>
//   );

//   return (
//     <div className="min-h-screen bg-black text-gray-300">
//       {/* Top controls for mobile */}
//       <div className="lg:hidden flex items-center justify-between p-3 border-b border-gray-800">
//         <div className="flex items-center gap-2">
//           <button onClick={() => setSidebarOpen((s) => !s)} className="p-2 bg-gray-800 rounded">
//             {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
//           </button>
//           <div className="text-sm font-semibold">Campus Hub</div>
//         </div>

//         <div className="flex items-center gap-2">
//           <button onClick={() => setAiOpen((s) => !s)} className="p-2 bg-gray-800 rounded">
//             <MessageSquare size={18} />
//           </button>
//         </div>
//       </div>

//       {/* Main layout */}
//       <div className="hidden lg:flex">
//         {/* Left panel (desktop) */}
//         {leftPanel}
//         {/* Viewer */}
//         <main className="flex-1 p-6">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-4">
//               <h2 className="text-2xl font-semibold">{selected ? selected.title : "Select a document to view"}</h2>
//               {selected && <div className="text-sm text-gray-400">{selected.branch} • {selected.semester}</div>}
//             </div>

//             <div className="flex items-center gap-2 text-sm text-gray-300">
//               <button onClick={zoomOut} className="p-2 rounded bg-gray-800 hover:bg-gray-700" title="Zoom out">
//                 <ZoomOut size={16} />
//               </button>
//               <div className="px-3 py-1 bg-gray-800 rounded text-xs">{Math.round(zoom * 100)}%</div>
//               <button onClick={zoomIn} className="p-2 rounded bg-gray-800 hover:bg-gray-700" title="Zoom in">
//                 <ZoomIn size={16} />
//               </button>

//               <button onClick={rotateCW} className="p-2 rounded bg-gray-800 hover:bg-gray-700" title="Rotate">
//                 <RotateCcw size={16} />
//               </button>

//               <a href={selected?.file} target="_blank" rel="noreferrer" onClick={(e)=>!selected && e.preventDefault()} className="p-2 rounded bg-gray-800 hover:bg-gray-700" title="Open in new tab">
//                 <ExternalLink size={16} />
//               </a>

//               <a href={selected?.file} download={selected?.title} className="p-2 rounded bg-gray-800 hover:bg-gray-700" title="Download">
//                 <Download size={16} />
//               </a>
//             </div>
//           </div>

//           <div className="h-[78vh] bg-gray-900 rounded-lg shadow-inner relative overflow-hidden border border-gray-800">
//             {!selected && (
//               <div className="absolute inset-0 flex items-center justify-center text-gray-500">
//                 <div className="text-center">
//                   <div className="mb-3"><FileText size={48} className="mx-auto text-green-400" /></div>
//                   <div className="text-lg">No document selected</div>
//                   <div className="text-sm text-gray-500">Choose from the left folder or upload a PDF</div>
//                 </div>
//               </div>
//             )}

//             {selected && (
//               <div className="absolute inset-0 p-3">
//                 {/* Viewer toolbar small top-left card with info */}
//                 <div className="flex items-center justify-between mb-2">
//                   <div className="text-xs text-gray-400">{selected.size} • {selected.uploadedAt} • {selected.tags.join(", ")}</div>
//                   <div className="flex items-center gap-2 text-xs">
//                     <button onClick={() => toggleFavorite(selected)} className="flex items-center gap-1 px-2 py-1 rounded bg-gray-800">
//                       <Heart size={14} className={`${selected.favorite ? "text-pink-400" : "text-gray-400"}`} /> {selected.favorite ? "Saved" : "Save"}
//                     </button>
//                     <div className="px-2 py-1 rounded bg-gray-800 text-gray-300 text-xs">Preview</div>
//                   </div>
//                 </div>

//                 {/* Iframe viewer with zoom & rotate wrapper */}
//                 <div className="w-full h-full bg-gray-900 rounded overflow-auto flex items-center justify-center">
//                   <div
//                     ref={viewerRef}
//                     className="transform-origin-center transition-transform shadow-lg"
//                     style={{
//                       transform: `scale(${zoom}) rotate(${rotate}deg)`,
//                       width: "100%",
//                       maxWidth: "100%",
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}
//                   >
//                     <iframe
//                       title={selected.title}
//                       src={`${selected.file}#toolbar=0`}
//                       className="w-[980px] h-[92vh] bg-white rounded"
//                       style={{ border: "0" }}
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </main>

//         {/* Right AI panel (desktop) */}
//         <motion.aside
//           initial={{ opacity: 0, x: 8 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.18 }}
//           className="w-96 bg-gray-850 text-gray-100 border-l border-gray-800 flex flex-col"
//         >
//           <div className="p-4 border-b border-gray-800 flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <MessageSquare size={16} className="text-green-400" /> <span className="font-semibold">BrightBot</span>
//             </div>
//             <div className="text-xs text-gray-400">Document-aware assistant</div>
//           </div>

//           <div className="p-3 flex-1 overflow-y-auto space-y-3">
//             {/* suggested prompts */}
//             <div className="flex gap-2 flex-wrap">
//               {suggestedPrompts.map((p) => (
//                 <button
//                   key={p}
//                   onClick={() => sendMessage(p)}
//                   className="text-xs px-3 py-1 bg-gray-800 rounded hover:bg-gray-700"
//                 >
//                   {p}
//                 </button>
//               ))}
//             </div>

//             {/* Chat messages */}
//             <div className="space-y-2">
//               {messages.map((m, i) => (
//                 <div key={i} className={`p-2 rounded-lg max-w-[85%] ${m.sender === "ai" ? "bg-gray-800 text-gray-200 self-start" : "bg-green-600 text-white self-end ml-auto"}`}>
//                   {m.text}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="p-3 border-t border-gray-800 flex gap-2 items-center">
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder={selected ? "Ask BrightBot about this PDF..." : "Open a doc and ask questions..."}
//               className="flex-1 rounded px-3 py-2 bg-gray-800 border border-gray-700 focus:outline-none text-sm"
//             />
//             <button onClick={() => sendMessage(input)} className="px-3 py-2 rounded bg-green-600 hover:bg-green-500">
//               Send
//             </button>
//           </div>
//         </motion.aside>
//       </div>

//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {Link} from "react-router-dom";
import {
  Menu,
  X,
  Search,
  FileText,
  Folder,
  ChevronRight,
  Download,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Heart,
  Star,
  Clock,
  Upload,
  MessageSquare,
  MoreHorizontal,
  Book,
  GraduationCap,
} from "lucide-react";

/**
 * Resource.jsx
 * Dark-themed, responsive resources page with file-tree, inline PDF viewer,
 * AI assistant, upload, favorites, recent, tags, zoom/rotate toolbar, mobile drawers.
 */

/* ---------------------------
   Mock data (replace with API)
   --------------------------- */
const initialBranches = {
  "Computer Science": {
    "Semester 5": [
      {
        id: "cs-algo",
        title: "Algorithms - Notes",
        file: "/Height-&-Distance.pdf",
        tags: ["algorithms", "theory"],
        favorite: false,
        uploadedAt: "2024-09-01",
        size: "1.2MB",
        desc: "Comprehensive algorithm notes with proofs & examples.",
      },
      {
        id: "cs-os",
        title: "Operating Systems - Lecture Notes",
        file: "/pdfs/os.pdf",
        tags: ["os", "systems"],
        favorite: true,
        uploadedAt: "2024-09-10",
        size: "2.1MB",
        desc: "Process scheduling, memory management, and concurrency.",
      },
    ],
    "Semester 6": [
      {
        id: "cs-dbms",
        title: "DBMS - Past Notes",
        file: "/DBMS!.pdf",
        tags: ["databases"],
        favorite: false,
        uploadedAt: "2024-08-22",
        size: "900KB",
        desc: "ER models, normalization, SQL queries, transactions.",
      },
    ],
  },
  Mechanical: {
    "Semester 5": [
      {
        id: "mech-thermo",
        title: "Thermodynamics - Quick Guide",
        file: "/pdfs/thermo.pdf",
        tags: ["thermo"],
        favorite: false,
        uploadedAt: "2024-07-02",
        size: "1.6MB",
        desc: "Main concepts, laws, and solved examples.",
      },
    ],
  },
  "Books Library": {
    Textbooks: [
      {
        id: "book-algo",
        title: "Introduction to Algorithms",
        file: "/pdfs/algo-book.pdf",
        tags: ["algorithms", "textbook"],
        favorite: true,
        uploadedAt: "2024-09-15",
        size: "5.2MB",
        desc: "CLRS - Comprehensive algorithms textbook.",
      },
      {
        id: "book-os",
        title: "Operating System Concepts",
        file: "/pdfs/os-book.pdf",
        tags: ["os", "textbook"],
        favorite: false,
        uploadedAt: "2024-09-12",
        size: "4.8MB",
        desc: "Silberschatz, Galvin, and Gagne - OS textbook.",
      },
    ],
    "Reference Books": [
      {
        id: "book-db",
        title: "Database System Concepts",
        file: "/pdfs/db-book.pdf",
        tags: ["database", "reference"],
        favorite: true,
        uploadedAt: "2024-09-10",
        size: "3.9MB",
        desc: "Database concepts and implementation guide.",
      },
    ],
  },
};

/* ---------------------------
   Helper utilities
   --------------------------- */
const flattenNotes = (branches) => {
  const arr = [];
  for (const branch of Object.keys(branches)) {
    for (const sem of Object.keys(branches[branch])) {
      for (const note of branches[branch][sem]) {
        arr.push({
          ...note,
          branch,
          semester: sem,
        });
      }
    }
  }
  return arr;
};

/* ---------------------------
   Main Component
   --------------------------- */
export default function NotesList() {
  const [branches, setBranches] = useState(initialBranches);
  const [expanded, setExpanded] = useState({});
  const [selected, setSelected] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi, I'm CampusBot — ask me anything about the open document.",
    },
  ]);
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [recent, setRecent] = useState([]);
  const fileInputRef = useRef(null);
  const viewerRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const allNotes = flattenNotes(branches)
    .filter((n) =>
      (n.title + " " + (n.desc || "") + " " + n.tags.join(" "))
        .toLowerCase()
        .includes(query.toLowerCase())
    )
    .filter((n) => (filterTag ? n.tags.includes(filterTag) : true));

  const toggleExpand = (branch, sem) => {
    const key = `${branch}-${sem}`;
    setExpanded((p) => ({ ...p, [key]: !p[key] }));
  };

  const selectNote = (note) => {
    setSelected(note);
    setSidebarOpen(false);
    setAiOpen(false); // Close AI on mobile when selecting note
    setZoom(1);
    setRotate(0);
    setRecent((prev) => {
      const filtered = prev.filter((r) => r.id !== note.id);
      return [note, ...filtered].slice(0, 6);
    });
  };

  const toggleFavorite = (note) => {
    setBranches((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      for (const b of Object.keys(copy)) {
        for (const s of Object.keys(copy[b])) {
          copy[b][s] = copy[b][s].map((it) =>
            it.id === note.id ? { ...it, favorite: !it.favorite } : it
          );
        }
      }
      return copy;
    });
  };

  const handleUploadClick = () => fileInputRef.current?.click();
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setBranches((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const branch = "Uploads";
      const sem = "My Files";
      if (!copy[branch]) copy[branch] = {};
      if (!copy[branch][sem]) copy[branch][sem] = [];
      const id = `upload-${Date.now()}`;
      copy[branch][sem].unshift({
        id,
        title: file.name,
        file: url,
        tags: ["uploaded"],
        favorite: false,
        uploadedAt: new Date().toISOString().slice(0, 10),
        size: `${(file.size / (1024 * 1024)).toFixed(2)}MB`,
        desc: "Uploaded from device",
      });
      return copy;
    });
    e.target.value = "";
  };

  const sendMessage = (text) => {
    if (!text?.trim()) return;
    const userMsg = { sender: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTimeout(() => {
      const docHint = selected ? ` (based on: ${selected.title})` : "";
      const aiText = mockAiReply(text, selected);
      setMessages((m) => [
        ...m,
        userMsg,
        { sender: "ai", text: aiText + docHint },
      ]);
    }, 700);
  };

  const mockAiReply = (text, doc) => {
    const q = text.toLowerCase();
    if (q.includes("summar") || q.includes("tl;dr")) {
      return doc
        ? `Summary: This document covers ${doc.tags.join(
            ", "
          )} and core topics like ...`
        : "Please open a document so I can summarize it.";
    }
    if (q.includes("keywords") || q.includes("key points")) {
      return doc
        ? `Key points: 1) ... 2) ... 3) ...`
        : "Open a doc and I'll list the key points.";
    }
    if (q.includes("examples") || q.includes("exercise")) {
      return "Try: 'Show me 3 exercise problems from this doc' — (mock reply).";
    }
    return "I'm a mock assistant — plug an actual AI backend to get real answers. Try 'Summarize' or 'Key points'.";
  };

  const suggestedPrompts = [
    "Summarize this document",
    "List 5 key points",
    "Extract definitions",
    "Find formulas or equations",
    "Create a 5-question quiz",
  ];

  const zoomIn = () => setZoom((z) => Math.min(2.2, +(z + 0.1).toFixed(2)));
  const zoomOut = () => setZoom((z) => Math.max(0.5, +(z - 0.1).toFixed(2)));
  const rotateCW = () => setRotate((r) => (r + 90) % 360);

  // Mobile left panel component
  const MobileLeftPanel = () => (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="fixed inset-0 z-50 bg-gray-900 text-gray-100 flex flex-col p-4"
    >
      {/* Mobile header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Folder size={20} className="text-blue-400" />
          <h3 className="text-lg font-semibold">Resources</h3>
        </div>
        <button onClick={() => setSidebarOpen(false)} className="p-2">
          <X size={20} />
        </button>
      </div>

      {/* Search and filters */}
      <div className="mb-4">
        <div className="relative mb-2">
          <Search className="absolute left-3 top-3 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search notes, tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded bg-gray-800 border border-gray-700 text-sm focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 overflow-x-auto pb-2">
          <span>Filter:</span>
          <button
            onClick={() => setFilterTag("")}
            className={`px-2 py-1 rounded whitespace-nowrap ${
              filterTag === ""
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                : "bg-gray-800"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterTag("algorithms")}
            className={`px-2 py-1 rounded whitespace-nowrap ${
              filterTag === "algorithms"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                : "bg-gray-800"
            }`}
          >
            Algorithms
          </button>
          <button
            onClick={() => setFilterTag("textbook")}
            className={`px-2 py-1 rounded whitespace-nowrap ${
              filterTag === "textbook"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                : "bg-gray-800"
            }`}
          >
            Textbooks
          </button>
        </div>
      </div>

      {/* Upload button for mobile */}
      <button
        onClick={handleUploadClick}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-sm mb-4"
      >
        <Upload size={16} /> Upload PDF
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Recently Viewed */}
        <div className="mb-4">
          <h4 className="text-xs text-gray-400 uppercase mb-2">
            Recently Viewed
          </h4>
          <div className="space-y-2">
            {recent.length === 0 && (
              <div className="text-sm text-gray-500 text-center py-2">
                No recent documents
              </div>
            )}
            {recent.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  selectNote(r);
                  setSidebarOpen(false);
                }}
                className="flex items-center justify-between w-full p-3 rounded-lg bg-gray-800 hover:bg-gray-700"
              >
                <div className="flex items-center gap-3 text-sm flex-1 min-w-0">
                  {r.branch === "Books Library" ? (
                    <Book size={16} className="text-indigo-400 flex-shrink-0" />
                  ) : (
                    <FileText
                      size={16}
                      className="text-blue-400 flex-shrink-0"
                    />
                  )}
                  <div className="text-left flex-1 min-w-0">
                    <div className="truncate font-medium">{r.title}</div>
                    <div className="text-xs text-gray-400 truncate">
                      {r.branch} • {r.semester}
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(r);
                  }}
                  className="ml-2 flex-shrink-0"
                >
                  <Heart
                    size={16}
                    className={`${
                      r.favorite ? "text-pink-400" : "text-gray-500"
                    }`}
                  />
                </button>
              </button>
            ))}
          </div>
        </div>

        {/* File tree */}
        <div className="space-y-4">
          {Object.keys(branches).map((branch) => (
            <div key={branch}>
              <div className="flex items-center gap-2 mb-2">
                {branch === "Books Library" ? (
                  <Book size={18} className="text-indigo-400" />
                ) : (
                  <GraduationCap size={18} className="text-blue-400" />
                )}
                <h4 className="text-sm font-semibold">{branch}</h4>
              </div>
              <div className="space-y-2">
                {Object.keys(branches[branch]).map((sem) => {
                  const open = !!expanded[`${branch}-${sem}`];
                  return (
                    <div key={sem}>
                      <button
                        onClick={() => toggleExpand(branch, sem)}
                        className="flex items-center gap-2 w-full text-left text-sm text-gray-200 hover:text-white p-2 rounded bg-gray-800"
                      >
                        <ChevronRight
                          size={16}
                          className={`transform transition ${
                            open ? "rotate-90" : ""
                          }`}
                        />
                        <span className="flex-1">{sem}</span>
                        <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                          {branches[branch][sem].length}
                        </span>
                      </button>

                      {open && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="ml-4 mt-2 space-y-2"
                        >
                          {branches[branch][sem].map((note) => (
                            <button
                              key={note.id}
                              onClick={() => {
                                selectNote({ ...note, branch, semester: sem });
                                setSidebarOpen(false);
                              }}
                              className={`flex items-center justify-between w-full p-3 rounded-lg ${
                                selected?.id === note.id
                                  ? "bg-blue-900/20 border border-blue-700/50"
                                  : "bg-gray-800 hover:bg-gray-700"
                              }`}
                            >
                              <div className="flex items-center gap-3 text-sm flex-1 min-w-0">
                                {branch === "Books Library" ? (
                                  <Book
                                    size={16}
                                    className="text-indigo-400 flex-shrink-0"
                                  />
                                ) : (
                                  <FileText
                                    size={16}
                                    className="text-blue-400 flex-shrink-0"
                                  />
                                )}
                                <div className="text-left flex-1 min-w-0">
                                  <div className="truncate font-medium">
                                    {note.title}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    {note.size} • {note.uploadedAt}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(note);
                                  }}
                                >
                                  <Heart
                                    size={14}
                                    className={`${
                                      note.favorite
                                        ? "text-pink-400"
                                        : "text-gray-500"
                                    }`}
                                  />
                                </button>
                                <a
                                  href={note.file}
                                  download={note.title}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Download
                                    size={14}
                                    className="text-gray-400"
                                  />
                                </a>
                              </div>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  // Mobile AI panel component
  const MobileAIPanel = () => (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="fixed inset-0 z-50 bg-gray-900 text-gray-100 flex flex-col"
    >
      {/* Mobile AI header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between bg-gradient-to-r from-blue-900/30 to-indigo-900/30">
        <div className="flex items-center gap-2">
          <MessageSquare size={18} className="text-blue-400" />
          <span className="font-semibold">CampusBot</span>
        </div>
        <button onClick={() => setAiOpen(false)} className="p-2">
          <X size={18} />
        </button>
      </div>

      {/* Chat content */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-3 space-y-3"
      >
        <div className="flex gap-2 flex-wrap">
          {suggestedPrompts.map((p) => (
            <button
              key={p}
              onClick={() => sendMessage(p)}
              className="text-xs px-3 py-2 bg-gradient-to-r from-blue-600/80 to-indigo-600/80 rounded hover:from-blue-500 hover:to-indigo-500 transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg max-w-[85%] ${
                m.sender === "ai"
                  ? "bg-gray-800 text-gray-200 self-start"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white self-end ml-auto"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>
      </div>

      {/* Input area */}
      <div className="p-3 border-t border-gray-700 flex gap-2 items-center">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            selected
              ? "Ask about this PDF..."
              : "Open a doc to ask questions..."
          }
          className="flex-1 rounded px-3 py-2 bg-gray-800 border border-gray-700 focus:outline-none text-sm"
          onKeyPress={(e) => e.key === "Enter" && sendMessage(input)}
        />
        <button
          onClick={() => sendMessage(input)}
          className="px-3 py-2 rounded bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-colors"
        >
          Send
        </button>
      </div>
    </motion.div>
  );

  // Desktop left panel component
  const DesktopLeftPanel = () => (
    <motion.aside
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0 }}
      className="w-80 bg-gray-850 text-gray-100 border-r border-gray-800 flex flex-col p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Folder size={18} className="text-blue-400" />
          <h3 className="text-lg font-semibold">Resources</h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleUploadClick}
            className="flex items-center gap-2 px-2 py-1 rounded bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-sm"
            title="Upload PDF"
          >
            <Upload size={14} /> Upload
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileUpload}
        className="hidden"
      />

      <div className="mb-3">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search notes, tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded bg-gray-800 border border-gray-700 text-sm focus:outline-none"
          />
        </div>
        {/* <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
          <span>Filter:</span>
          <button
            onClick={() => setFilterTag("")}
            className={`px-2 py-0.5 rounded ${
              filterTag === ""
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                : "bg-gray-800"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterTag("algorithms")}
            className={`px-2 py-0.5 rounded ${
              filterTag === "algorithms"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                : "bg-gray-800"
            }`}
          >
            Algorithms
          </button>
          <button
            onClick={() => setFilterTag("textbook")}
            className={`px-2 py-0.5 rounded ${
              filterTag === "textbook"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                : "bg-gray-800"
            }`}
          >
            Textbooks
          </button>
        </div> */}
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        {/* Quick lists */}
        <div className="mb-3">
          <h4 className="text-xs text-gray-400 uppercase mb-2">
            Recently Viewed
          </h4>
          <div className="space-y-1">
            {recent.length === 0 && (
              <div className="text-sm text-gray-500">No recent documents</div>
            )}
            {recent.map((r) => (
              <button
                key={r.id}
                onClick={() => selectNote(r)}
                className="flex items-center justify-between w-full p-2 rounded group hover:bg-gray-800"
              >
                <div className="flex items-center gap-2 text-sm">
                  {r.branch === "Books Library" ? (
                    <Book size={14} className="text-indigo-400" />
                  ) : (
                    <FileText size={14} className="text-blue-400" />
                  )}
                  <div className="text-left">
                    <div className="truncate w-44">{r.title}</div>
                    <div className="text-xs text-gray-400">
                      {r.branch} • {r.semester}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(r);
                    }}
                  >
                    <Heart
                      size={14}
                      className={`${
                        r.favorite ? "text-pink-400" : "text-gray-500"
                      } group-hover:opacity-90`}
                    />
                  </button>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* File tree */}
        {Object.keys(branches).map((branch) => (
          <div key={branch} className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              {branch === "Books Library" ? (
                <Book size={16} className="text-indigo-400" />
              ) : (
                <GraduationCap size={16} className="text-blue-400" />
              )}
              <h4 className="text-sm font-semibold">{branch}</h4>
            </div>
            <div className="space-y-2">
              {Object.keys(branches[branch]).map((sem) => {
                const open = !!expanded[`${branch}-${sem}`];
                return (
                  <div key={sem}>
                    <button
                      onClick={() => toggleExpand(branch, sem)}
                      className="flex items-center gap-2 w-full text-left text-sm text-gray-200 hover:text-white"
                    >
                      <ChevronRight
                        size={14}
                        className={`transform transition ${
                          open ? "rotate-90" : ""
                        }`}
                      />
                      <span>{sem}</span>
                      <span className="ml-auto text-xs text-gray-400">
                        {branches[branch][sem].length}
                      </span>
                    </button>

                    {open && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="ml-5 mt-2 space-y-1"
                      >
                        {branches[branch][sem].map((note) => (
                          <div
                            key={note.id}
                            className={`flex items-center justify-between p-1 rounded hover:bg-gray-800 ${
                              selected?.id === note.id ? "bg-gray-800" : ""
                            }`}
                          >
                            <button
                              onClick={() =>
                                selectNote({ ...note, branch, semester: sem })
                              }
                              className="flex items-center gap-2 text-left w-full"
                            >
                              {branch === "Books Library" ? (
                                <Book size={14} className="text-indigo-400" />
                              ) : (
                                <FileText size={14} className="text-blue-400" />
                              )}
                              <div className="truncate w-48 text-sm">
                                <div className="truncate">{note.title}</div>
                                <div className="text-xs text-gray-400">
                                  {note.size} • {note.uploadedAt}
                                </div>
                              </div>
                            </button>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => toggleFavorite(note)}
                                title="Toggle favorite"
                              >
                                <Heart
                                  size={14}
                                  className={`${
                                    note.favorite
                                      ? "text-pink-400"
                                      : "text-gray-500"
                                  }`}
                                />
                              </button>
                              <a
                                href={note.file}
                                download={note.title}
                                title="Download"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Download size={14} className="text-gray-400" />
                              </a>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* <div className="mt-3 text-xs text-gray-400">
        <div className="flex items-center justify-between">
          <div>Sort</div>
          <select
            className="bg-gray-800 px-2 py-1 rounded text-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="relevance">Relevance</option>
            <option value="newest">Newest</option>
            <option value="popular">Popular</option>
          </select>
        </div>
      </div> */}
    </motion.aside>
  );

  return (
    <div className="min-h-screen bg-black text-gray-300">
      {/* Campus Hub Header */}
      <div className="bg-gradient-to-r from-gray-900  to-black border-b border-indigo-700 py-4 px-6">
        <Link to="/">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                <GraduationCap size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Campus Hub</h1>
                {/* <p className="text-blue-200 text-sm">Academic Resources & Learning Platform</p> */}
              </div>
            </div>
            {/* <div className="hidden md:flex items-center gap-4 text-blue-200">
            <div className="text-right">
              <div className="font-semibold">Welcome back, Student!</div>
              <div className="text-xs">Access your resources below</div>
            </div>
          </div> */}
          </div>
        </Link>
      </div>

      {/* Mobile controls */}
      <div className="lg:hidden flex items-center justify-between p-3 border-b border-gray-800 bg-gray-900">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 p-2 rounded bg-gray-800 hover:bg-gray-700"
        >
          <Menu size={18} />
          <span>Resources</span>
        </button>

        <div className="flex items-center gap-2">
          {selected && (
            <button
              onClick={() => toggleFavorite(selected)}
              className="p-2 rounded bg-gray-800 hover:bg-gray-700"
            >
              <Heart
                size={18}
                className={
                  selected.favorite ? "text-pink-400" : "text-gray-400"
                }
              />
            </button>
          )}
          <button
            onClick={() => setAiOpen(true)}
            className="flex items-center gap-2 p-2 rounded bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
          >
            <MessageSquare size={18} />
            <span>AI Assist</span>
          </button>
        </div>
      </div>

      {/* Mobile overlays */}
      <AnimatePresence>{sidebarOpen && <MobileLeftPanel />}</AnimatePresence>

      <AnimatePresence>{aiOpen && <MobileAIPanel />}</AnimatePresence>

      {/* Main layout for desktop */}
      <div className="hidden lg:flex">
        {/* Left panel (desktop) */}
        <DesktopLeftPanel />

        {/* Viewer */}
        {/* <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-semibold">
                {selected ? selected.title : "Select a document to view"}
              </h2>
              {selected && (
                <div className="text-sm text-gray-400">
                  {selected.branch} • {selected.semester}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-300">
              <button
                onClick={zoomOut}
                className="p-2 rounded bg-gray-800 hover:bg-gray-700"
                title="Zoom out"
              >
                <ZoomOut size={16} />
              </button>
              <div className="px-3 py-1 bg-gray-800 rounded text-xs">
                {Math.round(zoom * 100)}%
              </div>
              <button
                onClick={zoomIn}
                className="p-2 rounded bg-gray-800 hover:bg-gray-700"
                title="Zoom in"
              >
                <ZoomIn size={16} />
              </button>

              <button
                onClick={rotateCW}
                className="p-2 rounded bg-gray-800 hover:bg-gray-700"
                title="Rotate"
              >
                <RotateCcw size={16} />
              </button>

              <a
                href={selected?.file}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => !selected && e.preventDefault()}
                className="p-2 rounded bg-gray-800 hover:bg-gray-700"
                title="Open in new tab"
              >
                <ExternalLink size={16} />
              </a>

              <a
                href={selected?.file}
                download={selected?.title}
                className="p-2 rounded bg-gray-800 hover:bg-gray-700"
                title="Download"
              >
                <Download size={16} />
              </a>
            </div>
          </div>

          <div className="h-[78vh] bg-gray-900 rounded-lg shadow-inner relative overflow-hidden border border-gray-800">
            {!selected && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="mb-3">
                    <FileText size={48} className="mx-auto text-blue-400" />
                  </div>
                  <div className="text-lg">No document selected</div>
                  <div className="text-sm text-gray-500">
                    Choose from the left folder or upload a PDF
                  </div>
                </div>
              </div>
            )}

            {selected && (
              <div className="absolute inset-0 p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-gray-400">
                    {selected.size} • {selected.uploadedAt} •{" "}
                    {selected.tags.join(", ")}
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      onClick={() => toggleFavorite(selected)}
                      className="flex items-center gap-1 px-2 py-1 rounded bg-gray-800"
                    >
                      <Heart
                        size={14}
                        className={`${
                          selected.favorite ? "text-pink-400" : "text-gray-400"
                        }`}
                      />{" "}
                      {selected.favorite ? "Saved" : "Save"}
                    </button>
                    <div className="px-2 py-1 rounded bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs">
                      Preview
                    </div>
                  </div>
                </div>

                <div className="w-full h-full bg-gray-900 rounded overflow-auto flex items-center justify-center">
                  <div
                    ref={viewerRef}
                    className="transform-origin-center transition-transform shadow-lg"
                    style={{
                      transform: `scale(${zoom}) rotate(${rotate}deg)`,
                      width: "100%",
                      maxWidth: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <iframe
                      title={selected.title}
                      src={`${selected.file}#toolbar=0`}
                      className="w-[980px] h-[92vh] bg-white rounded"
                      style={{ border: "0" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </main> */}

        <main className="flex-1 p-6">
  {/* Top Controls */}
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-4">
      <h2 className="text-2xl font-semibold">
        {selected ? selected.title : "Select a document to view"}
      </h2>
      {selected && (
        <div className="text-sm text-gray-400">
          {selected.branch} • {selected.semester}
        </div>
      )}
    </div>

    <div className="flex items-center gap-2 text-sm text-gray-300">
      <button
        onClick={zoomOut}
        className="p-2 rounded bg-gray-800 hover:bg-gray-700"
        title="Zoom out"
      >
        <ZoomOut size={16} />
      </button>
      <div className="px-3 py-1 bg-gray-800 rounded text-xs">
        {Math.round(zoom * 100)}%
      </div>
      <button
        onClick={zoomIn}
        className="p-2 rounded bg-gray-800 hover:bg-gray-700"
        title="Zoom in"
      >
        <ZoomIn size={16} />
      </button>

      <button
        onClick={rotateCW}
        className="p-2 rounded bg-gray-800 hover:bg-gray-700"
        title="Rotate"
      >
        <RotateCcw size={16} />
      </button>

      <a
        href={selected?.file}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => !selected && e.preventDefault()}
        className="p-2 rounded bg-gray-800 hover:bg-gray-700"
        title="Open in new tab"
      >
        <ExternalLink size={16} />
      </a>

      <a
        href={selected?.file}
        download={selected?.title}
        className="p-2 rounded bg-gray-800 hover:bg-gray-700"
        title="Download"
      >
        <Download size={16} />
      </a>
    </div>
  </div>

  {/* Document Viewer */}
  <div className="h-[78vh] bg-gray-900 rounded-lg shadow-inner relative overflow-hidden border border-gray-800">
    {!selected && (
      <div className="absolute inset-0 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <div className="mb-3">
            <FileText size={48} className="mx-auto text-blue-400" />
          </div>
          <div className="text-lg">No document selected</div>
          <div className="text-sm text-gray-500">
            Choose from the left folder or upload a PDF
          </div>
        </div>
      </div>
    )}

    {selected && (
      <div className="absolute inset-0 p-3">
        {/* Info Row */}
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs text-gray-400">
            {selected.size} • {selected.uploadedAt} •{" "}
            {selected.tags.join(", ")}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => toggleFavorite(selected)}
              className="flex items-center gap-1 px-2 py-1 rounded bg-gray-800"
            >
              <Heart
                size={14}
                className={`${
                  selected.favorite ? "text-pink-400" : "text-gray-400"
                }`}
              />{" "}
              {selected.favorite ? "Saved" : "Save"}
            </button>
            <div className="px-2 py-1 rounded bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs">
              Preview
            </div>
          </div>
        </div>

        {/* PDF Frame */}
        <div className="w-full h-full bg-gray-900 rounded overflow-hidden flex items-center justify-center">
          <div
            ref={viewerRef}
            className="transform-origin-center transition-transform shadow-lg flex justify-center items-center w-full"
            style={{
              transform: `scale(${zoom}) rotate(${rotate}deg)`,
            }}
          >
            <iframe
              title={selected.title}
              src={`${selected.file}#toolbar=0`}
              className="w-full sm:w-[720px] md:w-[820px] lg:w-[900px] h-[92vh] bg-white rounded no-scrollbar"
              style={{
                border: "0",
                overflow: "hidden",
              }}
            />
          </div>
        </div>
      </div>
    )}
  </div>
</main>


        {/* Right AI panel (desktop) */}
        <motion.aside
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.18 }}
          className="w-96 bg-gray-850 text-gray-100 border-l border-gray-800 flex flex-col"
        >
          <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-gradient-to-r from-blue-900/30 to-indigo-900/30">
            <div className="flex items-center gap-2">
              <MessageSquare size={16} className="text-blue-400" />
              <span className="font-semibold">CampusBot</span>
            </div>
            <div className="text-xs text-blue-300">
              Document-aware assistant
            </div>
          </div>

          <div
            ref={chatContainerRef}
            className="p-3 flex-1 overflow-y-auto space-y-3 max-h-[calc(100vh-200px)]"
          >
            <div className="flex gap-2 flex-wrap">
              {suggestedPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => sendMessage(p)}
                  className="text-xs px-3 py-1 bg-gradient-to-r from-blue-600/80 to-indigo-600/80 rounded hover:from-blue-500 hover:to-indigo-500 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg max-w-[90%] ${
                    m.sender === "ai"
                      ? "bg-gray-800 text-gray-200 self-start"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white self-end ml-auto"
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 border-t border-gray-800 flex gap-2 items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                selected
                  ? "Ask CampusBot about this PDF..."
                  : "Open a doc and ask questions..."
              }
              className="flex-1 rounded px-3 py-2 bg-gray-800 border border-gray-700 focus:outline-none text-sm"
              onKeyPress={(e) => e.key === "Enter" && sendMessage(input)}
            />
            <button
              onClick={() => sendMessage(input)}
              className="px-3 py-2 rounded bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-colors"
            >
              Send
            </button>
          </div>
        </motion.aside>
      </div>

      {/* Mobile main content */}
      <div className="lg:hidden p-4">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">
            {selected ? selected.title : "Welcome to Campus Hub"}
          </h2>
          {selected && (
            <div className="text-sm text-gray-400 mb-3">
              {selected.branch} • {selected.semester} • {selected.size}
            </div>
          )}
        </div>

        <div className="h-[60vh] bg-gray-900 rounded-lg relative overflow-hidden border border-gray-800">
          {!selected && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              <div className="text-center p-4">
                <div className="mb-3">
                  <FileText size={48} className="mx-auto text-blue-400" />
                </div>
                <div className="text-lg">No document selected</div>
                <div className="text-sm text-gray-500 mt-2">
                  Tap the Resources button to browse files or use AI Assist for
                  help
                </div>
              </div>
            </div>
          )}

          {selected && (
            <div className="absolute inset-0">
              <div className="w-full h-full bg-gray-900 rounded overflow-auto flex items-center justify-center p-2">
                <iframe
                  title={selected.title}
                  src={`${selected.file}#toolbar=0`}
                  className="w-full h-full bg-white rounded"
                  style={{ border: "0" }}
                />
              </div>
            </div>
          )}
        </div>

        {selected && (
          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              onClick={zoomOut}
              className="p-3 rounded bg-gray-800 hover:bg-gray-700"
              title="Zoom out"
            >
              <ZoomOut size={18} />
            </button>
            <div className="px-4 py-2 bg-gray-800 rounded text-sm">
              {Math.round(zoom * 100)}%
            </div>
            <button
              onClick={zoomIn}
              className="p-3 rounded bg-gray-800 hover:bg-gray-700"
              title="Zoom in"
            >
              <ZoomIn size={18} />
            </button>
            <a
              href={selected.file}
              download={selected.title}
              className="p-3 rounded bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
            >
              <Download size={18} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
