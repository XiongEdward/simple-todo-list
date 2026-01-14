export interface Todo {
  id: string;
  text: string;
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  completed: boolean;
  color?: string;
}

export type ThemeColor = string;
