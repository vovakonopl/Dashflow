import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import ErrorMessage from '@/components/shared/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils/cn';

type TClassNames = {
  container: string;
  trigger: string;
};

type TDatePickerProps = {
  id: string;
  error?: string;
  label: string;
  onChange?: (date?: Date) => void;
  value?: Date;
  classNames?: Partial<TClassNames>;
};

const DatePicker = ({
  id,
  classNames,
  error,
  label,
  onChange,
  value,
}: TDatePickerProps) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-2',
        error && 'text-destructive',
        classNames?.container,
      )}
    >
      <Label htmlFor={id}>{label}</Label>

      <Popover modal>
        <PopoverTrigger asChild>
          <Button
            id={id}
            className={cn(
              'data-[empty=true]:text-muted-foreground w-52 cursor-pointer justify-start text-left font-normal',
              classNames?.trigger,
              error && 'border-destructive',
            )}
            data-empty={!value}
            variant="outline"
          >
            <CalendarIcon />
            {value ? format(value, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={value} onSelect={onChange} />
        </PopoverContent>
      </Popover>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default DatePicker;
