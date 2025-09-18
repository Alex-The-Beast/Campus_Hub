import { useNavigate } from "react-router-dom";

const Notes = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-[#0b0b12] to-black flex flex-col items-center justify-center py-20 space-y-12">
      {/* Glow background accents */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />

      {/* Content Card */}
      <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-16 flex flex-col items-center max-w-lg w-full shadow-2xl">
        <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-400 to-purple-400 mb-6 text-center">
          Coming Soon
        </h1>
        <p className="text-white/70 text-lg md:text-xl text-center mb-12">
          Notes section is under development. Stay tuned for updates!
        </p>

        {/* Back Button */}
        <button
          onClick={() => navigate("/pyqs")}
          className="px-10 py-4 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-lg hover:bg-white/20 hover:border-white/30 transition-all shadow-md backdrop-blur-xl cursor-pointer"
        >
          Go To PYQs
        </button>
      </div>
    </div>
  );
};

export default Notes;
