"use client";
import React, { useState } from "react";
import Image from "next/image";
import styled from "./NigiriButton.module.css";

interface NigiriButtonProps {
  category: string;
  categories: string[];
  onItemClick: (item: { name: string; category: string; price: number; image: string }) => void;
  onCategoryChange: (newCategory: string) => void; // カテゴリ変更のためのコールバック関数を追加
}

// ランダムな価格を生成する関数
const getRandomPrice = () => Math.floor(Math.random() * 101) + 100;

const allItems = [
  { name: "ビーフ100％粗挽きステーキハンバーグ", category: "ステーキ/ハンバーグ", price: 990 ,image: "/images/01.jpeg"},
  { name: "焼きアボカドのイタリアン　粗挽きステーキハンバーグ", category: "ステーキ/ハンバーグ", price: 1100 ,image: "/images/02.jpeg"},
  { name: "九条ねぎと大葉おろしの　粗挽きステーキハンバーグ", category: "ステーキ/ハンバーグ", price: 900 ,image: "/images/03.jpeg" },
  { name: "鉄板目玉ハンバーグ", category: "ステーキ/ハンバーグ", price: 620 ,image: "/images/04.jpeg"},
  { name: "鉄板ハンバーグ元気盛り", category: "ステーキ/ハンバーグ", price: 920 ,image: "/images/05.jpeg"},
  { name: "鉄板ハンバーグミックスグリル", category: "ステーキ/ハンバーグ", price: 820 ,image: "/images/06.jpeg"},
  { name: "サーロインステーキ", category: "ステーキ/ハンバーグ", price: 1520 ,image: "/images/07.jpeg"},
  { name: "カットステーキ肉盛りプレート", category: "ステーキ/ハンバーグ", price: 1100 ,image: "/images/08.jpeg"},
  { name: "カットステーキ（6枚）　ネギ＆オニオンソース", category: "ステーキ/ハンバーグ", price: 990 ,image: "/images/09.jpeg"},
  { name: "カットステーキ（12枚）　ネギ＆オニオンソース", category: "ステーキ/ハンバーグ", price: 1800 ,image: "/images/10.jpeg"},
  { name: "チーズＯＮチーズＩＮハンバーグ", category: "チーズIN/チキン", price: 820 ,image: "/images/11-a.webp"},
  { name: "チーズＩＮハンバーグ", category: "チーズIN/チキン", price: 700 ,image: "/images/12.webp"},
  { name: "ミニチーズINハンバーグ　＆ミニ海老グラタン", category: "チーズIN/チキン", price: 950 ,image: "/images/13.webp"},
  { name: "ミニチーズINハンバーグ　＆ビーフシチューソース", category: "チーズIN/チキン", price: 1050 ,image: "/images/14.webp" },
  { name: "大人のお子様ランチプレート", category: "チーズIN/チキン", price: 990 ,image: "/images/15.webp"},
  { name: "チキテキスパイス焼き", category: "チーズIN/チキン", price: 770 ,image: "/images/16.webp"},
  { name: "若鶏のグリル　おろしオニオンソース", category: "チーズIN/チキン", price: 720 ,image: "/images/17.webp"},
  { name: "焼き九条ネギのもろみチキン", category: "チーズIN/チキン", price: 820 ,image: "/images/18.webp"},
  { name: "若鶏のグリル　ガーリックソース", category: "チーズIN/チキン", price: 620 ,image: "/images/19.webp"},
  { name: "レモンチキンソテー　バジルガーリックソース", category: "チーズIN/チキン", price: 920 ,image: "/images/20.webp"},
  { name: "お好み和膳　ミニチーズINハンバーグ", category: "和膳", price: 970 ,image: "/images/21.png"},
  { name: "お好み和膳　焼き九条ネギもろみチキン", category: "和膳", price: 970 ,image: "/images/22.png"},
  { name: "お好み和膳　彩り野菜の黒酢から揚げ", category: "和膳", price: 970 ,image: "/images/23.png"},
  { name: "お好み和膳　銀鮭", category: "和膳", price: 970 ,image: "/images/24.png"},
  { name: "うな丼　味噌汁・漬物付き", category: "丼/麺類/うどん", price: 1270 ,image: "/images/25.webp"},
  { name: "うな丼ダブル　味噌汁・漬物付き", category: "丼/麺類/うどん", price: 1970 ,image: "/images/26.webp"},
  { name: "たれカツ丼　味噌汁・漬物付き", category: "丼/麺類/うどん", price: 850 ,image: "/images/27.webp"},
  { name: "ねぎとろ丼　味噌汁・漬物付き", category: "丼/麺類/うどん", price: 920 ,image: "/images/28.webp"},
  { name: "海老と蒸し鶏のコク旨冷麺", category: "丼/麺類/うどん", price: 800 ,image: "/images/29.webp"},
  { name: "牛チゲ（半玉うどん入り）　ごはん付き", category: "丼/麺類/うどん", price: 970 ,image: "/images/30.webp"},
  { name: "ガス郎魚介つけ汁うどん　チャーシュー煮卵付き", category: "丼/麺類/うどん", price: 920 ,image: "/images/31.webp"},
  { name: "牛チゲ（半玉うどん入り）", category: "丼/麺類/うどん", price: 870 ,image: "/images/32.webp"},
  { name: "ガス郎魚介つけ汁うどん", category: "丼/麺類/うどん", price: 670 ,image: "/images/33.webp"},
  { name: "ねばとろサラダうどん", category: "丼/麺類/うどん", price: 850 ,image: "/images/34.webp"},
  { name: "ミニ大葉おろしうどん", category: "丼/麺類/うどん", price: 220 ,image: "/images/35.webp"},
  { name: "ねばとろサラダうどん　麺1.5倍", category: "丼/麺類/うどん", price: 990 ,image: "/images/36.webp"},
  { name: "ミニねぎとろ丼", category: "丼/麺類/うどん", price: 420 ,image: "/images/37.webp"},
  { name: "ミニしらす丼", category: "丼/麺類/うどん", price: 420 ,image: "/images/38.webp"},
  { name: "ミニたれカツ丼", category: "丼/麺類/うどん", price: 420 ,image: "/images/39.webp"},
  { name: "たっぷりマヨコーンピザ", category: "生パスタ/ライトミール", price: 500, image: "/images/mayo.webp"},
  { name: "マルゲリータピザ", category: "生パスタ/ライトミール", price: 770, image: "/images/matugerita.webp"},
  { name: "ちょいピザ　マルゲリータ", category: "生パスタ/ライトミール", price: 370 , image:"/images/mini-maru.webp"},
  { name: "魚介たっぷりシーフードピザ", category: "生パスタ/ライトミール", price: 920,image:"/images/seafood.webp"},
  { name: "ちょいピザ　マヨコーン", category: "生パスタ/ライトミール", price: 320 ,image:"/images/mini-mayo.webp"},
  { name: "シーフードトマトクリーム", category: "生パスタ/ライトミール", price: 870,image:"/images/tomato-seafood.webp"},
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
const NigiriButton = ({ category, onItemClick, onCategoryChange }: NigiriButtonProps) => {
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
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    } else {
      // 現在のカテゴリが最後のカテゴリのときに、次のカテゴリへ移動
      const currentCategoryIndex = categories.indexOf(category);
      if (currentCategoryIndex < categories.length - 1) {
        const nextCategory = categories[currentCategoryIndex + 1];
        onCategoryChange(nextCategory); // 親コンポーネントにカテゴリ変更を伝える
        setCurrentPage(0); // 次のカテゴリの最初のページに移動
      }
    }
  };

  const handleClick = (item: { name: string; category: string; price: number; image: string }) => {
    onItemClick(item);
  };

  return (
    <div className={styled.nigiri_screen}>
      <div className={styled.nigiri_container}>
        <div className={styled.pre_page}>
          <button
            className={styled.page_button}
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
          >
            ＜前へ
          </button>
        </div>
        <ul className={styled.nigiris}>
          {currentItems.map((item) => (
            <li
              className={styled.nigiri_button}
              key={item.name}
              onClick={() => handleClick(item)}
            >
              <div>{item.name}</div>
              <div className={styled.price}>{item.price}円</div>
              <Image src={item.image} alt={item.name} className={styled.image} width={100} height={100} />
            </li>
          ))}
        </ul>
        <div className={styled.next_page}>
        <button
  className={styled.page_button}
  onClick={() => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    } else {
      const currentCategoryIndex = categories.indexOf(category);
      if (currentCategoryIndex < categories.length - 1) {
        const nextCategory = categories[currentCategoryIndex + 1];
        onCategoryChange(nextCategory);  // categoriesを変更するためのコールバック
        setCurrentPage(0);
      }
    }
  }}
  disabled={currentPage === totalPages - 1 && categories.indexOf(category) === categories.length - 1}
>
  ＞次へ
</button>

        </div>
      </div>
      <span className={styled.number}>
        {currentPage + 1} / {totalPages}
      </span>
    </div>
  );
};

export default NigiriButton;