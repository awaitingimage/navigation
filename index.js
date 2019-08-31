import "./jquery.js";

const points = {
  A: { C: 2 },
  B: { D: 4, E: 7 },
  C: { D: 1, F: 4, A: 2 },
  D: { F: 1, G: 2, B: 4, C: 1 },
  E: { F: 1, G: 2, H: 10 },
  F: { G: 3, D: 1, C: 4 },
  G: { H: 4, D: 2, F: 3 },
  H: { G: 4, E: 10 }
};

export const populateSelectOptions = () => {
  Object.keys(points).forEach(point => {
    $("#start-point").append(new Option(point, point));
    $("#end-point").append(new Option(point, point));
  });
};

export const formSubmit = event => {
  let startPoint = $("#start-point").val();
  let endPoint = $("#end-point").val();
  let route = calculateRoutesStart(startPoint, endPoint);
  $("#shortest-route").text(
    `The shortest route from ${startPoint} to ${endPoint} is: ${route}`
  );
  return false;
};

populateSelectOptions();
$("form").submit(formSubmit);

let currentRoutes = [];
let currentRoutesDistances = [];

export const calculateRoutesStart = (start, end) => {
  currentRoutes = [];
  calculateRoutes(start, end, []);
  return calculateShortestRoute();
};

const calculateRoutes = (point, end, currentRoute = []) => {
  let newRoute = [...currentRoute];
  newRoute.push(point);
  if (newRoute.includes(end)) {
    currentRoutes.push(newRoute);
  } else {
    Object.keys(points[point]).forEach(newPoint => {
      if (!newRoute.includes(newPoint)) {
        calculateRoutes(newPoint, end, newRoute);
      }
    });
  }
};

export const calculateShortestRoute = () => {
  let values = currentRoutes.map(currentRoute => {
    return currentRoute.reduce((total, currentValue, currentIndex, array) => {
      if (currentIndex < array.length - 1) {
        return total + points[currentValue][array[currentIndex + 1]];
      }
      return total;
    }, 0);
  });
  let lowestValue = 100;
  let lowestValueIndex = 0;
  values.forEach((value, index) => {
    if (value < lowestValue) {
      lowestValue = value;
      lowestValueIndex = index;
    }
  });
  return currentRoutes[lowestValueIndex];
};
