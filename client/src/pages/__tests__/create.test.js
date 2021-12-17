import React from "react";
import renderer from "react-test-renderer";
import create from "../create";

describe("create test", () => {
  it("create should match snapshot", () => {
    const component = renderer.create(<create />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
