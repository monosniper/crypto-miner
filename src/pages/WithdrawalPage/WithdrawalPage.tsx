import { Attention, BalanceBlock, Title, WithdrawalForm } from "@/components";
import cn from "clsx";

export const WithdrawalPage = () => {
  return (
    <div>
      <Title className="flex lg:hidden pb-6" title="Вывод средств" />

      <BalanceBlock type="withdrawal" title="Доступно для вывода" />

      <div className={cn("box", "p-6 mt-6")}>
        <div className="flex justify-between items-center gap-3 flex-wrap text-lg font-medium">
          <h4>Введите сумму и адрес кошелька</h4>
        </div>

        <WithdrawalForm className="mt-8" />
      </div>

      <Attention
        className="mt-6 p-6"
        title="Обратите внимание"
        content={<AttentionContent />}
      />
    </div>
  );
};

const AttentionContent = () => {
  return (
    <>
      <div>
        <p>
          Доверяйте нашим надежным выплатам, которые производятся каждую
          пятницу. Следующий платеж запланирован на:
        </p>
        <ul className="ml-4 list-disc">
          <li>Неделю 42, 2023 года — 13 октября.</li>
        </ul>
      </div>

      <p>
        Наши выплаты всегда производятся в срок, поэтому вы можете быть уверены,
        что получите свои деньги вовремя. Мы понимаем, что для вас важно
        получать зарплату вовремя, поэтому мы делаем все возможное, чтобы
        обеспечить своевременность и надежность наших выплат.
      </p>
    </>
  );
};
