import React from "react";
import Link from "next/link";
import styled from "./Home.module.css";

const Thanks = () => {
  return (
    <div className={styled.main_button}>
      <Link href="/order">
        <div>注文を開始</div>
      </Link>
    </div>
  );
};

export default Thanks;
