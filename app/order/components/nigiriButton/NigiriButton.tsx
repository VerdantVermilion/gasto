"use client";
import React, { useState } from "react";
import styled from "./NigiriButton.module.css";

interface NigiriButtonProps {
  category: string;
  onItemClick: (item: { name: string, price: number }) => void;
}

// ランダムな価格を生成する関数
const getRandomPrice = () => Math.floor(Math.random() * 101) + 100;

const allItems = [
  { name: "まぐろ", price: getRandomPrice() },
  { name: "漬けまぐろ", price: getRandomPrice() },
  { name: "サーモン", price: getRandomPrice() },
  { name: "えび", price: getRandomPrice() },
  { name: "ぶり", price: getRandomPrice() },
  { name: "甘えび", price: getRandomPrice() },
  { name: "いか", price: getRandomPrice() },
  { name: "えんがわ", price: getRandomPrice() },
  { name: "穴子", price: getRandomPrice() },
  { name: "うに", price: getRandomPrice() },
  { name: "ネギトロ軍艦", price: getRandomPrice() },
  { name: "ツナマヨ軍艦", price: getRandomPrice() },
  { name: "コーンマヨ軍艦", price: getRandomPrice() },
  { name: "シーサラダ軍艦", price: getRandomPrice() },
  { name: "鉄火巻き", price: getRandomPrice() },
  { name: "納豆巻き", price: getRandomPrice() },
  { name: "醤油ラーメン", price: getRandomPrice() },
  { name: "みそラーメン", price: getRandomPrice() },
  { name: "たら白子", price: getRandomPrice() },
  { name: "あん肝", price: getRandomPrice() },
  { name: "期間限定300円皿", price: getRandomPrice() },
  { name: "期間限定500円皿", price: getRandomPrice() },
  { name: "シャーベット", price: getRandomPrice() },
  { name: "オレンジジュース", price: getRandomPrice() },
];

const ITEMS_PER_PAGE = 6;

const NigiriButton = ({ category, onItemClick }: NigiriButtonProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const filteredItems = allItems.filter((item) => {
    switch (category) {
      case "トップ":
        return true;
      case "フェア":
        return ["期間限定300円皿", "期間限定500円皿"].includes(item.name);
      case "ミニしゃり":
        return item.name === "うに";
      case "にぎり":
        return ["まぐろ", "漬けまぐろ", "サーモン", "えんがわ"].includes(item.name);
      case "軍艦・巻物":
        return [
          "ネギトロ軍艦",
          "ツナマヨ軍艦",
          "コーンマヨ軍艦",
          "シーサラダ軍艦",
          "鉄火巻き",
          "納豆巻き",
        ].includes(item.name);
      case "麺類":
        return ["醤油ラーメン", "みそラーメン"].includes(item.name);
      case "サイドメニュー":
        return ["たら白子", "あん肝"].includes(item.name);
      case "デザート・ドリンク":
        return ["シャーベット", "オレンジジュース"].includes(item.name);
      case "お持ち帰り・ご注文":
        return [
          "いか",
          "ぶり",
          "えんがわ",
          "穴子",
          "うに",
          "ネギトロ軍艦",
        ].includes(item.name);
      default:
        return true;
    }
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
