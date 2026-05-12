import React, { useEffect } from 'react';
import { DatabaseProvider } from '@nozbe/watermelondb/react';
import { database, initializeDatabase } from '@/db/database';
import RootNavigator from '@/navigation/RootNavigator';

export default function App() {
  useEffect(() => {
    initializeDatabase();
  }, []);

  return (
    <DatabaseProvider database={database}>
      <RootNavigator />
    </DatabaseProvider>
  );
}
