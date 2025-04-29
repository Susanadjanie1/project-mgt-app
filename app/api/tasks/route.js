// app/api/tasks/route.js
import { NextResponse } from 'next/server';
import tasks from '@/data/tasks';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(req) {
  const { title, status } = await req.json();
  const newTask = { id: uuidv4(), title, status: status || 'todo' };
  tasks.push(newTask);
  return NextResponse.json(newTask, { status: 201 });
}
