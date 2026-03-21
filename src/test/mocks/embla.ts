import { vi } from "vitest";

const mockApi = {
  canScrollPrev: () => true,
  canScrollNext: () => true,
  scrollPrev: () => {},
  scrollNext: () => {},
  scrollTo: () => {},
  selectedScrollSnap: () => 0,
  scrollSnapList: () => [0, 1, 2],
  on: () => {},
  off: () => {},
};

vi.mock("embla-carousel-react", () => ({
  default: () => [() => {}, mockApi],
}));

vi.mock("embla-carousel-autoplay", () => ({
  default: () => ({ name: "autoplay" }),
}));
