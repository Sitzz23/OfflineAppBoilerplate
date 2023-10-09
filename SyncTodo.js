import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from "./data";

export async function SyncTodo() {
  await synchronize({ database, pullChanges, pushChanges });
}

const pullChanges = async ({ lastPulledAt }) => {
  const response = await fetch(
    `https://5000-akashprasad-offlinefirs-877uepdelda.ws-us105.gitpod.io/sync`,
    {
      body: JSON.stringify({ lastPulledAt }),
    }
  );
  if (!response.ok) {
    throw new Error(await response.text());
  }

  const { changes, timestamp } = await response.json();
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
