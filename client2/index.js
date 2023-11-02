function getBathValue() {
    var uiBathrooms = document.getElementsByName("bath");
    for(var i in uiBathrooms) {
      if(uiBathrooms[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function getBHKValue() {
    var uiBHK = document.getElementsByName("bhk");
    for(var i in uiBHK) {
      if(uiBHK[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  function formatIndianCurrency(amount) {
    if (amount >= 100) {
        return (amount / 100).toFixed(2) + " Crores";
    } else {
        return amount.toFixed(2) + " Lacs";
    }
}
  function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft").value;
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations").value;
    var modelType = getSelectedModelType(); // Get the selected model type

    var url = "http://127.0.0.1:5000/predict_home_price"; // Use this if you are NOT using nginx which is first 7 tutorials
    // var url = "/api/predict_home_price"; // Use this if you are using nginx. i.e tutorial 8 and onwards

    // Send the model type in the request
    $.post(url, {
        total_sqft: parseFloat(sqft),
        bhk: bhk,
        bath: bathrooms,
        location: location,
        model_type: modelType // Include the selected model type in the request
    }, function (data, status) {
        console.log(data.estimated_price);
        var estimatedPrice = data.estimated_price;
        estimatedPrice = formatIndianCurrency(estimatedPrice);
        var resultElement = document.getElementById("uiEstimatedPrice");
        resultElement.innerHTML = `${estimatedPrice} `;
        console.log(status);
    });
}

function onPageLoad() {
    console.log("document loaded");
    var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
    // var url = "/api/get_location_names"; // Use this if you are using nginx. i.e tutorial 8 and onwards
    $.get(url, function (data, status) {
        console.log("got response for get_location_names request");
        if (data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for (var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
}

function getSelectedModelType() {
    var modelTypes = document.getElementsByName("mlModel");
    for (var i in modelTypes) {
        if (modelTypes[i].checked) {
            return modelTypes[i].value;
        }
    }
    return "linear"; // Default to Linear Regression if none is selected
}

  window.onload = onPageLoad;