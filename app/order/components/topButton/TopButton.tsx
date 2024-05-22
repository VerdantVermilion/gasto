"use client";
import React, { useState } from "react";
import styled from "./TopButton.module.css";

interface TopButtonProps {
  onCategoryChange: (category: string) => void;
}

const categories = [
  "トップ",
  "フェア",
  "ミニしゃり",
  "にぎり",
  "軍艦・巻物",
  "麺類",
  "サイドメニュー",
  "デザート・ドリンク",
  "お持ち帰り・ご注文",
];

const TopButton = ({ onCategoryChange }: TopButtonProps) => {
  const [selectedCategory, setSelectedCategory] = useState("トップ");

  const handleTabClick = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  return (
    <ul className={styled.tops}>
      {categories.map((category) => (
        <li
          className={
            selectedCategory === category
              ? styled.selectedTab
              : styled.top_button
          }
          key={category}
          onClick={() => handleTabClick(category)}
        >
          {category}
        </li>
      ))}
    </ul>
  );
};

export default TopButton;
