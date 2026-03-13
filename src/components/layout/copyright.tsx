'use client';

import { useState, useEffect } from 'react';

export default function Copyright() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    // This code runs only on the client, after hydration
    setYear(new Date().getFullYear());
  }, []);

  if (year === null) {
    // Render a fallback on the server and during initial client render
    return <p>&copy; OLIVA MONTADITOS. Todos os direitos reservados.</p>;
  }

  return (
    <p>&copy; {year} OLIVA MONTADITOS. Todos os direitos reservados.</p>
  );
}
