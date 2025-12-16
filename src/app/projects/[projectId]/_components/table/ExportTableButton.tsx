'use client';

import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { TTaskWithMemberIds } from '@/lib/types/tables/task';

type TExportTableButtonProps = {
  tasks: TTaskWithMemberIds[];
  projectName: string;
};

const ExportTableButton = ({ tasks, projectName }: TExportTableButtonProps) => {
  const t = useTranslations('projects.project.tasks');

  const exportToCSV = () => {
    // CSV headers
    const headers = ['Task Name', 'Status', 'Due Date', 'Priority'];

    // Build CSV rows
    const rows = tasks.map((task) => {
      const status = task.completedAt ? 'Completed' : 'In Progress';
      const dueDate = new Date(task.deadline).toLocaleDateString();
      const priority =
        task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

      return [
        // Escape double quotes and wrap in quotes for CSV safety
        `"${task.title.replace(/"/g, '""')}"`,
        status,
        dueDate,
        priority,
      ].join(',');
    });

    // Combine headers and rows
    const csvContent = [headers.join(','), ...rows].join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${projectName.replace(/[<>:"/\\|?*]/g, '_')}_tasks.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button variant="outline" onClick={exportToCSV} className="capitalize">
      <Download className="mr-1 size-4" />
      {t('actions.export')}
    </Button>
  );
};

export default ExportTableButton;
