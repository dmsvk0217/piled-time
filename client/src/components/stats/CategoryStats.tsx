import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface CategoryStat {
  name: string;
  averagePercent: number;
  totalPlan: number;
  totalAction: number;
  dailyTrend: { day: string; value: number }[];
}

interface Props {
  data: CategoryStat[];
}

export default function CategoryStats({ data }: Props) {
  return (
    <div className="space-y-4">
      {data.map((cat) => (
        <div key={cat.name} className="p-4 border rounded bg-white">
          <h4 className="font-semibold">{cat.name}</h4>
          <p>평균 달성률: {cat.averagePercent}%</p>
          <p>
            총 계획/실행 시간: {Math.floor(cat.totalPlan / 60)}h /{" "}
            {Math.floor(cat.totalAction / 60)}h
          </p>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={cat.dailyTrend}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
}
