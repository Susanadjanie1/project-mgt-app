import Task from "app/models/Task";
import connectDB from "lib/db";

export default async function handler(req, res) {
  await connectDB();
  if (req.method !== "POST") return res.status(405).end();

  const { hours, userId } = req.body;

  const task = await Task.findById(req.query.id);
  task.timeLogs.push({ hours, userId });
  await task.save();

  res.status(200).json({ success: true });
}
