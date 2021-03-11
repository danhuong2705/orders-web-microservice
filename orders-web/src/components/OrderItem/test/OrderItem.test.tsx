import React from "react";
import { cleanup, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import OrderItem from "..";

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

describe("<OrderItem />", () => {
  it("should render correctly", async () => {
    const { container } = render(
      <BrowserRouter>
        <OrderItem
          orderId="32323"
          createdAt="2021-03-10T09:48:02.653Z"
          state={2}
          onViewOrderDetail={() => {}}
          orderItems={[
            {
              sku: "2",
              price: 200000,
              imageUrl:
                "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/55d6296fe40140468240ac9300a5bb62_9366/Crew_Sweatshirt_Multicolor_HB4763_21_model.jpg",
              name: "CREW SWEATSHIRT",
              quantity: 1,
            },
          ]}
        />
      </BrowserRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
