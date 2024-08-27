/* eslint-disable @typescript-eslint/no-explicit-any */
export interface gameResultData {
  message: string;
  grade: number;
  score: number;
  categoryName: string;
  answers: any[];
  results?: { origin: string; cateogry: string; guess: string };
}
