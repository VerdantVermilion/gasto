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
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // useEffectフックを使って、コンポーネントがマウントされたときに注文履歴をlocalStorageから取得
  useEffect(() => {
    const storedHistory = localStorage.getItem("orderHistory");
    if (storedHistory) {
      const parsedHistory = JSON.parse(storedHistory);
      setOrderHistory(parsedHistory);

      // 合計価格を計算
      const total = parsedHistory.flat().reduce((acc: number, item: Item) => acc + (item.price * item.quantity), 0);
      setTotalPrice(total);
    }
  }, []);

  // 注文履歴を削除する関数
  const clearHistory = () => {
    localStorage.removeItem("orderHistory");
    setOrderHistory([]);
    setTotalPrice(0);
  };

  return (
    <div>
      <h1>注文履歴</h1>
      {orderHistory.length === 0 ? (
        <p>注文履歴がありません。</p>
      ) : (
        <>
          {orderHistory.map((order, index) => (
            <div key={index}>
              <h2>注文 {index + 1}</h2>
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
                    <tr key={itemIndex}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          <div>
            <h2>全ての注文の合計価格: {totalPrice}</h2>
          </div>
        </>
      )}
      <button onClick={clearHistory}>注文履歴を削除</button>
      <Link href="/">
        <button>戻る</button>
      </Link>
    </div>
  );
};

export default HistoryPage;
