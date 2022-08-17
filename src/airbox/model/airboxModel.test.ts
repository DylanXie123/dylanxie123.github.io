import AirBoxModel from "./airboxModels"
import ContentModel from "./contentModel";

jest.mock("../../login/auth", () => {
  return {
    decrypt: () => { }
  }
})

jest.mock("@supabase/supabase-js", () => {
  const createMockValue = (item: ContentModel) =>
    Promise.resolve({
      data: [item]
    });

  const supabase = {
    from: () => ({
      insert: (item: ContentModel) => createMockValue(item)
    })
  }

  return {
    createClient: jest.fn().mockReturnValue(supabase)
  }
})

describe("airbox model test", () => {
  let airboxModel = new AirBoxModel();

  it("should be empty", () => {
    expect(airboxModel.getModels.length).toBe(0);
  });

  it("should create text", async () => {
    const result = await airboxModel.createText("hi");
    expect(result).toBe(true);
    expect(airboxModel.getModels.length).toBe(1);
    expect(airboxModel.getModels[0].content).toBe("hi");
  })
})