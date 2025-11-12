import React, { useEffect } from 'react'
import { IoSunny } from "react-icons/io5";
import { IoMoonSharp } from "react-icons/io5";


type ThemeType = {
  theme: string
  setTheme: React.Dispatch<React.SetStateAction<string>>
}
const ThemeToggleBtn: React.FC<ThemeType> = ({theme, setTheme}) => {
  
  useEffect(() => {
    const prefersDarkMode = window.matchMedia(`(prefers-color-scheme: dark)`).matches
    
    setTheme(theme || (prefersDarkMode ? 'dark' : 'light'))
    // run only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  useEffect(() => {
    if(theme === 'dark'){
      document.documentElement.classList.add('dark')
    }else{
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])
  
  return (
    <button aria-label="Toggle theme" type="button">
      {theme === 'dark'? (
        <IoSunny onClick={() => setTheme('light')} />
      ): 
      (
        <IoMoonSharp onClick={() => setTheme('dark')} />
      )}
      
    </button>
  )
}

export default ThemeToggleBtn
