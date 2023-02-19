"use client";
import React, { useState } from "react";
import classNames from "classnames";

import { ChevronLeftIcon, ChevronRightIcon, ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";


type Column = {
  key: string;
  title: string;
  sortable?: boolean;
};

type TableProps = {
  columns: Column[];
  data: Record<string, any>[];
  pageSize: number;
};

export const Table = ({ columns, data, pageSize }: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const paginatedData = data.slice(startIdx, endIdx);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleHeaderClick = (column: Column) => {
    if (!column.sortable) {
      return;
    }
    if (sortColumn === column.key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column.key);
      setSortOrder("asc");
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortColumn) {
      return paginatedData;
    }
    const sorted = paginatedData.slice().sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (aValue < bValue) {
        return sortOrder === "asc" ? -1 : 1;
      } else if (aValue > bValue) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
    return sorted;
  }, [sortColumn, sortOrder, paginatedData]);

  const totalPages = Math.ceil(data.length / pageSize);

  return (
    <div className="w-full">
      <table className="w-full table-auto">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="py-2 px-4 cursor-pointer text-center"
                onClick={() => handleHeaderClick(column)}
              >
                <span className="inline-block">{column.title}</span>
                {column.sortable && (
                  <span className="ml-1 inline-block">
                    {(sortColumn === column.key && sortOrder === "asc") && (
                        <ArrowUpIcon className="h-[10px] w-[10px]" />
                    )}
                    {(sortColumn === column.key && sortOrder === "desc") && (
                        <ArrowDownIcon className="h-[10px] w-[10px]" />
                    )}
                    </span>
                )}
                </th>
            ))}
            </tr>
            </thead>
            <tbody>
                {sortedData.map((row, index) => (
                    <tr key={index}>
                        {columns.map((column) => (
                            <td
                                key={column.key}
                                className="py-2 px-4 text-center"
                            >
                                {row[column.key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
                <span className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="ml-2 text-sm text-gray-700"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeftIcon className="h-4 w-4" />
                </button>
                <button
                    className="ml-2 text-sm text-gray-700"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRightIcon className="h-4 w-4" />
                </button>
            </div>
        </div>
    </div>
    );
};

                      
