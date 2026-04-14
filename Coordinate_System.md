# COORDINATE SYSTEM
## I. WHAT – Coordinate System là gì trong Cocos?
     - Coordinate System = hệ quy chiếu để xác định vị trí của Node trong game
- Trong Cocos:
    + Mọi thứ bạn thấy trên màn hình = **Node**
    + Node muốn hiển thị → phải có **position (x, y, z)**
    + Coordinate System chính là **cách hiểu và tính toán vị trí đó**
- Nói ngắn gọn: Coordinate System = “ngôn ngữ định vị trong game”
## II. WHICH – Có những loại Coordinate System nào?
- Trong Cocos Creator có **4 hệ chính + 1 khái niệm cực quan trọng**
 ### 1. Cartesian Coordinate (OpenGL gốc)
 **WHAT**
     
- Hệ tọa độ chuẩn từ OpenGL
- Gốc ở **bottom-left (góc trái dưới)**

**Đặc điểm:**
- x → phải
- y → lên
- z → ra ngoài màn hình
- Đây là nền tảng engine (low-level)
### 2. Screen Coordinate (UI / OS)
**WHAT**

- Hệ tọa độ của màn hình (Android, iOS, Web)

**Đặc điểm:**
- Screen Coordinate (OS level) → top-left. Nhưng trong Cocos UI → dùng Canvas Coordinate (center-based)
- y đi xuống (ngược với OpenGL)

**Ví dụ:**
- CSS, Canvas, HTML → dùng hệ này
### 3. World Coordinate (Global)
**WHAT**

- Hệ tọa độ **toàn bộ game world**
- Tất cả object đều có thể map về đây

**Đặc điểm:**
- Gốc: tại (0, 0, 0) trong không giang
  * Trong Cocos Creator: 
      + World **không có khái niệm góc màn hình**
      + Nó là **không gian 3D/2D tuyệt đối**
- Giống OpenGL
- Không phụ thuộc parent

**Dùng khi:**
- Check va chạm giữa object khác parent
- Tính khoảng cách global
### 4. Local Coordinate (Relative)
**WHAT**
- Hệ tọa độ cục bộ của node
- Tính theo **parent**

**Đặc điểm:**
- Gốc = parent node
- node con di chuyển → phụ thuộc node cha
### 5. Anchor Point
**WHAT**
- Là **điểm gốc của node**
- Là nơi đặt (0,0) của node

**Default: (0.5, 0.5) = center **
Ví dụ:
|Anchor	|   Ý nghĩa|
|----| ---------|
|(0,0)|	góc trái dưới|
|(0.5,0.5)|	chính giữa|
|(1,1)	|góc phải trên|
### 6. Canvas Coordinate (UI Space)

**WHAT**
- Hệ tọa độ dùng cho UI trong Canvas
**Đặc điểm:**
- Gốc tại **center (0,0)**
- Dựa trên **design resolution**
- Không phụ thuộc pixel thật
## III. WHY – Tại sao phải có nhiều hệ như vậy?
### 1. Vì game có hierarchy (cây cha – con)
- Node dùng local coordinate theo parent
- Nghĩa là:

        Canvas 
            └── Player
                    └── Weapon
- Weapon không cần biết world
- Chỉ cần biết vị trí relative với Player

**Lợi ích:**
- Di chuyển parent → child auto follow
- Dễ build UI + animation
### 2. Tách biệt logic và render
- Local → logic (gameplay)
- World → render (engine xử lý)

Engine sẽ: Local → transform → World → Render

-> Bạn không cần tự tính toàn bộ
### 3. Giảm độ phức tạp
Nếu chỉ dùng World:
- Mỗi object phải tính lại toàn bộ vị trí
- Khó maintain khi có nhiều object

Nếu dùng Local:
- Dễ modular
- Dễ reuse (Prefab)
- Dễ animation
### 4. Anchor giúp transform đúng
Nếu không có anchor:
- Rotate sai tâm
- scale lệch
- UI lệch layout

-> Anchor = điểm pivot của node, ảnh hưởng đến position, rotation, scale

## IV. Full Pipeline:
    
Local Transform
(position, rotation, scale, anchor)

↓

Local Matrix

↓

Multiply với Parent Matrix

↓

World Matrix

↓

Camera Transform

↓

Screen Position