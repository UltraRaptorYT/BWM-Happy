const formFields = {
  feeling: "",
  stressLevel: "",
  controlLevel: "",
  focus: "",
  name: "",
};

function adjustValue(val, name, invert) {
  let change = name.length % 2 === 0 ? -1 : 1;
  return val === 5 ? val + (invert ? -change : change) : val;
}

window.onload = function () {
  const params = new URLSearchParams(window.location.search);

  // Check if there are any URL search parameters
  if (!window.location.search) {
    console.log("No URL parameters found. Continuing without validation.");
    return; // Exit early if no parameters
  }

  const allFieldsExist = Object.keys(formFields).every((field) =>
    params.has(field)
  );

  if (allFieldsExist) {
    console.log("All required parameters are present.");
    Object.keys(formFields).forEach(
      (field) => (formFields[field] = params.get(field))
    );
    // alert(JSON.stringify(formFields));
    document.getElementById("title").classList.add("hidden");
    document.getElementById("form").classList.add("hidden");
    document.getElementById("results").classList.remove("hidden");

    let name = formFields["name"];
    document.getElementById("nameInput").innerText = name;

    let stressVal = parseInt(formFields["stressLevel"]);
    let controlVal = parseInt(formFields["controlLevel"]);

    stressVal = adjustValue(stressVal, name, true);
    controlVal = adjustValue(controlVal, name, false);

    let options = {
      chart: {
        type: "scatter",
        height: 300,
        zoom: { enabled: false }, // Disable zooming
      },
      xaxis: {
        min: 0,
        max: 10,
        tickAmount: 2, // Show only 0, 5, 10
        labels: {
          formatter: (val) => (val % 5 === 0 ? val : ""), // Hide minor ticks
        },
        axisTicks: { show: false }, // Hide small ticks
      },
      yaxis: {
        min: 0,
        max: 10,
        tickAmount: 2, // Show only 0, 5, 10
        labels: {
          formatter: (val) => (val % 5 === 0 ? val : ""), // Hide minor ticks
        },
        axisTicks: { show: false }, // Hide small ticks
      },
      grid: {
        borderColor: "#ccc", // Light border color
      },
      series: [
        {
          name: "Data Points",
          data: [[stressVal, controlVal]],
        },
      ],
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);

    chart.render();
  } else {
    console.error(
      "Some required form fields are missing in the URL parameters."
    );
    window.location.href = "/"; // Redirect if missing fields
  }
};
