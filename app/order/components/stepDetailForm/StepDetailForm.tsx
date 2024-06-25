"use client";

import React, { useState } from "react";
import styles from "./stepDetailForm.module.css";

interface MenuDetailFormProps {
  item: { name: string; category: string; price: number };
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

  return (
    <div className={styles.overlay}>
      <div className={styles.formContainer}>
        <div className={styles.step_titles}>
          <div className={styles.titles}>
            <p id={step === 1 ? styles.selected : ""}>メニュー選択</p>
            <p id={step === 2 ? styles.selected : ""}>オプション選択</p>
            <p id={step === 3 ? styles.selected : ""}>数量選択</p>
          </div>
          <button onClick={onClose} className={styles.button}>
            キャンセル
          </button>
        </div>

        {step === 1 && (
          <div className={styles.main_container}>
            <h2>{item.name}</h2>
            <button onClick={handleNextStep} className={styles.nextbutton}>
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
                  checked={selectedOptions.includes("パンセット")}
                  onChange={() => handleOptionChange("パンセット")}
                />
                パンセット
              </label>
              <label className={styles.optionLabel}>
                <input
                  type="checkbox"
                  checked={selectedOptions.includes("ドリンクバーセット")}
                  onChange={() => handleOptionChange("ドリンクバーセット")}
                />
                ドリンクバーセット
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
          <div>
            <h2>数量選択</h2>
            <label className={styles.label}>
              数量:
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
                className={styles.input}
              />
            </label>
            <button onClick={handlePrevStep} className={styles.button}>
              戻る
            </button>
            <button onClick={handleSave} className={styles.button}>
              注文かごに入れる
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepDetailForm;
