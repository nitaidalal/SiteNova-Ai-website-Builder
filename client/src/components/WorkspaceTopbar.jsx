import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const WorkspaceTopbar = ({ title, actionLabel, onAction, actionIcon: ActionIcon }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            title="Back"
            onClick={() => navigate(-1)}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border bg-bg text-text-primary transition hover:border-primary"
          >
            <FaArrowLeft className="text-sm" />
          </button>
          <h1 className="text-lg font-bold text-text-primary sm:text-xl">{title}</h1>
        </div>

        {actionLabel ? (
          <button
            type="button"
            onClick={onAction}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white transition hover:bg-primary-hover"
          >
            {ActionIcon ? <ActionIcon /> : null}
            <span>{actionLabel}</span>
          </button>
        ) : null}
      </div>
    </header>
  );
};

export default WorkspaceTopbar;
