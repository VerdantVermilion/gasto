// components/orderHistory/OrderHistory.tsx
import React from "react";

interface OrderHistoryProps {
  history?: string[][]; // historyをオプショナルに変更
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ history = [] }) => {
  return (
    <div>
      <h2>注文履歴</h2>
      {history.length === 0 ? (
        <p>注文履歴がありません</p>
      ) : (
        <ul>
          {history.map((order, index) => (
            <li key={index}>
              <h3>注文 {index + 1}</h3>
              <ul>
                {order.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
