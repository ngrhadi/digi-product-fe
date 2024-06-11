import { atom } from 'jotai';
import { Session } from 'next-auth';

export const USER_INFO = atom<Session | null>(null);
