interface Page {
  name: string;
  path: string;
}

interface Header {
  header: string;
}

interface Category {
  name: string;
  path: string;
  items: Array<Page | Header>;
}

const pages: Category[] = [
  // {
  //   name: "Limits",
  //   path: "limits",
  //   items: [
  //     {
  //       name: "Limit at a Value",
  //       path: "limit-at-a-value",
  //     },
  //     {
  //       name: "Limit at Infinity",
  //       path: "limit-at-infinity",
  //     },
  //     {
  //       name: "One-sided Limits",
  //       path: "one-sided-limits",
  //     },
  //   ],
  // },
  // {
  //   name: "Derivatives",
  //   path: "derivatives",
  //   items: [
  //     {
  //       name: "Derivative of a Function",
  //       path: "derivative-of-a-function",
  //     },
  //     {
  //       name: "Derivative of an Inverse Function",
  //       path: "derivative-of-inverse-functions",
  //     },
  //     {
  //       name: "Derivative at a Point",
  //       path: "derivative-at-a-point",
  //     },
  //     {
  //       name: "Implicit Derivative",
  //       path: "implicit-derivative",
  //     },
  //     {
  //       header: "Other Derivatives",
  //     },
  //     {
  //       name: "Derivative of a Parametric Equation",
  //       path: "derivative-of-parametric-equations",
  //     },
  //     {
  //       name: "Derivative of a Polar Equation",
  //       path: "derivative-of-polar-equations",
  //     },
  //     {
  //       name: "Derivative of a Vector-Valued Function",
  //       path: "derivative-of-vector-valued-functions",
  //     },
  //     {
  //       name: "Derivative of an Integral",
  //       path: "derivative-of-integrals",
  //     },
  //     {
  //       name: "Second Derivative of a Function",
  //       path: "second-derivative-of-a-function",
  //     },
  //   ],
  // },
  // {
  //   name: "Integrals",
  //   path: "integrals",
  //   items: [
  //     {
  //       name: "Riemann Sum (Integral Approximation)",
  //       path: "riemann-sum",
  //     },
  //     { header: "Computed Integrals" },
  //     {
  //       name: "Indefinite Integral (Antiderivative)",
  //       path: "indefinite-integral",
  //     },
  //     {
  //       name: "Definite Integral",
  //       path: "definite-integral",
  //     },
  //   ],
  // },
  // {
  //   name: "Applications",
  //   path: "applications",
  //   items: [
  //     { header: "Applications of Differentiation" },
  //     {
  //       name: "Tangent and Normal Lines",
  //       path: "tangent-and-normal-lines",
  //     },
  //     {
  //       name: "Minimum and Maximum Points",
  //       path: "extrema",
  //     },
  //     {
  //       name: "Inflection Points",
  //       path: "inflection-points",
  //     },
  //     {
  //       name: "Taylor Series",
  //       path: "taylor-series",
  //     },
  //     { header: "Applications of Integration" },
  //     {
  //       name: "Volume a Solid of Revolution",
  //       path: "volume-of-revolution",
  //     },
  //     {
  //       name: "Arc Length",
  //       path: "arc-length",
  //     },
  //     {
  //       name: "Average Value",
  //       path: "average-value",
  //     },
  //   ],
  // },
  {
    name: "Approximations",
    path: "methods",
    items: [
      {
        name: "Euler's Method",
        path: "eulers-method",
      },
    ],
  },
];

export default pages;
