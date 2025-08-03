interface Props {
  plan: Record<string, number[]>; // key: date, value: 48-length array (half-hour slots)
  action: Record<string, number[]>;
}

export default function WeeklyTimeTable({ plan, action }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h3 className="font-semibold mb-1">Plan</h3>
        {plan.text}
      </div>
      <div>
        <h3 className="font-semibold mb-1">Action</h3>
        {action.text}
      </div>
    </div>
  );
}
