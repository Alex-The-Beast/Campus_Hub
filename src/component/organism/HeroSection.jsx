// src/component/organism/HeroSection.jsx
const HeroSection = () => {
  return (
    // The main container is kept from your original code
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mt-12 mx-18 rounded-3xl bg-black">
      {/* Dark gradient background inspired by the image */}
<div
  className="absolute inset-0 rounded-3xl ring-1 ring-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
  style={{
    background: `
      linear-gradient(to bottom, rgba(17,17,19,0.96), rgba(10,10,11,0.94)),
      radial-gradient(
        ellipse 150% 120% at 50% -20%, 
        rgba(168, 85, 247, 0.25),   /* purple glow */
        rgba(56, 189, 248, 0.2) 35%,  /* bluish glow */
        rgba(202, 138, 94, 0.15) 65%, /* coffee warm */
        transparent 90%
      )
    `,
  }}
></div>




      {/* Your original content is preserved below */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Main Title */}

        <h1
          className="
    text-4xl md:text-5xl lg:text-6xl font-primary font-bold mb-6
    bg-gradient-to-r from-white via-indigo-400 to-purple-400
    bg-clip-text text-transparent
  "
          style={{
            textShadow: "0 4px 20px rgba(0,0,0,0.3)",
            letterSpacing: "-0.02em",
          }}
        >
          All your University problem solve{" "}
          <span className="text-gray-300">here</span>
        </h1>

        {/* Tagline (color slightly adjusted for better readability on dark bg) */}
        <p
          className="text-xl md:text-2xl lg:text-3xl font-secondary text-gray-400 mb-12 max-w-6xl mx-auto leading-relaxed font-semibold"
          style={{
            textShadow: "0 2px 10px rgba(1,0,0,0.8)",
          }}
        >
          Built to connect students, foster communities, and amplify campus
          life.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          {/* Primary CTA */}
          <button
            className="group relative px-8 py-4 bg-white text-black font-secondary font-semibold text-lg rounded-full hover:scale-105 transition-all duration-300 shadow-2xl"
            style={{
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            }}
          >
            <span className="flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              Join Your Campus
            </span>
          </button>

          {/* Secondary CTA */}
          <button className="group px-8 py-4 border-2 border-white/30 text-white font-secondary font-semibold text-lg rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm">
            <span className="flex items-center gap-3">
              Explore Features
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </button>
        </div>

        {/* Feature Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Community Card */}
          <div
            className="group relative p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            style={{
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 7H16c-.8 0-1.54.37-2.01.99L12 11l-1.99-3.01A2.5 2.5 0 0 0 8 7H5.46c-.8 0-1.54.37-2.01.99L1 8.5V22h3v-6h2v6h3v-6h2v6h3v-6h2v6h3z" />
                </svg>
              </div>
              <h3 className="text-xl font-primary font-semibold text-white mb-2">
                Student Communities
              </h3>
              <p className="text-white/80 text-sm">
                Connect with peers, join clubs, and build lasting friendships
              </p>
            </div>
          </div>

          {/* Events Card */}
          <div
            className="group relative p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            style={{
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                </svg>
              </div>
              <h3 className="text-xl font-primary font-semibold text-white mb-2">
                Campus Events
              </h3>
              <p className="text-white/80 text-sm">
                Discover and participate in exciting campus activities
              </p>
            </div>
          </div>

          {/* Resources Card */}
          <div
            className="group relative p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            style={{
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-primary font-semibold text-white mb-2">
                Academic Resources
              </h3>
              <p className="text-white/80 text-sm">
                Access study materials, notes, and academic support
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

