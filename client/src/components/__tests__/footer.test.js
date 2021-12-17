import React from "react";
import renderer from "react-test-renderer";
import footer from "../footer";

describe("footer test", () => {
  it("footer should match snapshot", () => {
    const component = renderer.create(<footer />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
