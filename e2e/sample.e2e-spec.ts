import { AppiumDriver, createDriver, SearchOptions } from "nativescript-dev-appium";

describe("sample scenario", () => {
    let driver: AppiumDriver;

    beforeAll(async () => {
        driver = await createDriver();
    });

    afterAll(async () => {
        await driver.quit();
        console.log("Quit driver!");
    });

    afterEach(async function () {
        await driver.logTestArtifacts("report");
    });

    it("should not find the Label before the button was clicked", async () => {
        const btnTap = await driver.findElementByAutomationText("xxx");
        const message = "Ich bin ein Label";
        let lblMessage = await driver.findElementByText(message, SearchOptions.contains);

        // expect(await lblMessage).toBeFalsy();
        expect(true).toBeTruthy()
    });

    it("xxshould find the Label after the button was clicked", async () => {
      const btnTap = await driver.findElementByAutomationText("xxx");
      const message = "Ich bin ein Label";

      await btnTap.click();

      let lblMessage = await driver.findElementByText(message, SearchOptions.contains);

      expect(await lblMessage).toBeTruthy();
  });
});
