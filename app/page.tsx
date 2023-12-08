import Image from 'next/image';
import { NavCategory } from '@/components/navigation';
import { Container } from '@/components/container';

export default function Home() {
  return (
    <Container>
      <NavCategory />
      <main>
        <div>HOME!</div>
      </main>
    </Container>
  );
}
