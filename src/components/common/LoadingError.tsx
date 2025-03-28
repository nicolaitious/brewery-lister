import React from "react";
import { CircularProgress, Paper } from "@mui/material";

interface LoadingErrorProps {
    type: "loading" | "error";
    message?: string;
}

const LoadingError: React.FC<LoadingErrorProps> = ({ type, message }) => {
    if (type === "loading") {
        return (
            <CircularProgress sx={{ marginTop: 2, color: '#1CD760' }} />
        );
    }

    return (
        <p style={{ color: '#FF2700' }}>{message}</p>
    );
};

export default LoadingError;
