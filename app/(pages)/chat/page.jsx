"use client";

import Message from "../../../components/Message";
import { VscMic } from "react-icons/vsc";
import { HiMiniArrowUpCircle } from "react-icons/hi2";
import { GiPaperClip } from "react-icons/gi";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

// ---------
import { useChat } from "ai/react";

const ChatPage = () => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const [user, setUser] = useState({});
  const endMessagesRef = useRef(null);

  //  --------------- handle chat
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: `/api/chat`, // Path to your API route
    });

  const date = new Date();
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
  });

  const authUser = () => {
    axios
      .get(`/api/users/me`)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    authUser();
  }, []);

  // ---------- auto scroll down

  useEffect(() => {
    endMessagesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [messages]);

  // handle textarea dynamic height
  const handleInput = (e) => {
    e.target.style.height = "55px";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
  /// my code
  // return (
  //   <div className=" flex justify-center  p-0  md:h-[calc(100vh_-_130px)] overflow-scroll">
  //     <div className=" relative w-4/5  container p-0 md:p-4 md:w-3/5 flex flex-col items-center h-min ">
  //       {/* user questions & temo answers */}

  //       {messages.length === 0 && (
  //         <div className="text-center mt-10 md:mt-20" dir="rtl">
  //           <h1
  //             className="text-xl md:text-4xl font-semibold text-secondary"
  //             dir="rtl"
  //           >
  //             تعلم مع TemoGPT
  //           </h1>
  //           <p className="text-sm md:text-lg text-gray-500" dir="rtl">
  //             اسألني أي شيء عن البرمجة وسأقوم بمساعدتك
  //           </p>
  //         </div>
  //       )}

  //       {/* render messages */}

  //       <div className="border border-red-500 relative">
  //         {/* messages chat gpt replay */}
  //         <div className="">
  //           {messages?.map((message, index) => (
  //             <Message
  //               key={index}
  //               message={message.content}
  //               role={message.role}
  //               time={message.time}
  //               user={user}
  //             />
  //           ))}
  //         </div>
  //         {/* form input message  */}

  //         <div className="absolute bottom_-_10 border-green-700">bla bla</div>
  //       </div>

  //       {/* input */}

  //       <div
  //         className={` w-11/12 md:w-[35rem]   ${
  //           messages?.length === 0 ? "mt-20" : "fixed bottom-96 md:bottom-10"
  //         }`}
  //       >
  //         <form onSubmit={(e) => handleSubmit(e)}>
  //           <div className="rounded-xl bg-gray-500  min-h-min">
  //             <label className="input border border-gray-400 flex items-end gap-2 h-min">
  //               <button className="bg-transparent border-none">
  //                 <GiPaperClip className="size-6 md:size-6 text-secondary hover:text-primary duration-300" />
  //               </button>

  //               <textarea
  //                 placeholder="Type your question..."
  //                 value={input}
  //                 onChange={handleInputChange}
  //                 className=" outline-none text-xl w-4/5 resize-none h-12 max-h-36"
  //                 onInput={handleInput}
  //               ></textarea>

  //               <button className="bg-transparent border-none">
  //                 <VscMic className="size-6 md:size-6 text-secondary hover:text-primary duration-300" />
  //               </button>

  //               <button
  //                 className="bg-transparent border-none"
  //                 type="submit"
  //                 disabled={isLoading}
  //               >
  //                 {isLoading ? (
  //                   <span className="loading loading-dots loading-sm"></span>
  //                 ) : (
  //                   <HiMiniArrowUpCircle className="size-6 md:size-9 hover:text-secondary text-primary duration-300" />
  //                 )}
  //               </button>
  //             </label>
  //           </div>
  //         </form>
  //       </div>
  //       {/* auto scroll to here */}
  //       <div ref={endMessagesRef} className=" mt-10" />
  //     </div>
  //   </div>
  // );

  /** ============== chatgpt code ================= */
  return (
    <>
      <div className=" flex justify-center relative">
        <div className="flex flex-col h-full items-center   w-[90%] md:1/2 lg:w-2/3">
          {messages.length === 0 && (
            <div className="text-center mt-10 md:mt-20" dir="rtl">
              <h1
                className="text-xl md:text-4xl font-semibold text-secondary"
                dir="rtl"
              >
                تعلم مع TemoGPT
              </h1>
              <p className="text-sm md:text-lg text-gray-500" dir="rtl">
                اسألني أي شيء عن البرمجة وسأقوم بمساعدتك
              </p>
            </div>
          )}
          {/* Message Area */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-white w-full">
            {messages.map((message) => (
              <Message
                key={message.id}
                message={message.content}
                role={message.role}
                time={message.time}
                user={user}
              />
            ))}
            {/* auto scroll to here */}
            <div ref={endMessagesRef} className=" mt-10" />
          </div>

          {/* Input Area */}
          <div className="flex items-center p-4 bg-white">
            <label className="input border border-gray-400 flex items-end gap-2 h-min">
              <button className="bg-transparent border-none">
                <GiPaperClip className="size-6 md:size-6 text-secondary hover:text-primary duration-300" />
              </button>
              <textarea
                placeholder="Type your question..."
                value={input}
                onChange={handleInputChange}
                className=" outline-none text-sm md:text-lg w-4/5 resize-none h-12 max-h-36"
                onInput={handleInput}
              ></textarea>

              <button className="bg-transparent border-none">
                <VscMic className="size-6 md:size-6 text-secondary hover:text-primary duration-300" />
              </button>

              <button
                className="bg-transparent border-none"
                type="submit"
                disabled={isLoading}
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <span className="loading loading-dots loading-sm"></span>
                ) : (
                  <HiMiniArrowUpCircle className="size-6 md:size-9 hover:text-secondary text-primary duration-300" />
                )}
              </button>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
