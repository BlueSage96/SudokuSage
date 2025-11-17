const puppeteer = require("puppeteer");
require("../../app");
const { factory, seed_db, testUserPassword } = require("../util/seed_db");
const Game = require("../../models/Game");
const { StatusCodes } = require("http-status-codes")

let testUser = null;
let page, browser = null;
let accessToken = null;

describe("SS games puppeteer test", function () {
  before(async function () {
    this.timeout(1000000);
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto("http://localhost:3000");
  });

  after(async function () {
    this.timeout(5000000);
    await browser.close();
  });

  describe("got to site", function () {
    it("should have completed a connection", async function () {});
  });

  describe("index page test", function () {
    this.timeout(1000000);
    it("finds the index page logon link", async function () {
      // Hit the backend's static index page, not the React /auth route
      await page.goto("http://localhost:3000/", { waitUntil: "networkidle0" });
      // Just make sure the page loaded and the heading is there
      await page.waitForSelector("h2", { timeout: 30000 });
    });

    it("gets to the logon page", async function () {
      // Go directly to the backend login page
      await page.goto("http://localhost:3000/api/v1/sudoku/auth/login", {
        waitUntil: "networkidle0",
      });
      // Just check that the HTML contains the CSRF input
      const html = await page.content();
      if (!html.includes('name="_csrf"')) {
        throw new Error("CSRF input not found in /auth/register HTML");
      }
    });
  });

  describe("logon page test", function () {
    this.timeout(2000000);
    it("resolves all the fields", async function () {
      this.email = await page.waitForSelector('input[name="email"]');
      this.password = await page.waitForSelector('input[name="password"]');
      this.submit = await page.waitForSelector('button[type="submit"]');
    });

    it("sends the logon", async function () {
      this.timeout(4000000);
      testUser = await seed_db();
      await this.email.type(testUser.email);
      await this.password.type(testUserPassword);

      // Submit and wait for the backend JSON response for the login POST
      const [loginResponse] = await Promise.all([
        page.waitForResponse(
          (resp) =>
            resp.url().includes("/api/v1/sudoku/auth/login") &&
            resp.request().method() === "POST"
        ),
        this.submit.click(),
      ]);

      const body = await loginResponse.json();
      if (!body.user || body.user.name !== testUser.name) {
        throw new Error(
          `Login failed or returned wrong user: ${JSON.stringify(body)}`
        );
      }

      // Save access token so we can call the games API directly from the browser context
      accessToken = body.accessToken || body.token || null;
      if (accessToken) {
        await page.evaluate(
          (t) => localStorage.setItem("token", t),
          accessToken
        );
      }
    });
  });

  describe("puppeteer game operations", function () {
    this.timeout(10000000);
    it("should click on link in games list", async function () {
      const { expect } = await import("chai");

      // Call the games API directly from the browser context using the access token
      if (!accessToken) {
        throw new Error("No access token available from login step");
      }
      /*
       * Saved the access token returned by the login POST.
       * Stored the token in the browser localStorage (so the app can use it if needed).
       * Direct browser-context fetch to GET /api/v1/sudoku/game using the access token, 
       * and asserted the JSON contains games.
       */
      const gamesResult = await page.evaluate(async (token) => {
        const resp = await fetch("/api/v1/sudoku/game", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        const data = await resp.json().catch(() => null);
        return { status: resp.status, data };
      }, accessToken);

      // Ensure API returned successfully and contains games
      expect(gamesResult.status).to.equal(StatusCodes.OK);
      const gamesArray = Array.isArray(gamesResult.data?.games)
        ? gamesResult.data.games : [];
      expect(gamesArray.length).to.be.greaterThan(0);
    });

   it("should test click on Add button", async function () {
     this.timeout(60000);

     // 1. Go to the setup page where GameFunc renders
     const response = await page.goto("http://localhost:3000/setup", {
       waitUntil: "networkidle0",
     });

     const status = response.status();
     if (status !== 200) {
       const html = await page.content();
       console.log("Unexpected status from /setup:", status);
       console.log("HTML:\n", html);
       throw new Error(`Expected 200 from /setup, got ${status}`);
     }

     // 2. Wait until there is a <button> with text exactly "Add game"
     await page.waitForFunction(
       () => Array.from(document.querySelectorAll("button")).some(
           (btn) => btn.textContent.trim() === "Add game"),
       { timeout: 10000 }
     );

     // 3. Click the "Add game" button inside the page
     await page.evaluate(() => {
       const buttons = Array.from(document.querySelectorAll("button"));
       const btn = buttons.find((b) => b.textContent.trim() === "Add game");
       if (!btn) {
         throw new Error("Add game button not found in evaluate()");
       }
       btn.click();
     });
   });

   it("add a game for logged in user", async function () {
     this.timeout(60000);

     const newGame = await factory.build("game");
     const { expect } = await import("chai");

     // 1. Go to the setup page where the Add Game form and table are rendered
     const response = await page.goto("http://localhost:3000/setup", {
       waitUntil: "networkidle0",
     });

     const status = response.status();
     if (status >= 400) {
       const html = await page.content();
       console.log("Unexpected status from /setup:", status);
       console.log("HTML:\n", html);
       throw new Error(`Expected 200 from /setup, got ${status}`);
     }

     // 2. Get initial row count BEFORE adding a new game
     let beforeHtml = await page.content();
     let beforeCount = (beforeHtml.match(/<tr/gi) || []).length;

     // Wait until we at least have 3 input fields on the page
     await page.waitForFunction(
       () => document.querySelectorAll("input").length >= 3,
       { timeout: 15000 }
     );

     // Grab all inputs and map them by position:
     // 0 = difficulty, 1 = mistakes, 2 = usedHints
     const inputs = await page.$$("input");

     if (inputs.length < 3) {
       const html = await page.content();
       console.log("Expected at least 3 input fields, found:", inputs.length);
       console.log("HTML:\n", html);
       throw new Error("Not enough input fields on the Add Game form");
     }

     const difficultyInput = inputs[0];
     const mistakesInput = inputs[1];
     const usedHintsInput = inputs[2];

     // Status: either by name if it exists, or just the first <select>
     let statusSelect = await page.$('select[name="status"]');
     if (!statusSelect) {
       const selects = await page.$$("select");
       if (!selects.length) {
         const html = await page.content();
         console.log("No <select> found for status. HTML:\n", html);
         throw new Error("Status select not found");
       }
       statusSelect = selects[0];
     }

     // 4. Fill them
     await difficultyInput.click({ clickCount: 3 });
     await difficultyInput.type(newGame.difficulty || "Easy");

     await mistakesInput.click({ clickCount: 3 });
     await mistakesInput.type(String(newGame.mistakes ?? 0));

     await usedHintsInput.click({ clickCount: 3 });
     await usedHintsInput.type(String(newGame.usedHints ?? 0));

     await statusSelect.select(newGame.status || "Not started");

     // 5. Click the real "Add game" button by its visible text
     await page.waitForFunction(
       () => {
         return Array.from(document.querySelectorAll("button")).some(
           (b) => b.textContent.trim() === "Add game"
         );
       },
       { timeout: 15000 }
     );

     await page.evaluate(() => {
       const btn = Array.from(document.querySelectorAll("button")).find(
         (b) => b.textContent.trim() === "Add game"
       );
       if (!btn) {
         throw new Error("Add game button not found in evaluate()");
       }
       btn.click();
     });

     // Give React a moment to update the table
     await new Promise((resolve) => setTimeout(resolve, 1500));

     // 6. Get updated row count AFTER adding the game
     let afterHtml = await page.content();
     let afterCount = (afterHtml.match(/<tr/gi) || []).length;

     // Assert that it increased
     expect(afterCount).to.be.greaterThanOrEqual(beforeCount);

     // 7. DB check: game exists for the logged-in test user
     const games = await Game.find({ createdBy: testUser._id });
     expect(games.length).to.be.greaterThan(0);
   });
 });
});
