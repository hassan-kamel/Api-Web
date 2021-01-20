let myData = {
    ternding: " https://api.themoviedb.org/3/trending/all/day?api_key=9290ac27b9949585c1afebb041dee921",
    popular: "https://api.themoviedb.org/3/movie/popular?api_key=9290ac27b9949585c1afebb041dee921&language=en-US&page=1 ",
    nowPlaying: "https://api.themoviedb.org/3/movie/now_playing?api_key=9290ac27b9949585c1afebb041dee921&language=en-US&page=1",
    topRated: "https://api.themoviedb.org/3/movie/top_rated?api_key=9290ac27b9949585c1afebb041dee921&language=en-US&page=1 ",
    upComing: "https://api.themoviedb.org/3/movie/upcoming?api_key=9290ac27b9949585c1afebb041dee921&language=en-US&page=1",
}


$(".toggel-menu").click(function() {
    console.log($(".my-nav").css("left"));
    if ($(".my-nav").css("left") == "0px") {
        $(".my-nav").animate({ "left": "-250px" }, 1000)
        $("li").css("padding-top", "500px");
    } else {
        $(".my-nav").animate({ "left": "0px" }, 1000);
        $("li").animate({ "padding-top": "15px" }, 500)
    }
    $(".toggel-menu i").toggleClass("fa-times");
})


let movies = [];

async function requestData(reQ) {
    let now_playing = await fetch(reQ);
    movies = await now_playing.json();
    movies = movies.results;
    console.log(movies);
    displayMovies(movies);


}
requestData(myData.nowPlaying);



function displayMovies(movies) {
    let trs = " ";
    for (let i = 0; i < movies.length; i++) {
        trs += `
        
        <div class="col-md-4 col-sm-6 my-3">
            <div class="details">
                <img src="https://image.tmdb.org/t/p/w500${movies[i].poster_path}" alt="" class="w-100 img-thumbnail">
                    <div class="info d-flex justify-content-center align-items-center" >  
                        <div class=" text-center">
                            <h3>${movies[i].title}</h3>
                            <p>${movies[i].overview}</p>
                            <h5>rate : ${movies[i].vote_average}</h5>
                            <h4>${movies[i].release_date}</h4>
                        </div>
                    </div>
            </div>
        </div>

        `;
    }
    // document.getElementById("dataShow").innerHTML = trs;
    $("#dataShow").html(trs);

};

$("li[id]").click(function() {
    let clicked = $(this).attr("id");
    // console.log(clicked);
    if (clicked == "nowPlaying") requestData(myData.nowPlaying);
    else if (clicked == "ternding") requestData(myData.ternding);
    else if (clicked == "popular") requestData(myData.popular);
    else if (clicked == "topRated") requestData(myData.topRated);
    else if (clicked == "upComing") requestData(myData.upComing);

});

$("#by-word").keyup(function() {
    let myRequest =
        `https://api.themoviedb.org/3/search/movie?api_key=9290ac27b9949585c1afebb041dee921&query=${$("#by-word").val()}`;
    if ($("#by-word").val() == "") myRequest = myData.nowPlaying;

    requestData(myRequest);
});

$("#just-search").keyup(function() {
    let myMovies = [];
    let movieSearch = $("#just-search").val();
    for (let i = 0; i < movies.length; i++) {
        let j = movies[i].title;
        if (j.includes(movieSearch)) {
            myMovies.push(movies[i]);
        }
    }
    displayMovies(myMovies);
})