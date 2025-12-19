export default function Loading() {
    return (
      <div className="w-screen h-full flex justify-center">
        <div className="mt-20 md:mt-32 lg:mt-40">
          <span className="loading loading-infinity text-primary w-16  md:w-20  lg:w-32"></span>
        </div>
      </div>
    );
  }
  