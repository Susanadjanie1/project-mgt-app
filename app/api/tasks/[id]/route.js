import connectDB from 'lib/db';
import Task from 'app/models/Task';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  await connectDB();
  try {
    const task = await Task.findById(params.id).populate('assignedTo projectId');
    return task
      ? NextResponse.json(task)
      : NextResponse.json({ error: 'Task not found' }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch task' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  await connectDB();
  try {
    const updates = await req.json();
    const task = await Task.findByIdAndUpdate(params.id, updates, { new: true });
    return task
      ? NextResponse.json(task)
      : NextResponse.json({ error: 'Task not found' }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  try {
    const deleted = await Task.findByIdAndDelete(params.id);
    return deleted
      ? NextResponse.json({ message: 'Deleted successfully' })
      : NextResponse.json({ error: 'Task not found' }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}
