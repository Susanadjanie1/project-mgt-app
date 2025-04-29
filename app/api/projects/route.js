export async function GET() {
    const projects = [
      { id: 'p1', title: 'Website Redesign', description: 'Update the company website', assignedUsers: ['1', '2'] },
      { id: 'p2', title: 'Mobile App', description: 'Build a mobile application', assignedUsers: ['2', '3'] },
      { id: 'p3', title: 'Marketing Campaign', description: 'Launch new marketing campaigns', assignedUsers: ['1', '3'] },
    ];
  
    return new Response(JSON.stringify({ projects }), { status: 200 });
  }
  