import { useState, useEffect } from 'react';
import { getRolePermissions } from '../services';
import type { Permission, AdminRole } from '../types';

interface PermissionViewerProps {
  role: AdminRole;
}

export function PermissionViewer({ role }: PermissionViewerProps) {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getRolePermissions(role).then(data => {
      if (mounted) {
        setPermissions(data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, [role]);

  if (loading) {
    return <div className="flex gap-1 animate-pulse"><div className="h-4 w-16 bg-gray-700 rounded-full"></div></div>;
  }

  if (permissions.length === 0) return <span className="text-xs text-gray-500">None</span>;

  // Render a few badges, and a "+X" if many
  const visible = permissions.slice(0, 2);
  const hiddenCount = permissions.length - 2;

  return (
    <div className="flex flex-wrap gap-1.5 items-center" title={permissions.map(p => p.label).join(', ')}>
      {visible.map(p => (
        <span key={p.id} className="inline-flex px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-900/30 text-emerald-400 border border-emerald-800/50">
          {p.label}
        </span>
      ))}
      {hiddenCount > 0 && (
        <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-800 text-gray-400 border border-gray-700">
          +{hiddenCount}
        </span>
      )}
    </div>
  );
}
