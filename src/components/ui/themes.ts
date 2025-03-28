import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '1rem',
                }
            }
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    borderRadius: '0.5rem',
                    width: '100%',
                    maxHeight: '400px',
                    overflowY: 'auto',
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    color: 'white',
                    padding: '16px',
                },
            },
        },
        MuiTableSortLabel: {
            styleOverrides: {
                root: {
                    color: 'white',
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: '#333',
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    transition: '0.5s ease',
                    '&:hover': {
                        backgroundColor: '#555',
                    },
                },
            },
        },
    },
});