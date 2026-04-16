# Deep Research Docx for Exercise 16-04-2026:
 + Exercise 1: [Deep Research about Cache Mode of Label Component](#label-cache-mode---cocos-creator-2L)
 + Exercise 2: [Deep Research about Life Cycle of Component](#life-cycle-of-component--cocos-creator-li)
---------
# LABEL CACHE MODE - COCOS CREATOR 2.4
## 1. Thông tin:
  - Tên tài liệu: Label Cache mode - Rendering Optimization
  - Mục tiêu: 
    
    + Hiểu cơ chế hoạt động của Label trong Cocos Creator
    + Phân tích sâu Cache Mode ở mức engine
    + Áp dụng tối ưu hiệu năng UI trong dự án thực tế
## 2. Tổng quan vấn đề:
### 2.1 Background:
 Trong Cocos Creator, Label không được render trực tiếp bởi GPU. Thay vào đó, text phải trải qua các bước trung gian.

- CPU render text (Canvas/Native)
- Chuyển thành texture bitmap
- Upload lên GPU
- GPU render như Sprite
 
 Quá trình này nếu không tối ưu sẽ gây
 - Tăng drawcall
 - Tăng CPU Usage
 - Tăng GPU bandwidth
 - Giảm FPS
### 2.2 Mục tiêu của Cache Mode:
Cache Mode được thiết kế để:

 - Giảm số lần render text trên CPU
 - Giảm số lần upload texture lên GPU
 - Tối ưu batching (giảm Drawcall)
 - Cân bằng giữa hiệu năng và bộ nhớ
## 3. Render Pipeline:
### 3.1 Luồng xử lý:
Text trong Label đi qua pipeline sau:
```
Text String -> Canvas (CPU render text) -> Bitmap Texture -> Upload GPU (glTexImage2D) -> Assembler (tạo quad) -> Batcher 2D -> DrawCall
```
### 3.2 Phân tích chi phí:
|Thành phần	| Chi phí|
|----------|---------|
|CPU render text|	Cao|
|GPU upload texture	|Cao|
|DrawCall| Cao nếu không batch|

=> Cache Mode tác động trực tiếp đến cả 3 yếu tố trên
## 3.3 CPU vs GPU Bottleneck

Trong hệ thống Label:

- CPU bottleneck:
  - Render text (Canvas / Native)
- GPU bottleneck:
  - Upload texture (glTexImage2D)
  - Texture switching

### Insight:

- BITMAP:
  - Tốn GPU bandwidth (upload full texture)
- CHAR:
  - Tối ưu CPU + GPU bằng cách chỉ render phần thay đổi

→ Đây là lý do CHAR hiệu quả với text dynamic
## 4.CACHE MODE:
### Cocos Creator cung cấp 3 chế độ:
  - NONE
  - BITMAP
  - CHAR
## 5. PHÂN TÍCH CHI TIẾT
### 5.1 NONE MODE
#### Mô tả
- Không cache
- Mỗi Label tạo texture riêng
- Render lại mỗi lần cập nhật
#### Hành vi hệ thống
- CPU: render liên tục
- GPU: upload liên tục
- DrawCall: cao
- Batch: không hỗ trợ
#### Ưu điểm
- Dễ sử dụng
- Không phát sinh cache phức tạp
#### Nhược điểm
- Hiệu năng thấp
- Không phù hợp production
#### Use Case
- Debug
- UI rất đơn giản
### 5.2 BITMAP MODE
#### Mô tả
- Cache toàn bộ text thành 1 bitmap
- Có thể tham gia Dynamic Atlas
#### Hành vi hệ thống
- CPU: render lại khi text thay đổi
- GPU: upload lại toàn bộ texture
- DrawCall: thấp (nếu atlas)
- Memory: tăng theo số label
#### Công thức bộ nhớ
```Memory = Width × Height × 4 bytes```
#### Ưu điểm
- Batch tốt
- Ổn định
- Dễ kiểm soát
#### Nhược điểm
- Tốn memory
- Không reuse giữa label
- Update text gây rebuild texture
#### Use Case
- UI tĩnh (menu, button, title)
### 5.3 CHAR MODE
#### Mô tả
- Cache từng ký tự (glyph)
- Dùng chung 1 atlas toàn cục (2048x2048)
#### Cơ chế nội bộ
#### Key cache
```charKey = char + fontSize + fontFamily + color + outline```
#### Luồng xử lý
- Ví dụ text: HELLO
    + H → cache miss → render → lưu atlas
    + E → miss → render → lưu
    + L → miss → render → lưu
    + L → hit
    + O → miss → render → lưu
#### Hành vi hệ thống
- CPU: chỉ render ký tự mới
- GPU: upload incremental
- DrawCall: thấp
- Memory: cố định
#### Ưu điểm
- Tối ưu text dynamic
- Reuse ký tự
- Giảm CPU và GPU cost
#### Nhược điểm
- Giới hạn atlas
- Không phù hợp charset lớn
- Phụ thuộc style
- 1 ký tự = 1 quad
#### Use Case
- Score
- HP
- Timer
- Damage text
## 6. SO SÁNH TỔNG THỂ
|Tiêu chí|	NONE|	BITMAP|	CHAR|
|---------|-----|---------|------|
|CPU|	Cao|	Trung bình|	Thấp|
|GPU Upload|	Cao|	Cao|	Thấp|
|DrawCall|	Cao|	Thấp|	Thấp|
|Memory|	Trung bình|	Cao|	Thấp|
|Dynamic Text|	Kém|	Kém|	Tốt|
### 6.1 Trade-off cốt lõi
#### BITMAP:
  - Tối ưu render
  - Đổi lại tốn memory

#### CHAR:
  - Tối ưu memory + dynamic update
  - Đổi lại bị giới hạn atlas và style

```Không có mode nào “tốt nhất”, chỉ có mode “phù hợp use case”```
## 7. BATCHING
### 7.1 Điều kiện
- Cùng texture
- Cùng material
- Cùng blend mode
### 7.2 Ảnh hưởng theo mode
- NONE: không batch
- BITMAP: batch nếu dùng atlas
- CHAR: batch rất tốt (1 atlas chung)
### 7.3 Vấn đề thường gặp
Render order làm break batch:

    Label A
    Sprite
    Label B
    → Không batch được
## 8. MEMORY
### 8.1 BITMAP
- Tăng theo số label
- Không reuse
### 8.2 CHAR
- Atlas cố định (~16MB)
- Reuse toàn bộ hệ thống
### 8.3 Fragmentation
- Nhiều font / size / color → lãng phí atlas
## 9. EDGE CASES
### 9.1 Unicode / tiếng Việt / emoji
- Số glyph tăng mạnh
- CHAR dễ đầy atlas
### 9.2 Font size động
- Không reuse cache
### 9.3 Color / outline
- Mỗi style = glyph mới
### 9.4 Quad count
- BITMAP: 1 quad
- CHAR: nhiều quad
### 9.5 CHAR Atlas Overflow (Quan trọng)

Khi atlas (2048x2048) bị đầy:

- Ký tự mới sẽ không được render
- Text có thể bị mất chữ hoặc hiển thị sai

Nguyên nhân:
- Quá nhiều ký tự khác nhau (Unicode, emoji…)
- Quá nhiều font size / color khác nhau

→ Đây là lỗi khó debug và thường xảy ra trong production
## 10. LIMITATIONS
- Không có cache eviction
- Không có multi atlas
- Không có auto fallback
## 11. BEST PRACTICES
### 11.1 Chiến lược UI
- Static UI → BITMAP
- Dynamic UI → CHAR
- Text phức tạp → BMFont
### 11.2 Quy tắc tối ưu
- Hạn chế đổi font size runtime
- Tránh đổi màu liên tục
- Giới hạn charset
- Sắp xếp UI hợp lý để batch
### 11.3 Debug
```cc.dynamicAtlasManager.showDebug(true)```
## 12. USE CASE THỰC TẾ
### 12.1 Score system 
        → Dùng CHAR
### 12.2 Menu tĩnh
        → Dùng BITMAP
### 12.3 Chat system
        → Dùng BMFont
## 13. KẾT LUẬN
```Cache Mode không phải là một cấu hình đơn giản, mà là:→ Chiến lược tối ưu giữa CPU – GPU – Memory – DrawCall```
#### Nguyên tắc chính
- Text động → ```CHAR```
- Text tĩnh → ```BITMAP```
#### Insight quan trọng
- Bottleneck nằm ở CPU render text
- Upload texture là chi phí lớn của GPU
- CHAR tối ưu bằng cách giảm granularity
## 14. DECISION CHECKLIST
Trước khi chọn Cache Mode, cần trả lời:

- Text có thay đổi thường xuyên không?
- Số lượng Label là bao nhiêu?
- Charset có lớn không?
- Memory có bị giới hạn không?
#### Kết luận cuối cùng:
```Việc chọn đúng Cache Mode có thể ảnh hưởng trực tiếp đến hiệu năng toàn bộ UI system trong game.```
## 15. ENGINE MINDSET

Cache Mode không nên được xem là: ```thuộc tính của Label```

Mà nên hiểu là: ```chiến lược quản lý rendering pipeline```

Bao gồm:
- CPU workload (render text)
- GPU workload (upload + draw)
- Memory usage (texture)
- Batch efficiency

→ Quyết định sai Cache Mode có thể làm:
- FPS drop
- Memory leak
- DrawCall tăng đột biến




# LIFE CYCLE OF COMPONENT – COCOS CREATOR 2.4

---

# 1. THÔNG TIN CHUNG

* **Tên tài liệu:** Life Cycle of Component – Execution Flow
* **Mục tiêu:**

  * Hiểu toàn bộ vòng đời của Component trong Cocos
  * Nắm rõ thứ tự execution và timing
  * Áp dụng đúng lifecycle để tránh bug & optimize logic

---

# 2. TỔNG QUAN

## 2.1 Life Cycle là gì?

Life Cycle (vòng đời) là chuỗi các **callback function được engine tự động gọi** theo từng giai đoạn của Component.

Developer **không gọi thủ công**, engine sẽ trigger theo state của:

* Node (active / inactive)
* Component (enabled / disabled)
* Frame update

Cocos cung cấp các callback chính:

* onLoad
* onEnable
* start
* update
* lateUpdate
* onDisable
* onDestroy ()

---

## 2.2 Mục tiêu của Life Cycle

* Quản lý **init → runtime → destroy**
* Đồng bộ logic theo frame
* Tách rõ trách nhiệm từng giai đoạn

---

# 3. EXECUTION PIPELINE 

## 3.1 Thứ tự chuẩn

```text
onLoad → onEnable → start → update → lateUpdate → onDisable → onDestroy
```

Đây là flow chuẩn từ lúc tạo → destroy ()

---

## 3.2 Phân nhóm lifecycle

| Giai đoạn      | Callback           |
| -------------- | ------------------ |
| Initialization | onLoad, start      |
| Activation     | onEnable           |
| Runtime        | update, lateUpdate |
| Deactivation   | onDisable          |
| Destruction    | onDestroy          |

---
### 3.3 Execution Timing

Thứ tự thực tế khi Node được active:

onLoad (tất cả component)
→ onEnable (tất cả component)
→ start (tất cả component)
→ update (frame loop)

Lưu ý:

- Tất cả onLoad chạy xong → mới đến onEnable
- Tất cả onEnable chạy xong → mới đến start

→ Không phải từng component chạy full lifecycle riêng lẻ
# 4. PHÂN TÍCH CHI TIẾT (ENGINE LEVEL)

---

## 4.1 onLoad()

### Mô tả

* Gọi khi:

  * Node active lần đầu
  * Scene load

### Đặc điểm

* Luôn chạy trước start
* Chỉ chạy **1 lần**

### Engine Insight

* Component đã:

  * attach vào Node
  * load resource xong


* Có thể:

    * find node
    * get component khác

* Dùng để:

    * init dữ liệu
    * binding reference ()

---

## 4.2 onEnable()

### Mô tả

* Gọi khi:

  * component enabled = true
  * node active = true

### Đặc điểm

* Có thể gọi nhiều lần
* Gọi sau onLoad (lần đầu)

---

### Engine Insight

#### Đây là điểm:

> Component bắt đầu “tham gia hệ thống”

* update bắt đầu chạy
* event bắt đầu hoạt động

#### Dùng để:

* register event
* start logic runtime

---

## 4.3 start()

### Mô tả

* Gọi trước frame update đầu tiên

### Đặc điểm

* Chỉ chạy 1 lần
* Chạy sau onEnable

---

### Engine Insight

```start = “delayed init”```

Khác onLoad:

| onLoad                  | start             |
| ----------------------- | ----------------- |
| chạy ngay               | chạy trước update |
| không phụ thuộc enabled | phụ thuộc enabled |

#### Dùng khi:

* dữ liệu phụ thuộc runtime

---

## 4.4 update(dt)

### Mô tả

* Gọi mỗi frame

### Parameter

* dt = delta time

---

### Engine Insight

* Đây là **game loop chính**

```text
while(gameRunning):
    update()
```

**Dùng cho:**

* movement
* logic realtime
* timer

---

### Performance Note

* Chạy mỗi frame → cực kỳ nhạy cảm performance
* Không nên:

  * gọi find()
  * load resource

---

## 4.5 lateUpdate(dt)

### Mô tả

* Gọi sau tất cả update()

---

### Engine Insight

Thứ tự:

```text
update (all components)
→ animation / physics
→ lateUpdate
```
**Dùng khi:**

* cần sync sau animation
* camera follow
* fix jitter

---

## 4.6 onDisable()

### Mô tả

* Gọi khi:

  * component disabled
  * node inactive

---

### Engine Insight

Component bị “remove khỏi hệ thống update”

* update sẽ dừng
* event nên cleanup

**Dùng để:**

* unregister event
* stop logic

---

## 4.7 onDestroy()

### Mô tả

* Gọi khi:

  * node.destroy()
  * component.destroy()

---

### Important: Deferred Destroy

```destroy() không xóa object ngay lập tức```

Flow:

frame N:
    node.destroy()

→ object vẫn tồn tại trong frame N

→ onDestroy gọi ở cuối frame

### Risk

- Vẫn truy cập được object sau destroy()
- Gây bug khó detect
---

**Dùng để:**

* cleanup resource
* remove reference

---

# 5. INTERNAL FLOW (DEEP ENGINE)

---

## 5.1 Hidden lifecycle (__preload)

* Chạy trước onLoad
* Dùng nội bộ engine ()

**=> Không nên override**

---

## 5.2 enabled vs active

| Property | Ý nghĩa          |
| -------- | ---------------- |
| enabled  | Component active |
| active   | Node active      |

**update chạy khi:**

```enabled == true && activeInHierarchy == true && component không bị destroy```

### Insight

- Disable component → update dừng ngay
- Nhưng object vẫn tồn tại

→ Đây là cơ chế pause logic

---
## 5.3 Multiple Component Execution Order

Khi nhiều Component trên cùng Node:

- Thứ tự gọi lifecycle phụ thuộc vào:
  - Thứ tự attach component trong editor

Ví dụ:

Node có:
- Component A
- Component B

Flow:

A.onLoad → B.onLoad  
A.onEnable → B.onEnable  
A.start → B.start  

→ Nếu A phụ thuộc B, có thể gây bug

### Best Practice

- Không phụ thuộc thứ tự lifecycle giữa component
- Nếu cần:
  - dùng explicit init function
  - hoặc event / callback
## 5.4 Scene Load vs Instantiate

### Khi load Scene:

- onLoad được gọi cho tất cả Node trong scene
- Sau đó mới đến onEnable

---

### Khi instantiate(prefab):

Flow:

instantiate()
→ onLoad
→ onEnable
→ start

---

### Insight

- Logic trong onLoad phải an toàn cho cả:
  - Scene load
  - Prefab instantiate

→ Nếu không sẽ gây bug inconsistency
## 5.5 Active Toggle Flow

Khi bật/tắt node:

node.active = false
→ onDisable

node.active = true
→ onEnable (KHÔNG gọi lại onLoad)

### Insight

- onLoad chỉ chạy 1 lần
- onEnable có thể chạy nhiều lần

→ Không được đặt logic init quan trọng trong onEnable
# 6. FRAME EXECUTION MODEL

---

## 6.1 Mỗi frame engine làm gì

```text
for each component:
    update(dt)

apply animation / physics

for each component:
    lateUpdate(dt)
```

---

## 6.2 Key Insight

* update = logic chính
* lateUpdate = sync cuối

---

# 7. COMMON BUG (THỰC CHIẾN)

---

## 7.1 Bug: null reference trong onLoad

* Node chưa init đầy đủ

=> Fix:

* dùng start()

---

## 7.2 Bug: event leak

* đăng ký event ở onLoad
* không unregister ở onDisable

---

## 7.3 Bug: logic chạy nhiều lần

* code trong onEnable

→ bị gọi lại nhiều lần

---

## 7.4 Bug: destroy nhưng vẫn dùng object

* do destroy delay đến cuối frame

---

# 8. BEST PRACTICES

---

## 8.1 Phân chia trách nhiệm

| Function   | Use              |
| ---------- | ---------------- |
| onLoad     | init reference   |
| start      | init runtime     |
| onEnable   | đăng ký event    |
| update     | logic frame      |
| lateUpdate | sync             |
| onDisable  | cleanup event    |
| onDestroy  | cleanup resource |

---

## 8.2 Rule quan trọng

* Không heavy logic trong update
* Không dùng onLoad cho logic phụ thuộc runtime
* Luôn cleanup trong onDisable

---
## 8.3 Anti-Patterns (Tránh)

- Gọi logic nặng trong update
- Đăng ký event trong onLoad nhưng không cleanup
- Phụ thuộc thứ tự component
- Dùng onEnable như init
- Truy cập object sau destroy

# 9. REAL USE CASE

---

## 9.1 Player Controller

* onLoad → get component
* start → init state
* update → movement

---

## 9.2 UI Panel

* onEnable → show animation
* onDisable → hide + cleanup

---

## 9.3 Camera Follow

* update → tính target
* lateUpdate → apply camera

---

# 10. ENGINE MINDSET

---

Life Cycle không phải là:

→ “list callback”

Mà là:

→ **execution timeline của engine**

Lifecycle là:

→ Scheduler của engine

Engine quyết định:
- Khi nào logic chạy
- Bao nhiêu lần
- Theo thứ tự nào

Dev chỉ:
→ inject logic vào đúng phase

→ Sai phase = sai hệ thống

---

**=>Sai lifecycle =**

* bug khó debug
* logic sai timing
* performance issue

---

# 11. KẾT LUẬN

---

## Nguyên tắc cốt lõi

* onLoad = init data
* start = init runtime
* update = game loop
* lateUpdate = sync cuối
* onEnable/onDisable = bật/tắt logic
* onDestroy = cleanup

---

## Insight quan trọng

* Engine control toàn bộ execution
* Dev chỉ “hook vào đúng thời điểm”

---

## Final Thought

> Hiểu lifecycle = hiểu cách engine chạy game

---

# 12. CHECKLIST

---

Trước khi code Component:

* Logic này nên chạy lúc nào?
* Có cần chạy mỗi frame không?
* Có cần cleanup không?
* Có bị gọi nhiều lần không?

---
**=> Nếu trả lời sai các câu hỏi này -> bug chắc chắn xảy ra.**


