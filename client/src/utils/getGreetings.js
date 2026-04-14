import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { BsSunrise, BsSunset } from "react-icons/bs";

export const getGreetings = () => {
  const hour = new Date().getHours();

  if (hour < 12) {
    return {
      icon: BsSunrise,
      greeting: "Good morning",
      subtext: "Start strong — plan your applications",
      cta: "Add Application",
    };
  }

  if (hour < 18) {
    return {
      icon: IoSunnyOutline,
      greeting: "Good afternoon",
      subtext: "Keep the momentum going",
      cta: "Track Progress",
    };
  }

  if (hour < 22) {
    return {
      icon: BsSunset,
      greeting: "Good evening",
      subtext: "Wrap up and review your day",
      cta: "Review Applications",
    };
  }

  return {
    icon: IoMoonOutline,
    greeting: "Still working?",
    subtext: "Late night grind — stay focused",
    cta: "Quick Add",
  };
};