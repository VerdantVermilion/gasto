"use client";

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import BackButton from "./components/backButton/BackButton";
import styles from './History.module.css';

interface Item {
  name: string;
  quantity: number;
  price: number;
}

const HistoryPage = () => {
  const [orderHistory, setOrderHistory] = useState<Item[][]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const storedHistory = localStorage.getItem("orderHistory");
    if (storedHistory) {
      const parsedHistory = JSON.parse(storedHistory);
      setOrderHistory(parsedHistory);

      const total = parsedHistory.flat().reduce((acc: number, item: Item) => acc + (item.price * item.quantity), 0);
      setTotalPrice(total);
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("orderHistory");
    setOrderHistory([]);
    setTotalPrice(0);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>注文履歴</h1>
      {orderHistory.length === 0 ? (
        <p className={styles.noHistory}>注文履歴がありません。</p>
      ) : (
        <>
          {orderHistory.map((order, index) => (
            <div key={index} className={styles.orderItem}>
              <table>
                <thead>
                  <tr>
                    <th>商品名</th>
                    <th>数量</th>
                    <th>価格</th>
                  </tr>
                </thead>
                <tbody>
                  {order.map((item, itemIndex) => (
                    <tr key={itemIndex} className={styles.item}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          <div className={styles.orderItem}>
            <h2 className={styles.orderTitle}>全ての注文の合計価格: {totalPrice}</h2>
          </div>
        </>
      )}
      <button onClick={clearHistory}>注文履歴を削除</button>
      <BackButton />
    </div>
  );
};

export default HistoryPage;
