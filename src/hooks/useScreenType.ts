import { useState, useEffect } from "react";
import { ScreenType } from "models/ScreenType.enum";

const useScreenType = (): ScreenType => {
  const breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
  };
  const getCurrentScreenType = (width: number): ScreenType => {
    if (width < breakpoints.sm) {
      return ScreenType.Mobile;
    } else if (width >= breakpoints.sm && width < breakpoints.md) {
      return ScreenType.Tablet;
    } else if (width >= breakpoints.md && width < breakpoints.lg) {
      return ScreenType.Desktop;
    }
    return ScreenType.LargeDesktop;
  };

  const [screenType, setScreenType] = useState<ScreenType>(
    getCurrentScreenType(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenType(getCurrentScreenType(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenType;
};

export default useScreenType;
