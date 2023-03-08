import { createContext, useState } from "react"

const ThemeContext = createContext()

function ThemeProviderWrapper(props) {

    const [themeValue, setThemeValue] = useState('light')

    const switchTheme = () => {
        if (themeValue === 'dark') setThemeValue('light')
        if (themeValue === 'light') setThemeValue('dark')
    }

    return (
        <ThemeContext.Provider value={{ themeValue, switchTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeProviderWrapper }