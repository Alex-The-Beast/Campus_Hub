// src/components/organism/BranchCards.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BranchCards = () => {
  // subject groups
  const subjectGroups = [
    ["CSE", "ECE", "ME", "CE", "EE", "BT", "CHE", "IT"], // B-Tech
    ["Finance", "HR", "Marketing", "Operations", "Strategy", "Analytics"], // Management
    ["History", "Geography", "Political", "Economics", "Psychology", "Sociology"], // Arts
    ["New1", "New2", "New3", "New4", "New5", "New6"], // Coming Soon
  ];

  const headings = ["B-Tech", "Management", "Arts", "Coming Soon"];

  const cardBackgrounds = [
    "bg-gradient-to-br from-[#1f1c2c] via-[#928DAB] to-[#1f1c2c]",
    "bg-gradient-to-br from-[#232526] via-[#414345] to-[#232526]",
    "bg-gradient-to-br from-[#283048] via-[#859398] to-[#283048]",
    "bg-gradient-to-br from-[#3a1c71] via-[#d76d77] to-[#ffaf7b]",
  ];

  const circleColors = [
    "bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500",
    "bg-gradient-to-r from-teal-400 via-emerald-500 to-teal-400",
    "bg-gradient-to-r from-violet-500 via-indigo-500 to-violet-500",
    "bg-gradient-to-r from-rose-500 via-pink-400 to-rose-500",
    "bg-gradient-to-r from-sky-400 via-blue-500 to-sky-400",
    "bg-gradient-to-r from-lime-400 via-green-500 to-lime-400",
    "bg-gradient-to-r from-orange-400 via-amber-500 to-orange-400",
    "bg-gradient-to-r from-gray-300 via-gray-500 to-gray-300",
  ];

  // state for modal
  const [selectedBranch, setSelectedBranch] = useState(null);

  // helper to render a card
  const Card = ({ heading, bg, subjects }) => (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-white text-3xl font-bold mb-4 text-center">{heading}</h2>
      <div
        className={`relative rounded-3xl ${bg} w-full p-8 shadow-2xl flex flex-col items-center`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
          {subjects.map((subject, i) => (
            <button
              key={subject}
              onClick={() => setSelectedBranch(subject)}
              className={`flex items-center justify-center w-24 h-24 rounded-full text-white font-bold shadow-lg transition-transform duration-300 hover:scale-105 ${circleColors[i % circleColors.length]}`}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-black py-12 flex flex-col items-center space-y-12">
      <div className="w-full max-w-6xl mx-auto">
        <Card
          heading={headings[0]}
          bg={cardBackgrounds[0]}
          subjects={subjectGroups[0]}
        />
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto gap-8">
        <div className="flex-1">
          <Card
            heading={headings[1]}
            bg={cardBackgrounds[1]}
            subjects={subjectGroups[1]}
          />
        </div>
        <div className="flex-1">
          <Card
            heading={headings[2]}
            bg={cardBackgrounds[2]}
            subjects={subjectGroups[2]}
          />
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto">
        <Card
          heading={headings[3]}
          bg={cardBackgrounds[3]}
          subjects={subjectGroups[3]}
        />
      </div>

      {/* Semester Modal */}
      <AnimatePresence>
        {selectedBranch && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 rounded-2xl p-8 max-w-md w-full shadow-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h3 className="text-2xl text-white font-bold mb-4 text-center">
                Select Semester ({selectedBranch})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <a
                    key={i}
                    href={`/subject/${selectedBranch.toLowerCase()}/sem-${i + 1}`}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg py-3 text-center hover:scale-105 transition-transform"
                  >
                    Sem {i + 1}
                  </a>
                ))}
              </div>
              <button
                onClick={() => setSelectedBranch(null)}
                className="mt-6 w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600"
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
