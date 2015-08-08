var React = require('react');
var constants = require('./constants/constants');
var todoStore = require('./stores/mainStore');
var todoActions = require('./actions/mainActions');

var SetTile = require('./components/SetTile');
var TrackTile = require('./components/TrackTile');
var EventTile = require('./components/EventTile');
var FeaturedTile = require('./components/FeaturedTile');

var Player = require('./components/Player');
var Footer = require('./components/Footer');
var Header = require('./components/Header');
var Buffer = require('./components/Buffer');
var NavMenu = require('./components/NavMenu');
var ViewContainer = require('./components/ViewContainer');

var FeaturedView = require('./components/FeaturedView');
var BrowseView = require('./components/BrowseView');
var LandingView = require('./components/LandingView');
var DetailView = require('./components/DetailView');

var artists = [];
var splitArtists = [];
var festivals = [];
var mixes = [];
var genres = [];

// <Header searchInput={this.state.searchInput} />
// <NavMenu items={['Home', 'Featured', 'Artists', 'Festivals', 'Mixes', 'Genres']} />
// <SearchView searchInput={this.state.searchInput} />
// <DetailView detailData={} detailType=''/>
// <FeaturedView landingEvents={landing} currentEvents={sampleCurrentEvents}/>

var App = React.createClass({
	getInitialState: function() {
		return {
			searchInput: '' 
		};
	},
	getArtists: function() {
		$.ajax({
			type: 'GET',
			url: 'http://setmine.com'+API_ROOT+'artist',
			success: function(response) {
				if(response.status=='success') {
					var artistModels = response.payload.artist
					for(var a in artistModels) {
						artists.push(artistModels[a])
					}
				}
			}
		})
	},
	getFestivals: function() {
		$.ajax({
			type: "GET",
			url: API_ROOT + "festival",
			success: function(response) {
				if(response.status == "success") {
					var festivalModels = response.payload.festival;
					for(var f in festivalModels) {
						festivals[f] = festivalModels[f];
					}
				}
			}
		});
	},
	getMixes: function() {
		$.ajax({
			type: "GET",
			url: API_ROOT + "mix",
			success: function(response) {
				if(response.status == "success") {
					var mixModels = response.payload.mix;
					for(var m in mixModels) {
						mixes[m] = mixModels[m];
					}
				}
			}
		});
	},
	getGenres: function() {
		$.ajax({
			type: "GET",
			url: API_ROOT + "genre",
			success: function(response) {
				if(response.status == "success") {
					var genreModels = response.payload.genre;
					for(var g in genreModels) {
						genres[g] = genreModels[g];
					}
				}
			}
		});
	},
	render: function() {
		return (
			<div className="main-container flex-column">
				<Header />
				<BrowseView type='artist' data={artists} />
				<Footer />
			</div>
		);
	}
})

var landing = [];
$.ajax({
	type: "GET",
	url: 'http://setmine.com'+constants.API_ROOT + "landing",
	success: function(response) {
		if(response.status == "success") {
			var landingModels = response.payload.landing;
			for(var l in landingModels) {
				landing[l] = landingModels[l]
			}
		}
	}
});

//make request for upcoming events within featured view
	//upcoming.soonestEvents
	//upcoming.closestEvents
	//upcoming.soonestEventsAroundMe
var currentEvents = [];
$.ajax({
	type: 'GET',
	url: 'http://setmine.com'+constants.API_ROOT+'upcoming?',
	success: function(response) {
		if(response.status=='success') {
			eventModels = response.payload.upcoming.soonestEvents;
			for(var e in eventModels) {
				currentEvents.push(eventModels[e]);
			}
			console.log(currentEvents)
		}
	}
})

