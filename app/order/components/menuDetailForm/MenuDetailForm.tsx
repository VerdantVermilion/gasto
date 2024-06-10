// app/components/menuDetailForm/MenuDetailForm.tsx
"use client";

import React, { useState } from "react";
import styles from "./MenuDetailForm.module.css";

interface MenuDetailFormProps {
  item: { name: string; category: string; price: number };
  onSave: (details: { name: string; quantity: number; price: number }) => void;
  onClose: () => void;
}

const MenuDetailForm: React.FC<MenuDetailFormProps> = ({ item, onSave, onClose }) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleSave = () => {
    onSave({ name: item.name, quantity, price: item.price });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.formContainer}>
        <h2>{item.name}</h2>
        <label className={styles.label}>
          数量:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            className={styles.input}
          />
        </label>
        <button onClick={handleSave} className={styles.button}>保存</button>
        <button onClick={onClose} className={styles.button}>キャンセル</button>
      </div>
    </div>
  );
};

export default MenuDetailForm;
