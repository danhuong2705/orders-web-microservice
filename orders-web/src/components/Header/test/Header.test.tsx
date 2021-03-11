import React from "react";
import Header from "..";
import { cleanup, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

describe("<Header />", () => {
  it("should render correctly", async () => {
    const { container } = await render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
