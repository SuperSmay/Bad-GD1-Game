import { createContext } from 'react';

export const TimeContext = createContext([Date.now(), Date.now()]);
