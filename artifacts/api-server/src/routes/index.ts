import { Router, type IRouter } from "express";
import healthRouter from "./health";
import toursRouter from "./tours";
import contentRouter from "./content";
import picksRouter from "./picks";
import customToursRouter from "./custom-tours";

const router: IRouter = Router();

router.use(healthRouter);
router.use(toursRouter);
router.use(contentRouter);
router.use(picksRouter);
router.use(customToursRouter);

export default router;
