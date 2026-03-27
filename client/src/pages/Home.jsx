import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import LoginModal from "../components/LoginModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const highlights = [
  {
    name: "AI-Generated Layouts",
    description:
      "SiteNova.ai creates complete page structures from a simple prompt in seconds.",
  },
  {
    name: "Responsive by Default",
    description:
      "Every generated website is optimized for mobile, tablet, and desktop screens.",
  },
  {
    name: "Easy Customization",
    description:
      "Users can update sections, colors, and content without touching complex code.",
  },
];

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();


  return (
    <div className="relative min-h-screen overflow-x-hidden bg-bg pt-16 text-text-primary">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-14">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="mb-3 text-sm text-text-secondary">
            <span className="px-4 py-2 rounded-full text-secondary bg-secondary/10 border border-secondary/30">
              Welcome,{" "}
              <span className="font-semibold">{user?.name || "Creator"}</span>!
            </span>
          </p>
          <h2 className="text-4xl font-bold leading-tight md:text-6xl">
            Build stunning websites
            <br />
            <span className="text-primary">with AI</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm text-text-secondary md:text-base">
            Describe your idea and let SiteNova.ai generate a modern responsive
            website in seconds. Perfect for prototyping, portfolios, and small
            businesses.
          </p>
          <button
            onClick={() => {
              if (user) {
                navigate("/dashboard");
              } else {
                setShowLoginModal(true);
              }
            }}
            className="mt-8 rounded-xl bg-primary px-6 py-3 font-medium text-white transition hover:bg-primary-hover"
          >
            {user ? "Go to Dashboard" : "Get Started for Free"}
          </button>
        </motion.section>

        <section className="mt-16">
          <h3 className="mb-4 text-lg font-semibold">Why SiteNova.ai</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {highlights.map((highlight, index) => (
              <motion.article
                key={highlight.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                className="rounded-2xl border border-border bg-surface p-5"
              >
                <p className="mb-2 text-sm text-text-secondary">
                  Platform Fact
                </p>
                <h4 className="text-xl font-semibold">{highlight.name}</h4>
                <p className="mt-2 text-sm text-text-secondary">
                  {highlight.description}
                </p>
              </motion.article>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-6 text-center text-sm text-text-secondary">
        © {new Date().getFullYear()} SiteNova.ai
      </footer>
      <motion.div initial={{ opacity: 0 }}></motion.div>
      {showLoginModal && (
        <LoginModal
          open={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
};

export default Home;
