"use client";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import Card from "./Card";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const cardsData = [
  {
    title: "A Beautiful Giraffe",
    picture:
      "https://static.fotor.com/app/features/img/aiimage/3d/3d%20giraffe%20model%20made%20by%20Fotor%20ai%20image%20generator.png",
    description: "This is a stunning photo of a sunset over the ocean.",
  },
  {
    title: "A Cozy Fireplace",
    picture: "https://hearthnhome.getbynder.com/transform/7283d76b-29ce-4f40-adcf-587459d0a8c3/QDF-woodSTV-5700-SN2-960x456?io=transform:fill,width:960,height:456",
    description:
      "This photo of a crackling fireplace will make you feel warm and cozy.",
  },
  // ... additional card data objects
];

export default function CardExample() {
  return (
    <div>
      {cardsData.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
}
