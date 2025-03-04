const formFields = {
  feeling: "",
  stressLevel: "",
  controlLevel: "",
  focus: "",
  name: "",
};

function adjustValue(val, name, isStress) {
  if (val === 5) {
    let base = name.length % 2 === 0 ? 4 : 6;
    let alt = name.charCodeAt(0) % 2 === 0 ? 4 : 6;
    return isStress ? base : alt;
  }
  return val;
}

window.onload = function () {
  const params = new URLSearchParams(window.location.search);

  if (!window.location.search) {
    console.log("No URL parameters found. Continuing without validation.");
    return;
  }

  const allFieldsExist = Object.keys(formFields).every((field) =>
    params.has(field)
  );

  if (allFieldsExist) {
    console.log("All required parameters are present.");
    Object.keys(formFields).forEach(
      (field) => (formFields[field] = params.get(field))
    );

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
        zoom: { enabled: false },
        toolbar: { show: false },
        events: {
          dataPointSelection: function (event, chartContext, config) {
            alert("SOMETHING SUPPOSE TO SHOW UP!");
          },
        },
      },
      tooltip: {
        enabled: false,
      },
      markers: {
        size: 7, // Adjust size for better clickability
        strokeWidth: 2,
      },
      xaxis: {
        min: 0,
        max: 10,
        tickAmount: 2,
        labels: {
          show: false,
        },
        axisTicks: { show: false },
        axisBorder: { show: true },
      },
      yaxis: {
        min: 0,
        max: 10,
        tickAmount: 2,
        labels: {
          show: false,
        },
        axisTicks: { show: false },
        axisBorder: { show: true },
      },
      grid: {
        show: true,
        borderColor: "#ccc",
        xaxis: {
          lines: { show: true },
        },
        yaxis: {
          lines: { show: true },
        },
      },
      series: [
        {
          name: "Happiness Rating",
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
    refreshWithoutParams();
  }
};

function refreshWithoutParams() {
  window.location.href = window.location.origin + window.location.pathname;
}

document.getElementById("tryAgainBtn").addEventListener("click", function () {
  refreshWithoutParams();
});

document.getElementById("rsvpBtn").addEventListener("click", function () {
  refreshWithoutParams();
});
