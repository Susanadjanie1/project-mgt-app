import connectDB from 'lib/db';
import Task from 'app/models/Task';
import { NextResponse } from 'next/server';

export async function POST(req, { params }) {
  await connectDB();
  const { id } = params;
  const { userId, text } = await req.json();

  try {
    const task = await Task.findById(id);
    
    if (!task) return NextResponse.json({ error: 'Task not found' }, { status: 404 });

    task.comments.push({ userId, text });
    await task.save();

    return NextResponse.json({ message: 'Comment added successfully', task });
  } catch (err) {
    console.error('Error adding comment:', err);
    return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 });
  }
}
