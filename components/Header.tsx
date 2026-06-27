"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="p-6 flex justify-center">
      <Link href="/">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="text-2xl font-bold tracking-tighter cursor-pointer"
        >
          <span className="neon-text-pink">MATH</span>
          {" "}
          <span className="neon-text-blue">MAN</span>
        </motion.div>
      </Link>
    </header>
  );
}
