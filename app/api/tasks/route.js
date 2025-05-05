// Assuming the task creation logic is inside app/api/tasks/route.js
import mongoose from 'mongoose';
import User from 'app/models/User';

export async function POST(req, res) {
  try {
    const { title, description, assignedTo, priority, dueDate, projectId } = await req.json();

    // Convert email addresses to ObjectIds
    const assignedUserIds = await User.find({ email: { $in: assignedTo } })
      .then(users => users.map(user => user._id.toString())); // Map to ObjectId

    const newTask = new Task({
      title,
      description,
      assignedTo: assignedUserIds, // Store ObjectIds here
      priority,
      dueDate,
      projectId,
    });

    await newTask.save();

    return res.json(newTask, { status: 201 });
  } catch (error) {
    console.error(error);
    return res.json({ error: 'Failed to create task' }, { status: 500 });
  }
}
