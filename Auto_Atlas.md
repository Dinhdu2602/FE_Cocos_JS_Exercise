# ATLAS & AUTO ATLAS
## 1. Giới thiệu về Atlas và vấn đề cần giải quyết
- Trong phát triển game 2D, đặc biệt là khi sử dụng engine như Cocos Creator, các đối tượng hiển thị (sprite) thường sử dụng rất nhiều hình ảnh nhỏ khác nhau. Nếu mỗi hình ảnh được xử lý riêng lẻ, hệ thống render sẽ phải thực hiện nhiều lần gọi vẽ (draw call), dẫn đến giảm hiệu năng.
- Để giải quyết vấn đề này, khái niệm `Texture Atlas (Sprite Atlas)` được sử dụng. Atlas là một hình ảnh lớn chứa nhiều hình ảnh nhỏ bên trong, kèm theo một file dữ liệu mô tả vị trí của từng ảnh con. Khi đó, nhiều sprite có thể dùng chung một texture, giúp giảm số lần GPU phải chuyển đổi texture.
- Tuy nhiên, việc tạo Atlas thủ công bằng các công cụ bên ngoài (như TexturePacker) gây mất thời gian và khó quản lý khi project lớn. Đây là lý do `Auto Atlas` ra đời.

## 2. Auto Atlas là gì?
- Auto Atlas là một tính năng trong Cocos Creator cho phép `tự động gom các sprite lại thành atlas trong quá trình build game`, mà không cần tạo atlas thủ công.
- Nói cách khác, developer chỉ cần đưa các ảnh vào một thư mục và cấu hình Auto Atlas, engine sẽ tự xử lý việc:
    + Gom ảnh
    + Tạo atlas
    + Cập nhật lại dữ liệu render
- Điểm quan trọng cần lưu ý là:
    + Trong `Editor`, các sprite vẫn tồn tại dưới dạng ảnh riêng lẻ
    + Chỉ khi `build game`, Auto Atlas mới thực sự được tạo ra
- Điều này giúp quá trình phát triển linh hoạt hơn, nhưng vẫn đảm bảo tối ưu hiệu năng khi chạy thực tế.

### 3. Cơ chế hoạt động của Auto Atlas
- Quá trình hoạt động của Auto Atlas có thể được mô tả theo các bước sau:
    1. Developer tạo một file Auto Atlas và chỉ định thư mục chứa sprite
    2. Khi thực hiện build game:
        + Engine quét tất cả các sprite trong thư mục
        + Áp dụng thuật toán sắp xếp (packing algorithm)
        + Gom các sprite vào một hoặc nhiều texture atlas
    3. Engine cập nhật lại thông tin render:
        + Thay vì dùng ảnh gốc, sprite sẽ trỏ tới vị trí (UV) trong atlas
    
    Điểm quan trọng là:
    + Sprite logic không thay đổi
    + Chỉ thay đổi cách GPU đọc dữ liệu
### 4. Tại sao Auto Atlas giúp tăng hiệu năng?
-   Để hiểu rõ điều này, cần nắm khái niệm Draw Call.
        
        Draw Call là lệnh mà CPU gửi đến GPU để yêu cầu vẽ một đối tượng. Mỗi lần chuyển đổi texture (texture switching) thường sẽ tạo ra một draw call mới.
-   Nếu không dùng Atlas:
    + Mỗi sprite dùng 1 texture riêng
    + GPU phải chuyển đổi texture liên tục
    + → nhiều draw call → giảm FPS
-   Khi dùng Auto Atlas:
    + Nhiều sprite dùng chung 1 texture
    + GPU không cần đổi texture
    + → giảm draw call đáng kể
- Một insight rất quan trọng:
    
    GPU có thể vẽ rất nhiều object, nhưng việc chuyển đổi texture mới là nguyên nhân chính gây giảm hiệu năng.
### 5. Kích thước Atlas và giới hạn của GPU
-  Auto Atlas không thể có kích thước tùy ý, mà bị giới hạn bởi phần cứng GPU. Mỗi thiết bị đều có một giá trị gọi là:
    `MAX_TEXTURE_SIZE`
- Thông thường:
    + Thiết bị yếu: 1024
    + Thiết bị trung bình: 2048
    + Thiết bị mạnh: 4096 hoặc cao hơn
- Do đó, khi cấu hình Auto Atlas, cần chọn kích thước phù hợp. Nếu atlas vượt quá giới hạn của GPU:
    + Atlas có thể không được tạo
    + Hoặc game bị crash
### 6. Tại sao sử dụng kích thước dạng Power of Two?
- Các kích thước atlas thường là:
    + 512
    + 1024 
    + 2048
    + 4096
    Đây là các số dạng `2^n (Power of Two).`

- Lý do:
    + GPU tối ưu xử lý texture dạng này
    + Hỗ trợ tốt cho mipmap
    + Giúp tối ưu memory alignment

    Nếu sử dụng kích thước không phải power of two, game vẫn có thể chạy nhưng hiệu năng không tối ưu.

