import { readFileSync } from "node:fs";
// Projects with a page. Hidden ones (no film yet) stay in projects.json for later.
const projects = JSON.parse(readFileSync(new URL("./projects.json", import.meta.url)));
export default projects.filter((p) => !p.hidden);
