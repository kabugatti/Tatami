import React from 'react';
import Image from "next/image";

interface TeamMember {
  name: string;
  surname: string;
  role: string;
  image: string;
  socialLinks: {
    github?: string;
    twitter?: string;
    telegram?: string;
  };
}

const TeamSection: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: 'DIEGO DUARTE',
      surname: 'FERNÁNDEZ',
      role: 'FOUNDER',
      image: '/Diego.webp',
      socialLinks: {
        github: 'https://github.com/diegoTech14',
        twitter: 'https://x.com/gioDiego14',
        telegram: 'https://t.me/diegotech1499'
      }
    },
    {
      name: 'DANIEL',
      surname: 'CALDERON DIAZ',
      role: 'CO-FOUNDER',
      image: '/Daniel.webp',
      socialLinks: {
        github: 'https://github.com/danielcdz',
        twitter: 'https://twitter.com/danielcdz',
        telegram: 'https://t.me/danielcdz'
      }
    }
  ];

  return (
    <div className="w-full bg-[#101010] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-white text-center mb-12">
          Meet the Tatami's team
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-24 gap-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="relative">
              {/* Team member card */}
              <div className="relative ">
                {/* Avatar image */}
                <img 
                  src={member.image} 
                  alt={`${member.name} ${member.surname}`}
                  className="w-full rounded-lg lg:h-[57vh] h-[45vh] aspect-square object-cover"
                />
                
                {/* Logo overlay in top right */}
                <div className="absolute top-0 overflow-hidden lg:-right-5 right-0 bg-[#FEB913] p-1 w-8 h-10 lg:w-12 lg:h-14 flex items-center justify-center">
                  <Image
                      src='/tatami-logo.png'
                      width={50}
                      height={50}
                      alt= 'Tatami logo'
                  />
                </div>
              </div>
              
              {/* Member info */}
              <div className="mt-4">
                <h3 className="text-white font-bold lg:text-xl">{member.name}</h3>
                <h4 className="text-white font-bold lg:text-xl">{member.surname}</h4>
                <p className="text-[#FEB913] font-bold border-b-2 border-[#FEB913] w-[40%] lg:w-[60%] pb-3 mt-2">{member.role}</p>
                
                {/* Divider line */}
                <div className="w-16 h-1 bg-yellow-500 my-3"></div>
                
                {/* Social icons */}
                <div className="flex space-x-4 mt-2">
                  {member.socialLinks.github && (
                    <a href={member.socialLinks.github} className="text-white hover:text-[#FEB913]" aria-label="GitHub">
                      <svg width="16" height="16" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.50538 0C2.90807 0 0 2.92951 0 6.55371C0 9.45074 1.8633 11.903 4.4482 12.7709C4.77137 12.8362 4.88975 12.6299 4.88975 12.4564C4.88975 12.3045 4.8791 11.7837 4.8791 11.2411C3.06946 11.6318 2.69262 10.4598 2.69262 10.4598C2.4018 9.70028 1.97089 9.50506 1.97089 9.50506C1.3786 9.10359 2.01404 9.10359 2.01404 9.10359C2.67105 9.147 3.0158 9.77631 3.0158 9.77631C3.59731 10.7745 4.53435 10.4924 4.91132 10.3188C4.96512 9.89562 5.13756 9.60267 5.32066 9.43995C3.87734 9.28801 2.35879 8.72382 2.35879 6.20643C2.35879 5.4903 2.61712 4.9044 3.02645 4.44873C2.96187 4.28601 2.73563 3.61315 3.09117 2.71259C3.09117 2.71259 3.64045 2.53895 4.87897 3.38532C5.40922 3.24186 5.95606 3.16888 6.50538 3.16827C7.05466 3.16827 7.6146 3.2443 8.13166 3.38532C9.37031 2.53895 9.91959 2.71259 9.91959 2.71259C10.2751 3.61315 10.0488 4.28601 9.98417 4.44873C10.4043 4.9044 10.652 5.4903 10.652 6.20643C10.652 8.72382 9.13342 9.27709 7.67931 9.43995C7.91634 9.64608 8.12087 10.0366 8.12087 10.6552C8.12087 11.534 8.11022 12.2394 8.11022 12.4563C8.11022 12.6299 8.22873 12.8362 8.55177 12.7711C11.1367 11.9029 13 9.45074 13 6.55371C13.0106 2.92951 10.0919 0 6.50538 0Z" fill="white"/>
                     </svg>

                    </a>
                  )}
                  {member.socialLinks.twitter && (
                    <a href={member.socialLinks.twitter} className="text-white hover:text-[#FEB913]" aria-label="Twitter">
                      <svg width="16" height="16" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.6903 1.03125H12.6582L8.35898 5.59397L13.4166 11.8028H9.45654L6.35483 8.03719L2.80578 11.8028H0.836732L5.43515 6.92247L0.583313 1.03125L4.64396 1.03125L7.44763 4.47318L10.6903 1.03125ZM9.99966 10.7091H11.0901L4.05146 2.06753H2.88133L9.99966 10.7091Z" fill="white"/>
                      </svg>

                    </a>
                  )}
                  {member.socialLinks.telegram && (
                    <a href={member.socialLinks.telegram} className="text-white hover:text-[#FEB913]" aria-label="Telegram">
                      <svg width="16" height="16" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13 6.5C13 10.0899 10.0899 13 6.5 13C2.91015 13 0 10.0899 0 6.5C0 2.91015 2.91015 0 6.5 0C10.0899 0 13 2.91015 13 6.5ZM6.73293 4.79859C6.10071 5.06155 4.83716 5.60581 2.94228 6.43138C2.63458 6.55374 2.47339 6.67345 2.45872 6.7905C2.43392 6.98831 2.68164 7.0662 3.01896 7.17227C3.06485 7.1867 3.11239 7.20165 3.16113 7.2175C3.49301 7.32538 3.93945 7.45159 4.17153 7.4566C4.38205 7.46115 4.61702 7.37436 4.87643 7.19623C6.64688 6.00113 7.56079 5.39706 7.61817 5.38404C7.65865 5.37485 7.71474 5.3633 7.75275 5.39708C7.79075 5.43086 7.78702 5.49484 7.78299 5.512C7.75845 5.61662 6.78607 6.52063 6.28286 6.98846C6.12598 7.13431 6.01471 7.23776 5.99196 7.26139C5.941 7.31431 5.88907 7.36438 5.83916 7.41249C5.53083 7.70972 5.29962 7.93261 5.85196 8.29659C6.11739 8.47151 6.32979 8.61615 6.54169 8.76046C6.7731 8.91805 7.00391 9.07523 7.30254 9.27099C7.37863 9.32086 7.45129 9.37266 7.52207 9.42312C7.79137 9.61511 8.03332 9.7876 8.33223 9.76009C8.50592 9.74411 8.68533 9.58079 8.77645 9.09369C8.99178 7.94253 9.41505 5.44833 9.51287 4.42053C9.52144 4.33048 9.51066 4.21523 9.502 4.16464C9.49334 4.11405 9.47525 4.04198 9.40949 3.98862C9.33161 3.92542 9.21139 3.9121 9.15761 3.91305C8.91314 3.91735 8.53805 4.04778 6.73293 4.79859Z" fill="white"/>
                      </svg>

                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;