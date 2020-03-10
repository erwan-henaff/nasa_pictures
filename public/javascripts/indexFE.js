

// const appkey = "..."
let result_container = document.getElementById("resultcontainer")
let input_date = document.getElementById("date_input");


// let image1 = document.querySelector("img");
// image1.setAttribute("src", localStorage.getItem("lastcall"));


/////////////////////////////////////////////////////////////////////////////URL URL
// const url_base = "https://api.nasa.gov/planetary/apod?api_key="
// let  url_final = "";

///////////////////////////////////////////////////////////////////////////////////
// function creating a img tag in the html doc right under the submit button

let add_one_image_tag = (url1,text1) => {
  let divCont = document.createElement("div");
  divCont.classList.add("divCont");

  let divImg = document.createElement("div");
  let newIMG = document.createElement("img");
  newIMG.setAttribute("src", url1);
  divImg.classList.add("divImg");


  let divText = document.createElement("div");
  let explanation = document.createElement("p");
  explanation.innerHTML = text1; 
  divText.classList.add("divText");
  
  

  divImg.appendChild(newIMG);
  divCont.appendChild(divImg);

  divText.appendChild(explanation)
  divCont.append(divText);
  
  // divIMG.append(divText);


  // divText.style.transform = "rotateY(180deg)";
  divText.classList.add("switch");
  // divText.classList.add("translate");



  result_container.insertAdjacentElement("afterbegin",divCont);

  divCont.addEventListener("click", (event) => {
    divImg.classList.toggle("switch");
    divText.classList.toggle("switch");
    // divCont.classList.toggle("switch");


  })
  
}

let add_one_video_tag = (url1) => {
  let newVIDEO = document.createElement("iframe");
  newVIDEO.setAttribute("src", url1)
  result_container.insertAdjacentElement("afterbegin",newVIDEO)
}




if (localStorage.getItem("lastcall")) add_one_image_tag(localStorage.getItem("lastcall"), "first image")
else add_one_image_tag("https://apod.nasa.gov/apod/image/1512/Foxfur_Vermette_1080.jpg","first image")


///////////////////////////////////////////////////////////////////////////////////////
// function doing the call and putting the result on the page

let request_image = (argument1) => {
//    url_final = url_base + appkey + "&date=" + argument1;

    const url_final = "http://localhost:3000/nasa/"

    axios({
    method: 'POST',
    url: url_final,
    data: {
      date: argument1
    }    
  })
    .then(function (response) {

        const resultquery = response.data;
        const resultquery_url = resultquery.url
        const resultquery_explanation = resultquery.explanation
        // console.log(response.data)
        if (resultquery.media_type === "image") {
          add_one_image_tag(resultquery_url,resultquery_explanation)
          localStorage.setItem("lastcall", resultquery_url)
        }
        if (resultquery.media_type === "video") add_one_video_tag(resultquery_url)



      // image1.setAttribute("src", resultquery_url)
    })
    .catch(err => {
                    console.log("it looks like something went wrong");
                    console.log(err);
            });
}
//////////////////////////////////////////////////////////////////////////////////
//  event listener on the button to submit the new date

let submit_button = document.getElementById("submit_button")

submit_button.addEventListener("click",()=>{
  date1 = input_date.value;

  // console.log(date1);

  request_image(date1);
})



// "explanation: "What happened to the Sun?  Nothing very unusual: the strange-looking solar appendage on the lower left is actually just a spectacular looking version of a common solar prominence. A solar prominence is a cloud of solar gas held above the Sun's surface by the Sun's magnetic field.  Pictured above in 2002 October, NASA's Sun-orbiting SOHO spacecraft imaged an impressively large prominence hovering over the surface, informally dubbed a flame. Over 40 Earths could line up along the vast length of the fireless flame of hovering hot gas.  A quiescent prominence typically lasts about a month, and may erupt in a Coronal Mass Ejection (CME) expelling hot gas into the Solar System.  Although somehow related to the Sun's changing magnetic field, the energy mechanism that creates and sustains a Solar prominence is still a topic of research."
