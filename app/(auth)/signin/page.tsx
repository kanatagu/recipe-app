import { SignInForm } from '@/components/form';
import { Container } from '@/components/layout';

export default function SignIn() {
  return (
    <Container>
      <div className='max-w-[540px] mx-auto md:mt-10 md:border md:p-10 rounded-md'>
        <SignInForm />
      </div>
    </Container>
  );
}
