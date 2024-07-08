const express=require('express')
const router=express.Router()
const RequestModel=require('../models/requestModel')
const authenticateToken=require('../middleware/authenticeToken')

router.post('/send-request', authenticateToken, async (req, res) => {
    const { receiverId } = req.body;
    const senderId = req.user.userId;
    
    try {
        const existingRequest = await RequestModel.findOne({ sender: senderId, receiver: receiverId });

        if (existingRequest) {
            return res.status(400).json({message:'Request already sent'});
        }

        const newRequest = new RequestModel({
            sender: senderId,
            receiver: receiverId,
        });
        
        await newRequest.save();
        
        res.status(201).json({message:'Request sent successfully'});
    } catch (error) {
        console.error('Error sending request:', error);
        res.status(500).json({message:'Server Error'});
    }
});

router.post('/status', authenticateToken, async (req, res) => {
    const { otherUserId } = req.body;
    const currentUserId = req.user.userId;

    try {
        const sentRequest = await RequestModel.findOne({ sender: currentUserId, receiver: otherUserId });
        const receivedRequest = await RequestModel.findOne({ sender: otherUserId, receiver: currentUserId });
        const acceptRequest=await RequestModel.findOne({sender: currentUserId, receiver: otherUserId,status:"accepted"})
        const acceptRequest1=await RequestModel.findOne({ sender: otherUserId, receiver: currentUserId,status:'accepted' });
        const rejectRequest=await RequestModel.findOne({sender: currentUserId, receiver: otherUserId,status:"rejected"})
        const rejectRequest1=await RequestModel.findOne({ sender: otherUserId, receiver: currentUserId,status:'rejected' });
        
        if(acceptRequest||acceptRequest1){
            return res.status(200).json({ status: 'accepted' });
        }
        else if(rejectRequest||rejectRequest1){
            return res.status(200).json({ status: 'rejected' });
        }
        else if (sentRequest) {
            return res.status(200).json({ status: 'sent' });
        } else if (receivedRequest) {
            return res.status(200).json({ status: 'received' });
        } else {
            return res.status(200).json({ status: 'none' });
        }
    } catch (error) {
        console.error('Error fetching request status:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});


router.get('/pending-requests', authenticateToken, async (req, res) => {
    const userId = req.user.userId;

    try {
        const pendingRequests = await RequestModel.find({ receiver: userId, status: 'pending' });

        res.json(pendingRequests);
    } catch (error) {
        console.error('Error fetching pending requests:', error);
        res.status(500).send('Server Error');
    }
});
router.post('/update-request', authenticateToken, async (req, res) => {
    
    const { senderId, status } = req.body;
    const userId = req.user.userId;

    try {
        const request = await RequestModel.findOne({ sender: senderId, receiver: userId,status:"pending"});
        
        if (!request) {
            return res.status(404).json({message:'Request not found'});
        }

        request.status = status;
        await request.save();

        res.status(200).json({message:'Request status updated successfully'});
    } catch (error) {
        console.error('Error updating request status:', error);
        res.status(500).json({message:'Server Error'});
    }
});

module.exports = router;