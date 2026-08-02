import { router } from "../context.ts";
import { userController } from "../../controllers/user.controller.ts";

const userRouter = router(userController);

export { userRouter };
