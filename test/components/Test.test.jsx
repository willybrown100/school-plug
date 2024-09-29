import React from "react";


import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Test from "../../src/ui/Test";

describe("buut", () => {
  it(" should render hello btn ", () => {
    render(<Test />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument(); //writing assertion i.e heading shoulkd be in document
  });
});
