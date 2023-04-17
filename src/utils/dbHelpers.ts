import Dexie from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";
export function getAllTags() {
    const tags = useLiveQuery(
      () => db.notes.orderBy('tags').keys()
    )
    return tags;
};