import { motion } from "framer-motion";

const ProblemOfTheDaySection = () => {
  return (
    <section className="w-full text-white py-16 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center relative">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="
            bg-black/70 backdrop-blur-md rounded-xl p-8 shadow-lg relative z-10
            md:-mr-20  // negative margin to overlap into image
          "
        >
          <p className="uppercase tracking-wide text-sm text-gray-400">
            Problem of the Day
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Example: Top Problem Posted Today
          </h2>
          <p className="mt-4 text-gray-300">
            “Our college Wi-Fi speed drops drastically during exam week. What’s the 
            most effective way to ensure stable bandwidth for everyone?”
          </p>
          <p className="mt-4 text-gray-400 text-sm">
            Posted by: <span className="text-blue-400">@student123</span> • 124 upvotes
          </p>

          <div className="mt-6">
            <button className="px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md transition">
              View All Problems
            </button>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center md:justify-end relative"
        >
          <div className="relative w-full  md:max-w-md">
            <img
              src="https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="Problem of the day"
              className="rounded-xl shadow-xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemOfTheDaySection;
