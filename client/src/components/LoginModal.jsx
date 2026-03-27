import React from 'react'
import {motion,AnimatePresence} from 'framer-motion' 
import {FcGoogle} from 'react-icons/fc'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase'
import toast from 'react-hot-toast'
import api from '../lib/api'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'

const LoginModal = ({open, onClose }) => {
  const dispatch = useDispatch()
    const handleGoogleAuth =async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const {displayName, email,photoURL} = result.user;
            const payload = {
              name: displayName,
              email,
              avatar: photoURL,
            };
            const response = await api.post('/auth/google-auth', payload);
            const loggedInUser = response?.data?.data?.user;
            if (loggedInUser) {
              dispatch(setUser(loggedInUser));
            }
            toast.success(response.data.message)
            onClose();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error during Google login.");
        }
    }
  return (
    <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-bg/70 backdrop-blur-sm"
      >
        <motion.div
        onClick={(e) => e.stopPropagation()}
         className="w-full m-4 max-w-md rounded-2xl border border-border bg-surface p-6 text-text-primary shadow-sm">
          <motion.div className="mb-6 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">Welcome to <span className="text-primary">SiteNova.ai</span></h2>
          <p className="mt-1 text-sm text-text-secondary">
            Sign in with Google to get started.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-lg border border-border px-2.5 py-1 text-sm text-text-secondary transition hover:bg-bg hover:text-text-primary"
          aria-label="Close login modal"
        >
          ✕
        </button>
      </motion.div>

      <motion.button
      whileTap={{scale:0.96}}
        type="button"
        onClick={handleGoogleAuth}
        className="flex w-full cursor-pointer items-center justify-center gap-3 
        rounded-xl border  px-4 py-3 font-medium text-text-primary
         transition border-primary/60  bg-primary/10 "
      >
          <FcGoogle size={24}/>
        
        Continue with Google
      </motion.button>

      <p className="mt-4 text-center text-xs text-text-secondary">
        By continuing, you agree to our Terms and Privacy Policy.
      </p>
    </motion.div>
    </motion.div>
    )}
    </AnimatePresence>
  )
}

export default LoginModal
