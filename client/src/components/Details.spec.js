import { render } from "@testing-library/react";
import Details from "./Details";
import React from "react";

describe("details", () => {
  it("should list active chatters", () => {
    const activeChatters = ["Name", "AnotherName"];
    const { getByText } = render(
      <Details activeChatters={activeChatters}></Details>
    );
    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("AnotherName")).toBeInTheDocument();
  });
});
