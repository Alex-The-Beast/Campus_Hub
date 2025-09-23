

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Updates() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
        const ids = await res.json();

        const top10 = ids.slice(0, 10); // latest 6 posts

        const stories = await Promise.all(
          top10.map(async (id) => {
            const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            return await storyRes.json();
          })
        );

        setPosts(stories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-white">
        Loading posts...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0f1f] to-black text-gray-100 px-6 py-12">
      {/* Header */}
      <motion.div
        className="max-w-4xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* <span className="px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-sm font-medium text-white">
          🚀 Blog
        </span> */}
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight">
          NEW THINGS HAPPENING AROUD THE WORLD
        </h1>
        <p className="mt-4 text-gray-400 ">
          Insights and experiences from Y Combinator Hacker News — curated daily.
        </p>
        {/* <motion.a
          href="https://news.ycombinator.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 px-6 py-2 rounded-full border border-gray-600 hover:border-blue-400 text-sm font-medium transition"
          whileHover={{ scale: 1.05 }}
        >
          View all articles →
        </motion.a> */}
      </motion.div>

      {/* Blog List */}
      <div className="max-w-4xl mx-auto space-y-10">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            className="flex flex-col md:flex-row items-start md:items-center gap-6 border-b border-gray-800 pb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {/* Thumbnail placeholder (since Hacker News doesn’t have images) */}
            <div className="hidden md:block w-full md:w-48 h-32 bg-gradient-to-r from-blue-900 to-cyan-700 rounded-lg md:flex items-center justify-center text-white font-bold text-lg">
              CH
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-gray-400 text-sm mb-2">
                {new Date(post.time * 1000).toLocaleDateString()} • {Math.ceil((post.text?.length || 200) / 200)} min read
              </p>

              <a
                href={post.url || `https://news.ycombinator.com/item?id=${post.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xl font-semibold text-white hover:text-blue-400 transition"
              >
                {post.title}
              </a>

              <p className="mt-2 text-gray-400 line-clamp-2">
                {post.text ? post.text.replace(/<[^>]+>/g, "") : "Click to read full article on Hacker News."}
              </p>

              <a
                href={`https://news.ycombinator.com/item?id=${post.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-medium text-cyan-400 hover:underline"
              >
                Read more →
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
