// app/components/menuDetailForm/MenuDetailForm.tsx
"use client";

import React, { useState } from "react";
import styled from "./MenuDetailForm.module.css";

interface MenuDetailFormProps {
  item: { name: string; category: string; price: number };
  onSave: (details: { name: string; quantity: number; price: number }) => void;
  onClose: () => void;
}

const MenuDetailForm: React.FC<MenuDetailFormProps> = ({ item, onSave, onClose }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(item.price);

  const handleSave = () => {
    onSave({ name: item.name, quantity, price });
    onClose();
  };

  return (
    <div className={styled.overlay}>
      <div className={styled.formContainer}>
        <h2>{item.name}</h2>
        <label>
          数量:
          <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
        </label>
        <label>
          価格:
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        </label>
        <button onClick={handleSave}>保存</button>
        <button onClick={onClose}>キャンセル</button>
      </div>
    </div>
  );
};

export default MenuDetailForm;
