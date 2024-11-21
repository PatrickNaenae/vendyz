import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { formatDateTime, capitalize, formatPrice } from "@/lib/utils";
import Image from "next/image";

// Helper function to generate random customer data
const generateRandomCustomer = (index: number) => {
  const firstNames = [
    "John",
    "Jane",
    "Mike",
    "Emily",
    "Chris",
    "Sarah",
    "David",
    "Emma",
  ];
  const lastNames = [
    "Doe",
    "Smith",
    "Johnson",
    "Brown",
    "Williams",
    "Taylor",
    "Lee",
    "Clark",
  ];
  const type = ["credit", "debit"];

  return {
    slug: `customer-${index}`,
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    type: type[Math.floor(Math.random() * type.length)],
    referenceNumber: `REF-${Math.floor(Math.random() * 10000)}`,
    amount: Math.floor(Math.random() * 1000),
    createdAt: new Date().toISOString(),
    imageUrl: `https://randomuser.me/api/portraits/men/${index}.jpg`,
  };
};

// Generate random customers
const generateRandomCustomers = (num: number) => {
  return Array.from({ length: num }, (_, index) =>
    generateRandomCustomer(index)
  );
};

const TransactionsTable = () => {
  const randomCustomers = generateRandomCustomers(10);

  return (
    <>
      <Card className="flex rounded-[20px] flex-col bg-white border border-[#f0f0f0] w-full overflow-x-scroll">
        <div className="flex items-center justify-between gap-4 p-6 text-[#5C5959]">
          <h2 className="text-sm font-normal">Transactions</h2>
          <p className="flex text-xs font-medium items-center gap-2 rounded-[100px] py-[8px] px-[15px] border border-[#f0f0f0] shadow-custom">
            View more
          </p>
        </div>
        <Table className="min-w-full">
          <TableHeader className="rounded-lg text-left text-sm font-normal bg-[#fafafa] border border-[#f0f0f0]">
            <TableRow>
              <TableHead
                scope="col"
                className="px-4 py-1 font-normal text-[#9b9697]"
              >
                Name
              </TableHead>
              <TableHead
                scope="col"
                className="px-4 py-1 font-normal text-[#9b9697]"
              >
                Amount
              </TableHead>
              <TableHead
                scope="col"
                className="px-4 py-1 font-normal text-[#9b9697]"
              >
                Date
              </TableHead>
              <TableHead
                scope="col"
                className="px-4 py-1 font-normal text-[#9b9697]"
              >
                Type
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-[#232323] font-medium bg-white text-sm">
            {randomCustomers.map((customer) => (
              <TableRow
                key={customer.slug}
                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
              >
                <TableCell className="whitespace-nowrap px-3 py-3 flex items-center">
                  <Image
                    src={customer.imageUrl}
                    alt="Customer Avatar"
                    className="h-8 w-8 rounded-full mr-3"
                    width={32}
                    height={32}
                  />
                  <div>
                    <p className="font-medium text-[#232323] text-sm">
                      {customer.firstName} {customer.lastName}
                    </p>
                    <p className="text-sm text-[#9B9697] font-normal">
                      {customer.referenceNumber}
                    </p>
                  </div>
                </TableCell>

                <TableCell className="whitespace-nowrap px-3 py-3">
                  {formatPrice(customer.amount)}
                </TableCell>

                <TableCell className="whitespace-nowrap px-3 py-3">
                  {formatDateTime(customer.createdAt)}
                </TableCell>

                <TableCell className="whitespace-nowrap px-3 py-3">
                  <p
                    className={`inline-flex text-sm rounded-[100px] py-0.5 px-4 ${
                      customer.type === "credit"
                        ? "text-[#449E6A] bg-[#EFFFF6] border border-[#83F3B2]"
                        : "text-[#EF5959] bg-[#FFE8E8] border border-[#FFBBBB]"
                    }`}
                  >
                    {capitalize(customer.type)}
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};

export default TransactionsTable;
