# 🚀 QUICK START - Deploy trong 10 phút

## Bước 1: Tạo Bot (2 phút)
1. Mở [@BotFather](https://t.me/botfather) trên Telegram
2. `/newbot` → Đặt tên và username
3. Lưu Bot Token

## Bước 2: Deploy Game (3 phút)

### Option A: GitHub Pages (Recommend)
```bash
1. Tạo repo mới trên GitHub
2. Upload file flappy-bird-telegram.html
3. Đổi tên thành index.html
4. Settings → Pages → Enable
5. Copy URL: https://USERNAME.github.io/REPO
```

### Option B: Netlify (Nhanh nhất)
```bash
1. Vào netlify.com
2. Drag & drop file flappy-bird-telegram.html
3. Đổi tên thành index.html
4. Copy URL ngay lập tức
```

## Bước 3: Kết nối Mini App (2 phút)
1. Quay lại BotFather
2. `/newapp` → Chọn bot
3. Điền thông tin:
   - Title: Flappy Bird
   - Description: Game bay vượt ống cực hay!
   - Photo: Upload ảnh 640x360px
   - Demo GIF: (optional)
   - **Web App URL: [URL từ bước 2]**

## Bước 4: Test & Launch (3 phút)
1. Mở bot của bạn
2. Gửi `/start`
3. Click "Play Game"
4. Xong! 🎉

---

## 💰 Kiếm tiền ngay

### Week 1: Setup
- ✅ Share bot lên groups/channels
- ✅ Post trên social media
- ✅ Mời 10 bạn bè chơi

### Week 2-4: Growth
- Đạt 1000+ users
- Telegram tự động bật ads
- Thu $50-200/tháng

### Month 2+: Scale
- Thêm leaderboard (dùng server.js)
- In-app purchases
- Tournaments với prizes
- Thu $500-2000/tháng

---

## 📊 Leaderboard (Optional - Advanced)

Nếu muốn thêm bảng xếp hạng:

### Deploy Backend
```bash
# Railway.app (FREE tier)
1. Tạo account trên railway.app
2. New Project → Deploy from GitHub
3. Connect repo có file server.js
4. Railway tự động detect Node.js
5. Copy API URL

# hoặc Render.com
1. Tạo account trên render.com
2. New Web Service → Connect GitHub
3. Build command: npm install
4. Start command: npm start
5. Copy API URL
```

### Update Frontend
Trong file `flappy-bird-telegram.html`, thêm code gọi API:
```javascript
// Sau khi game over, gửi score
async function sendScore(score) {
    const response = await fetch('YOUR_API_URL/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: tg.initDataUnsafe.user.id,
            username: tg.initDataUnsafe.user.username,
            score: score
        })
    });
    return response.json();
}
```

---

## 🎯 Marketing Checklist

### Free Marketing
- [ ] Share trong 10 Telegram groups
- [ ] Post trên Facebook/TikTok
- [ ] Tạo short video demo
- [ ] Tag #FlappyBird #TelegramGame
- [ ] Mời bạn bè chơi

### Paid Marketing (khi có budget)
- [ ] Telegram Ads ($50-100)
- [ ] Facebook Ads ($50)
- [ ] Influencer shoutout ($20-50)

---

## ⚡ Pro Tips

1. **Viral Feature**: Thêm "Share score" sau mỗi game
2. **Daily Rewards**: Login hàng ngày = +5 lives
3. **Tournaments**: Mỗi tuần tổ chức giải đấu
4. **Skins**: Bán skin chim ($0.99 mỗi skin)
5. **Ads**: Xem ads = +1 life

---

## 🆘 Common Issues

**Game không load?**
→ Check URL có https:// chưa

**Button không hiện?**
→ Trong BotFather: `/setmenubutton` → Add button

**Score không lưu?**
→ Bật localStorage trong browser settings

---

## 📞 Support

- Telegram: @YourSupportBot
- Email: support@yourgame.com
- Docs: [Telegram Mini Apps](https://core.telegram.org/bots/webapps)

**Good luck! 🚀🎮**
