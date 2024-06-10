// app/components/cartContent/CartContent.tsx
"use client";

import React from "react";
import styled from "./CartContent.module.css";

interface Item {
  name: string;
  category: string;
  price: number;
  quantity?: number;
}

interface CartContentProps {
  items: Item[];
}

const CartContent: React.FC<CartContentProps> = ({ items }) => {
  return (
    <div className={styled.cart}>
      <h2>注文内容</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - {item.quantity}個 - ¥{item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartContent;
