import React from "react";
import Link from "next/link";

import styled from "./SubmitButton.module.css";

const SubmitButton = () => {
  return (
    <div className={styled.submit}>
      <Link href="/thanks">
        <div>注文する</div>
      </Link>
    </div>
  );
};

export default SubmitButton;
