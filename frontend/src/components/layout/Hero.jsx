import { Link } from "react-router-dom";
import heroImg from "../../assets/hero_image.jpg";

const Hero = () => {
  return (
    <section className="relative">
      <img
        src={heroImg}
        alt="rogueshark"
        className="w-full h-[94vh] md:h-[94vh] lg:h-[94vh] object-cover"
      />
      <div className="absolute inset-0 bg-black/40 bg-opacity flex items-center justify-center">
        <div className="text-center text-white p-6">
          <h1 className="text-5xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
            Exquisite. <br /> Elegant. <br /> Effortless.
          </h1>
          <p className="text-xs tracking-tight md:text-xl mb-6">
            Explore Our Collections, Hand Crafted to Elevate Your Style.
          </p>
          <Link
            to="/collections/all"
            className="absolute bottom-5 right-5 text-white text-xs lg:text-2xl font-semibold cursor-pointer hover:underline hover:underline-offset-4 transition-all duration-300"
          >
            Shop Now.
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
