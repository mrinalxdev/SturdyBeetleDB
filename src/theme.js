import { createContext, useState, useMemo } from 'react'
import { createTheme  } from '@mui/material/styles'


export const tokens = (mode) = () => ({
    
    ..(mode === 'dark'
        ?  {
            primary: {
                100: "#cdccda",
                200: "#9b99b5",
                300: "#6a6691",
                400: "#38336c",
                500: "#060047",
                600: "#050039",
                700: "#04002b",
                800: "#02001c",
                900: "#01000e"
            },
            secondaryPink : {
                100: "#f0ccdf",
                200: "#e199bf",
                300: "#d1669e",
                400: "#c2337e",
                500: "#b3005e",
                600: "#8f004b",
                700: "#6b0038",
                800: "#480026",
                900: "#240013"
            },
            buttonsDarkPink : {
                100: "#fbcce0",
                200: "#f699c1",
                300: "#f266a2",
                400: "#ed3383",
                500: "#e90064",
                600: "#ba0050",
                700: "#8c003c",
                800: "#5d0028",
                900: "#2f0014"
            },
            hoverLightPink : {
                100: "#ffdfec",
                200: "#ffbfd8",
                300: "#ff9fc5",
                400: "#ff7fb1",
                500: "#ff5f9e",
                600: "#cc4c7e",
                700: "#99395f",
                800: "#66263f",
                900: "#331320"
            }
        }
    
    )
})

export const themeSettings = (mode) => {
    const colors = tokens(mode)

    return {
        palette : {
            mode : mode,
            ...(mode === 'dark'
            
            ? {
                primary : {
                        main : colors.primary[500],
                    },
                    secondary : {
                        main : colors.secondaryPink[500],
                    },
                    neutral : {
                        dark : colors.buttonsDarkPink[700],
                        main : colors.buttonsDarkPink[500],
                        light : colors.buttonsDarkPink[100]
                    },
                    background : {
                        default : colors.primary[500],
                    }
                } : {
                main : colors.primary[500],
                },
                secondary : {
                    main : colors.secondaryPink[500],
                },
                neutral : {
                    dark : colors.buttonsDarkPink[700],
                    main : colors.buttonsDarkPink[500],
                    light : colors.buttonsDarkPink[100]
                },
                background : {
                    default : '#fcfcfc'
                }     
            )
        }
    }
}
