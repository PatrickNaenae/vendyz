import { Card } from "@/components/ui/card";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

const itemImages: { [key: string]: string } = {
  Laptop: "/orders-images/laptop.png",
  Smartphone: "/orders-images/smartphone.png",
  Headphones: "/orders-images/headphone.png",
  "Smart Watch": "/orders-images/smartwatch.png",
  Camera: "/orders-images/camera.png",
  Tablet: "/orders-images/tablet.png",
  Keyboard: "/orders-images/keyboard.png",
  Speaker: "/orders-images/speaker.png",
};

const generateRandomOrder = (index: number) => {
  const itemNames = [
    "Laptop",
    "Smartphone",
    "Headphones",
    "Smart Watch",
    "Camera",
    "Tablet",
    "Keyboard",
    "Speaker",
  ];

  const storeNames = [
    "TechStore",
    "BestBuy",
    "GadgetWorld",
    "DigitalMarket",
    "ElectroMart",
  ];

  const orderStatuses = ["Pending", "Paid"];

  const itemName = itemNames[Math.floor(Math.random() * itemNames.length)];

  return {
    slug: `order-${index}`,
    itemName,
    itemPrice: Math.floor(Math.random() * 500) + 100,
    storeName: storeNames[Math.floor(Math.random() * storeNames.length)],
    createdAt: new Date().toISOString(),
    imageUrl: itemImages[itemName] || "/images/default-item.jpg",
    status: orderStatuses[Math.floor(Math.random() * orderStatuses.length)],
  };
};

const OrdersList = () => {
  const randomOrders = Array.from({ length: 10 }, (_, index) =>
    generateRandomOrder(index)
  );

  return (
    <>
      <Card className="flex rounded-[20px] flex-col bg-white border border-[#f0f0f0] w-full p-6">
        <div className="flex items-center justify-between gap-4 text-[#5C5959]">
          <h2 className="text-sm font-normal">Orders</h2>
          <p className="flex text-xs font-medium items-center gap-2 rounded-[100px] py-[8px] px-[15px] border border-[#f0f0f0] shadow-custom">
            View more
          </p>
        </div>

        <div className="mt-4">
          {randomOrders.map((order) => (
            <div
              key={order.slug}
              className="flex justify-between items-center py-4 border-b last:border-none"
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={order.imageUrl}
                  alt="Item Image"
                  className="h-8 w-8 rounded-full aspect-square object-cover"
                  width={32}
                  height={32}
                />
                <div className="font-medium flex flex-col">
                  <p className="text-[#232323] text-sm">{order.itemName}</p>
                  <p className="text-sm text-[#5C5959]">
                    {formatPrice(order.itemPrice)}
                  </p>
                  <p className="text-sm font-normal text-[#9B9697]">
                    {order.storeName}
                  </p>
                </div>
              </div>

              <div
                className={`text-sm font-medium rounded-[100px] py-1 px-4 ${
                  order.status === "Paid"
                    ? "text-[#449E6A] bg-[#EFFFF6] border border-[#83F3B2]"
                    : "text-[#232323] bg-[#F4F4F4] border border-[#F0F0F0]"
                }`}
              >
                {order.status}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
};

export default OrdersList;
