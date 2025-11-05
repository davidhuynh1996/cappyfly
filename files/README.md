# Flappy Bird - Telegram Mini App

## 🎮 Hướng Dẫn Setup Đầy Đủ

### Bước 1: Tạo Telegram Bot

1. Mở Telegram và tìm [@BotFather](https://t.me/botfather)
2. Gửi lệnh `/newbot`
3. Đặt tên cho bot của bạn (ví dụ: "Flappy Bird Game")
4. Đặt username cho bot (ví dụ: "FlappyBirdGameBot")
5. Lưu lại **Bot Token** mà BotFather cung cấp

### Bước 2: Tạo Mini App

1. Trong chat với BotFather, gửi lệnh `/newapp`
2. Chọn bot vừa tạo
3. Đặt tên cho app: "Flappy Bird"
4. Mô tả: "Game Flappy Bird cực hấp dẫn!"
5. Upload ảnh icon (512x512 px)
6. Upload ảnh GIF demo game (nếu có)
7. Nhập URL của web app (xem bước 3)

### Bước 3: Deploy Game

#### Option 1: GitHub Pages (MIỄN PHÍ - Đơn giản nhất)

1. Tạo repository mới trên GitHub
2. Upload file `flappy-bird-telegram.html`
3. Đổi tên file thành `index.html`
4. Vào Settings → Pages
5. Chọn branch `main` và folder `/root`
6. Lưu và đợi 2-3 phút
7. URL sẽ là: `https://USERNAME.github.io/REPO-NAME`

#### Option 2: Netlify (MIỄN PHÍ - Nhanh nhất)

1. Truy cập [netlify.com](https://netlify.com)
2. Đăng ký/Đăng nhập
3. Drag & drop file `flappy-bird-telegram.html` vào Netlify
4. Đổi tên file thành `index.html`
5. Site sẽ được deploy tự động
6. URL: `https://random-name.netlify.app`

#### Option 3: Vercel (MIỄN PHÍ)

1. Truy cập [vercel.com](https://vercel.com)
2. Kết nối với GitHub
3. Import repository
4. Deploy tự động

### Bước 4: Kết Nối Bot với Mini App

1. Quay lại BotFather
2. Gửi `/myapps`
3. Chọn bot của bạn
4. Chọn "Edit Web App URL"
5. Nhập URL từ bước 3
6. Hoàn tất!

### Bước 5: Test Game

1. Mở bot của bạn trên Telegram
2. Click nút "Play Game" hoặc gửi lệnh `/start`
3. Game sẽ mở trong Telegram

---

## 🚀 Tính Năng Hiện Tại

✅ Gameplay Flappy Bird chuẩn
✅ Responsive trên mọi thiết bị
✅ Lưu điểm cao local
✅ Tích hợp Telegram Haptic Feedback
✅ Nút chia sẻ điểm số
✅ UI đẹp với animation mượt

---

## 💰 Cách Kiếm Tiền Từ Game

### 1. Telegram Ads
- Khi kênh bot đạt 1000+ subscribers
- Telegram sẽ tự động hiển thị quảng cáo
- Bạn nhận 50% doanh thu quảng cáo

### 2. In-App Purchases
- Bán "lives" để tiếp tục chơi
- Bán skin cho chim
- Bán power-ups (shield, slow motion)

### 3. TON Integration
- Tạo token riêng cho game
- Người chơi kiếm token khi đạt điểm cao
- Token có thể đổi sang TON/USDT

### 4. Sponsored Challenges
- Hợp tác với brands
- Tạo challenges có thưởng
- Brands trả tiền để quảng bá

### 5. Premium Version
- Version miễn phí: 5 mạng/ngày
- Premium: Không giới hạn + no ads
- Giá: $1.99/tháng

---

## 📊 Thêm Leaderboard (Backend)

Để thêm bảng xếp hạng toàn cầu, bạn cần:

1. **Backend API** (Node.js/Python)
2. **Database** (MongoDB/PostgreSQL)
3. **Hosting** (Railway/Render - FREE tier)

### Code Backend Mẫu (Node.js + Express)

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let leaderboard = [];

// Submit score
app.post('/api/score', (req, res) => {
    const { userId, username, score } = req.body;
    
    // Find existing user
    const userIndex = leaderboard.findIndex(u => u.userId === userId);
    
    if (userIndex !== -1) {
        // Update if new score is higher
        if (score > leaderboard[userIndex].score) {
            leaderboard[userIndex].score = score;
        }
    } else {
        // Add new user
        leaderboard.push({ userId, username, score });
    }
    
    // Sort leaderboard
    leaderboard.sort((a, b) => b.score - a.score);
    
    res.json({ success: true, rank: leaderboard.findIndex(u => u.userId === userId) + 1 });
});

// Get leaderboard
app.get('/api/leaderboard', (req, res) => {
    res.json(leaderboard.slice(0, 100)); // Top 100
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

## 🎨 Customization Ideas

### Themes
- Dark mode / Light mode
- Seasonal themes (Christmas, Halloween)
- Vietnamese themes (Áo dài bird, Bánh mì pipes)

### Game Modes
- Time Attack: 60 giây ghi càng nhiều điểm
- Hard Mode: Pipes di chuyển nhanh hơn
- Endless Mode: Không có game over

### Power-ups
- Shield: Miễn nhiễm 1 lần va chạm
- Slow Motion: Làm chậm game 3 giây
- Double Points: X2 điểm trong 10 giây

---

## 🐛 Troubleshooting

**Game không load?**
- Check URL có đúng không
- Kiểm tra console log (F12)
- Đảm bảo file có tên `index.html`

**Haptic feedback không hoạt động?**
- Chỉ work trên Telegram mobile app
- Không work trên web version

**Score không lưu?**
- Check localStorage có enable không
- Thử clear cache và reload

---

## 📱 Marketing Strategy

1. **Viral Loop**: Nút share sau mỗi game
2. **Daily Challenges**: Thử thách hàng ngày với rewards
3. **Tournaments**: Tổ chức giải đấu hàng tuần
4. **Referral System**: Mời bạn bè = nhận lives
5. **Social Media**: Post highlights lên TikTok, Instagram

---

## 📈 Growth Metrics

**Mục tiêu 3 tháng đầu:**
- ✅ 1,000 users trong tuần đầu
- ✅ 10,000 users trong tháng đầu
- ✅ 100,000 users trong 3 tháng
- ✅ $500-1000/tháng từ ads + IAP

---

## 🔗 Useful Links

- [Telegram Mini Apps Docs](https://core.telegram.org/bots/webapps)
- [TON Blockchain](https://ton.org)
- [HTML5 Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Game Monetization Guide](https://gameanalytics.com/blog/game-monetization-guide/)

---

## 💡 Next Steps

1. ✅ Deploy game lên hosting
2. ✅ Tạo bot và kết nối Mini App
3. ⏳ Test với bạn bè
4. ⏳ Thu thập feedback
5. ⏳ Thêm features mới
6. ⏳ Marketing và scale

---

## 🤝 Support

Nếu cần help:
- Check documentation trên [core.telegram.org](https://core.telegram.org)
- Join Telegram Mini Apps community groups
- Google specific errors

Chúc bạn thành công! 🚀🎮
