"use client";

import React, { useState } from "react";
import styled from "./Order.module.css";
import TopButton from "./components/topButton/TopButton";
import NigiriButton from "./components/nigiriButton/NigiriButton";
import TemporaryTable from "./components/temporaryTable/TemporaryTable";
import SubmitButton from "./components/submitButton/SubmitButton";

const Order = () => {
  const MAX_ORDERS = 4;
  const [selectedCategory, setSelectedCategory] = useState("トップ");
  const [items, setItems] = useState<string[]>([]);

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleItemClick = (item: string) => {
    if (items.length < MAX_ORDERS) {
      setItems([...items, item]);
    } else {
      // ここでエラーメッセージを表示するか、何らかのフィードバックを提供できます
      console.log("注文の最大数に達しました");
    }
  };

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
          <SubmitButton />
        </div>
      </div>
    </div>
  );
};

export default Order;
