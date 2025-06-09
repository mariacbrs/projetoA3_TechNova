import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Card.css";

export interface CardProps {
  // id: number;
  title: string;
  description: string;
}
// export function Card({ id, title, description }: CardProps) {
export function CardHome({ title, description }: CardProps) {
  const navigate = useNavigate();

  const handleSchedule = () => {
    navigate("/login");
  };

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
    >

      <motion.h2
        className="card-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        {title}
      </motion.h2>

      <motion.p
        className="card-description"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {description}
      </motion.p>

      <motion.button
        onClick={handleSchedule}
        className="card-button"
        whileTap={{ scale: 0.95 }}
      >
        Agende agora!
      </motion.button>
    </motion.div>
  );
}
