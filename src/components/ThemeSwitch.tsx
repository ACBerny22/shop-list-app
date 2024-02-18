"use client";
import { MdLightMode, MdModeNight } from "react-icons/md";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeSwitchProps {}

export default function ThemeSwitch({}) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (theme === "dark") {
            setIsChecked(true);
        }
        setMounted(true);
    }, [theme]);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);

        if (!isChecked) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };

    return (
        <>
            {mounted && (
                <div className="flex items-center gap-3">
                    <MdLightMode className="text-neutral-900 dark:text-white"></MdLightMode>
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            onChange={handleCheckboxChange}
                            checked={isChecked}
                        />
                        <div className="relative w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-neutral-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-neutral-800"></div>
                    </label>
                    <MdModeNight className="text-neutral-900 dark:text-white"></MdModeNight>
                </div>
            )}
        </>
    );
}
