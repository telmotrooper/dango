// ANSI escape codes for formatting in the terminal
export const bold   = (str: string): string => '\u001b[1m'  + str + '\u001b[22m'
export const red    = (str: string): string => '\u001b[31m' + str + '\u001b[0m'
export const green  = (str: string): string => '\u001b[32m' + str + '\u001b[0m'
export const blue   = (str: string): string => '\u001b[34m' + str + '\u001b[0m'
export const yellow = (str: string): string => '\u001b[33m' + str + '\u001b[0m'
