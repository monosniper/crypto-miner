import { Title } from "@/components";
import { Button, FieldWrapper, TextField } from "@/components/ui";

export const TradingOperation = () => {
  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <div className="flex justify-between items-center gap-4">
        <Title title="Трейдинг" />
      </div>

      <div className="box p-4">
        <form>
          <FieldWrapper title="Сумма">
            <TextField placeholder="Введите сумму" />
          </FieldWrapper>

          <div className="flex items-center flex-wrap -m-1 mt-8">
            <div className="w-full sm:w-1/2 p-1">
              <Button className="w-full" title="Купить" />
            </div>
            <div className="w-full sm:w-1/2 p-1">
              <Button className="w-full" title="Продать" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
