import { motion } from "framer-motion";

export default function DiscussionForumSection() {
  return (
    <>
      <div className="text-center mt-8">
        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-blue-300 to-cyan-300">
          Join the Discussion Forum
        </h2>
      </div>
      <section className="relative w-full  text-white py-12  px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Box Container */}
          <div
            className="relative bg-gradient-to-br from-purple-800 via-black to-indigo-950 
                        rounded-2xl shadow-2xl overflow-hidden border border-indigo-900/40"
          >
            {/* Background glow */}
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-600/20 blur-3xl rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-600/20 blur-3xl rounded-full"></div>

            {/* Content Single Column */}
            <div className="relative z-10 flex flex-col items-center text-center p-10 md:p-16 space-y-10">
              {/* Heading */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="max-w-3xl"
              >
                <p className="text-lg text-gray-300 font-semibold">
                  Our{" "}
                  <span className="text-indigo-300 font-medium">
                    Discussion Forum
                  </span>{" "}
                  lets students post questions, share insights, & collaborate
                  on solutions. It’s the hub for exchanging ideas, clearing
                  doubts, and building knowledge together.
                </p>
                <a
                  href="/forum"
                  className="mt-8 inline-block px-8 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition shadow-lg text-white font-semibold"
                >
                  Visit Forum
                </a>
              </motion.div>

              {/* Image Below */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="rounded-xl overflow-hidden shadow-xl border border-indigo-900/50 max-w-3xl w-full"
              >
                <img
                  src="https://www.shutterstock.com/image-vector/internet-forum-abstract-concept-vector-600nw-2291781343.jpg" // Replace with your forum preview image
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
