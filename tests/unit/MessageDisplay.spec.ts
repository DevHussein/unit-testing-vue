import MessageDisplay from "@/components/MessageDisplay.vue";
import { mount, flushPromises } from "@vue/test-utils";
import { expect, jest, test } from "@jest/globals";
import { getMessage } from "@/services/Message";

jest.mock("@/services/Message");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("MessageDisplay", () => {
  test("Calls getMessage once and displays message", async () => {
    const mockMessage = "Hello from the db";
    // @ts-ignore
    getMessage.mockResolvedValueOnce({ text: mockMessage });
    const wrapper = mount(MessageDisplay);

    await flushPromises();
    expect(getMessage).toHaveBeenCalledTimes(1);

    const message = wrapper.find('[data-testid="message"]').text();
    expect(message).toEqual(mockMessage);
  });

  test("Displays an error when getMessage call fails", async () => {
    const mockError = "Oops! Something went wrong.";
    // @ts-ignore
    getMessage.mockRejectedValueOnce(mockError);
    const wrapper = mount(MessageDisplay);

    await flushPromises();
    expect(getMessage).toHaveBeenCalledTimes(1);
    const displayedError = wrapper.find('[data-testid="message-error"]').text();
    expect(displayedError).toEqual(mockError);
  });
});
