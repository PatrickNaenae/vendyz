import React from "react";
import { Separator } from "@/components/ui/separator";

const Disputes = () => {
  return (
    <div className="w-full flex flex-col gap-6 border border-[#f0f0f0] bg-[#FAFAFA] rounded-[25px] p-[20px]">
      <div className="flex items-center justify-between">
        <p className="text-[#5c5959] text-sm font-normal">Disputes breakdown</p>
        <p className="flex text-xs font-medium items-center gap-2 rounded-[100px] py-[8px] px-[15px] border border-[#f0f0f0] shadow-custom">
          View more
        </p>
      </div>
      <p className="text-[#232323] text-2xl font-bold">
        47{" "}
        <span className="text-[#9b9697] font-normal text-base">
          /1,305 orders
        </span>
      </p>
      <Separator />
      <p className="text-[#5C5959] text-end text-sm font-normal">Resolved</p>
      <p className="text-[#232323] text-end text-2xl font-bold">
        7{" "}
        <span className="text-[#9b9697] font-normal text-base">
          /47 disputes
        </span>
      </p>
    </div>
  );
};

export default Disputes;
