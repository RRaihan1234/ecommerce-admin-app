
import Topbar from '../components/Topbar'

export default function HomePage() {

  return (
    <>
      <Topbar />
      <div className="flex items-center justify-center mt-[18rem]">
            <div>
                <p className="text-[70px] font-bold tracking-[0.3rem]">E-Commerce Admin Application</p>
                <p className="text-center tracking-[0.2rem]">Developed By Shah Md. Raihanul Haque</p>
            </div>
      </div>
    </>
  );
}
