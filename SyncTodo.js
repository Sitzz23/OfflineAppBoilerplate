import { synchronize } from "@nozbe/watermelondb/sync";
import axios from "axios";

export async function SyncTodo(database) {
  await synchronize({ database, pullChanges, pushChanges });
}

const pullChanges = async ({ lastPulledAt }) => {
  console.log(lastPulledAt + " time");
  const response = await axios.get(
    `http://192.168.200.233:5000/sync?last_pulled_at=${
      lastPulledAt ? lastPulledAt : 0
    }`
  );

  console.log(JSON.stringify(changes));

  const { changes, timestamp } = await response.data;
  return { changes, timestamp };
};

const pushChanges = async ({ changes, lastPulledAt }) => {
  console.log("Push changes", changes, lastPulledAt);

  console.log(lastPulledAt, JSON.stringify(changes));

  // const response = await axios.post(
  //   `http://192.168.200.233:5000/sync?last_pulled_at=${lastPulledAt}`,
  //   changes
  // );

  // console.log(response.data);
  console.log("Push Complete 🐧");
};
