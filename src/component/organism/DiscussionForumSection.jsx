import { motion } from "framer-motion";

export default function DiscussionForumSection() {
  return (
    <>
      <div className="text-center mt-12 md:mt-24">
        <h2 className="text-3xl sm:text-4xl md:text-5xl pt-16 font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-100 via-blue-300 to-gray-100">
          Join the Discussion Forum
        </h2>
      </div>
      <section className="relative w-full text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Glassmorphism Box */}
          <div
            className="relative rounded-2xl overflow-hidden 
                       border border-white/10 backdrop-blur-2xl
                       bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-blue-900/20
                       shadow-2xl"
          >
            {/* Background glow accents */}
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center p-10 md:p-16 space-y-10">
              {/* Heading / Description */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="max-w-4xl"
              >
                <p className="text-gray-300 font-semibold text-sm sm:text-lg md:text-2xl leading-relaxed">
                  Our{" "}
                  <span className="text-indigo-300 font-medium">
                    Discussion Forum
                  </span>{" "}
                  lets students post questions, share insights, & collaborate
                  on solutions. It’s the hub for exchanging ideas, clearing
                  doubts, and building knowledge together.
                </p>
              </motion.div>

              {/* Forum Preview Image */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="rounded-xl overflow-hidden shadow-lg border border-white/10 bg-white/5 backdrop-blur-lg max-w-3xl w-full"
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7MF1CcQhelLSpoPVPxSGYza2pFZ5ttby-0w&s"
                  alt="Discussion Forum Preview"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
