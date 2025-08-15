import ButtonSkeleton from '@/components/layout/sidebar/ButtonSkeleton';

const SkeletonBlock = () => {
  return (
    <div>
      <ButtonSkeleton />
      <ButtonSkeleton textLineClassName="w-3/4" />
      <ButtonSkeleton textLineClassName="w-1/2" />
    </div>
  );
};

export default SkeletonBlock;
