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

// const pointStart = ["A", "C", "C", "B", "B", "D", "D", "F", "G", "E"];
// const pointEnd = ["C", "D", "F", "D", "E", "F", "G", "G", "H", "H"];
// const distance = [2, 1, 4, 4, 7, 1, 2, 3, 4, 10];
// const travelTable = [pointStart, pointEnd, distance];

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
  console.log(currentRoutes[lowestValueIndex]);
  return currentRoutes[lowestValueIndex];
};

// export const calculateRouteOptions = startPoint => {
//   let pointIndexes1 = [];
//   let pointIndexes2 = [];
//   let points = [];
//   pointStart.forEach((point, index) => {
//     if (point === startPoint) {
//       pointIndexes1.push(index);
//     }
//   });
//   pointEnd.forEach((point, index) => {
//     if (point === startPoint) {
//       pointIndexes2.push(index);
//     }
//   });
//   points = pointIndexes1.map( index => pointEnd[index]);
//   points =
//   console.log(points);
//   return points;
// };

// A : { C: 2}
// B : { D: 4, E: 7}
// C : { D: 1, F: 4, A: 2}
// D : { F: 1, G: 2, B: 4, C: 1}
// E : { F: 1, G: 2, H: 10}
// F : { G: 3, D: 1, C: 4}
// G : { H: 4, D: 2, F: 3}
// H : { G: 4, E: 10}
