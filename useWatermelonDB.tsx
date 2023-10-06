import { useEffect, useState } from "react";
import { useDatabase } from "@nozbe/watermelondb/hooks";
export const useWatermelonDB = (table: string, query?: any) => {
  const [data, setData] = useState<Array<any>>([]);
  const database = useDatabase();

  useEffect(() => {
    const collection = database.collections.get(table);
    let subscription = collection
      .query()
      .observe()
      .subscribe((records) => {
        setData(records);
      });
    return () => subscription.unsubscribe();
  }, [database, query, table]);
  return data;
};