//works for passing to eventbrowsecontainer as currentEvents={...}
//TODO make AJAX call work & get formatted date for month
var sampleCurrentEvents = [
	{
	"id": 705,
	"event": "MDBP Philadelphia 2015",
	"bio": "Artists: \r\n     • ILOVEMAKONNEN\r\n     • JACK U\r\n     • Jauz\r\n     • Nadus\r\n     • SwizzyMack\r\n     • What So Not\r\n     • Dirty South Joe\r\n     • Giraffage\r\n     • Keys N Krates\r\n     • Major Lazer\r\n     • ?????\r\n     • ?????\r\n     • ?????\r\n     • ?????\r\n     • ?????",
	"fb_link": "https://www.facebook.com/Maddecentblockparty",
	"twitter_link": "https://twitter.com/MDblockparty",
	"web_link": "http://maddecentblockparty.com/",
	"ticket_link": "https://tickets.songkick.com/events/23445668",
	"imageURL": "2ab1bf07e8311ab942f30232f9b7547f.jpg",
	"main_imageURL": "a44299cda5f130dfbced179e4dd6d6ab.jpg",
	"start_date": "2015-08-06T12:00:00.000Z",
	"end_date": "2015-08-07T12:00:00.000Z",
	"paid": 1,
	"days": 2,
	"venue": "Festival Pier at Penn's Landing",
	"latitude": 39.960016,
	"longitude": -75.137109,
	"address": "601 N Columbus Blvd, Philadelphia, PA 19123",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 954,
	"event": "What So Not @ Grand Central",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "http://www.shareasale.com/r.cfm?B=234786&U=1121425&M=27601&urllink=www.ticketfly.com/purchase/event/869801/tfly?utm_medium=946393",
	"imageURL": "3839657a8704f92c513eeb4d29ed14c6.jpg",
	"main_imageURL": "5fc3a83f04bbdc6a33f7ab90057e7606.jpg",
	"start_date": "2015-08-07T12:00:00.000Z",
	"end_date": "2015-08-07T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Grand Central ",
	"latitude": 25.780691,
	"longitude": -80.193759,
	"address": "697 N Miami Ave, Miami, FL 33136, United States",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 979,
	"event": "The Cube Guys @ Steam ",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "http://www.wantickets.com/Events/ShowEvent.aspx?eventId=185459&affCode=cba4a14ab7fb40039803",
	"imageURL": "4d50a5fc5e236784df39ec5fd0023068.jpg",
	"main_imageURL": "06392487276c6f31ce761ccf1abfe48f.jpg",
	"start_date": "2015-08-07T12:00:00.000Z",
	"end_date": "2015-08-07T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Steam Miami",
	"latitude": 25.788117,
	"longitude": -80.19357100000002,
	"address": "30 NE 14th St, Miami, FL 33132, USA",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1002,
	"event": "Slander #POUND Fridays @ Amphitheatre",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "http://www.wantickets.com/Events/ShowEvent.aspx?eventId=185499&affCode=5e79c926831b4ca3a540",
	"imageURL": "73a0eb43e858148caf99fa68d4198e67.jpeg",
	"main_imageURL": "6ccdc61a76508253d169f29ab1312ffb.jpg",
	"start_date": "2015-08-07T12:00:00.000Z",
	"end_date": "2015-08-07T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Amphitheatre Event Facility",
	"latitude": 27.960064,
	"longitude": -82.441301,
	"address": "1609 E 7th Ave, Tampa, FL 33605",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1081,
	"event": "Atish, Hoj @ Flash",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "http://www.shareasale.com/r.cfm?B=234786&U=1121425&M=27601&urllink=www.ticketfly.com/purchase/event/880493",
	"imageURL": "4fa831416a615d5b666ba16e18978f96.jpg",
	"main_imageURL": "d23114d7cf7d4ceca01743038ded5abd.jpg",
	"start_date": "2015-08-07T12:00:00.000Z",
	"end_date": "2015-08-07T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Flash",
	"latitude": 38.916291,
	"longitude": -77.021373,
	"address": "645 Florida Ave NW, Washington, DC 20001",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1152,
	"event": "Paul Anthony @ Lizard Lounge",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "http://www.eventbrite.com/e/duck-and-cover-pro-presents-paul-anthony-tickets-17435702656?aff=eac2",
	"imageURL": "53626e3cdffbf2b822fbceab310a702c.jpg",
	"main_imageURL": "c5e8758bf02d42581fd4787f7bd224b7.jpg",
	"start_date": "2015-08-07T12:00:00.000Z",
	"end_date": "2015-08-07T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Lizard Lounge",
	"latitude": 32.7848368,
	"longitude": -96.79022909999998,
	"address": "2424 Swiss Ave, Dallas, TX 75204, USA",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1159,
	"event": "Gareth Emery @ Stereo Live",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "http://www.eventbrite.com/e/gareth-emery-houston-tickets-17515304748",
	"imageURL": "d5de9c1daff2400954c2904a7691b2ba.jpg",
	"main_imageURL": "655d0dd80eedc05ed3e19a2fb1253fa4.jpg",
	"start_date": "2015-08-07T12:00:00.000Z",
	"end_date": "2015-08-07T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Stereo Live",
	"latitude": 29.732318,
	"longitude": -95.498507,
	"address": "6400 Richmond Ave. Houston",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1191,
	"event": "Fehrplay @ Kingdom Nightclub",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "http://www.shareasale.com/r.cfm?B=234786&U=1121425&M=27601&urllink=www.ticketfly.com/purchase/event/872853",
	"imageURL": "c4f871b837cef615d6f9cc5f6229fa5b.png",
	"main_imageURL": "508d4bc219940c8a5e3abf242218e9ad.jpg",
	"start_date": "2015-08-07T12:00:00.000Z",
	"end_date": "2015-08-07T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Kingdom Austin",
	"latitude": 30.26675,
	"longitude": -97.742439,
	"address": "103 E 5th St, Austin, TX 78701",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1230,
	"event": "Nervo @ Ruby Skye",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "https://www.eventbrite.com/e/nervo-tickets-17571212971",
	"imageURL": "4acd557bede2daffa46b7739381f10cd.jpg",
	"main_imageURL": "074d8df0fce4e7dbf3ec19bd755ade5f.jpg",
	"start_date": "2015-08-07T12:00:00.000Z",
	"end_date": "2015-08-07T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Ruby Skye SF",
	"latitude": 37.787592,
	"longitude": -122.409805,
	"address": "420 Mason St, San Francisco, CA 94109",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1265,
	"event": "REV909 @ 9:30 Club",
	"bio": "Daft Punk, French House tribute and Indie Dance classics with Will Eastman & Ozker, Visuals by Bell Visuals",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "http://www.shareasale.com/r.cfm?B=234786&U=1121425&M=27601&urllink=www.ticketfly.com/purchase/event/884941",
	"imageURL": "668c9e22bb614bb1c26a673625252adf.jpg",
	"main_imageURL": "94442661d5570889cc58218b01cd9762.jpg",
	"start_date": "2015-08-07T12:00:00.000Z",
	"end_date": "2015-08-07T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "9:30 Club",
	"latitude": 38.917947,
	"longitude": -77.02373599999999,
	"address": "815 V Street Northwest, Washington, DC 20001, United States",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1366,
	"event": "Doctor P @ Old Rock House",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/oldrockhouse",
	"twitter_link": "https://twitter.com/oldrockhousestl",
	"web_link": "www.oldrockhouse.com",
	"ticket_link": "http://www.eventbrite.com/e/trail-to-the-woods-featuring-doctor-p-jphelpz-medusa-atomixvocalist-tickets-17362798598?aff=aff0songkick",
	"imageURL": "ca6a250fc84f30e571a62286fc8c2c16c7ce64b4.png",
	"main_imageURL": "ca6a250fc84f30e571a62286fc8c2c16c7ce64b4.png",
	"start_date": "2015-08-07T12:00:00.000Z",
	"end_date": "2015-08-07T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Old Rock House",
	"latitude": 38.615219,
	"longitude": -90.196203,
	"address": "1200 S 7th St, St. Louis, MO 63104",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1370,
	"event": "Rain Man @ Foundation Nightclub",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "http://www.shareasale.com/r.cfm?B=234786&U=1121425&M=27601&urllink=www.ticketfly.com/purchase/event/878739/tfly",
	"imageURL": "91325c264a58ad3e163ed944d8b36904.jpeg",
	"main_imageURL": "a48738765ed74432da2137e942f48614.jpg",
	"start_date": "2015-08-07T12:00:00.000Z",
	"end_date": "2015-08-07T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Foundation Nightclub Seattle",
	"latitude": 47.612399,
	"longitude": -122.346427,
	"address": "2218 Western Ave #100, Seattle, WA 98121",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1385,
	"event": "Markus Schulz @ Opera Nightclub",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "http://operaatlanta.com/event.cfm?cart&id=148774",
	"imageURL": "8addad3456dbd4f4567d411c1ecbaa96.jpg",
	"main_imageURL": "ad79e66d7af8c3b545e8074006380228.jpg",
	"start_date": "2015-08-07T12:00:00.000Z",
	"end_date": "2015-08-07T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Opera",
	"latitude": 33.7938108,
	"longitude": -84.38697969999998,
	"address": "1150 Crescent Ave NE, Atlanta, GA 30309, USA",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1441,
	"event": "Matoma @ Populux Detroit",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/POPULUXDetroit",
	"twitter_link": "https://twitter.com/populuxdetroit",
	"web_link": "http://populuxdetroit.com/",
	"ticket_link": "http://www.ticketweb.com/t3/sale/SaleEventDetail?dispatch=loadSelectionData&eventId=5753895&REFERRAL_ID=tmfeed",
	"imageURL": "ffcf6ae99fcb8761e7d572de428d87cc.jpeg",
	"main_imageURL": "0bac3a60cc93ea6d91b4484c1f463c81.jpg",
	"start_date": "2015-08-07T12:00:00.000Z",
	"end_date": "2015-08-07T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Populux Detroit",
	"latitude": 42.351449,
	"longitude": -83.060129,
	"address": "4140 Woodward Ave, Detroit, MI 48201",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1491,
	"event": "Oliver Dollar @ Spybar Chicago",
	"bio": "No Description Available",
	"fb_link": "http://www.facebook.com/SpybarChicago",
	"twitter_link": "http://www.twitter.com/spybar",
	"web_link": "http://www.spybarchicago.com/",
	"ticket_link": "http://www.clubtix.com/spybar-chicago/oliver-dollar-gene-farris-tickets-395857",
	"imageURL": "f9d5fdb78f72fb98cd1217fffb49f6b2.jpeg",
	"main_imageURL": "34bd2fe33853abdfd38aaa44f61f34c5.jpg",
	"start_date": "2015-08-07T12:00:00.000Z",
	"end_date": "2015-08-07T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Spybar Chicago",
	"latitude": 41.893703,
	"longitude": -87.635866,
	"address": "646 N Franklin St, Chicago, IL 60654",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1518,
	"event": "Samo Sound Boy @ Primary Nightclub",
	"bio": "No Description Available",
	"fb_link": "http://www.facebook.com/PrimaryPresents",
	"twitter_link": "http://twitter.com/Primarypresents",
	"web_link": "http://primarychi.com/",
	"ticket_link": "http://www.shareasale.com/r.cfm?B=234786&U=1121425&M=27601&urllink=www.ticketfly.com/purchase/event/899367/tfly?utm_medium=946393",
	"imageURL": "d06e7c7823db4c5c1396491700f676e7.jpeg",
	"main_imageURL": "ce414e186363480dc159111421457d67.jpg",
	"start_date": "2015-08-07T12:00:00.000Z",
	"end_date": "2015-08-07T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Primary Nightclub",
	"latitude": 41.903756,
	"longitude": -87.629004,
	"address": "5 W Division St, Chicago, IL 60610",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1564,
	"event": "Skrux @ The Loft Minneapolis",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/theloftmpls?ref=timeline_chaining",
	"twitter_link": "twitter.com/theloftmpls",
	"web_link": "skywaytheatre.com",
	"ticket_link": "http://sa1.seatadvisor.com/sabo/servlets/TicketRequest?eventId=998912&presenter=SKYWAY&venue=&event=",
	"imageURL": "9c9cd25f6b7ab83586e7d64e2af37168.jpg",
	"main_imageURL": "18dbdeff4250464ba9b5b96731995910.jpg",
	"start_date": "2015-08-07T12:00:00.000Z",
	"end_date": "2015-08-07T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "The Loft Minneapolis",
	"latitude": 44.977458,
	"longitude": -93.275138,
	"address": "713 Hennepin Ave, Minneapolis, MN 55403",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1567,
	"event": "Tortured Soul @ The MID",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/MidChicago?fref=ts&ref=br_tf",
	"twitter_link": "https://twitter.com/themidchicago",
	"web_link": "http://www.themidchicago.com/",
	"ticket_link": "http://www.clubtix.com/tortured-soul-mayhem-at-the-mid-tickets-390757",
	"imageURL": "803ca9d44a2fb1202b0caccdbec3e796.jpg",
	"main_imageURL": "1c3e59fadd620df0807d29c9f7ff47aa.jpg",
	"start_date": "2015-08-07T12:00:00.000Z",
	"end_date": "2015-08-07T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "The MID",
	"latitude": 41.887079,
	"longitude": -87.647807,
	"address": "306 N Halsted\nChicago, Illinois 60661 ",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 889,
	"event": "TJR @ Encore Beach Club",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "http://www.wantickets.com/Events/ShowEvent.aspx?eventId=181029&affCode=5e79c926831b4ca3a540",
	"imageURL": "0c3278d61f19e88509b98a68da7a1e43.jpg",
	"main_imageURL": "a14d508d16b33e9d1a7af4952aeae5b2.jpg",
	"start_date": "2015-08-07T12:00:00.000Z",
	"end_date": "2015-08-07T12:00:00.000Z",
	"paid": 0,
	"days": 1,
	"venue": "Encore Beach Club",
	"latitude": 36.1310893,
	"longitude": -115.1656704,
	"address": "3100 S Las Vegas Blvd, Las Vegas, NV 89109, USA",
	"source_id": "181029",
	"price": "$35.50"
	},
	{
	"id": 1699,
	"event": "Squamish Valley Music Festival",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SquamishValleyMusicFestival",
	"twitter_link": "https://twitter.com/squamishfest",
	"web_link": "http://squamishfestival.com/",
	"ticket_link": "http://squamishfestival.com/passes",
	"imageURL": "f44bf3912cb657f363fc2feebaf017f8.jpg",
	"main_imageURL": "dc8342e48bc81a692a30c9516ea59051.jpg",
	"start_date": "2015-08-07T12:00:00.000Z",
	"end_date": "2015-08-09T12:00:00.000Z",
	"paid": 0,
	"days": 3,
	"venue": "Logger Sports Grounds",
	"latitude": 49.725416,
	"longitude": -123.141815,
	"address": "39641 Loggers Ln, Squamish, BC V8B, Canada",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1700,
	"event": "Outside Lands Festival",
	"bio": "No Description Available",
	"fb_link": "http://www.facebook.com/SFOutsideLands",
	"twitter_link": "http://twitter.com/sfoutsidelands",
	"web_link": "http://www.sfoutsidelands.com/",
	"ticket_link": "http://www.sfoutsidelands.com/tickets",
	"imageURL": "1195d99bfdeb2ad35a6f9a817bd6e6ea.jpg",
	"main_imageURL": "deda96738a8c6fd3c3741298db597cb3.jpg",
	"start_date": "2015-08-07T12:00:00.000Z",
	"end_date": "2015-08-07T12:00:00.000Z",
	"paid": 0,
	"days": 1,
	"venue": "Golden Gate Park",
	"latitude": 37.77167,
	"longitude": -122.454556,
	"address": "Park Headquarters, 501 Stanyan St San Francisco, CA 94117 ",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1697,
	"event": "Mackapoolooza #Bleaulive",
	"bio": "No Description Available",
	"fb_link": null,
	"twitter_link": null,
	"web_link": null,
	"ticket_link": "http://www.wantickets.com/Events/ShowEvent.aspx?eventId=188731&affCode=5e79c926831b4ca3a540",
	"imageURL": "ca6a250fc84f30e571a62286fc8c2c16c7ce64b4.png",
	"main_imageURL": "743e7b56cebd1ac2774709a28ac5267b.jpg",
	"start_date": "2015-08-07T16:00:00.000Z",
	"end_date": "2015-08-07T16:00:00.000Z",
	"paid": 0,
	"days": 1,
	"venue": "Liv",
	"latitude": 25.817797,
	"longitude": -80.12232899999998,
	"address": "4441 Collins Ave, Miami Beach, FL 33140, United States",
	"source_id": "188731",
	"price": "$56.50"
	},
	{
	"id": 1696,
	"event": "Shambhala Music Festival 2015",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "http://www.bandsintown.com/event/10059627/buy_tickets?app_id=setmine",
	"imageURL": "2218c94f8037093d08c95bf9d008e2b9.jpg",
	"main_imageURL": "5ea7e823fe840ae525d75242542b292b.jpg",
	"start_date": "2015-08-07T16:00:00.000Z",
	"end_date": "2015-08-10T16:00:00.000Z",
	"paid": 0,
	"days": 4,
	"venue": "Salmo River Ranch",
	"latitude": 49.141938,
	"longitude": -117.264161,
	"address": "7790 British Columbia 3, Salmo, BC V0G 1Z0, Canada",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 706,
	"event": "MDBP Brooklyn 2015",
	"bio": "Artists: \r\n     • Cashmere Cat b2b Trippy Turtle\r\n     • Die Antwoord\r\n     • Gent & Jawns\r\n     • Major Lazer\r\n     • Vic Mensa\r\n     • ?????\r\n     • ?????\r\n     • ?????\r\n• CL\r\n     • Grandtheft\r\n     • Jack U\r\n     • Party Favor\r\n     • Tyler The Creator\r\n     • What So Not\r\n     • ?????\r\n     • ?????\r\n     • ?????",
	"fb_link": "https://www.facebook.com/Maddecentblockparty",
	"twitter_link": "https://twitter.com/MDblockparty",
	"web_link": "http://maddecentblockparty.com/",
	"ticket_link": "http://www.ticketmaster.com/promo/krbgwx",
	"imageURL": "2ab1bf07e8311ab942f30232f9b7547f.jpg",
	"main_imageURL": "5ad64cd09ced9e51955f0dffcd697584.jpg",
	"start_date": "2015-08-08T12:00:00.000Z",
	"end_date": "2015-08-09T12:00:00.000Z",
	"paid": 1,
	"days": 2,
	"venue": "MCU Park",
	"latitude": 40.574806,
	"longitude": -73.984494,
	"address": "1904 Surf Ave, Brooklyn, NY 11224",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 824,
	"event": "Skrillex @ XS Nightclub",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "https://www.ticketmaster.com/",
	"imageURL": "348c2d1695ad1ff8f60bee1d25cc7ae7.jpg",
	"main_imageURL": "93f9150df0642688323738b9bf65496d.jpg",
	"start_date": "2015-08-08T12:00:00.000Z",
	"end_date": "2015-08-08T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "XS Nightclub",
	"latitude": 36.1293962,
	"longitude": -115.1653038,
	"address": "3121 S Las Vegas Blvd, Las Vegas, NV 89109, USA",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 946,
	"event": "Cocodrills, Nathan Barato",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "http://www.wantickets.com/Events/ShowEvent.aspx?eventId=185802&affCode=5e79c926831b4ca3a540",
	"imageURL": "4817cb6da3453027adf2fe004794f936.jpg",
	"main_imageURL": "a0cb4c181357c3d3cb670cbb33244ef3.jpg",
	"start_date": "2015-08-08T12:00:00.000Z",
	"end_date": "2015-08-08T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Club Space",
	"latitude": 25.784545,
	"longitude": -80.193081,
	"address": "34 Northeast 11th Street, Miami, FL 33132, United States",
	"source_id": "185802",
	"price": "$23.40"
	},
	{
	"id": 951,
	"event": "Third Party @ Wall Lounge",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "http://www.wantickets.com/Events/ShowEvent.aspx?eventId=181585&affCode=5e79c926831b4ca3a540",
	"imageURL": "d5ca467afd4135aeceb9a8ee8306fe9a.jpg",
	"main_imageURL": "eb9172d9fbcb549bcc559f6e88f09f90.jpg",
	"start_date": "2015-08-08T12:00:00.000Z",
	"end_date": "2015-08-08T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Wall Lounge Miami",
	"latitude": 25.797773,
	"longitude": -80.12766799999997,
	"address": "2201 Collins Ave, Miami Beach, FL 33139, United States",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1190,
	"event": "Mat Zo @ Kingdom Nightclub",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "http://www.shareasale.com/r.cfm?B=234786&U=1121425&M=27601&urllink=www.ticketfly.com/purchase/event/875499",
	"imageURL": "c4f871b837cef615d6f9cc5f6229fa5b.png",
	"main_imageURL": "508d4bc219940c8a5e3abf242218e9ad.jpg",
	"start_date": "2015-08-08T12:00:00.000Z",
	"end_date": "2015-08-08T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Kingdom Austin",
	"latitude": 30.26675,
	"longitude": -97.742439,
	"address": "103 E 5th St, Austin, TX 78701",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1321,
	"event": "Markus Schulz @ Avalon Hollywood",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "http://wl.flavorus.com/event/Markus-Schulz-Open-to-Close/294196?afflky=AvalonHollywood",
	"imageURL": "130aef4b395ee0f42e543e10b80dd9bf.jpeg",
	"main_imageURL": "37f617ff89507efd25d4c1626bbdc4d9.jpg",
	"start_date": "2015-08-08T12:00:00.000Z",
	"end_date": "2015-08-08T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Avalon Hollywood",
	"latitude": 34.10272,
	"longitude": -118.327153,
	"address": "1735 Vine St.\nHollywood, CA 90028",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1229,
	"event": "FTampa, Fight Clvb @ Ruby Skye",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "https://www.eventbrite.com/e/ftampa-fight-clvb-tickets-17546170067",
	"imageURL": "4acd557bede2daffa46b7739381f10cd.jpg",
	"main_imageURL": "074d8df0fce4e7dbf3ec19bd755ade5f.jpg",
	"start_date": "2015-08-08T12:00:00.000Z",
	"end_date": "2015-08-08T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Ruby Skye SF",
	"latitude": 37.787592,
	"longitude": -122.409805,
	"address": "420 Mason St, San Francisco, CA 94109",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1264,
	"event": "Desaparecidos @ 9:30 Club",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "http://www.shareasale.com/r.cfm?B=234786&U=1121425&M=27601&urllink=www.ticketfly.com/purchase/event/857777",
	"imageURL": "668c9e22bb614bb1c26a673625252adf.jpg",
	"main_imageURL": "94442661d5570889cc58218b01cd9762.jpg",
	"start_date": "2015-08-08T12:00:00.000Z",
	"end_date": "2015-08-08T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "9:30 Club",
	"latitude": 38.917947,
	"longitude": -77.02373599999999,
	"address": "815 V Street Northwest, Washington, DC 20001, United States",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1283,
	"event": "Indy Fest 2015 @ Riot Room",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "http://www.shareasale.com/r.cfm?B=234786&U=1121425&M=27601&urllink=www.ticketfly.com/purchase/event/892349",
	"imageURL": "ffc87fec31a14cca968c0e8f9104a39b.jpeg",
	"main_imageURL": "d5e34e508366fb437aaccca2fd97730a.jpg",
	"start_date": "2015-08-08T12:00:00.000Z",
	"end_date": "2015-08-08T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Riot Room Kansas City",
	"latitude": 39.053561,
	"longitude": -94.591069,
	"address": "4048 Broadway, Kansas City, MO 64111",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1369,
	"event": "Deniz Koyu @ Foundation Nightclub",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "http://www.shareasale.com/r.cfm?B=234786&U=1121425&M=27601&urllink=www.ticketfly.com/purchase/event/880893/tfly",
	"imageURL": "91325c264a58ad3e163ed944d8b36904.jpeg",
	"main_imageURL": "a48738765ed74432da2137e942f48614.jpg",
	"start_date": "2015-08-08T12:00:00.000Z",
	"end_date": "2015-08-08T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Foundation Nightclub Seattle",
	"latitude": 47.612399,
	"longitude": -122.346427,
	"address": "2218 Western Ave #100, Seattle, WA 98121",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1492,
	"event": "SecondCity & Chocolate Puma @ Spybar Chicago",
	"bio": "No Description Available",
	"fb_link": "http://www.facebook.com/SpybarChicago",
	"twitter_link": "http://www.twitter.com/spybar",
	"web_link": "http://www.spybarchicago.com/",
	"ticket_link": "http://www.clubtix.com/secondcity-chocolate-puma-tickets-391822",
	"imageURL": "f9d5fdb78f72fb98cd1217fffb49f6b2.jpeg",
	"main_imageURL": "34bd2fe33853abdfd38aaa44f61f34c5.jpg",
	"start_date": "2015-08-08T12:00:00.000Z",
	"end_date": "2015-08-08T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Spybar Chicago",
	"latitude": 41.893703,
	"longitude": -87.635866,
	"address": "646 N Franklin St, Chicago, IL 60654",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1499,
	"event": "Body Language: Hunter Siegel @ The MID",
	"bio": "First ever open to close club tour!",
	"fb_link": "https://www.facebook.com/MidChicago?fref=ts&ref=br_tf",
	"twitter_link": "https://twitter.com/themidchicago",
	"web_link": "http://www.themidchicago.com/",
	"ticket_link": "http://www.clubtix.com/themid/gareth-emery-the-mid-tickets-389477",
	"imageURL": "803ca9d44a2fb1202b0caccdbec3e796.jpg",
	"main_imageURL": "1c3e59fadd620df0807d29c9f7ff47aa.jpg",
	"start_date": "2015-08-08T12:00:00.000Z",
	"end_date": "2015-08-08T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "The MID",
	"latitude": 41.887079,
	"longitude": -87.647807,
	"address": "306 N Halsted\nChicago, Illinois 60661 ",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1515,
	"event": "Hook N Sling @ Sound-Bar Chicago",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SoundBarChicago",
	"twitter_link": "https://twitter.com/sound_bar",
	"web_link": "http://www.sound-bar.com/",
	"ticket_link": "http://www.wantickets.com/Events/ShowEvent.aspx?eventId=185122&affCode=5e79c926831b4ca3a540",
	"imageURL": "deb1e1c89114b514eba97b38923a0172.jpg",
	"main_imageURL": "884da0a8d815525ed93ba5b7a7f260a0.jpg",
	"start_date": "2015-08-08T12:00:00.000Z",
	"end_date": "2015-08-08T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Sound-Bar Chicago",
	"latitude": 41.89331,
	"longitude": -87.635331,
	"address": "226 W Ontario St, Chicago, IL 60654",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1538,
	"event": "Sultan & Shepard @ Spades Nightclub",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/spadesnightclub",
	"twitter_link": "twitter.com/spadesnightclub",
	"web_link": "http://home.spadesnightclub.com/",
	"ticket_link": "https://www.vitalculture.com/events/detail/2841",
	"imageURL": "f1fc8bb48245927612fd24a379fc9334.jpeg",
	"main_imageURL": "531e1833d727cbd7f53471367e86fc3a.jpg",
	"start_date": "2015-08-08T12:00:00.000Z",
	"end_date": "2015-08-08T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Spades Nightclub",
	"latitude": 44.981747,
	"longitude": -93.272533,
	"address": "322 N 1st Ave, Minneapolis, MN 55401",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1565,
	"event": "Elephante @ The Loft Minneapolis",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/theloftmpls?ref=timeline_chaining",
	"twitter_link": "twitter.com/theloftmpls",
	"web_link": "skywaytheatre.com",
	"ticket_link": "http://sa1.seatadvisor.com/sabo/servlets/TicketRequest?eventId=996725&presenter=SKYWAY&venue=&event=",
	"imageURL": "9c9cd25f6b7ab83586e7d64e2af37168.jpg",
	"main_imageURL": "18dbdeff4250464ba9b5b96731995910.jpg",
	"start_date": "2015-08-08T12:00:00.000Z",
	"end_date": "2015-08-08T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "The Loft Minneapolis",
	"latitude": 44.977458,
	"longitude": -93.275138,
	"address": "713 Hennepin Ave, Minneapolis, MN 55403",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1635,
	"event": "Vanilla Ace @ Primary Nightclub",
	"bio": "No Description Available",
	"fb_link": "http://www.facebook.com/PrimaryPresents",
	"twitter_link": "http://twitter.com/Primarypresents",
	"web_link": "http://primarychi.com",
	"ticket_link": "https://www.ticketfly.com/purchase/event/866985",
	"imageURL": "d06e7c7823db4c5c1396491700f676e7.jpeg",
	"main_imageURL": "ce414e186363480dc159111421457d67.jpg",
	"start_date": "2015-08-08T12:00:00.000Z",
	"end_date": "2015-08-08T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Primary Nightclub",
	"latitude": 41.903756,
	"longitude": -87.629004,
	"address": "5 W Division St, Chicago, IL 60610",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 857,
	"event": "DJ Snake @ Surrender",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "http://www.wantickets.com/Events/ShowEvent.aspx?eventId=181048&affCode=5e79c926831b4ca3a540",
	"imageURL": "d5df6b5d717880080b0413481f6ef9ab.jpg",
	"main_imageURL": "a5e7e205ca03586d603c23dd5a86b100.jpg",
	"start_date": "2015-08-08T12:00:00.000Z",
	"end_date": "2015-08-08T12:00:00.000Z",
	"paid": 0,
	"days": 1,
	"venue": "Surrender Nightclub",
	"latitude": 36.1268768,
	"longitude": -115.1658732,
	"address": "3131 S Las Vegas Blvd, Las Vegas, NV 89109, USA",
	"source_id": "181048",
	"price": "$29.75"
	},
	{
	"id": 1349,
	"event": "WE ARE NRG @ NOS Events Center",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/pages/NOS-Event-Center/138482109526295?rf=168758376540472",
	"twitter_link": "https://twitter.com/nos_events",
	"web_link": "http://www.nosevents.com/",
	"ticket_link": "http://www.ticketmaster.com/we-are-nrg-san-bernardino-california-08-08-2015/event/09004ECA15223AEC?camefrom=CFC_INSOMNIAC_WEARENRGAUG2015_GlobalDanceElectronic",
	"imageURL": "ca6a250fc84f30e571a62286fc8c2c16c7ce64b4.png",
	"main_imageURL": "ca6a250fc84f30e571a62286fc8c2c16c7ce64b4.png",
	"start_date": "2015-08-08T12:00:00.000Z",
	"end_date": "2015-08-08T12:00:00.000Z",
	"paid": 0,
	"days": 1,
	"venue": "NOS Events Center",
	"latitude": 34.089748,
	"longitude": -117.29406899999998,
	"address": "689 S E St, San Bernardino, CA, United States",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1207,
	"event": "Chocolate Puma @ Sisu Dayclub",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "https://www.eventbrite.com/e/aqua-chocolate-puma-dallas-tickets-16598378196?aff=website",
	"imageURL": "87bb54a7d12ed77cacb59f30b1577d17.jpeg",
	"main_imageURL": "fab2585156cad4d9af6bdd3067941ad6.jpg",
	"start_date": "2015-08-09T12:00:00.000Z",
	"end_date": "2015-08-09T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Sisu Uptown Dallas",
	"latitude": 32.795043,
	"longitude": -96.803502,
	"address": "2508 Maple Ave, Dallas, TX 75201",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 858,
	"event": "DJ Snake @ Encore Beach Club",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "http://www.wantickets.com/Events/ShowEvent.aspx?eventId=181031&affCode=5e79c926831b4ca3a540",
	"imageURL": "0c3278d61f19e88509b98a68da7a1e43.jpg",
	"main_imageURL": "a14d508d16b33e9d1a7af4952aeae5b2.jpg",
	"start_date": "2015-08-09T12:00:00.000Z",
	"end_date": "2015-08-09T12:00:00.000Z",
	"paid": 0,
	"days": 1,
	"venue": "Encore Beach Club",
	"latitude": 36.1310893,
	"longitude": -115.1656704,
	"address": "3100 S Las Vegas Blvd, Las Vegas, NV 89109, USA",
	"source_id": "181031",
	"price": "$35.50"
	},
	{
	"id": 900,
	"event": "Audien @ Tikki Beach",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "http://www.wantickets.com/Events/ShowEvent.aspx?eventId=181483&affCode=5e79c926831b4ca3a540",
	"imageURL": "f2a97b66d59eb2b3e1da16a97253fbc1.jpg",
	"main_imageURL": "4eb2d2d9b0400db82aa9e701bf4f4459.jpg",
	"start_date": "2015-08-09T12:00:00.000Z",
	"end_date": "2015-08-09T12:00:00.000Z",
	"paid": 0,
	"days": 1,
	"venue": "Tikki Beach",
	"latitude": 41.3220026,
	"longitude": -71.80872019999998,
	"address": "159 Atlantic Ave, Westerly, RI 02891, USA",
	"source_id": "181483",
	"price": "$13.50"
	},
	{
	"id": 993,
	"event": "4 Color Zack & DJ Scene @ Evolution Sundays",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "http://www.eventbrite.com/e/dj-scene-and-4-color-zack-evolution-sundays-tickets-17028318158",
	"imageURL": "e6ba6476b7ab62a4087a4d535bb9473d.jpeg",
	"main_imageURL": "3edb77e14913694609461b18e3e7cb5a.jpg",
	"start_date": "2015-08-10T12:00:00.000Z",
	"end_date": "2015-08-10T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Shephard's Beach Resort",
	"latitude": 27.9670811,
	"longitude": -82.82689299999998,
	"address": "619 S Gulfview Blvd, Clearwater Beach, FL 33767, USA",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1189,
	"event": "Chris Lorenzo @ Kingdom Nightclub",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "http://www.shareasale.com/r.cfm?B=234786&U=1121425&M=27601&urllink=www.ticketfly.com/purchase/event/873833",
	"imageURL": "c4f871b837cef615d6f9cc5f6229fa5b.png",
	"main_imageURL": "508d4bc219940c8a5e3abf242218e9ad.jpg",
	"start_date": "2015-08-11T12:00:00.000Z",
	"end_date": "2015-08-11T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Kingdom Austin",
	"latitude": 30.26675,
	"longitude": -97.742439,
	"address": "103 E 5th St, Austin, TX 78701",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1263,
	"event": "Failure, HUM @ 9:30 Club",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "http://www.shareasale.com/r.cfm?B=234786&U=1121425&M=27601&urllink=www.ticketfly.com/purchase/event/877131",
	"imageURL": "668c9e22bb614bb1c26a673625252adf.jpg",
	"main_imageURL": "94442661d5570889cc58218b01cd9762.jpg",
	"start_date": "2015-08-11T12:00:00.000Z",
	"end_date": "2015-08-11T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "9:30 Club",
	"latitude": 38.917947,
	"longitude": -77.02373599999999,
	"address": "815 V Street Northwest, Washington, DC 20001, United States",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 1302,
	"event": "Theory of a Deadman @ The Midland",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "http://www.axs.com/events/279953/theory-of-a-deadman-tickets?skin=arvestbank&src=AEGLIVE_EMIDTMCI030115VEN001",
	"imageURL": "0229cc080e3571f83355827294caa6f9.jpeg",
	"main_imageURL": "0db0505764e4e78e1905789a95fcea85.jpg",
	"start_date": "2015-08-11T12:00:00.000Z",
	"end_date": "2015-08-11T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Midland Theatre Kansas City",
	"latitude": 39.098852,
	"longitude": -94.58346,
	"address": "Kansas City Power & Light District, 1228 Main St, Kansas City, MO 64105, USA",
	"source_id": null,
	"price": "$ - "
	},
	{
	"id": 929,
	"event": "The Chainsmokers @ Wet Republic",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "http://www.wantickets.com/Events/ShowEvent.aspx?eventId=180660&affCode=5e79c926831b4ca3a540",
	"imageURL": "81040718daac26b79ab581f1ae3c976b.jpg",
	"main_imageURL": "abef47bab96e249bfa754d3eaf6ad65c.jpg",
	"start_date": "2015-08-12T12:00:00.000Z",
	"end_date": "2015-08-12T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Wet Republic",
	"latitude": 36.2288449,
	"longitude": -115.0744837,
	"address": "3799 Las Vegas Blvd N, Las Vegas, NV 89115, USA",
	"source_id": "180660",
	"price": "$24.40"
	},
	{
	"id": 1282,
	"event": "Lazerdisk @ Riot Room",
	"bio": "No Description Available",
	"fb_link": "https://www.facebook.com/SetMineApp",
	"twitter_link": "https://www.twitter.com/setmineapp",
	"web_link": "https://www.google.com/",
	"ticket_link": "http://www.shareasale.com/r.cfm?B=234786&U=1121425&M=27601&urllink=www.ticketfly.com/purchase/event/881751",
	"imageURL": "ffc87fec31a14cca968c0e8f9104a39b.jpeg",
	"main_imageURL": "d5e34e508366fb437aaccca2fd97730a.jpg",
	"start_date": "2015-08-12T12:00:00.000Z",
	"end_date": "2015-08-12T12:00:00.000Z",
	"paid": 1,
	"days": 1,
	"venue": "Riot Room Kansas City",
	"latitude": 39.053561,
	"longitude": -94.591069,
	"address": "4048 Broadway, Kansas City, MO 64111",
	"source_id": null,
	"price": "$ - "
	}
];

