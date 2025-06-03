import React from 'react';

interface FooterNewsItemProps {
  title: string;
  date: string;
}

const FooterNewsItem: React.FC<FooterNewsItemProps> = ({ title, date }) => {
  return (
    <div className="mb-5">
      <h4 className="text-white hover:text-darckLilac transition-colors duration-300 mb-1">
        <a href="#">{title}</a>
      </h4>
      <p className="text-darckLilac text-sm">{date}</p>
    </div>
  );
};

export default FooterNewsItem;