import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toggleTheme } from '../redux/themeSlice'
import { logoutSuccess } from '../redux/authSlice'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const sampleSites = [
  {
    name: 'AI-Generated Layouts',
    description: 'SiteNova.ai creates complete page structures from a simple prompt in seconds.',
  },
  {
    name: 'Responsive by Default',
    description: 'Every generated website is optimized for mobile, tablet, and desktop screens.',
  },
  {
    name: 'Easy Customization',
    description: 'Users can update sections, colors, and content without touching complex code.',
  },
]

const Home = () => {
  const dispatch = useDispatch()
  const { theme } = useSelector((state) => state.theme)
  const { user } = useSelector((state) => state.auth)

  const handleLogout = async () => {
    try {
      await axios.get(`${API_BASE_URL}/api/auth/logout`, { withCredentials: true })
    } catch {
      // no-op
    } finally {
      dispatch(logoutSuccess())
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg text-text-primary">
      <motion.header
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
       className="border-b border-border"
       >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div>
            <h1 className="text-lg font-semibold">SiteNova.ai</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => dispatch(toggleTheme())}
              className="cursor-pointer rounded-xl border border-border px-3 py-1.5 text-sm font-medium transition hover:bg-surface"
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
            <div className="cursor-pointer rounded-xl border border-border px-3 py-1.5 text-sm font-medium transition hover:bg-surface">
              Pricing
            </div>
            <div className="cursor-pointer rounded-xl border border-border px-3 py-1.5 text-sm font-medium transition hover:bg-surface">
              Get Started
            </div>
          </div>
        </div>
      </motion.header>

      <main className="mx-auto max-w-6xl px-6 py-14">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="mb-3 text-sm text-text-secondary">
            Welcome {user?.name || "Creator"}
          </p>
          <h2 className="text-4xl font-bold leading-tight md:text-6xl">
            Build stunning websites
            <br />
            <span className="text-primary">with AI</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm text-text-secondary md:text-base">
            Describe your idea and let SiteNova.ai generate a modern responsive
            website with editable blocks.
          </p>
          <button className="mt-8 rounded-xl bg-primary px-6 py-3 font-medium text-white transition hover:bg-primary-hover">
            Go to Dashboard
          </button>
        </motion.section>

        <section className="mt-16">
          <h3 className="mb-4 text-lg font-semibold">Why SiteNova.ai</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {sampleSites.map((site, index) => (
              <motion.article
                key={site.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                className="rounded-2xl border border-border bg-surface p-5"
              >
                <p className="mb-2 text-sm text-text-secondary">Platform Fact</p>
                <h4 className="text-xl font-semibold">{site.name}</h4>
                <p className="mt-2 text-sm text-text-secondary">{site.description}</p>
              </motion.article>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-6 text-center text-sm text-text-secondary">
        © {new Date().getFullYear()} SiteNova.ai
      </footer>
      <motion.div initial={{ opacity: 0 }}></motion.div>
    </div>
  );
}



export default Home
