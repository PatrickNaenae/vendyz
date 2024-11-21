import Image from "next/image";
import React from "react";

const Earnings = () => {
  return (
    <div className="w-full flex flex-col gap-8">
      <div className=" flex flex-col gap-6 bg-[#f3f5fd] rounded-[25px] p-[20px]">
        <p className="text-[#5C5959] text-sm font-normal">Vendyz earnings</p>
        <div className="flex flex-col gap-[4px]">
          <p className="text-[#5271FF] flex items-start gap-[5px] text-sm font-bold">
            ₦
            <span className="text-[#232323] text-2xl font-bold">84,310.12</span>
          </p>
          <div className="flex gap-1 text-[#232323] text-xs">
            <Image
              src="arrow-up.svg"
              width={18}
              height={18}
              alt="arrow facing up"
            />
            <small className="text-[#449E6A] font-medium text-xs">+2.11%</small>
            <small className="text-[#9B9697] font-normal text-xs">
              vs last 30 days
            </small>
          </div>
        </div>
      </div>
      <div className=" flex flex-col gap-[4px] border border-[#f0f0f0] rounded-[25px] p-[20px]">
        <p className="text-[#5C5959] text-sm font-normal">Escrow balance</p>
        <div className="flex items-start justify-between">
          <p className="text-[#232323] text-base font-bold">₦210,639.44</p>
          <div className="flex flex-col gap-1 text-[#232323] text-xs">
            <div className="flex  items-center gap-1">
              <Image
                src="arrow-down.svg"
                width={18}
                height={18}
                alt="arrow facing down"
              />
              <small className="text-[#E51837] font-medium text-xs">
                -1.10%
              </small>
            </div>
            <small className="text-[#9B9697] font-normal text-xs">
              vs last 30 days
            </small>
          </div>
        </div>
      </div>
      <div className=" flex flex-col gap-[4px] border border-[#f0f0f0] rounded-[25px] p-[20px]">
        <p className="text-[#5C5959] text-sm font-normal">Users</p>
        <div className="flex items-start justify-between">
          <p className="text-[#232323] text-base font-bold">3,008</p>
          <div className="flex flex-col gap-1 text-[#232323] text-xs">
            <div className="flex  items-center gap-1">
              <Image
                src="arrow-up.svg"
                width={18}
                height={18}
                alt="arrow facing up"
              />
              <small className="text-[#449E6A] font-medium text-xs">
                +3.25%
              </small>
            </div>
            <small className="text-[#9B9697] font-normal text-xs">
              vs last 30 days
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
