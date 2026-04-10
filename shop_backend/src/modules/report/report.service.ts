// Report service
export const getRevenueReport = async () => {
  return {
    totalRevenue: 10000000,
    byDay: [{ date: '2026-04-10', revenue: 2000000 }],
    byMonth: [{ month: '2026-04', revenue: 10000000 }]
  };
};

export const getProfitReport = async () => {
  return {
    totalProfit: 3000000,
    byDay: [{ date: '2026-04-10', profit: 600000 }],
    byMonth: [{ month: '2026-04', profit: 3000000 }]
  };
};

export const getOrderCountReport = async () => {
  return {
    totalOrders: 120,
    byDay: [{ date: '2026-04-10', orders: 20 }],
    byMonth: [{ month: '2026-04', orders: 120 }]
  };
};

export const getStockReport = async () => {
  return {
    lowStock: [
      { productVariantId: 'pv1', stock: 2 },
      { productVariantId: 'pv2', stock: 1 }
    ],
    totalVariants: 50
  };
};
