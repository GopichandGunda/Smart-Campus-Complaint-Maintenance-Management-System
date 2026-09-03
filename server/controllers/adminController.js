import Complaint from '../models/Complaint.js';
import User from '../models/User.js';
import Feedback from '../models/Feedback.js';

export const getAdminStatistics = async (req, res) => {
  try {
    const totalComplaints = await Complaint.countDocuments();
    const pendingComplaints = await Complaint.countDocuments({ status: 'Submitted' });
    const underReview = await Complaint.countDocuments({ status: 'Under Review' });
    const assigned = await Complaint.countDocuments({ status: 'Assigned' });
    const inProgress = await Complaint.countDocuments({ status: 'In Progress' });
    const resolved = await Complaint.countDocuments({ status: 'Resolved' });
    const closed = await Complaint.countDocuments({ status: 'Closed' });
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalStaff = await User.countDocuments({ role: 'staff' });

    res.json({
      success: true,
      statistics: {
        totalComplaints,
        pendingComplaints,
        underReview,
        assigned,
        inProgress,
        resolved,
        closed,
        totalStudents,
        totalStaff
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    res.json({ success: true, students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllStaff = async (req, res) => {
  try {
    const staff = await User.find({ role: 'staff' }).select('-password');
    res.json({ success: true, staff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getRecentFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .populate('complaint', 'title category')
      .populate('student', 'name email')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({ success: true, feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
