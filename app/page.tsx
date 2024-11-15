import Featured from '@/app/product/Featured';
import { Offer } from './components/Offer';
import Slider from './components/Slider';


export default async function Home() {
  return (
    <div>
      <Slider />
      <Featured />
      <Offer />
    </div>
  );
}
