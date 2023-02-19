import React from "react";

type CardProps = {
  title: string;
  picture: string;
  description: string;
};

const Card = ({ title, picture, description }: CardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <img className="w-full h-64 object-cover" src={picture} alt={title} />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default Card;