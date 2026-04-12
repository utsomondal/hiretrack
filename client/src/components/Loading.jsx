const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-dark-900">
      <div className="relative flex items-center justify-center w-16 h-16">
        <div className="absolute -inset-2 rounded-full border border-accent/40 animate-pulse-ring" />
        <div className="absolute inset-0 rounded-full border-2 border-white/6" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent border-r-accent animate-[spin_0.9s_cubic-bezier(0.5,0.1,0.5,0.9)_infinite]" />
        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
      </div>
    </div>
  );
};

export default Loading;
