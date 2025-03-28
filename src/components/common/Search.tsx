import React from "react";
import { TextField } from "@mui/material";

interface SearchProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({ searchTerm, setSearchTerm }) => {
    return (
        <TextField
            label="Search by name or state"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    );
};

export default Search;
