var token = document.currentScript.getAttribute('token');
var internalId = document.currentScript.getAttribute('internalId');
var uiMode = document.currentScript.getAttribute('uiMode');
var width = document.currentScript.getAttribute('width');
var height = document.currentScript.getAttribute('height');
let auth = document.currentScript.getAttribute('authToken');

async function postContext(url = '', data = {}) {

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
}


var contextData = {
  internalId,
  uiMode
}

let url = 'https://api.sharpsports.io/v1/context/bestPrice';
//let url = 'http://localhost:8000/v1/context/bestPrice'
if (auth) url += `?auth=${auth}`;

postContext(url,contextData).then((data) => {
  var iframe = document.createElement("iframe");
  console.log("Cid: ", data.cid)
  //iframe.src = `https://ui.sharpsports.io/best-price/${data.cid}`;
  iframe.src = `https://ui.sharpsports.io/best-price/${data.cid}`
  console.log("URL", `http://localhost:3006/best-price/${data.cid}`)
  iframe.width = width ? width : 400;
  iframe.height = height ? height : 800; 
  var parent = document.getElementById("SS-Best-Price");
  parent.appendChild(iframe);
})

