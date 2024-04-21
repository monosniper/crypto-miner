import cn from "clsx";
import { Select2 } from "../ui/Select2/Select2";
import { MainBadge } from "../ui";
import { useConfigurator } from "@/hooks";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { BaseConfigurator, ConfiguratorFormData } from "@/types";

type Props<T extends FieldValues> = {
  methods: UseFormReturn<T>;
};

export const Configurator = <T extends FieldValues>({
  methods,
}: Props<ConfiguratorFormData>) => {
  const { base } = useConfigurator();

  return (
    <div className={cn("box", "p-8")}>
      <div className="flex flex-col gap-4 lg:gap-5">
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold">
            Конфигурация выбранного сервера
          </h3>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center gap-4 flex-wrap text-sm">
              <p>Тип</p>

              <p>Кастомный</p>
            </div>

            <div className="flex justify-between items-center gap-4 flex-wrap text-sm">
              <p>Локация</p>

              <Select2
                onChange={() => console.log("asd")}
                list={[
                  {
                    value: "United Kingdom",
                    title: (
                      <div className="flex items-center justify-between gap-2 w-full">
                        <p>RTX 4090 TI</p>
                        <p>$49.00</p>
                      </div>
                    ),
                  },
                  { value: "United Kingdom", title: "United Kingdom" },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold">Операционная система</h3>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center gap-4 flex-wrap text-sm">
              <p>OC</p>

              <Select2
                onChange={() => console.log("asd")}
                list={[
                  {
                    value: "Ubuntu 22 x64",
                    title: <div className="Ubuntu 22 x64">Ubuntu 22 x64</div>,
                  },
                  { value: "Ubuntu 22 x64", title: "Ubuntu 22 x64" },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold">Базовые настройки</h3>

          <div className="flex flex-col gap-1">
            {base?.map((el, idx) => {
              const list = el.options.map((option) => {
                return {
                  value: option.title,
                  title: option.title + " " + option.price + "$",
                };
              });

              return (
                <div
                  key={idx}
                  className="flex justify-between items-center gap-4 flex-wrap text-sm"
                >
                  <p>{el.slug}</p>

                  {el.type === "select" && (
                    <Select2
                      list={list}
                      onChange={(value) => {
                        methods.setValue(
                          `base.${el.slug as keyof BaseConfigurator}`,
                          value
                        );
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold">Сеть</h3>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center gap-4 flex-wrap text-sm">
              <p>Версия IP</p>

              <Select2
                value={"Ubuntu 22 x64"}
                onChange={() => console.log("asd")}
                list={[
                  {
                    value: "Ubuntu 22 x64",
                    title: <div className="Ubuntu 22 x64">Ubuntu 22 x64</div>,
                  },
                  { value: "Ubuntu 22 x64", title: "Ubuntu 22 x64" },
                ]}
              />
            </div>

            <div className="flex justify-between items-center gap-4 flex-wrap text-sm">
              <p>Количество</p>

              <Select2
                value={"Ubuntu 22 x64"}
                onChange={() => console.log("asd")}
                list={[
                  {
                    value: "Ubuntu 22 x64",
                    title: <div className="Ubuntu 22 x64">Ubuntu 22 x64</div>,
                  },
                  { value: "Ubuntu 22 x64", title: "Ubuntu 22 x64" },
                ]}
              />
            </div>
            <div className="flex justify-between items-center gap-4 flex-wrap text-sm">
              <p>Порт</p>

              <Select2
                value={"Ubuntu 22 x64"}
                onChange={() => console.log("asd")}
                list={[
                  {
                    value: "Ubuntu 22 x64",
                    title: <div className="Ubuntu 22 x64">Ubuntu 22 x64</div>,
                  },
                  { value: "Ubuntu 22 x64", title: "Ubuntu 22 x64" },
                ]}
              />
            </div>
            <div className="flex justify-between items-center gap-4 flex-wrap text-sm">
              <p>Трафик</p>

              <Select2
                value={"Ubuntu 22 x64"}
                onChange={() => console.log("asd")}
                list={[
                  {
                    value: "Ubuntu 22 x64",
                    title: <div className="Ubuntu 22 x64">Ubuntu 22 x64</div>,
                  },
                  { value: "Ubuntu 22 x64", title: "Ubuntu 22 x64" },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold">Дополнительно</h3>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center gap-4 flex-wrap text-sm">
              <p>Уведомления об окончании сессии</p>

              <Select2
                onChange={() => console.log("asd")}
                list={[
                  {
                    value: "Ubuntu 22 x64",
                    title: <div className="Ubuntu 22 x64">Ubuntu 22 x64</div>,
                  },
                  { value: "Ubuntu 22 x64", title: "Ubuntu 22 x64" },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold">Монеты</h3>

          <div className="flex items-center gap-1.5 flex-wrap">
            <MainBadge title="USDT" onClick={() => console.log("asd")} />
            <MainBadge title="USDT" onClick={() => console.log("asd")} />
            <MainBadge title="USDT" onClick={() => console.log("asd")} />
            <MainBadge title="USDT" onClick={() => console.log("asd")} />
            <MainBadge title="USDT" onClick={() => console.log("asd")} />
            <MainBadge title="USDT" onClick={() => console.log("asd")} />
            <MainBadge title="USDT" onClick={() => console.log("asd")} />
            <MainBadge title="USDT" onClick={() => console.log("asd")} />
            <MainBadge title="USDT" onClick={() => console.log("asd")} />
            <MainBadge title="USDT" onClick={() => console.log("asd")} />
            <MainBadge title="USDT" onClick={() => console.log("asd")} />
            <MainBadge title="USDT" onClick={() => console.log("asd")} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold">Комментарий</h3>

          <div className="flex items-center gap-1.5 flex-wrap">
            <textarea className="bg-base-500 text-base min-h-[95px] rounded-lg w-full px-4 py-2"></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};
