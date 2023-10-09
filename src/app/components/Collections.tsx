import { collectionItems } from "@/data/data";
import React from "react";
import CollectionItem, { CollectionProps } from "./CollectionItem";

function Collections() {
  return (
    <section className="mt-6">
      <h1 className="text-2xl text-gray-800 uppercase font-bold text-center">
        Collections
      </h1>
      <div className="flex flex-wrap gap-10 items-center justify-center mt-3">
        {collectionItems.map((item: CollectionProps) => (
          <CollectionItem key={item.text} {...item} />
        ))}
      </div>
    </section>
  );
}

export default Collections;