//works for passing to set tile as data={...}
var sampleSet = {
	"artist": "Calvin Harris",
	"event": "Lollapalooza Chicago 2014",
	"main_eventimageURL": "8035464a1f8870cce06b320fbab09a73d4994b54.jpg",
	"artistimageURL": "b7debba3662c51696aa361f98c923893.jpg",
	"popularity": 7652,
	"set_length": "48:49"
}

//works for passing to event tile as data={...} and detail view as detailData={...}
var sampleEvent = {
	"id": 705,
	"event": "MDBP Philadelphia 2015",
	"bio": "Artists: \r\n     • ILOVEMAKONNEN\r\n     • JACK U\r\n     • Jauz\r\n     • Nadus\r\n     • SwizzyMack\r\n     • What So Not\r\n     • Dirty South Joe\r\n     • Giraffage\r\n     • Keys N Krates\r\n     • Major Lazer\r\n     • ?????\r\n     • ?????\r\n     • ?????\r\n     • ?????\r\n     • ?????",
	"fb_link": "https://www.facebook.com/Maddecentblockparty",
	"twitter_link": "https://twitter.com/MDblockparty",
	"web_link": "http://maddecentblockparty.com/",
	"ticket_link": "https://tickets.songkick.com/events/23445668",
	"imageURL": "2ab1bf07e8311ab942f30232f9b7547f.jpg",
	"main_imageURL": "a44299cda5f130dfbced179e4dd6d6ab.jpg",
	"start_date": "2015-08-06T12:00:00.000Z",
	"end_date": "2015-08-07T12:00:00.000Z",
	"paid": 1,
	"days": 2,
	"venue": "Festival Pier at Penn's Landing",
	"latitude": 39.960016,
	"longitude": -75.137109,
	"address": "601 N Columbus Blvd, Philadelphia, PA 19123",
	"source_id": null,
	"price": "$ - ",
	"formattedDate": "Aug 6th - 7th, 2015",
	"type": "upcoming",
	"lineup": [
		{
			"artist": "ILOVEMAKONNEN",
			"id": "2008",
			"time": "TBA",
			"day": "1",
			"event": "MDBP Philadelphia 2015",
			"fb_link": null,
			"twitter_link": null,
			"soundcloud_link": null,
			"youtube_link": null,
			"instagram_link": null,
			"artistimageURL": "207ebc6e2a3ba22d26ec9901ee269e28.jpg",
			"imageURL": "207ebc6e2a3ba22d26ec9901ee269e28.jpg",
			"set_count": 1,
			"event_count": 7
		},
		{
			"artist": "Jack U",
			"id": "281",
			"time": "TBA",
			"day": "1",
			"event": "MDBP Philadelphia 2015",
			"fb_link": null,
			"twitter_link": "https://twitter.com/diplo",
			"soundcloud_link": null,
			"youtube_link": null,
			"instagram_link": null,
			"artistimageURL": "7437af0472119a89bb67d74ba510a75f.jpg",
			"imageURL": "7437af0472119a89bb67d74ba510a75f.jpg",
			"set_count": 5,
			"event_count": 3
		},
		{
			"artist": "Jauz",
			"id": "1417",
			"time": "TBA",
			"day": "1",
			"event": "MDBP Philadelphia 2015",
			"fb_link": null,
			"twitter_link": null,
			"soundcloud_link": null,
			"youtube_link": null,
			"instagram_link": null,
			"artistimageURL": "3742b8415fa1c90c3f707f6df44eecfb.jpg",
			"imageURL": "3742b8415fa1c90c3f707f6df44eecfb.jpg",
			"set_count": 2,
			"event_count": 8
		},
		{
			"artist": "Nadus",
			"id": "2285",
			"time": "TBA",
			"day": "1",
			"event": "MDBP Philadelphia 2015",
			"fb_link": null,
			"twitter_link": null,
			"soundcloud_link": null,
			"youtube_link": null,
			"instagram_link": null,
			"artistimageURL": "ca6a250fc84f30e571a62286fc8c2c16c7ce64b4.png",
			"imageURL": "ca6a250fc84f30e571a62286fc8c2c16c7ce64b4.png",
			"set_count": 0,
			"event_count": 1
		},
		{
			"artist": "SwizzyMack",
			"id": "1146",
			"time": "TBA",
			"day": "1",
			"event": "MDBP Philadelphia 2015",
			"fb_link": null,
			"twitter_link": null,
			"soundcloud_link": null,
			"youtube_link": null,
			"instagram_link": null,
			"artistimageURL": "ca6a250fc84f30e571a62286fc8c2c16c7ce64b4.png",
			"imageURL": "ca6a250fc84f30e571a62286fc8c2c16c7ce64b4.png",
			"set_count": 0,
			"event_count": 1
		},
		{
			"artist": "What So Not",
			"id": "396",
			"time": "TBA",
			"day": "1",
			"event": "MDBP Philadelphia 2015",
			"fb_link": "https://www.facebook.com/whatsonot",
			"twitter_link": "https://twitter.com/whatsonot",
			"soundcloud_link": null,
			"youtube_link": null,
			"instagram_link": null,
			"artistimageURL": "acb39588e0caa88e0dfbb0094ff74896.jpg",
			"imageURL": "acb39588e0caa88e0dfbb0094ff74896.jpg",
			"set_count": 7,
			"event_count": 10
		},
		{
			"artist": "Dirty South Joe",
			"id": "1173",
			"time": "TBA",
			"day": "1",
			"event": "MDBP Philadelphia 2015",
			"fb_link": null,
			"twitter_link": null,
			"soundcloud_link": null,
			"youtube_link": null,
			"instagram_link": null,
			"artistimageURL": "ca6a250fc84f30e571a62286fc8c2c16c7ce64b4.png",
			"imageURL": "ca6a250fc84f30e571a62286fc8c2c16c7ce64b4.png",
			"set_count": 0,
			"event_count": 1
		},
		{
			"artist": "Giraffage",
			"id": "762",
			"time": "TBA",
			"day": "1",
			"event": "MDBP Philadelphia 2015",
			"fb_link": null,
			"twitter_link": null,
			"soundcloud_link": null,
			"youtube_link": null,
			"instagram_link": null,
			"artistimageURL": "ca6a250fc84f30e571a62286fc8c2c16c7ce64b4.png",
			"imageURL": "ca6a250fc84f30e571a62286fc8c2c16c7ce64b4.png",
			"set_count": 0,
			"event_count": 3
		},
		{
			"artist": "Keys N Krates",
			"id": "526",
			"time": "TBA",
			"day": "1",
			"event": "MDBP Philadelphia 2015",
			"fb_link": "https://www.facebook.com/keysnkrates",
			"twitter_link": "https://twitter.com/keysnkrates",
			"soundcloud_link": null,
			"youtube_link": null,
			"instagram_link": null,
			"artistimageURL": "11db2bd27fc62f1e9aad04bfb43d5e63.jpg",
			"imageURL": "11db2bd27fc62f1e9aad04bfb43d5e63.jpg",
			"set_count": 5,
			"event_count": 9
		},
		{
			"artist": "Major Lazer",
			"id": "161",
			"time": "TBA",
			"day": "1",
			"event": "MDBP Philadelphia 2015",
			"fb_link": "https://www.facebook.com/majorlazer",
			"twitter_link": "https://twitter.com/majorlazer",
			"soundcloud_link": null,
			"youtube_link": null,
			"instagram_link": null,
			"artistimageURL": "0f59646e614d539af6eff00a55e97037.jpg",
			"imageURL": "0f59646e614d539af6eff00a55e97037.jpg",
			"set_count": 5,
			"event_count": 13
		}
		],
	"hasSets": false
}

