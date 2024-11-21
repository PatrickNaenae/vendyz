import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className="flex w-full h-[90px] items-center justify-between gap-4 p-[32px] bg-[#fafafa]">
      <h2 className="text-2xl font-medium text-[#232323]">Overview</h2>
      <div className="relative">
        <div role="button" className="flex items-center justify-end gap-[15px]">
          <div className="border border-[#f0f0f0] rounded-full p-[10px]">
            <Image
              src="/header-icons/settings.svg"
              width={20}
              height={20}
              alt="admin"
            />
          </div>
          <div className="border border-[#f0f0f0] rounded-full p-[10px]">
            <Image
              src="/header-icons/notif.svg"
              width={20}
              height={20}
              alt="admin"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
