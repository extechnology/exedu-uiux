import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="flex space-x-1">
        {[...Array(9)].map((_, i) => (
          <motion.span
            key={i}
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: `hsl(${280 + i * 3}, 100%, 70%)`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
