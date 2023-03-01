import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Carousel from "../../../src/components/Carousel";
import _fetch from "isomorphic-fetch";

// setup function
function setup(jsx) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

let storage;
beforeEach(() => {
  storage = window.localStorage;
  window.localStorage = new LocalStorageMock();
});

afterEach(() => {
  window.localStorage = storage;
});

describe("test scrollToIndex", () => {
  it("scrolls carousel to second slide", async () => {
    window.fetch = _fetch;

    const { user } = setup(<Carousel />);
    const [slideIndex, length] = [0, 6];

    await waitFor(
      () => {
        const button = screen.getByTestId(`nextBtn${slideIndex}`);
        const nextSlide = document.querySelector(`#slide${slideIndex + 1}`);
        user.click(button);
        expect(nextSlide).toBeVisible();
      },
      { timeout: 4000 }
    );
  });
});
