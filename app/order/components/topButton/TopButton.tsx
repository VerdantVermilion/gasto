"use client";
import React, { useState } from "react";
import styled from "./TopButton.module.css";

interface TopButtonProps {
  onCategoryChange: (category: string) => void;
}

const categories = [
  "トップ",
  "ステーキ/ハンバーグ",
  "チーズIN/チキン",
  "和膳",
  "丼/麺類/うどん",
  "生パスタ/ライトミール",
  "から好しのからあげ",
  "お得なセット/単品ライス",
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
