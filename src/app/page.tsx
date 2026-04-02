

export default function Home() {
  return (
    <div >
      <div>
        <header className="p-4 flex flex-row w-full justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold font-inter justify-between items-center">Welcome to Notely</h1>

          </div>
          <div className="flex flex-row  items-center bg-blue-600 text-l rounded-sm">
            <a href="/sign-up" className="w-full h-full cursor-pointer p-2 pl-6 pr-6 text-white font-inter">Get Started</a>
          </div>
        </header>
      </div>
    </div>
  );
}
