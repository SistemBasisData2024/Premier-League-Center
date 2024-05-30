import styles from "../style";

const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY} pt-12 h-screen`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 justify-center`}>
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[65px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
            <br className="sm:block hidden" />{" "}
            <span className="">Cek Sini Dulu</span>{" "}
            <span>Sebelum Ngatain MU</span>{" "}
          </h1>
        </div>
        <h1 className="font-poppins font-semibold ss:text-[57px] text-[50px] text-white ss:leading-[100.8px] leading-[75px] w-full">
        </h1>
        <div className={`font-poppins font-semibold text-[20px] text-white max-w-[500px] mt-5`}>
          <h1>Sebuah website monitoring Laga Premier League</h1>
        </div>
        <div className={`${styles.paragraph} max-w-[470px] mt-24`}>
          <h1>Created By:</h1>
          <h2>Rizqi Zaidan</h2>
          <h3>Naufal Rusyda Santosa</h3>
          <h4>Farhan Nuzul Noufendri</h4>
        </div>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
      </div>
    </section>
  );
};

export default Hero;
