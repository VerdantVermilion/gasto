"use client";

import React, { useState, useEffect } from "react";
import styled from "./Order.module.css";
import TopButton from "./components/topButton/TopButton";
import NigiriButton from "./components/nigiriButton/NigiriButton";
import TemporaryTable from "./components/temporaryTable/TemporaryTable";
import SubmitButton from "./components/submitButton/SubmitButton";
import Link from 'next/link';

interface Item {
  name: string;
  quantity: number;
  price: number;
}

const Order = () => {
  const MAX_ORDERS = 4;
  const [selectedCategory, setSelectedCategory] = useState("トップ");
  const [items, setItems] = useState<Item[]>([]);
  const [orderHistory, setOrderHistory] = useState<Item[][]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("orderHistory");
    if (storedHistory) {
      setOrderHistory(JSON.parse(storedHistory));
    }
  }, []);

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleItemClick = (item: { name: string, price: number }) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(existingItem => existingItem.name === item.name);
      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const handleSubmit = () => {
    setOrderHistory([...orderHistory, items]);
    setItems([]);
    localStorage.setItem("orderHistory", JSON.stringify([...orderHistory, items]));
  }

  return (
    <div>
      <TopButton onCategoryChange={handleCategoryChange} />
      <div className={styled.main_order}>
        <NigiriButton
          category={selectedCategory}
          onItemClick={handleItemClick}
        />
        <div>
          <TemporaryTable items={items} onRemoveItem={removeItem} />
          <div className={styled.submit_button}>
            <SubmitButton onSubmit={handleSubmit} />
          </div>
          {/* <Link href="/history">
            <button className={styled.history_button}>注文履歴を見る</button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Order;
