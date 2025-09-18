// src/component/organism/Footer.jsx
const Footer = () => {
  return (
    <footer
      className="relative "
  
    >
      {/* Main footer content */}
      <div className="px-6 pt-16 pb-4 md:px-16 lg:px-24 bg-gradient-to-b from-white via-white to-gray-900">
        {/* Three column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Left Column - Let's talk */}
          <div>
            <h2
              className="text-lg font-primary mb-4"
              style={{ color: "var(--primary-black)" }}
            >
              Let's talk
            </h2>
            <a
              href="mailto:hello@campushub.com"
              className="text-2xl font-primary transition-colors"
              style={{
                color: "var(--primary-black)",
                "--hover-color": "var(--accent-violet)",
              }}
              onMouseEnter={(e) =>
                (e.target.style.color = "var(--accent-violet)")
              }
              onMouseLeave={(e) =>
                (e.target.style.color = "var(--primary-black)")
              }
            >
              hello@campushub.com
            </a>
          </div>

          {/* Middle Column - Contact & Follow */}
          <div>
            <div className="mb-8">
              <h2
                className="text-lg font-primary mb-2"
                style={{ color: "var(--primary-black)" }}
              >
                Contact
              </h2>
              <h3
                className="text-sm font-secondary mb-2"
                style={{ color: "var(--primary-black)" }}
              >
                Global Enquiries
              </h3>
              <a
                href="mailto:hello@campushub.com"
                className="text-sm font-secondary transition-colors"
                style={{
                  color: "var(--primary-black)",
                  "--hover-color": "var(--accent-violet)",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "var(--accent-violet)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "var(--primary-black)")
                }
              >
                hello@campushub.com
              </a>
            </div>

            <div>
              <h2
                className="text-lg font-primary mb-4"
                style={{ color: "var(--primary-black)" }}
              >
                Follow
              </h2>
              <div className="space-y-2">
                <a
                  href="https://instagram.com/campushub"
                  className="flex items-center text-sm font-secondary transition-colors"
                  style={{
                    color: "var(--primary-black)",
                    "--hover-color": "var(--accent-violet)",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.color = "var(--accent-violet)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.color = "var(--primary-black)")
                  }
                >
                  <span className="mr-2">→</span> Instagram
                </a>
                <a
                  href="https://linkedin.com/company/campushub"
                  className="flex items-center text-sm font-secondary transition-colors"
                  style={{
                    color: "var(--primary-black)",
                    "--hover-color": "var(--accent-violet)",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.color = "var(--accent-violet)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.color = "var(--primary-black)")
                  }
                >
                  <span className="mr-2">→</span> LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Newsletter */}
          <div>
            <h2
              className="text-lg font-primary mb-4"
              style={{ color: "var(--primary-black)" }}
            >
              Newsletter
            </h2>
            <p
              className="text-sm font-secondary mb-6"
              style={{ color: "var(--medium-gray)" }}
            >
              Sign up for our newsletter about building communities that
              redefine campus life.
            </p>
            <div
              className="flex items-center pb-2"
              style={{ borderBottom: "1px solid var(--primary-black)" }}
            >
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-transparent text-sm font-secondary outline-none"
                style={{
                  color: "var(--primary-black)",
                  "--placeholder-color": "var(--medium-gray)",
                }}
              />
              <button
                className="ml-2 transition-colors"
                style={{ color: "var(--primary-black)" }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "var(--accent-violet)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "var(--primary-black)")
                }
              >
                <span className="text-lg">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Large inverted brand text */}
        <div className="text-center mb-8 ">
          <h1
            className="text-8xl md:text-9xl lg:text-[12rem] font-primary font-bold tracking-wider transform rotate-180 select-none text-gray-600"
       
          >
            HUB CAMPUS 
          </h1>
        </div>
  
      </div>
    
    </footer>
  );
};

export default Footer;
