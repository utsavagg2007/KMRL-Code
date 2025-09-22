import React from 'react';
import { motion } from 'motion/react';
import { Building2, Shield, Scan, Clock, FileText } from 'lucide-react';

interface LoadingSystemProps {
  message?: string;
  progress?: number;
  showLogo?: boolean;
}

export const LoadingSystem: React.FC<LoadingSystemProps> = ({ 
  message = "Loading...", 
  progress,
  showLogo = true 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        {showLogo && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="flex items-center justify-center space-x-4"
          >
            <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-2xl">
              <Building2 className="w-12 h-12 text-primary-foreground" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-primary">KMRL</h1>
              <p className="text-muted-foreground text-lg">Document Intelligence</p>
            </div>
          </motion.div>
        )}

        {/* Animated Icons */}
        <div className="flex justify-center space-x-6">
          {[Shield, FileText, Scan, Clock].map((Icon, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="w-12 h-12 bg-background rounded-lg flex items-center justify-center shadow-lg"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              >
                <Icon className="w-6 h-6 text-primary" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Loading Animation */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg font-medium text-foreground"
          >
            {message}
          </motion.div>

          {/* Progress Bar */}
          {progress !== undefined ? (
            <div className="w-80 h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          ) : (
            <div className="w-80 h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                animate={{ x: [-320, 320] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          )}
        </div>

        {/* Pulsing Dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-primary rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2
              }}
            />
          ))}
        </div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-sm text-muted-foreground max-w-md"
        >
          <Shield className="w-4 h-4 inline mr-2" />
          Securing your connection with government-grade encryption...
        </motion.div>
      </div>
    </div>
  );
};

// Skeleton loader for content areas
export const SkeletonLoader: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="space-y-4">
        <div className="h-6 bg-muted rounded-lg w-3/4"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
          <div className="h-4 bg-muted rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
};

// Card skeleton
export const CardSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-card border rounded-lg p-6 space-y-4">
        <div className="h-4 bg-muted rounded w-1/4"></div>
        <div className="h-8 bg-muted rounded w-1/2"></div>
        <div className="space-y-2">
          <div className="h-3 bg-muted rounded"></div>
          <div className="h-3 bg-muted rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
};