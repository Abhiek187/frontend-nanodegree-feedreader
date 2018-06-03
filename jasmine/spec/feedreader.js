/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed in the allFeeds object and
         * ensures it has a URL defined and that the URL is not empty.
         */
        it('have defined URLs', () => {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        /* This test loops through each feed in the allFeeds object and
         * ensures it has a name defined and that the name is not empty.
         */
        it('have defined names', () => {
            for (const feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* This test suite is all about the menu's visibility. */
    describe('The Menu', () => {
        const body = document.body;
        const menuIcon = document.querySelector('.menu-icon-link');
        /* This test ensures the menu element is hidden by default.
         * You'll have to analyze the HTML and the CSS to determine
         * how we're performing the hiding/showing of the menu element.
         */
        it('is hidden by default', () => {
            // Other classes can be added to body, as long as menu-hidden is there.
            expect(body.className).toContain('menu-hidden');
        });

        /* This test ensures the menu changes visibility when the menu
         * icon is clicked. This test should have two expectations:
         * does the menu display when clicked and does it hide when
         * clicked again.
         */
        it('changes visibility when clicked', () => {
            menuIcon.click(); // hide menu
            expect(body.className).not.toContain('menu-hidden');
            menuIcon.click(); // reopen menu
            expect(body.className).toContain('menu-hidden');
        });
    });

    /* This test suite is all about the intial feed entries from loadFeed. */
    describe('Initial Entries', () => {
        /* This test ensures when the loadFeed function is called
         * and completes its work, there is at least a single .entry
         * element within the .feed container. Remember, loadFeed() is
         * asynchronous so this test will require the use of Jasmine's
         * beforeEach and asynchronous done() function.
         */
        let entries;

        beforeEach(done => {
            loadFeed(0, () => {
                entries = document.querySelector('.feed').querySelectorAll('.entry');
                done();
            });
        });

        it('have at least one entry', done => {
            expect(entries.length).toBeGreaterThan(0);
            done();
        });
    });

    /* This test suite is all about how the content changes with each feed. */
    describe('New Feed Selection', () => {
        /* This test ensures when a new feed is loaded by the loadFeed
         * function that the content actually changes. Remember, loadFeed()
         * is asynchronous.
         */
        let oldFeed, newFeed;

        beforeEach(done => {
            loadFeed(0, () => {
                // load Udacity Blog
                oldFeed = document.querySelector('.feed').innerHTML;
                done();
            });
        });
        // Both feeds must load before the test is executed.
        beforeEach(done => {
            loadFeed(1, () => {
                // load CSS Tricks
                newFeed = document.querySelector('.feed').innerHTML;
                done();
            });
        });

        it('changes content', done => {
            expect(oldFeed).not.toBe(newFeed);
            done();
        });
    });
}());
