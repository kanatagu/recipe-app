import { SignUpForm } from '@/components/form';
import { Container } from '@/components/layout';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

export default function SignUp() {
  const { toast } = useToast();

  return (
    <Container>
      <div className='max-w-[540px] mx-auto md:mt-10 md:border md:p-10 rounded-md'>
        <button
          onClick={() => {
            toast({
              variant: 'destructive',
              title: 'Uh oh! Something went wrong.',
              description: 'There was a problem with your request.',
              action: <ToastAction altText='Try again'>Try again</ToastAction>,
            });
          }}
        >
          Toast
        </button>

        <SignUpForm />
      </div>
    </Container>
  );
}
