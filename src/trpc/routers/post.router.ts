import { router } from "../context.ts";
import { postController } from "../../controllers/post.controller.ts";

const postRouter = router(postController);

export { postRouter };
