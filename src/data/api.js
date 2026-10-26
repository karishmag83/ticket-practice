import { EVENTS } from './events';

// Set this to true to simulate the events request failing.
export const SIMULATE_FAILURE = false;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchEvents() {
  await wait(800);
  if (SIMULATE_FAILURE) {
    throw new Error('Network request failed');
  }
  return EVENTS;
}
