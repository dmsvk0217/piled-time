const HOURS = Array.from({ length: 24 }, (_, i) => (i + 6) % 24);
const MINUTES = [0, 10, 20, 30, 40, 50];

export default function TimeTable() {
  return (
    <div
      className="overflow-x-auto"
      style={{ minWidth: 320, maxWidth: 420, width: "100%", marginTop: 0 }}>
      <table className="border text-xs" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th className="border px-2 py-1">시간</th>
            {MINUTES.map((min) => (
              <th key={min} className="border px-2 py-1">
                {min.toString().padStart(2, "0")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {HOURS.map((hour) => (
            <tr key={hour}>
              <td className="border px-2 py-1 font-bold bg-gray-50">
                {hour === 0 ? "00" : hour.toString().padStart(2, "0")}
              </td>
              {MINUTES.map((min) => (
                <td
                  key={min}
                  className="border w-8 h-8 bg-white hover:bg-blue-50 cursor-pointer"></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
