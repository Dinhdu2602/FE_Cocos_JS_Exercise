// Report model (placeholder for future expansion)
export interface RevenueReport {
  totalRevenue: number;
  byDay: { date: string; revenue: number }[];
  byMonth: { month: string; revenue: number }[];
}

export interface ProfitReport {
  totalProfit: number;
  byDay: { date: string; profit: number }[];
  byMonth: { month: string; profit: number }[];
}

export interface OrderCountReport {
  totalOrders: number;
  byDay: { date: string; orders: number }[];
  byMonth: { month: string; orders: number }[];
}

export interface StockReport {
  lowStock: { productVariantId: string; stock: number }[];
  totalVariants: number;
}
