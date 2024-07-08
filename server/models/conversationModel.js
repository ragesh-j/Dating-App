const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    createdAt: { type: Date, default: Date.now },
});

const ConversationModel = mongoose.model('Conversation', conversationSchema);

module.exports = ConversationModel;