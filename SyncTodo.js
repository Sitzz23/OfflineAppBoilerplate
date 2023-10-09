import { synchronize } from "@nozbe/watermelondb/sync";
// import { database } from "./data/db";
import axios from "axios";

export async function SyncTodo(database) {
  await synchronize({ database, pullChanges });
}

const pullChanges = async ({ lastPulledAt }) => {
  console.log(lastPulledAt + "no time");
  const response = await axios.get(
    // `http://localhost:8000/sync?last_pulled_at=${lastPulledAt}`
    "http://192.168.121.226:8000/sync?last_pulled_at=2023-10-09T12%3A18%3A52.350Z"
  );
  console.log(response.data);
  const { changes, timestamp } = await response.data;
  return { changes, timestamp };
};

const pushChanges = async ({ changes, lastPulledAt }) => {
  console.warn("changes", changes);
  const response = await fetch(
    `https://5000-akashprasad-offlinefirs-877uepdelda.ws-us105.gitpod.io/sync?last_pulled_at=${lastPulledAt}`,
    {
      method: "POST",
      body: JSON.stringify(changes),
    }
  );
  if (!response.ok) {
    throw new Error(await response.text());
  }
};

// async function pullChanges({ lastPulledAt }) {
//   const response = await axios.get(
//     "http://192.168.121.226:8000/sync?last_pulled_at=2023-10-09T12%3A18%3A52.350Z"
//   );
//   const { changes, timestamp } = response;
//   doSomething({ changes, timestamp });
// }

// async function pushChanges({ changes }) {
//   const response = await axios.post(
//     "http://192.168.121.226:8000/sync?last_pulled_at=2023-10-09T12%3A18%3A52.350Z",
//     changes
//   );
//   doSomething(response);
// }
