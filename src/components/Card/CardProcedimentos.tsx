import { motion } from "framer-motion";
import "./Card.css";

export interface CardProps {
  id: number;
  nome: string;
  descricao: string;
  onEdit: (data: { id: number; nome: string; descricao: string}) => void;
  onDelete: (id: number) => void;
}

export function CardProcedimentos({ id, nome, descricao, onEdit, onDelete }: CardProps) {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
    >
      <motion.h2 className="card-title">{nome}</motion.h2>
      <motion.p className="card-description">{descricao}</motion.p>


      <div>
        <motion.button
          onClick={() => onEdit({ id, nome, descricao})}
          className="card-button"
        >
          Editar
        </motion.button>
        <motion.button onClick={() => onDelete(id)} className="card-button">
          Excluir
        </motion.button>
      </div>
    </motion.div>
  );
}
