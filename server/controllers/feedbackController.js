import Feedback from '../models/Feedback.js';
import Complaint from '../models/Complaint.js';

export const createFeedback = async (req, res) => {
  try {
    const { complaintId, rating, comment } = req.body;

    if (!complaintId || !rating) {
      return res.status(400).json({ message: 'Complaint ID and rating required' });
    }

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    if (complaint.submittedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to feedback this complaint' });
    }

    const feedback = new Feedback({
      complaint: complaintId,
      student: req.user.id,
      rating,
      comment: comment || ''
    });

    await feedback.save();
    await feedback.populate('complaint', 'title category');
    await feedback.populate('student', 'name email');

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      feedback
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .populate('complaint', 'title category status')
      .populate('student', 'name email')
      .sort({ createdAt: -1 });

    res.json({ success: true, feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getComplaintFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ complaint: req.params.complaintId })
      .populate('student', 'name email');

    res.json({ success: true, feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
