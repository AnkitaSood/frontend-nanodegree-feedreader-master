/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
$(function() {
    /* This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        it(' have URLs defined and are not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).not.toBeUndefined();
                expect(feed.url).not.toBeNull();
                expect(feed.url).toEqual(jasmine.any(String));
                expect(feed.url).not.toEqual('');
            });
        });

        it('have a name defined, and it is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).not.toBeUndefined();
                expect(feed.name).not.toBeNull();
                expect(feed.url).toEqual(jasmine.any(String));
                expect(feed.name).not.toEqual('');
            });
        });
    });
    /* This suite is for the menu.
    *  It checks if the menu is hidden by default.
    *  It also checks if the menu expands and collapses on click of the hamburger icon.
    */
    describe('The Menu', function() {
        var body, menuIcon;

        beforeEach(function() {
            body = $('body');
            menuIcon = $('.menu-icon-link');
        });

        it('is hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });

        it('changes visibility', function() {
            menuIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).not.toBeTruthy();
            menuIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });
    });

    /* This suite is all about the "Initial Entries"
    *  Verifies there is at least one entry within the .feed container*/
    describe('Initial Entries', function() {
        beforeEach(function(done){
            loadFeed(0, done);
        });

        it('has at least a single entry', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* This suite is about "New Feed Selection"
        Verifies that the feed content is varied whenever a new feed is selected
    */

    describe('New Feed Selection Results', function() {
        var oldContent, newContent='', i=0;

        // Save the feed content
        beforeEach(function(done) {
            loadFeed(i, done);
            oldContent = $(".entry-link .entry").text();
        });

        // Save content of the subsequent feed
        afterEach(function(done) {

            //Check to verify that the last feed differs from the first one
            if ( i+1 === allFeeds.length) {
                i= -1;
            }
            loadFeed(i+1, done);
            newContent = $(".entry-link .entry").text();
            i++;
        });

        var compareFeeds = function(feed, index) {
            it(feed.name + ' feed content is different from others' , function(done) {
                expect(newContent).not.toEqual(oldContent);
                done();
            });
        }

        // Save content for comparison for all feeds
        $.each(allFeeds, function(index, feed) {
            compareFeeds(feed, index);
        });
    });

}());
