
// let xhttp = new XMLHttpRequest();
// function loadxml() {
//   let response;
//   xhttp.onreadystatechange = function() {
//     if(this.status==200 && this.readyState==4){
//       response = this.responseXML;
//       document.getElementById("name").innerHTML = response.getElementsByTagName("name")[95].childNodes[0].nodeValue;
//       document.getElementById("synonym").innerHTML = response.getElementsByTagName("synonym")[74].childNodes[0].nodeValue;
//       document.getElementById("synonym2").innerHTML = response.getElementsByTagName("synonym")[54].childNodes[0].nodeValue;
//     }
//   }

//   xhttp.open("GET", "https://rxnav.nlm.nih.gov/REST/drugs?name=paracetamol", true);
//   xhttp.send();
// }

// let xhttp = new XMLHttpRequest();

// function loadxml() {
//   let drugName = document.getElementById("drugNameInput").value;

//   xhttp.onreadystatechange = function() {
//     if(this.status==200 && this.readyState==4){
//       let response = this.responseXML;
//       document.getElementById("name").innerHTML = response.getElementsByTagName("name")[94].childNodes[0].nodeValue;
//       document.getElementById("synonym").innerHTML = response.getElementsByTagName("synonym")[95].childNodes[0].nodeValue;
//       // document.getElementById("synonym2").innerHTML = response.getElementsByTagName("synonym")[1].childNodes[0].nodeValue;
//     }
//   }

//   xhttp.open("GET", "https://rxnav.nlm.nih.gov/REST/drugs?name=" + encodeURIComponent(drugName), true);
//   xhttp.send();
// }


async function loadxml() {
  const drugName = document.getElementById("drugNameInput").value.trim();
  if (drugName === "") {
      alert("Please enter a drug name.");
      return;
  }

  try {
      const response = await fetch(`https://rxnav.nlm.nih.gov/REST/drugs?name=${encodeURIComponent(drugName)}`);
      if (!response.ok) {
          throw new Error(`Failed to fetch drug information. Status: ${response.status}`);
      }

      const data = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");

      const synonymElements = xmlDoc.getElementsByTagName("synonym");

      const synonym = synonymElements.length > 0 && synonymElements[0].childNodes.length > 0 ? synonymElements[0].childNodes[0].nodeValue : "N/A";
      const synonym2 = synonymElements.length > 1 && synonymElements[1].childNodes.length > 0 ? synonymElements[1].childNodes[0].nodeValue : "N/A";

      document.getElementById("synonym").innerHTML = synonym;
      document.getElementById("synonym2").innerHTML = synonym2;
  } catch (error) {
      console.error("Error:", error);
      alert("Failed to load drug information. Please try again later. Error: " + error.message);
  }
}


