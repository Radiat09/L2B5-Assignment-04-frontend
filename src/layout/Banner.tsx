import { Logo } from "@/assets/Logo";

const Banner = () => {
  return (
    <div className="bg-[#004d57] min-h-[160px] flex flex-col items-center justify-center gap-3">
      <Logo />
      <p className="text-3xl text-white">BUBT Central Library</p>
    </div>
  );
};

export default Banner;
