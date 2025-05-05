// app/api/users/route.js

import { NextResponse } from 'next/server';
import connectDB from 'lib/db';
import User from 'app/models/User';
import { verifyToken } from 'lib/auth';

export async function GET(req) {
  try {
    const user = await verifyToken(req);

    if (!user || !['admin', 'manager'].includes(user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await connectDB();

    // ✅ Return only team and manager roles
    const users = await User.find({ role: { $in: ['team', 'manager'] } }).select('email name role');

    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
