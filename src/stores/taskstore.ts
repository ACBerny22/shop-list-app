import { atom } from "jotai";
import { Task } from "@/xata";

export const taskStore = atom<Task[]>([]);
export const formOpenStore = atom<boolean>(false);
