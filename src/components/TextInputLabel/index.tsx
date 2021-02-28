import React from "react";
import { InputLabel } from "./styles";

interface Props {
  titleName: string;
  placeHolderName: string;
  handleCepUser?(): void;
  onChange: string;
  value: string | number;
}

const TextInputLabel: React.FC<Props> = ({
  titleName,
  placeHolderName,
  onChange,
  value,
}) => {
  return (
    <InputLabel>
      <span>{titleName}</span>
      <input
        placeholder={placeHolderName}
        onChange={(e: React.FormEvent<HTMLInputElement>) => {}}
      />
    </InputLabel>
  );
};

export default TextInputLabel;
