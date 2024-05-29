import React, { useEffect, useState } from "react";
import styled from "./TemporaryTable.module.css";

interface Item {
  name: string;
  quantity: number;
  price: number;
}

interface TemporaryTableProps {
  items: Item[];
  onRemoveItem: (index: number) => void;
}

const TemporaryTable = ({ items, onRemoveItem }: TemporaryTableProps) => {
  const MAX_ORDERS = 4;

  const [quantities, setQuantities] = useState<number[]>(
    Array(MAX_ORDERS).fill(0)
  );

  useEffect(() => {
    // アイテムの数量を更新
    setQuantities(items.map((item) => item.quantity));
  }, [items]);

  const incrementQuantity = (index: number) => {
    const totalQuantity = quantities.reduce((acc, qty) => acc + qty, 0);
    if (totalQuantity < MAX_ORDERS) {
      const newQuantities = quantities.map((qty, i) => (i === index ? qty + 1 : qty));
      setQuantities(newQuantities);
      updateItemQuantity(index, newQuantities[index]);
    }
  };

  const decrementQuantity = (index: number) => {
    if (quantities[index] > 1) {
      const newQuantities = quantities.map((qty, i) => (i === index ? qty - 1 : qty));
      setQuantities(newQuantities);
      updateItemQuantity(index, newQuantities[index]);
    }
  };

  const updateItemQuantity = (index: number, quantity: number) => {
    items[index].quantity = quantity;
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
              <td className={styled.td}>{item ? item.name : ""}</td>
              <td className={styled.td}>{item ? item.quantity : ""}</td>
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
