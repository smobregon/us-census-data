fetch(
  "https://api.census.gov/data/2016/pep/population?get=POP,GEONAME&for=place:*&key=36059e564ecd010ff8aaa84345223552b0cacdb5"
).then((res) => {
  res.json().then((data) => {
    if (data.length > 0) {
      var temp = "";
      data.shift(); //remove first line of data
      data.forEach((itemData) => {
        var geoname = itemData[1].split(",");
        temp += "<tr>";
        temp += "<td>" + geoname[0] + "</td>"; //city
        temp += "<td>" + geoname[1] + "</td>"; //state
        temp += "<td>" + parseInt(itemData[0]) + "</td></tr>"; //population
      });
      document.getElementById("data").innerHTML = temp;
      sorttable.makeSortable(temp);
    }
  });
});

function filterCity() {
  //Filter city function
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("cityInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

//Filter state function
function filterState() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("stateInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

//Filter min/max population function
function filterPop() {
  // Declare variables
  var minInput, maxInput, table, tr, td, i, txtValue;
  minInput = parseFloat(document.getElementById("min").value);
  maxInput = parseFloat(document.getElementById("max").value);
  console.log(minInput, maxInput);

  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue >= minInput && txtValue <= maxInput) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
