// importing fav array from the index.js file using sessionstorage
var sessionString=sessionStorage.getItem('TheArray');
let fav=JSON.parse(sessionString);



var mealList= document.getElementById('mealwrapper');
var mealDetailsContent=document.querySelector('.meal-details-content');
const recipeCloseBtn= document.getElementById('info-close')

// event Listeners
mealList.addEventListener('click',getMealRecipe);
recipeCloseBtn.addEventListener('click',function(){
    mealDetailsContent.parentElement.classList.remove('showRecipe');
})

// fetching all the fav recipe 

function fetchfav(){
    let html="";
    for(meal of fav){
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
    }
    mealList.innerHTML=html;
}

// get meal recipe for the target box
function getMealRecipe(e){
    e.preventDefault();
    // console.log(e.target);
    if(e.target.classList.contains('fav-meal')){
        let currfav=e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${currfav.dataset.id}`)
        .then(response=> response.json())
        .then( data => myfavmeals(data.meals));
        // sessionStorage.setItem('TheArray',JSON.stringify())
        
    }
    if(e.target.classList.contains('recipe-btn')){
        let mealItem=e.target.parentElement.parentElement;
        // console.log(mealItem)
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response=> response.json())
        .then( data => mealRecipeModal(data.meals));
        
    }
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

fetchfav();