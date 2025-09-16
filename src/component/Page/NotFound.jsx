import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-[#0a0a14] to-black text-white overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-sky-400/20 blur-3xl rounded-full" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-indigo-400/20 blur-2xl rounded-full" />


      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-lg px-6"
      >
        <h1 className="text-9xl font-bold bg-gradient-to-r from-white via-sky-300 via-purple-400 to-indigo-500 bg-clip-text text-transparent mb-6">
          404
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-full font-medium text-white 
                     bg-gradient-to-r from-sky-500/80 to-purple-600/80 
                     backdrop-blur-lg border border-white/10 shadow-lg hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] 
                     transition cursor-pointer"
        >
          Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NotFound;
