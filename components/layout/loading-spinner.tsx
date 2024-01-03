import { PiSpinnerGap } from 'react-icons/pi';

export function LoadingSpinner() {
  return (
    <div className='flex flex-col items-center justify-center mt-20'>
      <PiSpinnerGap className='animate-spin h-14 w-14' />
    </div>
  );
}
