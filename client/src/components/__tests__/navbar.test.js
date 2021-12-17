import React from "react";
import renderer from "react-test-renderer";
import navbar from "../navbar";

describe("navbar test", () => {
  it("navbar should match snapshot", () => {
    const component = renderer.create(<navbar />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
