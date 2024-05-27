"use client";

import React, { useEffect, useState } from "react";

const History = () => {
  const [orderHistory, setOrderHistory] = useState<string[][]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("orderHistory");
    if (storedHistory) {
      setOrderHistory(JSON.parse(storedHistory));
    }
  }, []);

  return (
    <div>
      <h1>注文履歴</h1>
      {orderHistory.length > 0 ? (
        <ul>
          {orderHistory.map((order, index) => (
            <li key={index}>
              <h2>注文 {index + 1}</h2>
              <ul>
                {order.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>注文履歴がありません。</p>
      )}
    </div>
  );
};

export default History;
