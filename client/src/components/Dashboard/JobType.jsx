import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import { getJobType } from "../../api/application";

const JobType = () => {
  const { data } = useQuery({
    queryKey: ["jobType"],
    queryFn: getJobType,
  });

  const stats = data?.data;

  const chartData = stats
    ? [
        { name: "Remote", value: stats.Remote, fill: "#4ade80" },
        { name: "Onsite", value: stats.Onsite, fill: "#60a5fa" },
      ]
    : [];

  return (
    <div className="w-full h-84">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            outerRadius={120}
            innerRadius={60}
            paddingAngle={0}
            label={({ name, percent }) =>
              `${name}:(${(percent * 100).toFixed(0)}%)`
            }
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
            }}
            itemStyle={{ color: "#fff" }}
            labelStyle={{ color: "#9ca3af" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default JobType;
