import { Title } from "@/components";
import { FanIcon, PrevIcon } from "@/components/icons";
import { useNavigate } from "react-router-dom";
import cn from "clsx";
import { Button } from "@/components/ui";

export const ServerPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        className="flex items-center gap-4 lg:hidden font-semibold text-2xl mb-6"
        onClick={() => {
          navigate(-1);
        }}
      >
        <PrevIcon className="prev-icon" />
        <span>Сервер</span>
      </button>

      <Title title="Antminer S19 XP 141" />

      <div className={cn("box", "p-6 mt-6")}>
        <h5>Статус</h5>

        <div className="flex justify-between items-center gap-3 gap-y-6 flex-wrap mt-4">
          <div className="flex items-center gap-4">
            <FanIcon width={32} height={32} />

            <p className="text-2xl font-semibold">Активный</p>
          </div>

          <Button title="Перезапустить" />
        </div>
      </div>
    </div>
  );
};
