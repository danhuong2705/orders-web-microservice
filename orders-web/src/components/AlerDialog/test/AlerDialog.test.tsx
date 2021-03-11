import { cleanup, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AlertDiaLog from "../AlerDialog";

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

describe("<AlertDiaLog />", () => {
  it("should render correctly", async () => {
    const { container } = render(
      <BrowserRouter>
        <AlertDiaLog
          onClose={() => {}}
          isOpen={true}
          description=""
          onActionDialog={() => {}}
        />
      </BrowserRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
