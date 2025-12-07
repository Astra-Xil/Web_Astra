"use client";

import { HStack, Input, Button } from "@chakra-ui/react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

export default function SearchBar({ value, onChange, onSearch }: Props) {
  const handleChange = (v: string) => {
    // ① 50文字上限
    if (v.length > 50) return;

    // ② 制御文字を除去
    const cleaned = v.replace(/[\u0000-\u001F\u007F]/g, "");

    onChange(cleaned);
  };

  return (
    <HStack mb={4} w="100%">
      <Input
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="作品名で検索"
        fontSize="md"
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
      />
      <Button onClick={onSearch} colorScheme="blue">
        検索
      </Button>
    </HStack>
  );
}
