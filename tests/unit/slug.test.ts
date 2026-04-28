import { getHabitSlug } from "@/lib/slug";

describe("slug utility", () => {
  it("converts name to lowercase slug", () => {
    expect(getHabitSlug("Drink Water")).toBe("drink-water");
  });

  it("removes extra spaces", () => {
    expect(getHabitSlug("  Read Books  ")).toBe("read-books");
  });

  it("handles multiple words", () => {
    expect(getHabitSlug("Go To Gym Daily")).toBe("go-to-gym-daily");
  });
});