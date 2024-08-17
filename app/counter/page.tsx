import { title } from "@/components/primitives";
import { Counter } from "@/components/counter";

async function getInitialCount() {
  console.log("getInitialCount called.");
  await new Promise(f => setTimeout(f, 3000)); // 3초 대기 후 10 리턴
  return 10;
}
export default async function CounterPage() {

  const fetchedInitialCount = await getInitialCount();

  return (
    <div className="flex flex-col space-y-16">
      <h1 className={title()}>Counter</h1>
      <Counter initialCount={fetchedInitialCount}>
        <h1>서버 컴포넌트에서 들어옴</h1>
        </Counter>
    </div>
  );
}
