"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./stepDetailForm.module.css";

interface MenuDetailFormProps {
  item: { name: string; category: string; price: number; image: string };
  onSave: (details: { name: string; quantity: number; price: number; options: string[] }) => void;
  onClose: () => void;
}

const StepDetailForm: React.FC<MenuDetailFormProps> = ({
  item,
  onSave,
  onClose,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [step, setStep] = useState<number>(1);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSave = () => {
    onSave({ name: item.name, quantity, price: item.price, options: selectedOptions });
    onClose();
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleOptionChange = (option: string) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.includes(option)
        ? prevOptions.filter((opt) => opt !== option)
        : [...prevOptions, option]
    );
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.formContainer}>
        <div className={styles.step_titles}>
          <div className={styles.titles}>
            <p id={step === 1 ? styles.selected : ""} onClick={() => setStep(1)}>メニュー選択</p>
            <p id={step === 2 ? styles.selected : ""} onClick={() => setStep(2)}>オプション選択</p>
            <p id={step === 3 ? styles.selected : ""} onClick={() => setStep(3)}>数量選択</p>
          </div>
          <button onClick={onClose} className={styles.cancel_button}>
            キャンセル
          </button>
        </div>

        {step === 1 && (
          <div>
            <h2>{item.name}</h2>
            <Image src={item.image} alt={item.name} width={300} height={200} className={styles.image} />
            <button onClick={handleNextStep} className={styles.button}>
              次へ
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2>オプション選択</h2>
            <div className={styles.options}>
              <label className={styles.optionLabel}>
                <input
                  type="checkbox"
                  checked={selectedOptions.includes("味噌汁セット")}
                  onChange={() => handleOptionChange("味噌汁セット")}
                />
                味噌汁セット
              </label>
              <label className={styles.optionLabel}>
                <input
                  type="checkbox"
                  checked={selectedOptions.includes("ドリンクバーセット")}
                  onChange={() => handleOptionChange("ドリンクバーセット")}
                />
                ドリンクバーセット
              </label>
              <label className={styles.optionLabel}>
                <input
                  type="checkbox"
                  checked={selectedOptions.includes("パンセット")}
                  onChange={() => handleOptionChange("パンセット")}
                />
                パンセット
              </label>
            </div>
            <button onClick={handlePrevStep} className={styles.button}>
              戻る
            </button>
            <button onClick={handleNextStep} className={styles.button}>
              次へ
            </button>
          </div>
        )}

        {step === 3 && (
          <div className={styles.op_container}>
            <h2 className={styles.subtitle}>数量を選択してください</h2>
            <div className={styles.quantityContainer}>
              <button onClick={handleDecreaseQuantity} className={styles.quantityButton}>-</button>
              <span className={styles.quantityDisplay}>{quantity}</span>
              <button onClick={handleIncreaseQuantity} className={styles.quantityButton}>+</button>
            </div>
            <button onClick={handlePrevStep} className={styles.button}>
              戻る
            </button>
            <button onClick={handleSave} className={styles.button}>
              保存
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepDetailForm;
