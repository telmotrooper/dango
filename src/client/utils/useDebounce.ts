// Source: https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci

import { useState, useEffect } from 'react'

const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      return (): void => { clearTimeout(handler) }
    },
    [value] 
  )

  return debouncedValue
}

export { useDebounce }