### 7. Trade-off: Cân bằng giữa hiệu năng và bộ nhớ
- Việc lựa chọn kích thước atlas là một bài toán cân bằng.
    **Atlas lớn (2048–4096)**
    - Ưu điểm:
        + Giảm draw call
        + Tối ưu render batching
    - Nhược điểm:
        + Tốn nhiều RAM
        + Thời gian load lâu
        + Có thể không tương thích thiết bị yếu
    **Atlas nhỏ (512–1024)**
    - Ưu điểm:
        + Nhẹ, load nhanh
        + Tương thích nhiều thiết bị
    - Nhược điểm:
        + Nhiều atlas hơn
        + Tăng draw call
    
    Một kết luận quan trọng:
         
    Kích thước Atlas cần được lựa chọn dựa trên target device để cân bằng giữa hiệu năng và bộ nhớ.

### 8. Các thông số cấu hình quan trọng của Auto Atlas
**Max Width / Height** Xác định kích thước tối đa của atlas.

**Padding** 
    
- Khoảng cách giữa các sprite trong atlas.
- Giúp tránh hiện tượng “bleeding” (lem màu giữa các sprite).

**Allow Rotation**

- Cho phép xoay sprite khi pack để tận dụng không gian tốt hơn.

**Force Squared**

- Ép atlas thành hình vuông, giúp GPU xử lý hiệu quả hơn.

**Filter Unused**
- Loại bỏ các sprite không được sử dụng trong scene, giúp giảm kích thước build.
### 9. Khi nào không nên sử dụng Auto Atlas?
- Auto Atlas không phải lúc nào cũng phù hợp. Một số trường hợp không nên dùng:
    + Sprite có kích thước quá lớn
    + Asset thay đổi liên tục (dynamic content)
    + Game có nhiều scene độc lập nhưng dùng chung atlas (gây load thừa tài nguyên)
### 10. Best Practices khi sử dụng Auto Atlas
- Để tối ưu hiệu quả, cần áp dụng một số nguyên tắc:
    + Nhóm sprite theo UI hoặc Scene để tránh load dư tài nguyên
    + Không gom toàn bộ asset vào một atlas lớn
    + Sử dụng kích thước atlas phù hợp (thường ≤ 2048)
    + Kết hợp Auto Atlas với Dynamic Atlas để tối ưu cả static và 
    dynamic content

### 11. Lưu ý:
  - Auto Atlas **KHÔNG** phải càng nhiều càng tốt (Gom hết asset game vào 1-2 Atlas lớn) => Load các asset không cần thiết -> Tốn RAM -> Tăng thời gian load.
    + Giải pháp: Chia Atlas theo ngữ cảnh sử dụng.
  - Draw call sẽ giảm khi:
    
    + Sprite dùng cùng texture
    + Cùng material/shader
    + Không bị state khác nhau  (opacity, blend, ...)
  - Lạm dụng Atlas lớn (4096): "Atlas càng to càng tốt vì giảm draw call"
    
    => Thực tế: RAM tăng mạnh, Load chậm, máy yếu sẽ bị crash
    => 1024 - 2048 là safe zone
  - Texture bị "waste": Sprite size không đều, pack không tối ưu => Atlas lớn không đồng nghĩa tối ưu
  - Sprite quá lớn không vào Atlas => Resize hoặc chia nhỏ texture
  - Padding không đủ => Lỗi hình ảnh => Tăng padding (2-4px)
  - Auto Atlas và Dynamic Atlas:
     + Auto Atlas: Build time, asset cố định (UI,...)
     + Dynamic Atlas: runtime, asset phát sinh (text/icon load runtime)
    
    => 2 cái này bổ trợ nhau, chứ không thay thế cho nhau
  - Asset bị duplicate trong nhiều Atlas: Cùng 1 sprite nhưng nằm trong nhiều folder => Tăng build size và memory
   
    => Quản lý folder rõ ràng, không để sprite bị include nhiều nơi
  - **Manual Atlas vẫn tốt hơn Auto Atlas nếu optimize kĩ.**
  - **Atlas chỉ giảm render cost, không giảm logic**
  - **Sử dụng 1 Atlas sẽ gây overload memory**  
  - **Atlas phải cân bằng chứ không phải to là tốt**

**Khi sử dụng Auto Atlas, cần tránh lạm dụng atlas quá lớn hoặc gom toàn bộ asset vào một atlas, vì điều này có thể gây lãng phí bộ nhớ và tăng thời gian load. Ngoài ra, Auto Atlas chỉ giúp giảm draw call khi các sprite dùng chung material và trạng thái render. Do đó, việc tối ưu cần kết hợp cả cách tổ chức asset, kích thước atlas và hiểu rõ pipeline render.**
### 11. Kết luận
- Auto Atlas là một công cụ quan trọng trong việc tối ưu hiệu năng game, đặc biệt là trong các dự án có nhiều sprite. Bằng cách tự động gom các texture lại, Auto Atlas giúp giảm draw call, từ đó cải thiện FPS.
- Tuy nhiên, việc sử dụng Auto Atlas cần được cân nhắc kỹ lưỡng về kích thước, cách nhóm asset và target device để đạt được hiệu quả tối ưu nhất.