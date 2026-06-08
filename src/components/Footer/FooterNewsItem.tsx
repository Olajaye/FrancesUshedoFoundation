import Link from "next/link";
import React from "react";

interface FooterNewsItemProps {
  id: string;
  title: string;
  date: string;
}

const FooterNewsItem: React.FC<FooterNewsItemProps> = ({ id, title, date }) => {
  return (
    <Link href={`/news/${id}`} className="mb-5 block">
      <h4 className="text-white hover:text-darckLilac transition-colors duration-300 mb-1 line-clamp-2">
        {title}
      </h4>
      <p className="text-darckLilac text-sm">{date}</p>
    </Link>
  );
};

export default FooterNewsItem;
