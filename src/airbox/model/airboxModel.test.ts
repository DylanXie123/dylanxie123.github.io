import { PostgrestResponse } from "@supabase/supabase-js";
import AirBoxModel from "./airboxModels"
import ContentModel, { createContentModel } from "./contentModel";

jest.mock("../../login/auth", () => {
  return {
    decrypt: () => { }
  }
})

type ResponseFormat = Promise<Partial<PostgrestResponse<ContentModel>>>;

interface MockSupbaseConfig {
  insertResponse?: (item: ContentModel) => ResponseFormat,
  deleteResponse?: () => ResponseFormat,
  selectResponse?: () => ResponseFormat,
}

const mockSuccessResponse = (items: ContentModel[]) =>
  Promise.resolve({
    data: items,
    error: null,
  });

const mockFailureResponse = () =>
  Promise.resolve({
    data: null,
    error: {
      message: "this is an error message",
      hint: "",
      details: "",
      code: ""
    }
  });

const fakeValue = createContentModel("fake content", "tetx/plain");

const defaultConfig: MockSupbaseConfig = {
  insertResponse: (item: ContentModel) => mockSuccessResponse([item]),
  deleteResponse: () => mockSuccessResponse([fakeValue]),
  selectResponse: () => mockSuccessResponse([fakeValue]),
}

const configureSupabase = (config = defaultConfig) => {
  jest.doMock("@supabase/supabase-js", () => {

    const supabase = {
      from: () => ({
        insert: config.insertResponse,
        delete: () => ({
          match: config.deleteResponse,
        }),
        select: () => ({
          order: config.selectResponse,
        })
      })
    }

    return {
      __esModule: true,
      createClient: () => supabase,
    }
  })
}

describe("airbox model test", () => {
  let MockAirBoxModel: typeof AirBoxModel;

  beforeAll(async () => {
    configureSupabase();
    const AirBoxModel = await import("./airboxModels");
    MockAirBoxModel = AirBoxModel.default;
  });

  afterAll(() => jest.resetModules());

  it("should be empty", () => {
    let airboxModel = new MockAirBoxModel();
    expect(airboxModel.getModels.length).toBe(0);
  });

  it("should create text", async () => {
    let airboxModel = new MockAirBoxModel();
    const result = await airboxModel.createText("hi");
    expect(result).toBe(true);
    expect(airboxModel.getModels.length).toBe(1);
    expect(airboxModel.getModels[0].content).toBe("hi");
  })
})

/// supabase will return network failure in error
/// https://github.com/supabase/supabase-js/issues/32#issuecomment-1061383837
describe("supabase failure airbox model test", () => {
  let MockAirBoxModel: typeof AirBoxModel;

  beforeAll(async () => {
    configureSupabase({
      insertResponse: () => mockFailureResponse()
    })
    const AirBoxModel = await import("./airboxModels");
    MockAirBoxModel = AirBoxModel.default;
  });

  afterAll(() => jest.resetModules());

  it("should not create text", async () => {
    let airboxModel = new MockAirBoxModel();
    const result = airboxModel.createText("hi");
    expect(airboxModel.getModels.length).toBe(1);
    expect(airboxModel.getUpdatingItemID).not.toBe(null);
    result.then(v => {
      expect(v).toBe(false);
      expect(airboxModel.getModels.length).toBe(0);
      expect(airboxModel.getUpdatingItemID).toBe(null);
    })
  })

})