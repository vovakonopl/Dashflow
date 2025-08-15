import ButtonSkeleton from '@/components/layout/sidebar/ButtonSkeleton';

const SkeletonBlock = () => {
  return (
    <div className="flex flex-col gap-1">
      <ButtonSkeleton />
      <ButtonSkeleton textLineClassName="w-3/4" />
      <ButtonSkeleton textLineClassName="w-1/2" />
    </div>
  );
};

export default SkeletonBlock;
