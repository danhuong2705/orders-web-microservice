import React from "react";
import { cleanup, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import OrderLine from "../OrderLine";

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

describe("<OrderLine />", () => {
  it("should render correctly", async () => {
    const { container } = render(
      <BrowserRouter>
        <OrderLine
           sku="21232"
           name="121323"
           quantity={1}
           imageUrl=""
           price={20000}
           onDecreaseProduct={() => {}}
           onIncreaseProduct={() => {}}
        />
      </BrowserRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
