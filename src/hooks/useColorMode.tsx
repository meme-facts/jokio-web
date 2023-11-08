"use client";
import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import { set } from "react-hook-form";

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage("color-theme", "light");

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

    if (darkThemeMq.matches) {
      setColorMode("dark");

      bodyClass.add(className);
    } else {
      bodyClass.remove(className);
    }
    // colorMode === "dark"
    //   ? bodyClass.add(className)
    //   : bodyClass.remove(className);
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
