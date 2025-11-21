import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
	index("routes/login.tsx"),
	{ path: "dashboard", file: "routes/dashboard.tsx" },
	{ path: "summary", file: "routes/summary.tsx" },
	{ path: "reports", file: "routes/reports.tsx" },
] satisfies RouteConfig;
