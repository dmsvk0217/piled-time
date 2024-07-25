import React from "react";

const WeeklyStatisticsPage = () => {
  // 더미 데이터
  const weeklyTimeStats = [
    { day: "Monday", hours: 5 },
    { day: "Tuesday", hours: 6 },
  ];
  const weeklyAchievementStats = [
    { day: "Monday", achieved: 0.75 },
    { day: "Tuesday", achieved: 0.5 },
  ];

  return (
    <div>
      <h1>Weekly Statistics Page</h1>
      <h2>Weekly Time Statistics</h2>
      <ul>
        {weeklyTimeStats.map((stat) => (
          <li key={stat.day}>
            {stat.day} - {stat.hours} hours
          </li>
        ))}
      </ul>

      <h2>Weekly Achievement Statistics</h2>
      <ul>
        {weeklyAchievementStats.map((stat) => (
          <li key={stat.day}>
            {stat.day} - {stat.achieved * 100}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeeklyStatisticsPage;
