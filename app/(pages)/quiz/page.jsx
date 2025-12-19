import Link from "next/link";

const QuizPage = () => {
  return (
    <div className="w-full h-screen ">
      <div className="flex justify-center items-center ">
        <div className="flex flex-col items-center justify-center">
          <h1 className=" text-xl sm:text-2xl md:text-4xl mt-5 xl:mt-40 xl:font-bold text-primary">
            اختبر نفسك
          </h1>
          <div
            className=" flex flex-col items-center  md:flex-row md:items-center gap-2 mt-4 xl:mt-10"
            dir="rtl"
          >
            <Link href="https://forms.gle/QNAwbtpN8jG4qLRi8" target="_blank">
              <button
                type="button"
                className="border-none text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg  text-sm   xl:text-2xl xl:font-semibold px-5 py-2.5 text-center me-2 mb-2"
              >
                الاختبار التحصيلى
              </button>
            </Link>
            <Link href="https://forms.gle/AnH83Pyk46FTbtAA6" target="_blank">
              <button
                type="button"
                className="border-none text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm  xl:text-2xl xl:font-semibold px-5 py-2.5 text-center me-2 mb-2"
              >
                مقياس مهارات التفكير التصميمي
              </button>
            </Link>
            <Link href="https://forms.gle/t4tPi7LXseaVLhoR8" target="_blank">
              <button
                type="button"
                className="border-none text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg  text-sm   xl:text-2xl xl:font-semibold px-5 py-2.5 text-center me-2 mb-2"
              >
                بطاقة الملاحظة
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
