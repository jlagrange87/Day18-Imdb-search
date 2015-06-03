$(document).ready(function(){
	var App = Backbone.Router.extend({
		routes:{
			"":     "home",
			"search/:query":     "search",

		},

		home: function(){
			$("#goBack").hide();
			$(".page").hide();
			$("#home").fadeIn(3000);
			$("#search-query").val("");
		},

		search: function(SearchQuery){
			$(".page").hide();
			$("h2").remove();
			$("#again-query").val("");
			$("#goBack").show(1000);
			$("#search").show();
			$("#results").hide();
			$("#results").fadeIn(3000);


		}
	});

	var myRouter = new App();
	Backbone.history.start();

	$("#searchform1").on("submit", function(e){
		e.preventDefault();
		var SearchQuery = $("#search-query").val();
		myRouter.navigate("search/"+SearchQuery, {trigger: true});
		$.get("http://www.omdbapi.com/",
			{
				s: SearchQuery,
				type: "movie"
			},
			onReceivedMovies, 
			"json"
	 	);
	});
	$("#searchform2").on("submit", function(e){
		e.preventDefault();
		var SearchQuery = $("#again-query").val();
		myRouter.navigate("search/"+SearchQuery, {trigger: true});
		$.get("http://www.omdbapi.com/",
			{
				s: SearchQuery,
				type: "movie"
			},
			onReceivedMovies, 
			"json"
		 );
	});
	var movieList = [];
	var watchList = [];
	var movie = {};
	var selection;
	function onReceivedMovies(movies){
		movieList = [];
		var grayedOut=
		$("li").remove();
		for(var i = 0; i < movies.Search.length; i++){
			grayedOut= _.find(watchList, function(m){
				if(m.imdbID === movies.Search[i].imdbID){
					return true;
				}
				else{
					return false;
				}
			});
			if(grayedOut === undefined){
				$("ul").append("<li data-position="+i+">"+"<b>Title:</b> "+movies.Search[i].Title+"  || <b>Year Made:</b> "+movies.Search[i].Year+"</li>");
			}
			else{
				$("ul").append("<li data-position="+i+" style='opacity: 0.5;'>"+"<b>Title:</b> "+movies.Search[i].Title+"  || <b>Year Made:</b> "+movies.Search[i].Year+"</li>");
			}
			movieList.push(movies.Search[i]);
		}
		$("li").click(function(e){
			selection = $(this).attr("data-position");
			movie = movieList[selection];
			var alreadyIn = _.find(watchList, function(m){
				if(m.imdbID === movie.imdbID){
					return true;
				}
				else{
					return false;
				}
			});
			if(alreadyIn === undefined){
				watchList.push(movie);
				console.log(watchList);
			}
			$(this).css("opacity", "0.5");
		});
	}
});


