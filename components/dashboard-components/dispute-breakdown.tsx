import Image from "next/image";
import React from "react";

const DisputeBreakdown = () => {
  const resolvedAmount = 44570;
  const pendingAmount = 6519;
  const totalAmount = resolvedAmount + pendingAmount;

  const resolvedPercentage = (resolvedAmount / totalAmount) * 100;

  // Adjust these values to change the visual arc height
  const resolvedOffset = (100 - resolvedPercentage) * 2.8;
  const pendingOffset = 100 * 2.2;

  return (
    <div className="w-full flex flex-col border border-[#f0f0f0] rounded-[25px] p-[20px]">
      <p className="text-[#5c5959] text-sm font-normal">Disputes breakdown</p>
      <div className="relative flex items-start justify-center">
        <svg
          width="279.53"
          height="240"
          viewBox="0 0 160 160"
          xmlns="http://www.w3.org/2000/svg"
          className="rounded-[16.71px]"
        >
          <defs>
            <linearGradient
              id="resolvedGradient"
              x1="100%"
              y1="100%"
              x2="100%"
              y2="1000%"
            >
              <stop offset="100%" stopColor="#FF9C33" />
              <stop offset="100%" stopColor="#FF9C33" />
            </linearGradient>
            <linearGradient
              id="pendingGradient"
              x1="0%"
              y1="100%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#5271FF" />
              <stop offset="100%" stopColor="#5271FF" />
            </linearGradient>
          </defs>
          <path
            d="M10,110 A50,50 0 1,1 150, 110"
            fill="none"
            stroke="url(#resolvedGradient)"
            strokeWidth="15"
            strokeDasharray="314 314"
            strokeDashoffset={resolvedOffset}
          />

          <path
            d="M10,110 A50,50 0 1,1 150, 110"
            fill="none"
            stroke="url(#pendingGradient)"
            strokeWidth="15"
            strokeDasharray="314 314"
            strokeDashoffset={pendingOffset - resolvedOffset}
          />
        </svg>
        <div className="absolute top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-y-4">
          <p className="text-[#5C5959] text-base font-medium text-center">
            Disputes
          </p>
          <p className="text-[#232323] text-2xl font-bold text-center">
            ₦{totalAmount.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="custom-shadow shadow-md p-[15px] rounded-[20px] flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-1">
            <Image src="curve-1.svg" width={24} height={24} alt="curve icon" />
            <p className="text-[#9B9697] text-xs font-normal">Resolved</p>
          </div>
          <p className="text-[#232323] text-base font-bold">
            ₦{resolvedAmount.toLocaleString()}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-1">
            <p className="text-[#9B9697] text-xs font-normal">Pending</p>
            <Image src="curve-2.svg" width={24} height={24} alt="curve icon" />
          </div>
          <p className="text-[#232323] text-base text-end font-bold">
            ₦{pendingAmount.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisputeBreakdown;
