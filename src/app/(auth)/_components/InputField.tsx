import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type TInputFieldProps = {
  id: string;
  label: string;
};

const InputField = ({ id, label }: TInputFieldProps) => {
  return (
    <div className="flex flex-col">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} />
    </div>
  );
};

export default InputField;
