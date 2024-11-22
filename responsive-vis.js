// script.js

// Visualization Data
const data = [{
    name: "Alice",
    approval: 86,
  },
  {
    name: "Bobby",
    approval: 79,
  },
  {
    name: "Charlie",
    approval: 72,
  },
  {
    name: "Donna",
    approval: 67,
  },
  {
    name: "Emily",
    approval: 61,
  },
  {
    name: "Felix",
    approval: 54,
  },
  {
    name: "Gayle",
    approval: 46,
  },
  {
    name: "Helen",
    approval: 45,
  },
];

// Responsive Parameters
let params = {};

// Debounce Function to Optimize Resize Events
function debounce(func, wait = 100) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Function to Set Responsive Parameters Based on Screen Width
function setResponsiveParams() {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 1200) {
    params = {
      width: 1140 - 24,
      height: 600,
      padding: 15,
      axis_area: 30,
      font_size: 16,
      bar_emphasis: "steelblue",
      text_emphasis: "white",
      dir: "v",
      deviceType: "xl",
    };
  } else if (screenWidth >= 992) {
    params = {
      width: 960 - 24,
      height: 520,
      padding: 15,
      axis_area: 30,
      font_size: 14,
      bar_emphasis: "steelblue",
      text_emphasis: "white",
      dir: "v",
      deviceType: "l",
    };
  } else if (screenWidth >= 768) {
    params = {
      width: 720 - 24,
      height: 520,
      padding: 10,
      axis_area: 20,
      font_size: 14,
      bar_emphasis: "darkred",
      text_emphasis: "white",
      dir: "v",
      deviceType: "m",
    };
  } else if (screenWidth >= 576) {
    params = {
      width: 540 - 24,
      height: 720,
      padding: 7,
      axis_area: 50,
      font_size: 14,
      bar_emphasis: "darkred",
      text_emphasis: "white",
      dir: "h",
      deviceType: "s",
    };
  } else {
    params = {
      width: screenWidth - 24,
      height: 400,
      padding: 5,
      axis_area: 0,
      font_size: 14,
      bar_emphasis: "darkred",
      text_emphasis: "darkred",
      dir: "h",
      deviceType: "xs",
    };
  }
}

