import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { FaqItem } from "../types";

export function Faq({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <div className="faq-item" key={item.question}>
          <button type="button" onClick={() => setOpenIndex(openIndex === index ? -1 : index)}>
            <span>{item.question}</span>
            <ChevronDown className={openIndex === index ? "is-open" : ""} size={20} />
          </button>
          {openIndex === index && <p>{item.answer}</p>}
        </div>
      ))}
    </div>
  );
}
