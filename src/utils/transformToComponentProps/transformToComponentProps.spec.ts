import transformToComponentProps from ".";

describe("transformToComponentProps", () => {
  it("should transform component props correctly", () => {
    const input = {
      title: "Test Title",
      description: "Test Description",
      image: {
        src: "test.jpg",
        alt: "Test Image",
      },
    };

    const propMap: {
      title: "title" | "description" | "image";
      description: "title" | "description" | "image";
      image: "title" | "description" | "image";
    } = {
      title: "title",
      description: "description",
      image: "image",
    };

    const expectedOutput = {
      title: "Test Title",
      description: "Test Description",
      image: {
        src: "test.jpg",
        alt: "Test Image",
      },
    };

    const result = transformToComponentProps<
      typeof input,
      typeof expectedOutput
    >(input, propMap);
    expect(result).toEqual(expectedOutput);
  });

  it("should return an empty object if no props are provided", () => {
    const input = {};
    const propMap = {
      title: "title",
      description: "description",
      image: "image",
    };

    const result = transformToComponentProps<typeof input, object>(
      input,
      propMap
    );
    expect(result).toEqual({});
  });
});
