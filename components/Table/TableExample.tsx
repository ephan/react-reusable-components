"use client";
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import {Table} from './Table'
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

type User = {
  id: number;
  name: string;
  email: string;
  age: number;
};

export default function TableExample() {
  const headers = [
    { key: "id", title: "ID" },
    { key: "name", title: "Name", sortable: true },
    { key: "email", title: "Email", sortable: true },
    { key: "age", title: "Age", sortable: true },
  ];
  
  const users: User[] = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", age: 25 },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", age: 35 },
    { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", age: 45 },
    { id: 4, name: "Alice Brown", email: "alice.brown@example.com", age: 30 },
    { id: 5, name: "Charlie Davis", email: "charlie.davis@example.com", age: 40 },
    { id: 6, name: "David Lee", email: "david.lee@example.com", age: 20 },
  ];

  const [pageSize, setPageSize] = useState(4);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Table columns={headers} data={users} pageSize={pageSize} />
      <div className="mt-4">
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => setPageSize(3)}
        >
          Set page size to 3
        </button>
        <button
          className="ml-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => setPageSize(6)}
        >
          Set page size to 6
        </button>
      </div>
    </div>
  );
}
