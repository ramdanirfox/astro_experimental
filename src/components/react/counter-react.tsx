/** @jsxImportSource react */
// src/components/MyCounter.jsx
import React, { useEffect, useState, type ReactNode } from 'react';
// This is a standard React functional component
export default function MyCounter({ children }: { children?: ReactNode }) {
    // State to hold the counter value
    const [count, setCount] = useState(0);

    // Function to increment the counter
    const increment = () => {
        setCount(count + 1);
    };

    useEffect(() => {
        console.log("Counter React Rendered");
    }, [])

    return (
        <div style={{backgroundColor: 'lightcyan', fontSize: '20px'}}>
            Cmp React
        </div>
    );
}
