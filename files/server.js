// server.js - Backend cho Flappy Bird Leaderboard
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database (dùng MongoDB hoặc PostgreSQL cho production)
let leaderboard = [];
let dailyScores = new Map(); // User ID -> today's best score

// Helper: Reset daily scores at midnight
function resetDailyScores() {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow - now;
    
    setTimeout(() => {
        dailyScores.clear();
        console.log('Daily scores reset!');
        resetDailyScores(); // Schedule next reset
    }, timeUntilMidnight);
}

resetDailyScores();

// API Routes

// Submit score
app.post('/api/score', (req, res) => {
    try {
        const { userId, username, firstName, score, timestamp } = req.body;
        
        // Validation
        if (!userId || score === undefined || score < 0) {
            return res.status(400).json({ error: 'Invalid data' });
        }
        
        // Anti-cheat: Check if score is realistic
        if (score > 999) {
            return res.status(400).json({ error: 'Suspicious score' });
        }
        
        // Update or add user score
        const existingUserIndex = leaderboard.findIndex(u => u.userId === userId);
        
        if (existingUserIndex !== -1) {
            // Update if new score is higher
            if (score > leaderboard[existingUserIndex].score) {
                leaderboard[existingUserIndex].score = score;
                leaderboard[existingUserIndex].username = username || firstName;
                leaderboard[existingUserIndex].lastUpdate = new Date();
            }
        } else {
            // Add new user
            leaderboard.push({
                userId,
                username: username || firstName || 'Anonymous',
                score,
                gamesPlayed: 1,
                lastUpdate: new Date(),
                joinDate: new Date()
            });
        }
        
        // Sort leaderboard by score
        leaderboard.sort((a, b) => b.score - a.score);
        
        // Update daily score
        const currentDaily = dailyScores.get(userId) || 0;
        if (score > currentDaily) {
            dailyScores.set(userId, score);
        }
        
        // Find user's rank
        const rank = leaderboard.findIndex(u => u.userId === userId) + 1;
        
        res.json({
            success: true,
            rank,
            totalPlayers: leaderboard.length,
            isNewRecord: existingUserIndex === -1 || score > leaderboard[existingUserIndex].score
        });
        
    } catch (error) {
        console.error('Error submitting score:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get global leaderboard
app.get('/api/leaderboard', (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 100;
        const offset = parseInt(req.query.offset) || 0;
        
        const topPlayers = leaderboard
            .slice(offset, offset + limit)
            .map((player, index) => ({
                rank: offset + index + 1,
                username: player.username,
                score: player.score,
                gamesPlayed: player.gamesPlayed
            }));
        
        res.json({
            leaderboard: topPlayers,
            total: leaderboard.length
        });
        
    } catch (error) {
        console.error('Error getting leaderboard:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get daily leaderboard
app.get('/api/leaderboard/daily', (req, res) => {
    try {
        const dailyLeaderboard = Array.from(dailyScores.entries())
            .map(([userId, score]) => {
                const user = leaderboard.find(u => u.userId === userId);
                return {
                    userId,
                    username: user ? user.username : 'Anonymous',
                    score
                };
            })
            .sort((a, b) => b.score - a.score)
            .slice(0, 50)
            .map((player, index) => ({
                rank: index + 1,
                ...player
            }));
        
        res.json({
            leaderboard: dailyLeaderboard,
            resetsIn: getTimeUntilMidnight()
        });
        
    } catch (error) {
        console.error('Error getting daily leaderboard:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get user stats
app.get('/api/user/:userId', (req, res) => {
    try {
        const { userId } = req.params;
        const user = leaderboard.find(u => u.userId === parseInt(userId));
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        const rank = leaderboard.findIndex(u => u.userId === parseInt(userId)) + 1;
        const dailyScore = dailyScores.get(parseInt(userId)) || 0;
        
        res.json({
            ...user,
            rank,
            dailyBest: dailyScore,
            percentile: ((leaderboard.length - rank) / leaderboard.length * 100).toFixed(1)
        });
        
    } catch (error) {
        console.error('Error getting user stats:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get game statistics
app.get('/api/stats', (req, res) => {
    try {
        const totalPlayers = leaderboard.length;
        const totalGames = leaderboard.reduce((sum, player) => sum + player.gamesPlayed, 0);
        const averageScore = totalPlayers > 0 
            ? (leaderboard.reduce((sum, player) => sum + player.score, 0) / totalPlayers).toFixed(1)
            : 0;
        const topScore = leaderboard.length > 0 ? leaderboard[0].score : 0;
        
        res.json({
            totalPlayers,
            totalGames,
            averageScore: parseFloat(averageScore),
            topScore,
            activePlayers24h: getActivePlayers24h()
        });
        
    } catch (error) {
        console.error('Error getting stats:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Helper functions
function getTimeUntilMidnight() {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const diff = tomorrow - now;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
}

function getActivePlayers24h() {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return leaderboard.filter(player => new Date(player.lastUpdate) > oneDayAgo).length;
}

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Leaderboard API ready!`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
