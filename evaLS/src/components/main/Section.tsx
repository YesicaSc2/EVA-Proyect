import imageMobile from '../../assets/images//5.png'
import imageDesktop from '../../assets/images//5.png'

export const Section = () => {
  return (
    <section className='mb-12 md:mb-0'>
      
      <div className='sm:flex'>
        <div className='flex-11 py-20'>
          <h2 className='text-[100px] leading-none font-bold sm:text-[80px]'>Aprende lenguaje de señas</h2>
        </div>
        {/* <div className='flex-10  pt-20 px-4'>
          <p className='mb-10 text-[13px] sm:text-[30px] '>Accede ahora</p>
          <button className='bg-VeryDarkBlue w-[185px] h-[48px] uppercase text-OffWhite hover:bg-VeryDarkBlue '>Registrarse</button>
        </div> */}
        <div>
        <source media='(min-width: 500px)' srcSet={imageDesktop} />
        <img src={imageMobile} alt="image" />
        </div>
      </div>
    </section>
  )
}