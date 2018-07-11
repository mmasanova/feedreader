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
    /* This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* Tests to make sure that the
         * allFeeds variable has been defined, that it is not
         * empty and that it is an array
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.constructor).toEqual(Array);
            expect(allFeeds.length).not.toBe(0);
        });

        /* Loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have a URL defined and not empty', function() {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBeNull();
                expect(feed.url).not.toBe('');
            });
        });

        /* Loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a name defined and not empty', function() {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBeNull();
                expect(feed.name).not.toBe('');
            });
        });
    });


    /* Test the menu */

    describe('The menu', function() {
        let hasHiddenClass;

         /* Checks that body contains the menu-hidden class */
        it ('is hidden', function() {
            hasHiddenClass = document.body.classList.contains('menu-hidden');

            expect(hasHiddenClass).toBe(true);
        });

         /* Ensures the menu changes visibility when the menu
          * icon is clicked by checking the menu-hidden class on body
          */

        it ('icon toggles menu visibility', function() {
            const menuIcon = document.querySelector('.menu-icon-link');

            expect(menuIcon).not.toBeNull();

            menuIcon.click();

            hasHiddenClass = document.body.classList.contains('menu-hidden');

            expect(hasHiddenClass).toBe(false);

            menuIcon.click();

            hasHiddenClass = document.body.classList.contains('menu-hidden');

            expect(hasHiddenClass).toBe(true);
        });
    });

    /* Test Initial Entries */
    describe('Initial Entries', function() {
        /* Ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('exist', function(done) {
            const entries = document.querySelector('.feed .entry');
            expect(entries).not.toBeNull();
            done();
        });
    });

    /* Test New Feed Selection */
    describe('New Feed Selection', function() {
        /* Ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        let newContent = '';
        let feed;

        beforeEach(function(done) {
            feed = document.querySelector('.feed');

            if (feed !== null) {
                /* Clear the feed so we can make sure we have new content 
                 * after the loadFeed function runs
                 */
                feed.innerHTML = '';

                loadFeed(0, function() {
                    newContent = feed.innerHTML;
                    done();
                });
            } else {
                done();
            }
        });

        it('changes content', function(done) {
            expect(feed).not.toBeNull();
            expect(newContent).not.toBe('');
            done();
        });
    });
}());
