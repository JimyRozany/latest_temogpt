import Articles from "../components/Articles";

export default function Home() {
  return (
    <div className=" h-[calc(100%_-_100px)] overflow-scroll">
      <div className="flex justify-center">
        {/* area of view articles */}
        <div className=" w-4/5 ">
          <Articles />
        </div>
      </div>
    </div>
  );
}
