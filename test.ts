const hi = [
  "hi",
  "hola",
  "hello"
] as const;

type test = typeof hi[number];
let sup: test = "yellow";
