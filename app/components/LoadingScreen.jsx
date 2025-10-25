'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';

export default function LoadingScreen({ message = "Checking your eligibility..." }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white bg-opacity-95 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="text-center max-w-md mx-auto p-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 mx-auto mb-6"
        >
          <FontAwesomeIcon 
            icon={faSpinner} 
            className="text-emerald-600 text-5xl"
          />
        </motion.div>
        
        <motion.h3 
          className="text-xl font-semibold text-gray-900 mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.h3>
        
        <motion.p 
          className="text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Please wait while we process your information...
        </motion.p>
        
        <motion.div 
          className="flex items-center justify-center mt-6 space-x-2 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <FontAwesomeIcon icon={faClipboardCheck} className="text-emerald-500" />
          <span>Reviewing your responses</span>
        </motion.div>
      </div>
    </motion.div>
  );
}