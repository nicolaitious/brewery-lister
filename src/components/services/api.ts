import { Brewery } from "../../types/BreweryTypes";

export const fetchBreweries = async (): Promise<Brewery[]> => {
    try {
        const response = await fetch("https://api.openbrewerydb.org/breweries");
        if (!response.ok) {
            throw new Error("Failed to fetch breweries, we're brewery sorry!");
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};