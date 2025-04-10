import { ModelsChart } from "@/components/metrics/models-chart";
import { TransactionsChart } from "@/components/metrics/transactions-chart";

export default function MetricsPage() {
  return (
    <div className="flex flex-col gap-4">
      <ModelsChart />
      <TransactionsChart />
    </div>
  );
}
