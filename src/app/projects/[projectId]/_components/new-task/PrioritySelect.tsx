import ErrorMessage from '@/components/shared/ErrorMessage';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { priorities } from '@/lib/types/tables/task-priority-enum';
import { cn } from '@/lib/utils/cn';

type TPrioritySelectProps = {
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
};

const PrioritySelect = ({ error, value, onChange }: TPrioritySelectProps) => {
  return (
    <div
      className={cn('flex flex-1 flex-col gap-2', error && 'text-destructive')}
    >
      <Label htmlFor="priority">Task Priority</Label>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          id="priority"
          className={cn('w-full cursor-pointer', error && 'border-destructive')}
        >
          <SelectValue placeholder="Theme" />
        </SelectTrigger>

        <SelectContent>
          {priorities.map((priority) => (
            <SelectItem value={priority} id={priority} key={priority}>
              {priority}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default PrioritySelect;
