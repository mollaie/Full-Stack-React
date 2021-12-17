import React from "react";
import renderer from "react-test-renderer";
import modal from "../modal";

describe("modal test", () => {
  it("modal should match snapshot", () => {
    const component = renderer.create(<modal />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
