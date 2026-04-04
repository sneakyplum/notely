

export default function Home() {
  return (
    <div >
      <div >
        <header className="p-4 flex flex-row w-full justify-between items-center mt-2 position: fixed">
          <div>
            <h1 className="text-4xl font-inter justify-between items-center ml-6">Notely</h1>

          </div>
          <div className="gap-10 flex text-xl items-center justify-center">
            <button className="cursor-pointer font-inter p-2">Product</button>
            <button className="cursor-pointer font-inter p-2">Features</button>
            <button className="cursor-pointer font-inter p-2">Pricing</button>
          </div>
          <div className="flex flex-row  items-center bg-blue-600 text-l rounded-sm mr-10">
            <a href="/sign-up" className="w-full h-full cursor-pointer p-2 pl-6 pr-6 text-white font-inter">Get Started</a>
          </div>
        </header>
      </div>
      <div className="w-full h-dvh flex  justify-start pl-20">
        <div className="w-2/4 h-full flex flex-col justify-center items-start pb-50">
          <h1 className="font-inter font-bold text-5xl/20  font-stretch-expanded">
            Project Management Software For <br />Superintendents, Foremen, And Project Managers.
          </h1>
          <h5 className="font-inter font-stretch-expanded pr-5 mt-5 text-xl text-gray-600">
            Pull Planning for superintendents, foremen, and project managers. Notely is a construction project management software that helps you plan, track and manage your projects more efficiently.
          </h5>
          <div className="flex w-full items-center justify-start pt-4">
            <button className="text-lg/15 ">
              <a href="/sign-up" className=" cursor-pointer text-white font-inter bg-blue-600 rounded-sm pl-5 pr-5 p-3">Get Started for Free</a>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
