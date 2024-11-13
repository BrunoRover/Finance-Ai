import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_componentes/summary-cards";
import TimeSelect from "./_componentes/time-select";
import { isMatch } from "date-fns";

const Home = async ({
  searchParams: { month },
}: {
  searchParams: { month?: string };
}) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const currentMonth = new Date().getMonth() + 1;
  const selectedMonth = month ?? String(currentMonth).padStart(2, "0");

  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect("?month=01");
  }

  return (
    <div>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <SummaryCards month={selectedMonth} />
      </div>
    </div>
  );
};

export default Home;

/*
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_componentes/summary-cards";
import TimeSelect from "./_componentes/time-select";

const Home = async ({ searchParams: { month } }: { searchParams: { month?: string } }) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  // Define um valor padrão para `month` como o mês atual caso esteja undefined
  const currentMonth = new Date().getMonth() + 1;
  const selectedMonth = month ?? String(currentMonth).padStart(2, "0");

  return (
    <div>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <SummaryCards month={selectedMonth} />
      </div>
    </div>
  );
};

export default Home;
*/
