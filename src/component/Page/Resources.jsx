import { useNavigate } from "react-router-dom";

const Resources = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-black via-[#0b0b12] to-black flex flex-col items-center justify-center py-20 overflow-hidden">
      {/* Glow background accents */}
      <div className="absolute top-10 left-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-blob animation-delay-2000" />

      {/* Content Card */}
      <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-16 flex flex-col items-center max-w-lg w-full shadow-2xl z-10">
        <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-400 to-purple-400 mb-6 text-center">
          Coming Soon
        </h1>
        <p className="text-white/70 text-lg md:text-xl text-center mb-12">
          Resources section is under development. Check back soon for study materials and notes!
        </p>

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="px-10 py-4 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-lg hover:bg-white/20 hover:border-white/30 transition-all shadow-md backdrop-blur-xl cursor-pointer"
        >
          Back To Home
        </button>
      </div>
    </div>
  );
};

export default Resources;
