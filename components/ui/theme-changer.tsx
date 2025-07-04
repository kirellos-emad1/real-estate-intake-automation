'use client'
import { useTheme } from 'next-themes'
import { Button } from './button'
import { FaMoon, FaSun } from 'react-icons/fa'

const ThemeChanger = () => {
    const { theme, setTheme } = useTheme()

    return (

        <Button
            variant='outline'
            size='icon'
            className='rounded-full group cursor-pointer flex h-10 w-10 items-center justify-center border border-black/10 dark:border-white/10 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-lg transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/5 hover:border-amber-400/50 hover:shadow-lg hover:shadow-amber-400/25'
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
            <FaSun className='absolute h-10 w-10 rotate-0 scale-100 dark:-rotate-90 dark:scale-0 text-gray-600 dark:text-gray-300 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-200' />
            <FaMoon className='absolute h-10 w-10 rotate-90 scale-0 dark:-rotate-0 dark:scale-100 text-gray-600 dark:text-gray-300 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-200' />

        </Button>
    )
}

export default ThemeChanger