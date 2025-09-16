import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BranchCards = () => {
  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState(null);

  const subjectGroups = [
    ["CSE", "ECE", "ME", "CE", "EE", "BT", "CHE", "IT"],
    ["Finance", "HR", "Marketing", "Operations", "Strategy", "Analytics"],
    ["History", "Geography", "Political", "Economics", "Psychology", "Sociology"],
    ["New1", "New2", "New3", "New4", "New5", "New6"],
  ];

  const headings = ["Bachelor of Technology", "Management", "Arts", "Coming Soon"];

  // Glassmorphism card backgrounds
  const cardBackgrounds = [
    "backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl",
    "backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl",
    "backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl",
    "backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl",
  ];

  // Glassmorphism circle buttons
  const circleStyle =
    "backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.08)]";

  const Card = ({ heading, bg, subjects }) => (
    <div className="w-full flex flex-col items-center">
   <h2
  className="text-3xl tracking-wide font-semibold mb-6 text-center 
             bg-gradient-to-r from-white via-sky-300 via-purple-400 to-indigo-500 
             bg-clip-text text-transparent"
>
  {heading}
</h2>

      <div className={`relative rounded-3xl ${bg} w-full p-10 flex flex-col items-center`}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
          {subjects.map((subject) => (
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              key={subject}
              onClick={() => setSelectedBranch(subject)}
              className={`flex items-center justify-center w-24 h-24 rounded-full text-white font-medium shadow-lg transition-all duration-300 ${circleStyle}`}
            >
              {subject}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );

  const handleSemesterClick = (semester) => {
    navigate(`/pyqs/list?branch=${selectedBranch}&semester=${semester}`);
    setSelectedBranch(null); // close modal
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-[#0b0b12] to-black py-20 flex flex-col items-center space-y-20">
      {/* Subtle glow background accents */}
        {/* Glow background accents */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />

      <div className="w-full max-w-6xl mx-auto">
        <Card heading={headings[0]} bg={cardBackgrounds[0]} subjects={subjectGroups[0]} />
      </div>
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto gap-12">
        <div className="flex-1">
          <Card heading={headings[1]} bg={cardBackgrounds[1]} subjects={subjectGroups[1]} />
        </div>
        <div className="flex-1">
          <Card heading={headings[2]} bg={cardBackgrounds[2]} subjects={subjectGroups[2]} />
        </div>
      </div>
      <div className="w-full max-w-6xl mx-auto">
        <Card heading={headings[3]} bg={cardBackgrounds[3]} subjects={subjectGroups[3]} />
      </div>

      {/* Semester Modal */}
      <AnimatePresence>
        {selectedBranch && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/5 backdrop-blur-2xl rounded-3xl p-10 max-w-md w-full border border-white/10 shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h3 className="text-2xl text-white font-semibold mb-6 text-center">
                Select Semester ({selectedBranch})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={i}
                    onClick={() => handleSemesterClick(i + 1)}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-medium rounded-lg py-3 text-center shadow-md transition-all"
                  >
                    Sem {i + 1}
                  </motion.button>
                ))}
              </div>
              <button
                onClick={() => setSelectedBranch(null)}
                className="mt-6 w-full backdrop-blur-xl bg-white/5 border border-white/10 text-white py-2 rounded-lg hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BranchCards;
