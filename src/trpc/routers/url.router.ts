import { router } from "../context.ts";
import { urlController } from "../../controllers/url.controller.ts";

const urlRouter = router(urlController);

export { urlRouter };
