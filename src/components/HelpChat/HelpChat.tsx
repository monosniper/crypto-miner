import { useTranslation } from "react-i18next";
import styles from "./HelpChat.module.css";
import { Message } from "./Message/Message";
import {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { useOutside } from "@/hooks";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const HelpChat: FC<Props> = ({ setOpen }) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  useOutside(ref, () => setOpen(false));

  const changeMessageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const changeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!files) return;

    setFile(files[0]);
  };

  const formHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(message);
    console.log(file);
  };

  return (
    <div className={styles.wrapper} ref={ref}>
      <div className={styles.header}>
        <div className="flex items-center gap-2">
          <img
            className="rounded-full"
            src="/images/chat-avatar.png"
            alt="avatar"
          />

          <div className="flex flex-col text-white">
            <h5 className="text-sm font-medium">Catherine</h5>
            <p className="text-[10px] text-white/50">Your manager</p>
          </div>
        </div>

        <svg
          onClick={() => setOpen(false)}
          className="cursor-pointer"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
        >
          <g clipPath="url(#clip0_3005_739)">
            <path d="M10 0H0V10H10V0Z" fill="white" fillOpacity="0.01" />
            <path
              d="M1.66663 1.6665L8.33329 8.33317"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.66663 8.33317L8.33329 1.6665"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_3005_739">
              <rect width="10" height="10" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>

      <div className="h-[260px] gap-2 overflow-y-auto scrollbar-none">
        <div className="flex flex-col gap-2">
          <Message isMy={true} text="Hello!" />
          <Message isMy={false} text="Hello!" />
          <Message isMy={true} text="Hello!" />
          <Message isMy={true} text="Hello!" />
          <Message isMy={false} text="Hello!" />
          <Message isMy={true} text="Hello!" />
          <Message isMy={true} text="Hello!" />
          <Message isMy={false} text="Hello!" />
          <Message isMy={true} text="Hello!" />
          <Message isMy={true} text="Hello!" />
          <Message isMy={false} text="Hello!" />
          <Message isMy={true} text="Hello!" />
        </div>
      </div>

      <form className={styles.footer} onSubmit={formHandler}>
        <div className="bg-white/10 flex items-center gap-2 rounded-[10px] w-full p-2">
          <input
            className="bg-transparent w-full text-white"
            placeholder={t("enter-your-message")}
            value={message}
            onChange={changeMessageHandler}
          />

          <input
            className="hidden"
            type="file"
            id="file"
            onChange={changeFileHandler}
          />

          <label htmlFor="file">
            <svg
              className="cursor-pointer"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <g clipPath="url(#clip0_3006_595)">
                <path d="M20 0H0V20H20V0Z" fill="white" fillOpacity="0.01" />
                <path
                  d="M10.2946 3.98526L4.10738 10.1724C2.64292 11.6369 2.64292 14.0113 4.10738 15.4757C5.57185 16.9402 7.94622 16.9402 9.41068 15.4757L16.7764 8.11007C17.7527 7.13373 17.7527 5.55082 16.7764 4.57453C15.8001 3.5982 14.2171 3.5982 13.2408 4.57453L5.87514 11.9402C5.38701 12.4284 5.38701 13.2198 5.87514 13.708C6.3633 14.1962 7.15476 14.1962 7.64293 13.708L13.8301 7.52078"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_3006_595">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </label>
        </div>

        <button className={styles.btn}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 4L3 9.31372L10.5 13.5M20 4L14.5 21L10.5 13.5M20 4L10.5 13.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};
