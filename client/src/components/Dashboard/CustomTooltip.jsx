const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="bg-[#0f172a] border border-white/10 rounded-lg px-3 py-2">
        <p className="text-gray-400 text-xs">
          {new Date(data.rawDate).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </p>
        <p className="text-white text-sm font-medium">
          {data.applications} applications
        </p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
