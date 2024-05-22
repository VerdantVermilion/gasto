"use client";
import React, { useState } from "react";
import styled from "./NigiriButton.module.css";

interface NigiriButtonProps {
  category: string;
  onItemClick: (item: string) => void;
}

const allItems = [
  "まぐろ",
  "漬けまぐろ",
  "サーモン",
  "えび",
  "ぶり",
  "甘えび",
  "いか",
  "えんがわ",
  "穴子",
  "うに",
  "ネギトロ軍艦",
  "ツナマヨ軍艦",
  "コーンマヨ軍艦",
  "シーサラダ軍艦",
  "鉄火巻き",
  "納豆巻き",
  "醤油ラーメン",
  "みそラーメン",
  "たら白子",
  "あん肝",
  "期間限定300円皿",
  "期間限定500円皿",
  "シャーベット",
  "オレンジジュース",
];

const ITEMS_PER_PAGE = 6;

const NigiriButton = ({ category, onItemClick }: NigiriButtonProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const filteredItems = allItems.filter((item) => {
    switch (category) {
      case "トップ":
        return true;
      case "フェア":
        return ["期間限定300円皿", "期間限定500円皿"].includes(item);
      case "ミニしゃり":
        return item === "うに";
      case "にぎり":
        return ["まぐろ", "漬けまぐろ", "サーモン", "えんがわ"].includes(item);
      case "軍艦・巻物":
        return [
          "ネギトロ軍艦",
          "ツナマヨ軍艦",
          "コーンマヨ軍艦",
          "シーサラダ軍艦",
          "鉄火巻き",
          "納豆巻き",
        ].includes(item);
      case "麺類":
        return ["醤油ラーメン", "みそラーメン"].includes(item);
      case "サイドメニュー":
        return ["たら白子", "あん肝"].includes(item);
      case "デザート・ドリンク":
        return ["シャーベット", "オレンジジュース"].includes(item);
      case "お持ち帰り・ご注文":
        return [
          "いか",
          "ぶり",
          "えんがわ",
          "穴子",
          "うに",
          "ネギトロ軍艦",
        ].includes(item);
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
            key={item}
            onClick={() => onItemClick(item)}
          >
            {item}
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
