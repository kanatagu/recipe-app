import { SignUpForm } from '@/components/form';
import { Container } from '@/components/layout';

export default function SignUp() {
  return (
    <Container>
      <div className='max-w-[540px] mx-auto md:mt-10 md:border md:p-10 rounded-md'>
        <SignUpForm />
      </div>
    </Container>
  );
}
