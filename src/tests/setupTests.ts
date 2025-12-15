import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from '../mocks/server';

// Highchart hack for tests
if (typeof window !== 'undefined') {
  if (!window.CSS) {
    window.CSS = {} as typeof CSS;
  }
  if (!window.CSS.supports) {
    window.CSS.supports = () => false;
  }
}

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterAll(() => server.close());

afterEach(() => server.resetHandlers());
