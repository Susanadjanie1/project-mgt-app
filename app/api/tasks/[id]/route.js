// app/api/tasks/[id]/route.js
import { NextResponse } from 'next/server';
import tasks from '@/data/tasks';

export async function PUT(req, { params }) {
  const { id } = params;
  const { title, status } = await req.json();

  const task = tasks.find(t => t.id === id);
  if (!task) return NextResponse.json({ error: 'Task not found' }, { status: 404 });

  task.title = title ?? task.title;
  task.status = status ?? task.status;

  return NextResponse.json(task);
}

export async function DELETE(req, { params }) {
  const { id } = params;
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) return NextResponse.json({ error: 'Task not found' }, { status: 404 });

  const deleted = tasks.splice(index, 1);
  return NextResponse.json(deleted[0]);
}
