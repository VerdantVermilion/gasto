"use client";
import React, { useState } from "react";
import styled from "./NigiriButton.module.css";

interface NigiriButtonProps {
  category: string;
  onItemClick: (item: { name: string; category: string; price: number }) => void;
  onBackgroundChange: () => void;
}

// ランダムな価格を生成する関数
const getRandomPrice = () => Math.floor(Math.random() * 101) + 100;

const allItems = [
  { name: "ビーフ100％粗挽きステーキハンバーグ", category: "ステーキ/ハンバーグ", price: 990 },
  { name: "焼きアボカドのイタリアン　粗挽きステーキハンバーグ", category: "ステーキ/ハンバーグ", price: 1100 },
  { name: "九条ねぎと大葉おろしの　粗挽きステーキハンバーグ", category: "ステーキ/ハンバーグ", price: 900 },
  { name: "鉄板目玉ハンバーグ", category: "ステーキ/ハンバーグ", price: 620 },
  { name: "鉄板ハンバーグ元気盛り", category: "ステーキ/ハンバーグ", price: 920 },
  { name: "鉄板ハンバーグミックスグリル", category: "ステーキ/ハンバーグ", price: 820},
  { name: "サーロインステーキ", category: "ステーキ/ハンバーグ", price: 1520},
  { name: "カットステーキ肉盛りプレート", category: "ステーキ/ハンバーグ", price: 1100},
  { name: "カットステーキ（6枚）　ネギ＆オニオンソース", category: "ステーキ/ハンバーグ", price: 990 },
  { name: "カットステーキ（12枚）　ネギ＆オニオンソース", category: "ステーキ/ハンバーグ", price: 1800 },
  { name: "チーズＯＮチーズＩＮハンバーグ", category: "チーズIN/チキン", price: 820 },
  { name: "チーズＩＮハンバーグ", category: "チーズIN/チキン", price: 700 },
  { name: "ミニチーズINハンバーグ　＆ミニ海老グラタン", category: "チーズIN/チキン", price: 950 },
  { name: "ミニチーズINハンバーグ　＆ビーフシチューソース", category: "チーズIN/チキン", price: 1050 },
  { name: "大人のお子様ランチプレート", category: "チーズIN/チキン", price: 990 },
  { name: "チキテキスパイス焼き", category: "チーズIN/チキン", price: 770 },
  { name: "若鶏のグリル　おろしオニオンソース", category: "チーズIN/チキン", price: 720 },
  { name: "焼き九条ネギのもろみチキン", category: "チーズIN/チキン", price: 820 },
  { name: "若鶏のグリル　ガーリックソース", category: "チーズIN/チキン", price: 620 },
  { name: "レモンチキンソテー　バジルガーリックソース", category: "チーズIN/チキン", price: 920 },
  { name: "お好み和膳　ミニチーズINハンバーグ", category: "和膳", price: 970 },
  { name: "お好み和膳　焼き九条ネギもろみチキン", category: "和膳", price: 970 },
  { name: "お好み和膳　彩り野菜の黒酢から揚げ", category: "和膳", price: 970 },
  { name: "お好み和膳　銀鮭", category: "和膳", price: 970 },
  { name: "うな丼　味噌汁・漬物付き", category: "丼/麺類/うどん", price: 1270 },
  { name: "うな丼ダブル　味噌汁・漬物付き", category: "丼/麺類/うどん", price: 1970 },
  { name: "たれカツ丼　味噌汁・漬物付き", category: "丼/麺類/うどん", price: 850 },
  { name: "ねぎとろ丼　味噌汁・漬物付き", category: "丼/麺類/うどん", price: 920 },
  { name: "海老と蒸し鶏のコク旨冷麺", category: "丼/麺類/うどん", price: 800 },
  { name: "牛チゲ（半玉うどん入り）　ごはん付き", category: "丼/麺類/うどん", price: 970 },
  { name: "ガス郎魚介つけ汁うどん　チャーシュー煮卵付き", category: "丼/麺類/うどん", price: 920 },
  { name: "牛チゲ（半玉うどん入り）", category: "丼/麺類/うどん", price: 870 },
  { name: "ガス郎魚介つけ汁うどん", category: "丼/麺類/うどん", price: 670 },
  { name: "ねばとろサラダうどん", category: "丼/麺類/うどん", price: 850 },
  { name: "ミニ大葉おろしうどん", category: "丼/麺類/うどん", price: 220 },
  { name: "ねばとろサラダうどん　麺1.5倍", category: "丼/麺類/うどん", price: 990 },
  { name: "ミニねぎとろ丼", category: "丼/麺類/うどん", price: 420 },
  { name: "ミニしらす丼", category: "丼/麺類/うどん", price: 420 },
  { name: "ミニたれカツ丼", category: "丼/麺類/うどん", price: 420 },
  { name: "たっぷりマヨコーンピザ", category: "生パスタ/ライトミール", price: 500 },
  { name: "マルゲリータピザ", category: "生パスタ/ライトミール", price: 770 },
  { name: "ちょいピザ　マルゲリータ", category: "生パスタ/ライトミール", price: 370 },
  { name: "魚介たっぷりシーフードピザ", category: "生パスタ/ライトミール", price: 920 },
  { name: "ちょいピザ　マヨコーン", category: "生パスタ/ライトミール", price: 320 },
  { name: "シーフードトマトクリーム", category: "生パスタ/ライトミール", price: 870 },
  { name: "濃厚ミートソース", category: "生パスタ/ライトミール", price: 570 },
  { name: "しらすと九条ネギの出汁醤油", category: "生パスタ/ライトミール", price: 670 },
  { name: "ガストバーガー", category: "生パスタ/ライトミール", price: 700 },
  { name: "オムライス（ビーフシチューソース）", category: "生パスタ/ライトミール", price: 970 },
  { name: "ミートドリア", category: "生パスタ/ライトミール", price: 520 },
  { name: "海老と明太子のドリア", category: "生パスタ/ライトミール", price: 820 },
  { name: "ガストブラックカレー", category: "生パスタ/ライトミール", price: 720 },
  { name: "ガストブラックカレー　元気盛り", category: "生パスタ/ライトミール", price: 1220 },
  { name: "ガストうすカツ　ブラックカレー", category: "生パスタ/ライトミール", price: 920 },
  { name: "富士山大盛りミートソース", category: "生パスタ/ライトミール", price: 920 },
  { name: "濃厚ミートソース〔ハーフ〕", category: "生パスタ/ライトミール", price: 370 },
  { name: "しらすと九条ネギの出汁醤油　〔ハーフ〕", category: "生パスタ/ライトミール", price: 420 },
  { name: "明太クリーム〔ハーフ〕", category: "生パスタ/ライトミール", price: 420 },
  { name: "ももから揚げ　3個", category: "から好しのからあげ", price: 500 },
  { name: "ハニーマスタードもも　3個", category: "から好しのからあげ", price: 500 },
  { name: "甘とろダレもも　3個", category: "から好しのからあげ", price: 500 },
  { name: "から好し定食　4個", category: "から好しのからあげ", price: 820 },
  { name: "甘とろから揚げ定食　4個", category: "から好しのからあげ", price: 870 },
  { name: "から好し定食　5個", category: "から好しのからあげ", price: 920 },
  { name: "おろしから揚げ定食　3個", category: "から好しのからあげ", price: 820 },
  { name: "から好し定食　6個", category: "から好しのからあげ", price: 1020 },
  { name: "おろしから揚げ定食　4個", category: "から好しのからあげ", price: 920 },
  { name: "ライス　ドリンクバーセット", category: "お得なセット/単品ライス", price: 370 },
  { name: "ライス・ポタージュ　ドリンクバーセット", category: "お得なセット/単品ライス", price: 470 },
  { name: "和食ドリンクバーセット", category: "お得なセット/単品ライス", price: 520 },
  { name: "和食セット", category: "お得なセット/単品ライス", price: 420 },
  { name: "蒸し鶏とケールのサラダ(S)　＆ドリンクバーセット", category: "お得なセット/単品ライス", price: 450 },
  { name: "蒸し鶏とケールのサラダ(S)　＆ポタージュドリンクバーセット", category: "お得なセット/単品ライス", price: 550 },
  { name: "ライス", category: "お得なセット/単品ライス", price: 200 },
  { name: "少なめライス", category: "お得なセット/単品ライス", price: 180 },
  { name: "大ライス", category: "お得なセット/単品ライス", price: 200 },

];
const ITEMS_PER_PAGE = 6;

const NigiriButton = ({ category, onItemClick, onBackgroundChange }: NigiriButtonProps) => {
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

  const handleClick = (item: { name: string; category: string; price: number }) => {
    onBackgroundChange();
    onItemClick(item);
  };

  return (
    <div className={styled.nigiri_screen}>
      <ul className={styled.nigiris}>
        {currentItems.map((item) => (
          <li
            className={styled.nigiri_button}
            key={item.name}
            onClick={() => handleClick(item)}
          >
            <div>{item.name}</div>
            <div className={styled.price}>{item.price}円</div>
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