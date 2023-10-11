import { BookmarksIcon } from "@/components/icons";
import { ServersPlansItem } from "./ServersPlansItem/ServersPlansItem";
import { serversPlansListData } from "@/data";
import styles from "./ServersPlans.module.css";

export const ServersPlans = () => {
  return (
    <div className="flex flex-wrap -m-2">
      <div className="w-full md:w-1/2 lg:w-1/3 2xl:w-1/4 p-2">
        <ServersPlansItem
          className="h-full"
          icon={<BookmarksIcon />}
          title="Базовый"
          price={1000}
          list={serversPlansListData.base}
        />
      </div>

      <div className="w-full md:w-1/2 lg:w-1/3 2xl:w-1/4 p-2">
        <ServersPlansItem
          className="h-full"
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M18.4166 7.58333C18.3333 4.75 16.0833 2.5 13.25 2.5C12.3333 2.5 10.9166 3.16667 10.3333 4.25C10.25 4.5 9.91663 4.5 9.83329 4.25C9.16663 3.25 7.83329 2.58333 6.83329 2.58333C4.08329 2.58333 1.74996 4.83333 1.66663 7.58333V7.75C1.66663 9.16667 2.24996 10.5 3.24996 11.5C3.24996 11.5 3.24996 11.5 3.24996 11.5833C3.33329 11.6667 7.33329 15.1667 9.16663 16.75C9.66663 17.1667 10.4166 17.1667 10.9166 16.75C12.75 15.1667 16.6666 11.6667 16.8333 11.5833C16.8333 11.5833 16.8333 11.5833 16.8333 11.5C17.8333 10.5833 18.4166 9.25 18.4166 7.75V7.58333Z"
                fill="#F26363"
              />
            </svg>
          }
          title="Стандартный"
          price={2000}
          list={serversPlansListData.standart}
        />
      </div>

      <div className="w-full md:w-1/2 lg:w-1/3 2xl:w-1/4 p-2">
        <ServersPlansItem
          className="h-full"
          icon={
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path
                d="M14.9667 6.04167H14.2084C13.4517 6.08433 12.8031 5.5066 12.7584 4.75V4.68333C12.7369 4.31841 12.5711 3.97706 12.2974 3.73468C12.0238 3.49231 11.6649 3.36888 11.3 3.39167H6.08337V3.125C6.08337 2.77982 5.80355 2.5 5.45837 2.5C5.1132 2.5 4.83337 2.77982 4.83337 3.125V17.2917C4.83337 17.6368 5.1132 17.9167 5.45837 17.9167C5.80355 17.9167 6.08337 17.6368 6.08337 17.2917V10.3917H7.05837C7.8151 10.349 8.46364 10.9267 8.50837 11.6833V11.7333C8.55311 12.4899 9.20165 13.0677 9.95837 13.025H14.9584C15.7151 13.0677 16.3636 12.4899 16.4084 11.7333V7.31667C16.3507 6.57224 15.7126 6.00795 14.9667 6.04167Z"
                fill="#4EAFF5"
              />
            </svg>
          }
          title="Профессиональный"
          price={5000}
          list={serversPlansListData.prof}
        />
      </div>

      <div className="w-full md:w-1/2 lg:w-1/3 2xl:w-1/4 p-2">
        <ServersPlansItem
          className="h-full"
          icon={
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path
                d="M10.0037 2.92257L5.46202 10.8809C5.28994 11.1753 5.29044 11.5397 5.46332 11.8336C5.63621 12.1275 5.95446 12.3049 6.29535 12.2976H8.67869C8.98513 12.2954 9.27978 12.4155 9.49725 12.6314C9.71473 12.8473 9.83703 13.1411 9.83702 13.4476V16.4559C9.83984 16.8214 10.0805 17.1423 10.4305 17.2475C10.7805 17.3527 11.1582 17.2176 11.362 16.9142L15.762 10.3142C15.9546 10.0239 15.9727 9.65135 15.8093 9.34362C15.6459 9.03589 15.3271 8.84232 14.9787 8.83924H12.712C12.0769 8.83924 11.562 8.32436 11.562 7.68924V3.33924C11.5647 2.95974 11.3106 2.62639 10.944 2.52836C10.5773 2.43033 10.1908 2.59239 10.0037 2.92257Z"
                fill="#A3F026"
              />
            </svg>
          }
          title="Премиум"
          price={1000}
          list={serversPlansListData.prof}
        />
      </div>

      <div className="w-full md:w-1/2 lg:w-1/3 2xl:w-1/4 p-2">
        <ServersPlansItem
          className={styles.beneficial}
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10.0425 1.66663L8.90084 3.99996C8.08505 5.66691 6.99168 7.18298 5.66751 8.48329L5.51751 8.62496C4.66706 9.4506 4.18114 10.5814 4.16751 11.7666V11.9166C4.14498 14.2376 5.52801 16.3417 7.66751 17.2416L7.88417 17.3333C9.2874 17.9293 10.8726 17.9293 12.2758 17.3333H12.3258C14.4813 16.3968 15.8643 14.2582 15.8342 11.9083V8.29163C15.1159 9.93206 13.8113 11.2455 12.1758 11.975C12.1758 11.975 12.1758 11.975 12.1258 11.975C12.0758 11.975 11.4925 12.2166 11.2425 11.975C11.0192 11.749 10.9978 11.3926 11.1925 11.1416L11.2508 11.1H11.2925C13.2056 9.64578 13.6517 6.95139 12.3092 4.95829C11.2258 3.30829 10.0425 1.66663 10.0425 1.66663Z"
                fill="#EE884F"
              />
            </svg>
          }
          title="Выгодный план"
          price={3000}
          list={serversPlansListData.beneficial}
        />
      </div>

      <div className="w-full md:w-1/2 lg:w-1/3 2xl:w-1/4 p-2">
        <ServersPlansItem
          className="h-full"
          icon={
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path
                d="M12.7 3.78063L13.25 5.4473C13.4985 6.2187 14.2146 6.74312 15.025 6.7473H16.7584C17.5713 6.74213 18.2941 7.26367 18.5454 8.03677C18.7968 8.80987 18.5189 9.65674 17.8584 10.1306L16.4334 11.164C15.7774 11.6402 15.5017 12.484 15.75 13.2556L16.3 14.9223C16.5721 15.6966 16.3065 16.5577 15.6456 17.0443C14.9847 17.5308 14.0836 17.5287 13.425 17.039L12.025 15.9973C11.3687 15.5219 10.4813 15.5219 9.82502 15.9973L8.42502 17.039C7.77014 17.5183 6.8806 17.5195 6.22435 17.0421C5.56811 16.5647 5.29553 15.7179 5.55002 14.9473L6.10002 13.2806C6.34832 12.509 6.07265 11.6652 5.41669 11.189L3.95835 10.139C3.28444 9.6641 3.00184 8.80338 3.26312 8.02146C3.5244 7.23954 4.26767 6.72162 5.09169 6.7473H6.82502C7.63102 6.74549 8.34569 6.22878 8.60002 5.46396L9.15002 3.7973C9.39658 3.02747 10.1106 2.50382 10.919 2.50002C11.7273 2.49623 12.4462 3.01315 12.7 3.78063Z"
                fill="#ECCA15"
              />
            </svg>
          }
          title="Элитный"
          price={20000}
          list={serversPlansListData.elite}
        />
      </div>
    </div>
  );
};
