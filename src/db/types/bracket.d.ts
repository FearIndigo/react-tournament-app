/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface BracketDocType {
  id: string;
  name: string;
  type: "elimination" | "doubleElimination" | "roundRobin" | "finals";
  rounds: string[];
  previous: string;
  createdAt?: string;
  updatedAt?: string;
  [k: string]: unknown;
}
