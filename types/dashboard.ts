import { getMetrics } from "@/services/dashboardActions";

export type MetricsDTO = Awaited<ReturnType<typeof getMetrics>>;
