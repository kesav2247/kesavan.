// html document
document.body.innerHTML = `
<div class="container-fluid"><br>
<h1> The Nationality Of The Name</h1><br>
<input type="text" id="searchtext" placeholder=" Enter the name..." size="50">
<div>
<input type="button" value="Search" id="btn" class="btn btn-primary">
<input type="button" value="Reset" id="resetbtn" class="btn btn-danger">
</div>
</div><br><br>
<div class=" container-fluid result">
<h4> The Top Two Countries And  Probabilities </h4><br>
<h4 id=result></h4><br><br>
</div>`

let search_text = document.querySelector("#searchtext");
let result_data = document.querySelector("#result");
let search_btn = document.querySelector("#btn");
let reset_btn = document.querySelector("#resetbtn");

search_btn.addEventListener("click", async () => {
  let value = document.getElementById("searchtext").value;
  document.querySelector('.result').style.display = "block"

  //if given some alert msg of empty
  if (value.length == 0 ) {
    alert("Please enter the valid name ");

  }
  //fetch the data 
  else {

    try {
      let data = await fetch(`https://api.nationalize.io/?name=${value}`);
      let result = await data.json();
      for (let i = 0; i < 2; i++) {
        result_data.innerHTML +=
          `
          <div class="container">
          <div class="card">
            <div class="card-header">
             <div class="card-title">TOP-${i + 1}</div>
             
            </div>
            <div class="card-body">
          
            Country_id:${result.country[i].country_id}<br>
            Probability :${result.country[i].probability}<br><br>
          
            </div>
          </div>
          </div>
        
               `
      }

    }
    catch {
      console.log(error);
    }

  }
});

let container_data = document.querySelector('.card');
reset_btn.addEventListener("click", () => {
  document.querySelector('.result').style.display = "none";
  search_text.value = "";
  result_data.innerHTML = " ";

});

