import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {motion} from 'framer-motion'
import { useSelector } from "react-redux";
import WorkspaceTopbar from "../components/WorkspaceTopbar";

const Dashboard = () => {
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.user);
  return (
    <div className="min-h-screen bg-bg">
      <WorkspaceTopbar
        title="Dashboard"
        actionLabel="New Website"
        actionIcon={FaPlus}
        onAction={() => navigate("/generate")}
      />
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-6xl px-6 py-14"
        >
            <h2 className="text-2xl font-bold text-center mb-4">Welcome, {user?.name}!</h2>
            <p className="text-center text-text-secondary">You have not created any websites yet.</p>
        </motion.div>
        
    </div>
  );
}

export default Dashboard
