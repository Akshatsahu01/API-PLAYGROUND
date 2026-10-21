import { Router } from "express";
import practiceApiController from "../controllers/practiceApiController.js";
import { practiceApiIds } from "../constants/practiceApiIds.js";

const router = Router();

router.get("/errors/:status", practiceApiController.getSimulatedError);
router.post("/auth/register", practiceApiController.authRequest);
router.post("/auth/login", practiceApiController.authRequest);
router.get("/chats/:id/messages", practiceApiController.getChatMessages);
router.post("/chats/:id/messages", practiceApiController.createChatMessage);
router.get("/webhooks/:id/deliveries", practiceApiController.getWebhookDeliveries);

for (const apiId of practiceApiIds) {
  const apiRouter = Router();

  apiRouter.use((req, res, next) => {
    req.apiId = apiId;
    next();
  });

  apiRouter.get("/", practiceApiController.getAllPracticeApis);
  apiRouter.get("/:id", practiceApiController.getPracticeApiById);
  apiRouter.post("/", practiceApiController.createPracticeApi);
  apiRouter.put("/:id", practiceApiController.putPracticeApi);
  apiRouter.patch("/:id", practiceApiController.patchPracticeApi);
  apiRouter.delete("/:id", practiceApiController.deletePracticeApi);

  router.use(`/${apiId}`, apiRouter);
}

export default router;
