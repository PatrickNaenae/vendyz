import {
  DisputeBreakdown,
  Disputes,
  Earnings,
  OrdersList,
  TransactionsTable,
} from "@/components/dashboard-components";
import { PostList } from "@/components/dashboard-components/posts.list";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col">
      <div className="flex flex-col xl:flex-row w-full h-full gap-8 p-2 lg:p-8">
        <div className="w-full xl:w-[746px] flex flex-col gap-8">
          <div className="w-full flex flex-col lg:flex-row gap-8">
            <Earnings />
            <DisputeBreakdown />
          </div>
          <TransactionsTable />
        </div>
        <div className="w-full xl:w-[338px] flex flex-col gap-8">
          <Disputes />
          <OrdersList />
        </div>
      </div>
      <PostList />
    </main>
  );
}
