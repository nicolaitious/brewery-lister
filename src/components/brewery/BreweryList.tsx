import React, { useState, useEffect } from "react";
import { Paper, TextField } from "@mui/material";
import { Brewery } from "../../types/BreweryTypes";
import GenericTable from "../common/GenericTable";
import LoadingError from "../common/LoadingError";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "../ui/themes";
import { fetchBreweries } from "../services/api";

const BreweryList: React.FC = () => {
    const [breweries, setBreweries] = useState<Brewery[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay, to preview the loader
                const data: Brewery[] = await fetchBreweries();
                const microbreweries = data.filter(brewery => brewery.brewery_type === "micro");
                setBreweries(microbreweries);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Define columns with the correct type, ensuring id is keyof Brewery
    const columns: { id: keyof Brewery; label: string; sortable?: boolean, searchable?: boolean }[] = [
        { id: "name", label: "Name", sortable: true, searchable: true },
        { id: "city", label: "City" },
        { id: "state", label: "State", sortable: true, searchable: true },
        { id: "website_url", label: "Website" },
    ];

    return (
        <ThemeProvider theme={darkTheme}>
            <Paper sx={{
                overflow: "hidden",
                padding: '2rem'
            }}>
                {loading ? (
                    <LoadingError type="loading" />
                ) : error ? (
                    <LoadingError type="error" message={error} />
                ) : (
                    <GenericTable
                        data={breweries}
                        columns={columns}
                    />
                )}
            </Paper>
        </ThemeProvider>
    );
};

export default BreweryList;
