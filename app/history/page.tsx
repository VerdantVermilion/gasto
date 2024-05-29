"use client";

import React, { useEffect, useState } from "react";
import Link from 'next/link';

interface Item {
  name: string;
  quantity: number;
  price: number;
}

const HistoryPage = () => {
  const [orderHistory, setOrderHistory] = useState<Item[][]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("orderHistory");
    if (storedHistory) {
      setOrderHistory(JSON.parse(storedHistory));
    }
  }, []);

  return (
    <div>
      <h1>注文履歴</h1>
      {orderHistory.length === 0 ? (
        <p>注文履歴がありません。</p>
      ) : (
        orderHistory.map((order, index) => (
          <div key={index}>
            <h2>注文 {index + 1}</h2>
            <table>
              <thead>
                <tr>
                  <th>商品名</th>
                  <th>数量</th>
                  <th>価格</th>
                  <th>合計</th>
                </tr>
              </thead>
              <tbody>
                {order.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
      <Link href="/">
        <button>戻る</button>
      </Link>
    </div>
  );
};

export default HistoryPage;