//works for passing to track tile as data={...} 
var sampleTrack = {
	"artistname": "Syn Cole feat. Madame Buttons",
	"songname": "Miami 82 (Kygo Remix)",
	"starttime": "02:00",
	"artist": "Kygo",
	"event": "Tomorrowland 2014 W2",
	"main_eventimageURL": "12141ddad8636c5804c86dc685550ee1.jpg",
	"set_length": "10:32"
}

//works for passing to featured tile as data={...}
var sampleLandingEvent = {
	event: "Lollapalooza Chicago 2015",
	bio: "Lollapalooza 2015",
	main_imageURL: "64a0b0e7a80354ccc72812c98a0bd7d6.jpg",
	formattedDate: "Jul 31st - Aug 2nd, 2015",
	type: "recent"
}

//works for passing to detail page as detailData={...}
var sampleArtist = {
	"id": 574,
	"artist": "Kygo",
	"bio": "No Biography Available",
	"fb_link": "https://www.facebook.com/kygoofficial",
	"twitter_link": "https://twitter.com/kygomusic",
	"web_link": "https://www.google.com/",
	"instagram_link": null,
	"soundcloud_link": null,
	"youtube_link": null,
	"imageURL": "a7f7aaec8ecd0cdec444b8abb06dbc66.jpg",
	"musicbrainz_id": null,
	"set_count": 6,
	"event_count": 3,
	"sets": [
	{
	"id": 2314,
	"artist_id": [
	574
	],
	"artist": "Kygo",
	"event": "Diplo & Friends",
	"event_id": 44,
	"episode": "",
	"genre": "Deep House",
	"episode_imageURL": null,
	"eventimageURL": "6e85b515644e0ec38e115142656004e8.jpg",
	"main_eventimageURL": "ca6a250fc84f30e571a62286fc8c2c16c7ce64b4.png",
	"artistimageURL": "a7f7aaec8ecd0cdec444b8abb06dbc66.jpg",
	"songURL": "9980d7213c9eb692b44c2c0572282753ad1a196c.mp3",
	"datetime": "2014-09-20T04:03:04.000Z",
	"popularity": 5148,
	"is_radiomix": 1,
	"set_length": "59:58",
	"tracklistURL": "http://www.1001tracklists.com/tracklist/46356_diplo-kygo-zebra-katz-diplo-friends-2014-03-23.html",
	"imageURL": "6e85b515644e0ec38e115142656004e8.jpg",
	"artist_preview": [
	{
	"id": 574,
	"artist": "Kygo",
	"imageURL": "a7f7aaec8ecd0cdec444b8abb06dbc66.jpg",
	"set_count": 6,
	"event_count": 3
	}
	],
	"tracklist": "Pharrell Williams - Happy (Neus Remix), Ed Sheeran - I See Fire (Kygo Remix), Marvin Gaye - Sexual Healing (Kygo Remix), TLC - Waterfalls (Bixel Boys Remix) , Israel Kamakawiwo ole - Somewhere Over The Rainbow (Thomas Jack Remix), Gnarls Barkley - Crazy (TEEMID & Joie Tan Cover), ZZ Ward - 365 Days (Jerry Folk Remix) , Londonbeat - I've Been Thinking About You (Dilemmachine Remix), Benjamin Francis Leftwich - Shine (Kygo Remix) , Syn Cole feat. Madame Buttons - Miami 82 (Kygo Remix), The Knocks feat. X Ambassadors - Comfortable (Oliver Nelson Remix), Else - Her Movie , Seinabo Sey - Younger (Kygo Remix)",
	"starttimes": "00:00, 04:36, 09:13, 13:50, 18:27, 23:03, 27:40, 32:17, 36:54, 41:30, 46:07, 50:44, 55:21",
	"model_type": "set"
	},
	{
	"id": 2682,
	"artist_id": [
		574
	],
	"artist": "Kygo",
	"event": "Thomas Jack Presents Tropical House",
	"event_id": 124,
	"episode": "Vol 6",
	"genre": "Tropical House",
	"episode_imageURL": null,
	"eventimageURL": "01928d9ef549e2346520dda566452c74.jpg",
	"main_eventimageURL": "ca6a250fc84f30e571a62286fc8c2c16c7ce64b4.png",
	"artistimageURL": "a7f7aaec8ecd0cdec444b8abb06dbc66.jpg",
	"songURL": "790fa39c9682195875466031b99a8f333e1ad67f.mp3",
	"datetime": "2014-11-20T20:04:32.000Z",
	"popularity": 1138,
	"is_radiomix": 1,
	"set_length": "56:41",
	"tracklistURL": null,
	"imageURL": "01928d9ef549e2346520dda566452c74.jpg",
	"artist_preview": [
	{
		"id": 574,
		"artist": "Kygo",
		"imageURL": "a7f7aaec8ecd0cdec444b8abb06dbc66.jpg",
		"set_count": 6,
		"event_count": 3
	}
	],
	"tracklist": "Bob Marley - Bad Boys, Jabberwonky - Pola (The Geek & Vrv Remix), Dawn Golden - All I Want (Manila Killa Remix), Christina Perri - Burning Gold (Autograf Remix), The Police - Walking On The Moon (J-art & Madan Remix), Of Monsters & Men - Dirty Paws (Kygo Remix), San Holo - Hiding (Kav Verhouzer Remix), Kungs feat. Molly - West Coast, Dawa - Roll The Dice (Urban Contact Remix), ZHU - Faded (Delcroix & Delatour Remix), Dickystixxx - Make Me Feel Better (Club Mix), Labrinth feat. Avelino - Let It Be (The Grades Money Mix), Julian Le Play - Rollercoaster (Filous Remix), Finnebassen - If You Only Knew, Touch & Go - Gotta Have U",
	"starttimes": "00:00, 03:46, 07:33, 11:20, 15:06, 18:53, 22:40, 26:27, 30:13, 34:00, 37:47, 41:34, 45:20, 49:07, 52:54",
	"model_type": "set"
	},
	{
	"id": 1903,
	"artist_id": [
	574
	],
	"artist": "Kygo",
	"event": "Tomorrowland 2014 W2",
	"event_id": 116,
	"episode": "",
	"genre": "Progressive House",
	"episode_imageURL": null,
	"eventimageURL": "dbd5bd7900531575c9bbfaba0ae434c4.jpg",
	"main_eventimageURL": "12141ddad8636c5804c86dc685550ee1.jpg",
	"artistimageURL": "a7f7aaec8ecd0cdec444b8abb06dbc66.jpg",
	"songURL": "8bf16c6bb2609bcbb7a00940d65038a9e992c98b.mp3",
	"datetime": "2014-07-28T19:53:38.000Z",
	"popularity": 1014,
	"is_radiomix": 0,
	"set_length": "10:32",
	"tracklistURL": null,
	"imageURL": "dbd5bd7900531575c9bbfaba0ae434c4.jpg",
	"artist_preview": [
	{
	"id": 574,
	"artist": "Kygo",
	"imageURL": "a7f7aaec8ecd0cdec444b8abb06dbc66.jpg",
	"set_count": 6,
	"event_count": 3
	}
	],
	"tracklist": "Unknown, Unknown, Unknown, Unknown, Unknown, Unknown, Syn Cole feat. Madame Buttons - Miami 82 (Kygo Remix), Seinabo Sey - Younger (Kygo Remix), Gnarls Barkley - Crazy (TEEMID & Joie Tan Cover), Ben Pearce - What I Might Do (Kilter Remix)",
	"starttimes": "00:00, 01:00, 06:00, 07:00, 08:00, 09:00, 02:00, 03:00, 04:00, 05:00",
	"model_type": "set"
	},
	{
	"id": 3003,
	"artist_id": [
	574
	],
	"artist": "Kygo",
	"event": "Ultra Music Festival 2015",
	"event_id": 452,
	"episode": null,
	"genre": "Tropical House",
	"episode_imageURL": null,
	"eventimageURL": "1b4657404c6ec5aeb02ff98b07d9e0d7.jpg",
	"main_eventimageURL": "e724ff1860cfcbd557bd688d041d2935.jpg",
	"artistimageURL": "a7f7aaec8ecd0cdec444b8abb06dbc66.jpg",
	"songURL": "5206135c0e3e6f14db6d6abd2ae8e6f38457cf88.mp3",
	"datetime": "2015-04-01T02:04:53.000Z",
	"popularity": 397,
	"is_radiomix": 0,
	"set_length": "13:37",
	"tracklistURL": "http://www.1001tracklists.com/tracklist/73040_kygo-at-live-stage-ultra-music-festival-miami-united-states-2015-03-30.html",
	"imageURL": "1b4657404c6ec5aeb02ff98b07d9e0d7.jpg",
	"artist_preview": [
	{
	"id": 574,
	"artist": "Kygo",
	"imageURL": "a7f7aaec8ecd0cdec444b8abb06dbc66.jpg",
	"set_count": 6,
	"event_count": 3
	}
	],
	"tracklist": "Seinabo Sey - Younger (Kygo Remix), Syn Cole feat. Madame Buttons - Miami 82 (Kygo Remix), Kygo feat. Parson James - Stole The Show, ID - ID, ID - ID",
	"starttimes": "00:00, 02:43, 05:26, 08:10, 10:53",
	"model_type": "set"
	},
	{
	"id": 2924,
	"artist_id": [
	574
	],
	"artist": "Kygo",
	"event": "SiriusXM Music Lounge MMW @ W Hotel",
	"event_id": 511,
	"episode": null,
	"genre": "Tropical House",
	"episode_imageURL": null,
	"eventimageURL": "f98bd80aea1347ad253134ed53edd5fa.jpg",
	"main_eventimageURL": "d31547cc7c5dc6fbc5591d58465ed8bd.jpg",
	"artistimageURL": "a7f7aaec8ecd0cdec444b8abb06dbc66.jpg",
	"songURL": "5707e59ff0822e098d98ae0cfbc7a6d28c77f9ac.mp3",
	"datetime": "2015-03-27T18:10:23.000Z",
	"popularity": 226,
	"is_radiomix": 0,
	"set_length": "25:44",
	"tracklistURL": "http://www.1001tracklists.com/tracklist/72781_kygo-at-siriusxm-music-lounge-miami-music-week-united-states-2015-03-25.html",
	"imageURL": "f98bd80aea1347ad253134ed53edd5fa.jpg",
	"artist_preview": [
	{
	"id": 574,
	"artist": "Kygo",
	"imageURL": "a7f7aaec8ecd0cdec444b8abb06dbc66.jpg",
	"set_count": 6,
	"event_count": 3
	}
	],
	"tracklist": "Syn Cole feat. Madame Buttons - Miami 82 (Kygo Remix), Vance Joy - Riptide (FlicFlac Edit), ZHU - Faded (Delcroix & Delatour Remix), Kungs feat. Molly - West Coast, Bakermat - Teach Me, Klingande feat. Broken Back - RIVA (Restart The Game), Nico & Vinz - Am I Wrong (TEEMID Bootleg)",
	"starttimes": "00:00, 03:40, 07:20, 11:00, 14:40, 18:20, 22:00",
	"model_type": "set"
	},
	{
	"id": 3424,
	"artist_id": [
	574
	],
	"artist": "Kygo",
	"event": "Ultra Music Festival 2015",
	"event_id": 452,
	"episode": null,
	"genre": "Tropical House",
	"episode_imageURL": null,
	"eventimageURL": "1b4657404c6ec5aeb02ff98b07d9e0d7.jpg",
	"main_eventimageURL": "e724ff1860cfcbd557bd688d041d2935.jpg",
	"artistimageURL": "a7f7aaec8ecd0cdec444b8abb06dbc66.jpg",
	"songURL": "40ae5653a3e12c5751b092af982bc2d136a35bf3.mp3",
	"datetime": "2015-06-19T18:45:45.000Z",
	"popularity": 92,
	"is_radiomix": 0,
	"set_length": "59:13",
	"tracklistURL": "http://www.1001tracklists.com/tracklist/73040_kygo-at-live-stage-ultra-music-festival-miami-united-states-2015-03-30.html",
	"imageURL": "1b4657404c6ec5aeb02ff98b07d9e0d7.jpg",
	"artist_preview": [
	{
	"id": 574,
	"artist": "Kygo",
	"imageURL": "a7f7aaec8ecd0cdec444b8abb06dbc66.jpg",
	"set_count": 6,
	"event_count": 3
	}
	],
	"tracklist": "Seinabo Sey - Younger (Kygo Remix), Syn Cole feat. Madame Buttons - Miami 82 (Kygo Remix), Kygo feat. Parson James - Stole The Show, Ed Sheeran - I See Fire (Kygo Remix), Unknown, The Weeknd - Often (Kygo Remix), Kygo & Dillon Francis feat. James Hersey - Coming Over, Unknown, Ed Sheeran & Passenger - No Diggity vs. Thrift Shop (Kygo Remix), Marvin Gaye - Sexual Healing (Kygo Remix), Kyla La Grange - Cut Your Teeth (Kygo Remix), M83 - Wait (Kygo Remix), Sia - Oasis (Kygo Remix) (Working Title), Kygo feat. Conrad - Firestone",
	"starttimes": "00:00, 04:13, 08:27, 12:41, 16:55, 21:08, 25:22, 29:36, 33:50, 38:04, 42:17, 46:31, 50:45, 54:59",
	"model_type": "set"
	}
	],
	"upcomingEvents": [],
	"links": {
	"facebook": "https://www.facebook.com/kygoofficial",
	"twitter": "https://twitter.com/kygomusic",
	"instagram": null,
	"soundcloud": null,
	"youtube": null
	}
}

React.render(<App />, document.getElementById('app'));