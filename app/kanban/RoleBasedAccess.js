// RoleBasedAccess.tsx
export default function RoleBasedAccess({ role, allowed, children }) {
    if (!allowed.includes(role)) return null;
    return children;
  }
  
  // Usage
  <RoleBasedAccess role={session.user.role} allowed={['admin', 'manager']}>
    <AssignUserDropdown />
  </RoleBasedAccess>
  