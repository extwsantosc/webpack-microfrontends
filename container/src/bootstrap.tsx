// @ts-ignore
import { registerApplication, start } from "single-spa";

registerApplication(
    "micro-app/login",
    // @ts-ignore
    () => import("app_login/mountable"),
    (location:any) => location.pathname === "/login",
);
registerApplication(
    "micro-app/main",
    () => import("App"),
    (location: any) => location.pathname === "/",
);
start();
