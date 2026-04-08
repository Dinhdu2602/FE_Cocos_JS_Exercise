ORDER MODULE:
User -> Product Variant -> Order -> Inventory

Business Flow: 
End User buy:
 + Polo Black L x2
 + Polo White M x1
=> System: Create Order -> Calculate Total Amount -> Decrease stock -> Save history order

Order: 
 + items: list items
 + totalAmount: total order
 + status: Payment status
 