export const dateFunctionDeclaration = {
  name: "date",
  description:
    "Get the current date and time. Don't guess the date, use this function.",
};

export function date() {
  console.log("[think] Getting current date");
  return { output: new Date().toISOString() };
}
