'use client'
import React from 'react';
import { BiMapPin, BiPhone } from 'react-icons/bi';
import { MdAlignHorizontalCenter } from 'react-icons/md';


const FooterContact: React.FC = () => {
  // const [email, setEmail] = useState('');

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log('Subscription email:', email);
  //   setEmail('');
    
  // };

  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-6">Contact</h3>
      
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-3">
          <BiPhone className="text-darckLilac" size={18} />
          <span className="text-gray-300">+45 677 8993000 223</span>
        </div>
        
        <div className="flex items-center gap-3">
          <MdAlignHorizontalCenter className="text-darckLilac" size={18} />
          <a href="mailto:office@template.com" className="text-gray-300 hover:text-darckLilac transition-colors duration-300">
            office@template.com
          </a>
        </div>
        
        <div className="flex items-start gap-3">
          <BiMapPin className="text-darckLilac mt-1" size={18} />
          <span className="text-gray-300">
            Main Str. no 45-46, b3, 56832,<br />
            Los Angeles, CA
          </span>
        </div>
      </div>
      
      {/* <form onSubmit={handleSubmit} className="flex">
        <input
          type="email"
          placeholder="Your email"
          className="py-3 px-4 bg-white/10 text-white placeholder-gray-400 focus:outline-none flex-grow"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button 
          type="submit"
          className="bg-darckLilac text-white font-medium py-3 px-6 hover:bg-darckLilac transition-colors duration-300"
        >
          SEND
        </button>
      </form> */}
    </div>
  );
};

export default FooterContact;