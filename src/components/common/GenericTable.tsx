import React, { useState } from "react";
import Search from "./Search";
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Link } from "@mui/material";

interface GenericTableProps<T> {
    data: T[];
    columns: Array<{
        id: keyof T;
        label: string;
        sortable?: boolean;
        searchable?: boolean;
    }>;
}

const GenericTable = <T extends object>({ data, columns }: GenericTableProps<T>) => {
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [orderBy, setOrderBy] = useState<keyof T | "">("");
    const [order, setOrder] = useState<"asc" | "desc">("asc");
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSort = (property: keyof T) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const sortedData = [...data].sort((a, b) => {
        if (!orderBy) return 0;
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        if (aValue < bValue) return order === "asc" ? -1 : 1;
        if (aValue > bValue) return order === "asc" ? 1 : -1;
        return 0;
    });

    const searchableKeys = columns.filter(column => column.searchable).map(column => column.id);

    const filteredData = sortedData.filter((item) =>
        searchableKeys.some((key) =>
            key in item && item[key]
                ? item[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
                : false
        )
    );

    return (
        <>
            <Search
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map(({ id, label, sortable }) => (
                                <TableCell key={String(id)}>
                                    {sortable ? (
                                        <TableSortLabel
                                            active={orderBy === id}
                                            direction={order}
                                            onClick={() => handleSort(id)}
                                        >
                                            {label}
                                        </TableSortLabel>
                                    ) : (
                                        label
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRow key={index}>
                                {columns.map(({ id }) => (
                                    <TableCell key={String(id)}>
                                        {id === "website_url" ? (
                                            row[id] ? (
                                                <Link href={row[id] as string} target="_blank" rel="noopener noreferrer" style={{ color: '#1CD760', textDecoration: 'none' }}>
                                                    Visit
                                                </Link>
                                            ) : "N/A"
                                        ) : (
                                            row[id] as React.ReactNode
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
};

export default GenericTable;