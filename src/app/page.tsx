import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <img
        src="/images/banner.jpg"
        className='w-full h-[75vh]'
        alt="Picture of the author"
      />
    </main>
  )
}
