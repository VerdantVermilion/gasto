"use client";

import React from 'react';
import styled from "./OrderCartButton.module.css";

const orderCartButton = () => {
  return <div className={styled.main}>
    <button>注文かご</button>
    <div className={styled.margin}></div>
  <div className={styled.look}>注文かごをみる</div>
  </div>
};

export default orderCartButton;
