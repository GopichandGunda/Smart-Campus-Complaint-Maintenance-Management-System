import Complaint from '../models/Complaint.js';
import User from '../models/User.js';

export const createComplaint = async (req, res) => {
  try {
    const { title, description, category, location, priority } = req.body;

    if (!title || !description || !category || !location) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const complaint = new Complaint({
      title,
      description,
      category,
      location,
      priority: priority || 'Medium',
      submittedBy: req.user.id,
      image: req.body.image || null
    });

    await complaint.save();
    await complaint.populate('submittedBy', 'name email phone');

    res.status(201).json({
      success: true,
      message: 'Complaint submitted successfully',
      complaint
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getComplaints = async (req, res) => {
  try {
    const { status, category, priority, search } = req.query;
    let filter = {};

    if (status) filter.status = status;
    if (category) filter.category = category;
    if (priority) filter.priority = priority;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const complaints = await Complaint.find(filter)
      .populate('submittedBy', 'name email phone')
      .populate('assignedTo', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({ success: true, complaints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('submittedBy', 'name email phone college department studentId')
      .populate('assignedTo', 'name email phone department employeeId')
      .populate('comments.user', 'name email role');

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json({ success: true, complaint });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMyComplaints = async (req, res) => {
  try {
    const { status, category, priority, search } = req.query;
    let filter = { submittedBy: req.user.id };

    if (status) filter.status = status;
    if (category) filter.category = category;
    if (priority) filter.priority = priority;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const complaints = await Complaint.find(filter)
      .populate('submittedBy', 'name email phone')
      .populate('assignedTo', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({ success: true, complaints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getStaffComplaints = async (req, res) => {
  try {
    const { status, search } = req.query;
    let filter = { assignedTo: req.user.id };

    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const complaints = await Complaint.find(filter)
      .populate('submittedBy', 'name email phone')
      .populate('assignedTo', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({ success: true, complaints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Submitted', 'Under Review', 'Assigned', 'In Progress', 'Resolved', 'Closed', 'Rejected'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    complaint.status = status;
    if (status === 'Resolved') {
      complaint.resolvedAt = new Date();
    }
    complaint.updatedAt = new Date();
    await complaint.save();

    await complaint.populate('submittedBy', 'name email phone');
    await complaint.populate('assignedTo', 'name email phone');

    res.json({ success: true, message: 'Complaint status updated', complaint });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateComplaintPriority = async (req, res) => {
  try {
    const { priority } = req.body;
    const validPriorities = ['Low', 'Medium', 'High', 'Critical'];

    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ message: 'Invalid priority' });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { priority, updatedAt: new Date() },
      { new: true }
    ).populate('submittedBy', 'name email phone').populate('assignedTo', 'name email phone');

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json({ success: true, message: 'Priority updated', complaint });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const assignStaff = async (req, res) => {
  try {
    const { staffId } = req.body;

    if (!staffId) {
      return res.status(400).json({ message: 'Staff ID required' });
    }

    const staff = await User.findById(staffId);
    if (!staff || staff.role !== 'staff') {
      return res.status(404).json({ message: 'Staff member not found' });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        assignedTo: staffId,
        status: 'Assigned',
        updatedAt: new Date()
      },
      { new: true }
    ).populate('submittedBy', 'name email phone').populate('assignedTo', 'name email phone');

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json({ success: true, message: 'Staff assigned successfully', complaint });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Comment text required' });
    }

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    complaint.comments.push({
      user: req.user.id,
      text
    });

    await complaint.save();
    await complaint.populate('comments.user', 'name email role');

    res.json({ success: true, message: 'Comment added', complaint });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const addResolutionNotes = async (req, res) => {
  try {
    const { resolutionNotes } = req.body;

    if (!resolutionNotes) {
      return res.status(400).json({ message: 'Resolution notes required' });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { resolutionNotes, updatedAt: new Date() },
      { new: true }
    ).populate('submittedBy', 'name email phone').populate('assignedTo', 'name email phone');

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json({ success: true, message: 'Resolution notes added', complaint });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json({ success: true, message: 'Complaint deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
