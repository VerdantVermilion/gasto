import React, { useEffect, useState } from "react";
import styled from "./TemporaryTable.module.css";

interface TemporaryTableProps {
  items: string[];
}

const TemporaryTable = ({
  items,
  onRemoveItem,
}: TemporaryTableProps & { onRemoveItem: (index: number) => void }) => {
  const MAX_ORDERS = 4;

  const [quantities, setQuantities] = useState<number[]>(
    Array(MAX_ORDERS).fill(0)
  );

  useEffect(() => {
    // 関数型アップデートを使用して quantities の現在の値にアクセス
    setQuantities((currentQuantities) =>
      items.map((item, index) => (item ? currentQuantities[index] || 1 : 0))
    );
  }, [items]); // quantities を依存配列に含めない

  const incrementQuantity = (index: number) => {
    const totalQuantity = quantities.reduce((acc, qty) => acc + qty, 0);
    if (totalQuantity < MAX_ORDERS) {
      setQuantities(quantities.map((qty, i) => (i === index ? qty + 1 : qty)));
    }
  };

  const decrementQuantity = (index: number) => {
    setQuantities(
      quantities.map((qty, i) => (i === index && qty > 1 ? qty - 1 : qty))
    );
  };

  return (
    <table className={styled.table}>
      <thead>
        <tr className={styled.toc}>
          <th className={styled.th}>商品名</th>
          <th className={styled.th}>数量</th>
          <th className={styled.th}>増</th>
          <th className={styled.th}>減</th>
          <th className={styled.th}>取消</th>
        </tr>
      </thead>
      <tbody className={styled.tbody}>
        {Array.from({ length: MAX_ORDERS }).map((_, index) => {
          const item = items[index];
          return (
            <tr className={styled.tr} key={index}>
              <td className={styled.td}>{item || ""}</td>
              <td className={styled.td}>{item ? quantities[index] : ""}</td>
              <td
                className={`${styled.td} ${styled.increment_button}`}
                onClick={() => item && incrementQuantity(index)}
              >
                {item ? "＋" : ""}
              </td>
              <td
                className={`${styled.td} ${styled.decrement_button}`}
                onClick={() => item && decrementQuantity(index)}
              >
                {item ? "－" : ""}
              </td>
              <td
                className={`${styled.td} ${styled.delete_button}`}
                onClick={() => item && onRemoveItem(index)}
              >
                {item ? "取消" : ""}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TemporaryTable;
