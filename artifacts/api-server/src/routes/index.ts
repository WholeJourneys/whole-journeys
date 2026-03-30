import { Router, type IRouter } from "express";
import healthRouter from "./health";
import toursRouter from "./tours";
import contentRouter from "./content";
import picksRouter from "./picks";

const router: IRouter = Router();

router.use(healthRouter);
router.use(toursRouter);
router.use(contentRouter);
router.use(picksRouter);

export default router;
