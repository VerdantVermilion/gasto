"use client";
import React, { useState } from "react";
import styled from "./NigiriButton.module.css";

interface NigiriButtonProps {
  category: string;
  onItemClick: (item: { name: string; category: string; price: number }) => void;
}

// ランダムな価格を生成する関数
const getRandomPrice = () => Math.floor(Math.random() * 101) + 100;

const allItems = [
  { name: "まぐろ", category: "にぎり", price: getRandomPrice() },
  { name: "漬けまぐろ", category: "にぎり", price: getRandomPrice() },
  { name: "サーモン", category: "にぎり", price: getRandomPrice() },
  { name: "えび", category: "にぎり", price: getRandomPrice() },
  { name: "ぶり", category: "にぎり", price: getRandomPrice() },
  { name: "甘えび", category: "にぎり", price: getRandomPrice() },
  { name: "いか", category: "にぎり", price: getRandomPrice() },
  { name: "えんがわ", category: "にぎり", price: getRandomPrice() },
  { name: "穴子", category: "にぎり", price: getRandomPrice() },
  { name: "うに", category: "にぎり", price: getRandomPrice() },
  { name: "ネギトロ軍艦", category: "軍艦・巻物", price: getRandomPrice() },
  { name: "ツナマヨ軍艦", category: "軍艦・巻物", price: getRandomPrice() },
  { name: "コーンマヨ軍艦", category: "軍艦・巻物", price: getRandomPrice() },
  { name: "シーサラダ軍艦", category: "軍艦・巻物", price: getRandomPrice() },
  { name: "鉄火巻き", category: "軍艦・巻物", price: getRandomPrice() },
  { name: "納豆巻き", category: "軍艦・巻物", price: getRandomPrice() },
  { name: "醤油ラーメン", category: "麺類", price: getRandomPrice() },
  { name: "みそラーメン", category: "麺類", price: getRandomPrice() },
  { name: "たら白子", category: "サイドメニュー", price: getRandomPrice() },
  { name: "あん肝", category: "サイドメニュー", price: getRandomPrice() },
  { name: "期間限定300円皿", category: "フェア", price: getRandomPrice() },
  { name: "期間限定500円皿", category: "フェア", price: getRandomPrice() },
  { name: "シャーベット", category: "デザート・ドリンク", price: getRandomPrice() },
  { name: "オレンジジュース", category: "デザート・ドリンク", price: getRandomPrice() },
];

const ITEMS_PER_PAGE = 6;

const NigiriButton = ({ category, onItemClick }: NigiriButtonProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const filteredItems = allItems.filter((item) => {
    if (category === "トップ") {
      return true;
    }
    return item.category === category;
  });

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const start = currentPage * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(start, end);

  const goToPreviousPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  return (
    <div className={styled.nigiri_screen}>
      <ul className={styled.nigiris}>
        {currentItems.map((item) => (
          <li
            className={styled.nigiri_button}
            key={item.name}
            onClick={() => onItemClick(item)}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <div className={styled.pagination}>
        <button
          className={styled.page_button}
          onClick={goToPreviousPage}
          disabled={currentPage === 0}
        >
          前へ
        </button>
        <span className={styled.number}>
          {currentPage + 1} / {totalPages}
        </span>
        <button
          className={styled.page_button}
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1}
        >
          次へ
        </button>
      </div>
    </div>
  );
};

export default NigiriButton;
