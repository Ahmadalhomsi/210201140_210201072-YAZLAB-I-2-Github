import { createNextRouteHandler } from "uploadthing/next";
 
import { ourFileRouter } from "./core";
 
// NONONO




export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});
