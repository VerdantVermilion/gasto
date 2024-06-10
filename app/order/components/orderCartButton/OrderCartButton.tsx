// app/components/orderCartButton/OrderCartButton.tsx
"use client";

import React from "react";

interface OrderCartButtonProps {
  onClick: () => void;
}

const OrderCartButton: React.FC<OrderCartButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      カートを見る
    </button>
  );
};

export default OrderCartButton;
