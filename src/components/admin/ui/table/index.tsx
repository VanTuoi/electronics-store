import React, { ReactNode } from "react";

interface TableProps {
    children: ReactNode;
    className?: string;
}

interface TableHeaderProps {
    children: ReactNode;
    className?: string;
}

interface TableBodyProps {
    children: ReactNode;
    className?: string;
}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    children: ReactNode;
    className?: string;
}

type TableCellProps = {
    children: React.ReactNode;
    isHeader?: boolean;
    className?: string;
} & React.TdHTMLAttributes<HTMLTableCellElement>;

const Table: React.FC<TableProps> = ({ children, className }) => (
    <table className={`min-w-full  ${className}`}>{children}</table>
);

const TableHeader: React.FC<TableHeaderProps> = ({ children, className }) => (
    <thead className={className}>{children}</thead>
);

const TableBody: React.FC<TableBodyProps> = ({ children, className }) => (
    <tbody className={className}>{children}</tbody>
);

const TableRow: React.FC<TableRowProps> = ({ children, className, ...rest }) => (
    <tr className={className} {...rest}>
        {children}
    </tr>
);

const TableCell: React.FC<TableCellProps> = ({ children, isHeader = false, className = "", ...rest }) => {
    const CellTag = isHeader ? "th" : "td";
    return (
        <CellTag className={className} {...rest}>
            {children}
        </CellTag>
    );
};

export { Table, TableBody, TableCell, TableHeader, TableRow };
