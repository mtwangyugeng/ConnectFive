import { writable, type Writable } from "svelte/store"
import type { BlockData } from "./types";

export const currentPositionId: Writable<string> = writable('');
export const mapData: Writable<Array<Array<BlockData>>> = writable([[]]);

//Mock data
mapData.set(
    [
        [
            {
                id: '01',
                description: 'mock block',
                northId: null,
                southId: null,
                westId: null,
                eastId: null,
            }
        ]
    ]
);

currentPositionId.set('01');