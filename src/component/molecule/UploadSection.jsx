// import { useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import { motion } from "framer-motion";

// const UploadSection = () => {
//   const onDrop = useCallback((acceptedFiles) => {
//     console.log("Uploaded files:", acceptedFiles);
//     // You can send files to backend here
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: { "application/pdf": [".pdf"] },
//   });

//   return (
//     <section className="relative max-w-6xl mx-auto bg-gradient-to-br from-[#1c0f4e] via-[#1a0b3e] to-[#0b0520] text-white rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden">
//       {/* Floating gradient shapes like Loom */}
//       <div className="absolute -top-16 -left-16 w-60 h-60 bg-gradient-to-br from-purple-500/40 to-pink-500/40 rounded-full blur-3xl" />
//       <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-br from-indigo-500/40 to-blue-500/40 rounded-full blur-3xl" />

//       {/* Left: Drag and Drop Upload */}
//       <motion.div
//         initial={{ x: -50, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.8 }}
//         {...getRootProps()}
//         className={`flex-1 min-h-[300px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition ${
//           isDragActive
//             ? "border-purple-400 bg-purple-400/10"
//             : "border-white/20 bg-white/5"
//         }`}
//       >
//         <input {...getInputProps()} />
//         <div className="text-center px-6">
//           <h3 className="text-xl font-semibold mb-2">Upload your PDFs</h3>
//           <p className="text-sm text-gray-300">
//             Drag & drop files here, or click to browse
//           </p>
//         </div>
//       </motion.div>

//       {/* Right: Text content */}
//       <motion.div
//         initial={{ x: 50, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.8 }}
//         className="flex-1"
//       >
//         <p className="text-indigo-300 text-sm mb-2">Try it now ✨</p>
//         <h2 className="text-3xl md:text-4xl font-bold mb-4">
//           Upload & Access Your <span className="text-purple-400">PDFs</span>
//         </h2>
//         <p className="text-gray-300 mb-6">
//           Quickly upload your question papers, notes, or documents. 
//           Access them anytime in one place. Try the upload feature now 
//           and experience the smooth workflow.
//         </p>
//         <button className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 rounded-full font-medium hover:opacity-90 transition">
//           Get Started
//         </button>
//       </motion.div>
//     </section>
//   );
// };

// export default UploadSection;

// we preserve above just fro its background op
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";

const UploadSection = () => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log("Uploaded files:", acceptedFiles);
    // You can send files to backend here
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
  });

  return (
    <section className="relative max-w-7xl mx-auto min-h-[500px] bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-50 text-gray-900 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden shadow-lg">
      {/* Floating gradient blobs */}
      <div className="absolute -top-16 -left-16 w-60 h-60 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl" />

      {/* Left: Drag and Drop Upload */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        {...getRootProps()}
        className={`flex-1 min-h-[320px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition ${
          isDragActive
            ? "border-indigo-500 bg-indigo-100/50"
            : "border-gray-300 bg-white/60"
        }`}
      >
        <input {...getInputProps()} />
        <div className="text-center px-6">
          <h3 className="text-xl font-semibold mb-2">Upload your PDFs</h3>
          <p className="text-sm text-gray-600">
            Drag & drop files here, or click to browse
          </p>
        </div>
      </motion.div>

      {/* Right: Text content */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-1"
      >
        <p className="text-indigo-600 text-sm mb-2">Try it now ✨</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Upload & Access Your <span className="text-purple-600">PDFs</span>
        </h2>
        <p className="text-gray-700 mb-6 text-lg font-semibold">
          Quickly upload your question papers, notes, or documents. 
          Access them anytime in one place. Try the upload feature now 
          and experience the smooth workflow.
        </p>
        <button className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 rounded-full font-medium text-white hover:opacity-90 transition">
          Get Started
        </button>
      </motion.div>
    </section>
  );
};

export default UploadSection;
