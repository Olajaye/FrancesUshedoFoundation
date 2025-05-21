import React from 'react';
import { BiHeartCircle } from 'react-icons/bi';


const FooterLogo: React.FC = () => {
  return (
    <div className="flex items-center gap-2 text-2xl font-bold">
      <BiHeartCircle className="text-darckLilac fill-darktext-darckLilac" size={28} />
      <span>
        <span className="text-white">The</span>
        <span className="text-darckLilac">Charity</span>
      </span>
    </div>
  );
};

export default FooterLogo;