import React from "react";
import { cleanup, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Card from "..";

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

describe("<Card />", () => {
  it("should render correctly", async () => {
    const { container } = render(
      <BrowserRouter>
        <Card
          sku="21232"
          name="121323"
          imageUrl=""
          price={20000}
          onAddToCart={() => {}}
        />
      </BrowserRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
