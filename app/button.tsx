"use client";

import { create } from "./action";

export function Button() {
  return <button onClick={() => create()}>Create</button>;
}
