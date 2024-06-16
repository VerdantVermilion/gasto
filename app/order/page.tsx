// app/order/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import styles from "./Order.module.css";
import TopButton from "./components/topButton/TopButton";
import NigiriButton from "./components/nigiriButton/NigiriButton";
import MenuDetailForm from "./components/menuDetailForm/MenuDetailForm";
import CallButton from "./components/callButton/CallButton";
import CenterButton from "./components/centerButton/CenterButton";
import OrderCartButton from "./components/orderCartButton/OrderCartButton";
import SubmitButton from "./components/submitButton/SubmitButton";
import Link from "next/link";
import CartContent from "./components/cartContent/CartContent"; // カート内容表示コンポーネントをインポート
import StepDetailform from "./components/stepDetailForm/StepDetailForm";

interface Item {
  name: string;
  category: string;
  price: number;
  quantity: number;
}

const Order = () => {
  const [selectedCategory, setSelectedCategory] = useState("トップ");
  const [items, setItems] = useState<Item[]>([]);
  const [orderHistory, setOrderHistory] = useState<Item[][]>([]);
  const [bgColor, setBgColor] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);

  useEffect(() => {
    const storedHistory = localStorage.getItem("orderHistory");
    if (storedHistory) {
      setOrderHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentOrder", JSON.stringify(items));
  }, [items]);

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleItemClick = (item: {
    name: string;
    category: string;
    price: number;
  }) => {
    setSelectedItem(item);
  };

  const handleSaveItemDetails = (details: {
    name: string;
    quantity: number;
    price: number;
  }) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (existingItem) => existingItem.name === details.name
      );
      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += details.quantity;
        return updatedItems;
      } else {
        return [
          ...prevItems,
          { ...details, category: selectedItem?.category || "その他" },
        ];
      }
    });
    setSelectedItem(null);
  };

  const handleCloseForm = () => {
    setSelectedItem(null);
  };

  const handleSubmit = () => {
    setOrderHistory([...orderHistory, items]);
    setItems([]);
    localStorage.setItem(
      "orderHistory",
      JSON.stringify([...orderHistory, items])
    );
  };

  const handleCartButtonClick = () => {
    setIsCartVisible(!isCartVisible);
    console.log("Cart visibility toggled:", !isCartVisible);
    console.log("Current items in cart:", items);
  };

  return (
    <div style={{ backgroundColor: bgColor }}>
      <div className={styles.main_container}>
        <div className={styles.order_container}>
          <div className={styles.tops}>
            <TopButton onCategoryChange={handleCategoryChange} />
          </div>
          <div className={styles.main_order}>
            <NigiriButton
              category={selectedCategory}
              onItemClick={handleItemClick}
            />
          </div>
        </div>
        <div className={styles.right_container}>
          <div className={styles.fixed_buttons}>
            <CallButton />
            <CenterButton />
            <div>
              <Link href="/history">
                <button className={styles.history_button}>注文履歴</button>
              </Link>
            </div>
            <OrderCartButton onClick={handleCartButtonClick} />
          </div>
          {selectedItem && (
            // <MenuDetailForm
            //   item={selectedItem}
            //   onSave={handleSaveItemDetails}
            //   onClose={handleCloseForm}
            // />
            <StepDetailform
              item={selectedItem}
              onSave={handleSaveItemDetails}
              onClose={handleCloseForm}
            />
          )}
          {isCartVisible && (
            <div>
              <CartContent items={items} />
              <SubmitButton onSubmit={handleSubmit} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
