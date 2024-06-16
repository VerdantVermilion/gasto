"use client";

import React, { useState } from "react";
import styles from "./stepDetailForm.module.css";

interface MenuDetailFormProps {
  item: { name: string; category: string; price: number };
  onSave: (details: { name: string; quantity: number; price: number }) => void;
  onClose: () => void;
}

const StepDetailForm: React.FC<MenuDetailFormProps> = ({
  item,
  onSave,
  onClose,
}) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleSave = () => {
    onSave({ name: item.name, quantity, price: item.price });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.formContainer}>
        <div className={styles.step_titles}>
          <div className={styles.titles}>
            <p id={styles.selected}>メニュー選択</p>
            <p>オプション選択</p>
            <p>数量選択</p>
          </div>
          <button onClick={onClose} className={styles.button}>
            キャンセル
          </button>
        </div>
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
      </div>
    </div>
  );
};

export default StepDetailForm;
