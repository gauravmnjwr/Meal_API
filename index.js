var searchbtn= document.getElementById('search-btn');
var mealList= document.getElementById('mealwrapper');
var mealDetailsContent=document.querySelector('.meal-details-content');
const recipeCloseBtn= document.getElementById('info-close')

var fav=[];

// event Listeners

searchbtn.addEventListener('click',getMealList);
mealList.addEventListener('click',getMealRecipe);
recipeCloseBtn.addEventListener('click',function(){
    mealDetailsContent.parentElement.classList.remove('showRecipe');
})

// fetch all when user enters the home page

function fetchall(){
    let searchinput="";
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchinput}`)
    .then(response => response.json())
    .then(data => {
        let html="";
        if(data.meals){
            data.meals.forEach(meal => {
                html+=`
                <div class="mealname" id="mealname" data-id="${meal.idMeal}">
                    <div >
                        <i id="fav-meal" class="fa fa-heart fav-meal" ></i>
                        <img src="${meal.strMealThumb}" alt="" class="mealimage">
                    </div>
                <div class="meal-namebox">${meal.strMeal}</div>
                    <div class="recipe-link">
                        <a href="#" class="recipe-btn">Get recipe</a>
                    </div>
                </div>
                `
            });
            mealList.innerHTML=html;
        }
        else{
            mealList.innerHTML='<h1>NOT FOUND</h1>'
        }
    });

}

// get meal list that matches with the seach input
function getMealList(){
    let searchinput=document.getElementById('searchbox').value.trim();
    // console.log(searchinput);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchinput}`)
    .then(response => response.json())
    .then(data => {
        let html="";
        if(data.meals){
            data.meals.forEach(meal => {
                html+=`
                <div class="mealname" id="mealname" data-id="${meal.idMeal}">
                    <div >
                        <i id="fav-meal" class="fa fa-heart fav-meal" ></i>
                        <img src="${meal.strMealThumb}" alt="" class="mealimage">
                    </div>
                <div class="meal-namebox">${meal.strMeal}</div>
                    <div class="recipe-link">
                        <a href="#" class="recipe-btn">Get recipe</a>
                    </div>
                </div>
                `
            });
            mealList.innerHTML=html;
        }
        else{
            mealList.innerHTML='<h1>NOT FOUND</h1>'
        }
    });

}



// get meal recipe for the target box
function getMealRecipe(e){
    e.preventDefault();
    // console.log(e.target);
    if(e.target.classList.contains('fav-meal')){
        window.alert('Added to Favourites')
        let currfav=e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${currfav.dataset.id}`)
        .then(response=> response.json())
        .then( data => myfavmeals(data.meals));
        
    }
    if(e.target.classList.contains('recipe-btn')){
        let mealItem=e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response=> response.json())
        .then( data => mealRecipeModal(data.meals));
        //calling the function with arguments as an array
    }
}
//adding fav meals to the fav array
function myfavmeals(favmeal){
    console.log(favmeal[0]);
    fav.push(favmeal[0]);
    sessionStorage.setItem('TheArray',JSON.stringify(fav));
}

// adding all the meal recipe to html

function mealRecipeModal(meal){
    meal=meal[0];
    let html=`
    <h2>${meal.strMeal}</h2>
        <img src=${meal.strMealThumb} alt="" class="recipe-info-img">
            <p>${meal.strInstructions}</p>
        <br>
    <a href="${meal.strYoutube}">Watch Video</a>
    `;
    mealDetailsContent.innerHTML=html;
    mealDetailsContent.parentElement.classList.add('showRecipe');

}

fetchall();

// export {fav};