// Function to Create the Chart
function make_chart() {
  // Clear Existing Chart
  document.querySelector("#chart-area").innerHTML = "";

  // Create SVG Element
  const svg = d3
    .create("svg")
    .attr("viewBox", `0 0 ${params.width} ${params.height}`)
    .attr("width", params.width)
    .attr("height", params.height);

  // Define Scales and Dimensions Based on Orientation
  let scale_approval, bar_area_width, bar_area_height, bar_width;
  let scale_name;
  const approvals = data.map((d) => d.approval);
  const names = data.map((d) => d.name);
  const max_approval = Math.max(...approvals);

  if (params.dir === "v") {
    bar_area_height = params.height - params.axis_area - params.padding * 2;
    bar_area_width = params.width - params.padding * 2;
    bar_width = bar_area_width / data.length;

    scale_approval = d3
      .scaleLinear()
      .domain([0, max_approval])
      .range([0, bar_area_height]);

    scale_name = d3
      .scaleOrdinal()
      .domain(names)
      .range(names.map((d, i) => (i + 0.5) * bar_width));
  } else {
    bar_area_width = params.width - params.axis_area - params.padding * 2;
    bar_area_height = params.height - params.padding * 2;
    bar_width = bar_area_height / data.length;

    scale_approval = d3
      .scaleLinear()
      .domain([0, max_approval])
      .range([0, bar_area_width]);

    scale_name = d3
      .scaleOrdinal()
      .domain(names)
      .range(names.map((d, i) => (i + 0.5) * bar_width));
  }

  // Define Axis Based on Orientation
  let axis_name;
  if (params.dir === "v") {
    axis_name = d3.axisBottom(scale_name);
  } else {
    if (params.deviceType === "s") {
      axis_name = d3.axisLeft(scale_name);
    } else if (params.deviceType === "xs") {
      axis_name = d3.axisRight(scale_name).tickSize(0);
    }
  }

  // Append Axis to SVG
  const g_axis_name = svg.append("g").attr("id", "g-name-axis");
  g_axis_name.call(axis_name);
  g_axis_name.selectAll("path, line").attr("stroke-width", 0);
  g_axis_name.selectAll("text").attr("font-size", `${params.font_size}px`);
  if (params.dir === "v") {
    g_axis_name.attr(
      "transform",
      `translate(${params.padding}, ${params.padding + bar_area_height})`
    );
  } else {
    if (params.deviceType === "s") {
      g_axis_name.attr(
        "transform",
        `translate(${params.padding + params.axis_area}, ${params.padding})`
      );
    } else if (params.deviceType === "xs") {
      g_axis_name.attr(
        "transform",
        `translate(${params.padding}, ${params.padding})`
      );
      g_axis_name
        .selectAll("text")
        .attr("transform", `translate(0, -${bar_width * 0.25})`);
    }
  }

  // Append Groups for Bars and Numbers
  const g_bars = svg.append("g").attr("id", "g-bars");
  const g_numbers = svg.append("g").attr("id", "g-numbers");

  if (params.dir === "v") {
    g_bars.attr("transform", `translate(${params.padding}, ${params.padding})`);
    g_numbers.attr(
      "transform",
      `translate(${params.padding}, ${params.padding})`
    );
  } else {
    if (params.deviceType === "s") {
      g_bars.attr(
        "transform",
        `translate(${params.padding + params.axis_area}, ${params.padding})`
      );
      g_numbers.attr(
        "transform",
        `translate(${params.padding + params.axis_area}, ${params.padding})`
      );
    } else if (params.deviceType === "xs") {
      g_bars.attr(
        "transform",
        `translate(${params.padding}, ${params.padding})`
      );
      g_numbers.attr(
        "transform",
        `translate(${params.padding}, ${params.padding})`
      );
    }
  }

  // Create Bars
  const bars = g_bars
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("fill", (d) =>
      d.name === "Alice" ? params.bar_emphasis : "lightgray"
    );

  // Create Numbers
  const numbers = g_numbers
    .selectAll("text")
    .data(data)
    .join("text")
    .text((d) => d.approval)
    .attr("font-size", `${params.font_size}px`)
    .attr("fill", (d) =>
      d.name === "Alice" ? params.text_emphasis : "#676767"
    );

  // Set Bar and Number Positions Based on Orientation
  if (params.dir === "v") {
    bars
      .attr("width", bar_width * 0.6)
      .attr("height", (d) => scale_approval(d.approval))
      .attr("x", (d) => scale_name(d.name))
      .attr("y", (d) => bar_area_height - scale_approval(d.approval))
      .attr("transform", `translate(-${bar_width * 0.3}, 0)`);

    numbers
      .attr("x", (d) => scale_name(d.name))
      .attr(
        "y",
        (d) =>
        bar_area_height -
        scale_approval(d.approval) +
        params.font_size +
        params.padding
      )
      .attr("text-anchor", "middle");
  } else {
    bars
      .attr("height", bar_width * 0.5)
      .attr("width", (d) => scale_approval(d.approval))
      .attr("y", (d) => scale_name(d.name))
      .attr("x", 0);
    numbers
      .attr("x", (d) => scale_approval(d.approval) - params.padding)
      .attr("text-anchor", "end");
    if (params.deviceType === "s") {
      bars.attr("transform", `translate(0, -${bar_width * 0.3})`);
      numbers.attr("y", (d) => scale_name(d.name) + params.font_size / 2);
    } else if (params.deviceType === "xs") {
      bars.attr("transform", `translate(0, -${bar_width * 0.1})`);
      numbers.attr("y", (d) => scale_name(d.name) - bar_width * 0.2);
    }
  }

  // Append SVG to Chart Area
  document.querySelector("#chart-area").append(svg.node());
}

// Initialize the Chart
function initChart() {
  setResponsiveParams();
  make_chart();
}

// Event Listeners
window.addEventListener("load", initChart);
window.addEventListener("resize", debounce(initChart));